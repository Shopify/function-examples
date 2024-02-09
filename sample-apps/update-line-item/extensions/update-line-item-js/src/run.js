// @ts-check

/*
A straightforward example of a function that updates a line item title and price based on attributes.

The function reads the cart. Any item with a specific line item attribute will be used
to generate an update operation with a custom title, and price based on simple math using 
the line item attribute value.
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
      const updateOperation = optionallyBuildUpdateOperation(
        cartLine
      );

      if (updateOperation) {
        return [...acc, { update: updateOperation }];
      }

      return acc;
    },
    []
  );

  return operations.length > 0 ? { operations } : NO_CHANGES;
};

/**
 * @param {RunInput['cart']['lines'][number]} cartLine
 */
function optionallyBuildUpdateOperation(
  { id: cartLineId, merchandise, cost, fabricLength }
) {
  const hasFabricLength = fabricLength && Number(fabricLength.value) > 0;

  if (
    merchandise.__typename === "ProductVariant" &&
    hasFabricLength
  ) {
    return {
      cartLineId,
      title: `${merchandise.title} (${fabricLength.value}m)`,
      price: {
        adjustment: {
          fixedPricePerUnit: {
            amount: (Number(fabricLength.value) * cost.amountPerQuantity.amount).toFixed(2)
          }
        }
      }
    };
  }

  return null;
}
