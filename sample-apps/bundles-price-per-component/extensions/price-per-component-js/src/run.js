// @ts-check

/*
A straightforward example of a function that expands a bundle into its component parts.
The parts of a bundle are stored in a metafield on the product parent value with a specific format,
specifying each part's quantity and variant.

The function reads the cart. Any item containing the metafield that specifies the bundle parts
will return an Expand operation containing the parts.
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
      const expandOperation = optionallyBuildExpandOperation(cartLine, input.presentmentCurrencyRate);

      if (expandOperation) {
        return [...acc, { expand: expandOperation }];
      }

      return acc;
    },
    []
  );

  return operations.length > 0 ? { operations } : NO_CHANGES;
};

/**
 * @param {RunInput['cart']['lines'][number]} cartLine
 * @param {RunInput['presentmentCurrencyRate']} presentmentCurrencyRate
 */
function optionallyBuildExpandOperation({ id: cartLineId, merchandise }, presentmentCurrencyRate) {
  if (merchandise.__typename === "ProductVariant" && merchandise.product.bundledComponentData) {
    const bundleData = JSON.parse(
      merchandise.product.bundledComponentData.value
    );

    if (bundleData.length === 0) {
      throw new Error("Invalid bundle composition");
    }

    const expandedCartItems = bundleData.map((component) => ({
      merchandiseId: component.id,
      quantity: component.quantity || 1,
      price: {
        adjustment: {
          fixedPricePerUnit: {
            amount: (component.price * presentmentCurrencyRate).toFixed(2),
          },
        },
      },
    }));

    if (expandedCartItems.length > 0) {
      return { cartLineId, expandedCartItems };
    }
  }

  return null;
}
