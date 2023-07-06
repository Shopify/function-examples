import type {
  InputQuery,
  FunctionResult,
  Scalars,
  CartOperation,
  ExpandOperation,
} from "../generated/api";

type RequireStrict<T> = Required<{
  [K in keyof T]: NonNullable<T[K]>;
}>;

type Merchandise = InputQuery["cart"]["lines"][number]["merchandise"];
type ProductVariant = RequireStrict<
  Extract<Merchandise, { __typename: "ProductVariant" }>
>;

const NO_CHANGES: FunctionResult = {
  operations: [],
};

export default (input: InputQuery): FunctionResult => {
  const operations = input.cart.lines.reduce<Array<CartOperation>>(
    (acc, cartLine) => {
      const expandOperation = optionallyBuildExpandOperation(cartLine);

      if (expandOperation) {
        return [...acc, { expand: expandOperation }];
      }

      return acc;
    },
    []
  );

  return operations.length > 0 ? { operations } : NO_CHANGES;
};

function optionallyBuildExpandOperation({ id: cartLineId, merchandise }): ExpandOperation | null {
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

    return {
      cartLineId,
      expandedCartItems: componentReferences.map((merchandiseId, index) => ({
        merchandiseId,
        quantity: componentQuantities[index],
      })),
    };
  }

  return null;
}

function canExpand(merchandise: Merchandise): merchandise is ProductVariant {
  return (
    merchandise.__typename === "ProductVariant" &&
    !!merchandise.componentQuantities &&
    !!merchandise.componentReferences
  );
}

/**
 * Returns true if component references have matching quantities and there is at least one component.
 */
function validateMetafields(
  componentReferences: Scalars["ID"][],
  componentQuantities: Scalars["Int"][]
) {
  return (
    componentReferences.length === componentQuantities.length &&
    componentReferences.length > 0
  );
}
