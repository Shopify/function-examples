// @ts-check

/*
A straightforward example of a function that expands a bundle into its component parts.
The parts of a bundle are stored in a metafield on the product parent value with a specific format,
specifying each part's quantity and variant.

The function reads the cart. Any item containing the metafield that specifies the bundle parts
will return an Expand operation containing the parts.
*/

/**
 * @typedef {import("../generated/api").InputQuery} InputQuery
 * @typedef {import("../generated/api").FunctionResult} FunctionResult
 * @typedef {import("../generated/api").CartOperation} CartOperation
 */

/**
 * @type {FunctionResult}
 */
const NO_CHANGES = {
  operations: [],
};

export default /**
 * @param {InputQuery} input
 * @returns {FunctionResult}
 */
(input) => {
  const operations = input.cart.lines.reduce(
    /** @param {CartOperation[]} acc */
    (acc, cartLine) => {
      const expandOperation = optionallyBuildExpandOperation(
        cartLine,
        input
      );

      if (expandOperation) {
        return [...acc, { expand: expandOperation }];
      }

      return acc;
    },
    []
  );

  return operations.length > 0 ? { operations } : NO_CHANGES;
};

function optionallyBuildExpandOperation(
  { id: cartLineId, merchandise, cost, warrantyAdded },
  { cartTransform: { warrantyVariantID }, presentmentCurrencyRate }
) {
  const hasWarrantyMetafields =
    !!merchandise.product.warrantyCostPercentage && !!warrantyVariantID;
  const shouldAddWarranty = warrantyAdded?.value === "Yes";

  if (
    merchandise.__typename === "ProductVariant" &&
    hasWarrantyMetafields &&
    shouldAddWarranty
  ) {
    return {
      cartLineId,
      expandedCartItems: [
        {
          merchandiseId: warrantyVariantID.value,
          quantity: 1,
          price: {
            adjustment: {
              fixedPricePerUnit: {
                amount: (
                  cost.amountPerQuantity.amount *
                  (merchandise.product.warrantyCostPercentage.value / 100) *
                  presentmentCurrencyRate
                ).toString(),
              },
            },
          },
        },
      ],
    };
  }

  return null;
}
