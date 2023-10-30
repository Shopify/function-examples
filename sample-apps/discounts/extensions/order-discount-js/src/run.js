// @ts-check
import { DiscountApplicationStrategy } from "../generated/api";

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 * @typedef {import("../generated/api").Target} Target
 * @typedef {import("../generated/api").ProductVariant} ProductVariant
 */

/**
 * @type {FunctionRunResult}
 */
const EMPTY_DISCOUNT = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: [],
};

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  // Define a type for your configuration, and parse it from the metafield
  /**
   * @type {{
   *   quantity: number
   *   percentage: number
   * }}
   */
  const configuration = JSON.parse(
    input?.discountNode?.metafield?.value ?? "{}"
  );
  if (!configuration.quantity || !configuration.percentage) {
    return EMPTY_DISCOUNT;
  }

  const totalQuantity = input.cart.lines.reduce(
    (total, line) =>
      line.merchandise.__typename == "ProductVariant"
        ? total + line.quantity
        : total,
    0
  );

  if (totalQuantity < configuration.quantity) {
    console.error("Cart does not qualify for volume discount.");
    return EMPTY_DISCOUNT;
  }

  const targets = input.cart.lines.map((line) => {
    const variant = /** @type {ProductVariant} */ (line.merchandise);
    return /** @type {Target} */ ({
      productVariant: {
        id: variant.id,
      },
    });
  });

  if (!targets.length) {
    console.error("No cart lines qualify for volume discount.");
    return EMPTY_DISCOUNT;
  }

  return {
    discounts: [
      {
        targets,
        value: {
          percentage: {
            // Use the configured percentage instead of a hardcoded value
            value: configuration.percentage.toString(),
          },
        },
      },
    ],
    discountApplicationStrategy: DiscountApplicationStrategy.First,
  };
}
