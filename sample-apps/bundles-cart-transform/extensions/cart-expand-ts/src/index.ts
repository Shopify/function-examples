import type {
  InputQuery,
  FunctionResult,
  Scalars,
  CartOperation,
} from "../generated/api";

type RequireStrict<T> = Required<{
  [K in keyof T]: NonNullable<T[K]>;
}>;

type Merchandise = InputQuery["cart"]["lines"][number]["merchandise"];
type ProductVariant = RequireStrict<
  Extract<Merchandise, { __typename: "ProductVariant" }>
>;

export default (input: InputQuery): FunctionResult => {
  const operations = input.cart.lines.reduce<Array<CartOperation>>(
    (acc, {id: cartLineId, merchandise}) => {
      if (canExpand(merchandise)) {
        const componentReferences: Scalars["ID"][] = JSON.parse(
          merchandise.componentReferences.value
        );
        const componentQuantities: Scalars["Int"][] = JSON.parse(
          merchandise.componentQuantities.value
        );

        if (!validateMetafields(componentReferences, componentQuantities)) {
          throw new Error("Invalid bundle composition");
        }

        return [
          ...acc,
          {
            expand: {
              cartLineId,
              expandedCartItems: componentReferences.map((merchandiseId, index) => ({
                merchandiseId,
                quantity: componentQuantities[index],
              })),
            },
          },
        ];
      }

      return acc;
    },
    []
  );

  return {
    operations,
  };
};

function canExpand(merchandise: Merchandise): merchandise is ProductVariant {
  return (
    merchandise.__typename === "ProductVariant" &&
    !!merchandise.componentQuantities &&
    !!merchandise.componentReferences
  );
}

function validateMetafields(componentReferences: Scalars["ID"][], componentQuantities: Scalars["Int"][], ) {
  return componentReferences.length !== componentQuantities.length && componentReferences.length > 0;
}
