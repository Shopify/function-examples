// @ts-check
import { DiscountApplicationStrategy } from "../generated/api";

/**
 * @typedef {import("../generated/api").InputQuery} InputQuery
 * @typedef {import("../generated/api").FunctionResult} FunctionResult
 * @typedef {import("../generated/api").ProductVariant} ProductVariant
 * @typedef {import("../generated/api").Discount} Discount
 */

/**
 * @type {FunctionResult}
 */
const EMPTY_DISCOUNT = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: [],
};

export default /**
 * @param {InputQuery} input
 * @returns {FunctionResult}
 */
(input) => {

  const DEFAULT_VALUE =  50.00;

  const configuration = JSON.parse(
    input?.discountNode?.metafield?.value ?? JSON.stringify(DEFAULT_VALUE)
  );

  const targets = input.cart.lines
    .filter(line => line.merchandise.__typename === "ProductVariant")
    .map ((line) => {
      const variant = /** @type {ProductVariant} */ (line.merchandise);
      return /** @type {Target} */ { productVariant: {id: variant.id} }
  });

  if (targets.length==0) return EMPTY_DISCOUNT;

  /**
   * @type {Discount}
   */
    const discount = {
      targets: targets,
      value: {
        fixedAmount: {
          amount: convertToCartCurrency(configuration, input.presentmentCurrencyRate).toString(),
          appliesToEachItem: false
        },
      }
    };

  return {
    discountApplicationStrategy: DiscountApplicationStrategy.First,
    discounts: [discount]
  }
};

function convertToCartCurrency(value, presentmentCurrencyRate) {
  presentmentCurrencyRate ??= 1.0;
  return value * presentmentCurrencyRate;
}
