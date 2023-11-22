// @ts-check

import { OrderSubmission } from "../generated/api";

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionResult} FunctionResult
*/

/**
 * @type {FunctionResult}
 */
const NO_CHANGES = {
  operations: [],
};

/**
 * @param {RunInput} input
 * @returns {FunctionResult}
 */
export function run(input) {
  const configuration = JSON.parse(
    input?.orderSubmissionRule?.metafield?.value ?? "{}"
  );

  if (!configuration.cartTotal) {
    console.log("No configuration found, returning no changes")
    return NO_CHANGES;
  }

  const cartTotal = parseFloat(input.cart.cost.totalAmount.amount ?? "0.0");
  if (cartTotal < configuration.cartTotal) {
    console.log("Cart total is less than configured, returning order")
    return {
      operations: [
        {
          set: {
            orderSubmissionType: OrderSubmission.Order
          },
        }
      ]
    };
  } else {
    console.log("Cart total has met the configured minimum, returning draft order")
    return {
      operations: [
        {
          set: {
            orderSubmissionType: OrderSubmission.Review
          },
        }
      ]
    }
  }
};
