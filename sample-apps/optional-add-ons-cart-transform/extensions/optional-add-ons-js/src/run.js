// @ts-check

/*
A straightforward example of a function that expands a single line into a bundle with add-on products.
The add-on options are are stored in a line item property and metafield on the product.
*/

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 * @typedef {import("../generated/api").CartOperation} CartOperation
 */

/**
 * @type {FunctionRunResult}
 */
const NO_CHANGES = {
  operations: [],
};

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  const operations = input.cart.lines.reduce(
    /** @param {CartOperation[]} acc */
    (acc, cartLine) => {
      const expandOperation = optionallyBuildExpandOperation(cartLine, input);

      if (expandOperation) {
        return [...acc, { expand: expandOperation }];
      }

      return acc;
    },
    []
  );

  return operations.length > 0 ? { operations } : NO_CHANGES;
}

/**
 * @param {RunInput['cart']['lines'][number]} cartLine
 * @param {RunInput} input
 */
function optionallyBuildExpandOperation(
  { id: cartLineId, merchandise, cost, warrantyAdded },
  { cartTransform: { warrantyVariantID }, presentmentCurrencyRate }
) {
  const hasWarrantyMetafields =
    merchandise.__typename === "ProductVariant" &&
    !!merchandise.product.warrantyCostPercentage &&
    !!warrantyVariantID;
  const shouldAddWarranty = warrantyAdded?.value === "Yes";
  const warrantyCostPercentage =
    merchandise.__typename === "ProductVariant" &&
    merchandise.product?.warrantyCostPercentage?.value
      ? parseFloat(merchandise.product.warrantyCostPercentage.value)
      : 100;

  if (
    merchandise.__typename === "ProductVariant" &&
    hasWarrantyMetafields &&
    shouldAddWarranty
  ) {
    return {
      cartLineId,
      title: `${merchandise.title} with warranty`,
      // Optionally override the image for line item
      // image: { url: "https://cdn.shopify.com/.../something.png" },
      expandedCartItems: [
        {
          merchandiseId: warrantyVariantID.value,
          quantity: 1,
          price: {
            adjustment: {
              fixedPricePerUnit: {
                amount: (
                  cost.amountPerQuantity.amount *
                  (warrantyCostPercentage / 100) *
                  presentmentCurrencyRate
                ).toFixed(2),
              },
            },
          },
        },
      ],
    };
  }

  return null;
}
