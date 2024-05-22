// @ts-check

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 * @typedef {import("../generated/api").HideOperation} HideOperation
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
  // Define a type for your configuration, and parse it from the metafield
  /**
   * @type {{
   *   paymentMethodName: string
   *   cartTotal: number
   * }}
   */
  const configuration = JSON.parse(
    input?.paymentCustomization?.metafield?.value ?? "{}"
  );
  if (configuration.paymentMethodName === undefined || configuration.cartTotal === undefined) {
    console.error(
      "Configuration is missing."
    );
    return NO_CHANGES;
  }

  const cartTotal = parseFloat(input.cart.cost.totalAmount.amount);
  // Use the configured cart total instead of a hardcoded value
  if (cartTotal < configuration.cartTotal) {
    console.error(
      "Cart total is not high enough, no need to hide the payment method."
    );
    return NO_CHANGES;
  }

  // Use the configured payment method name instead of a hardcoded value
  const hidePaymentMethod = input.paymentMethods.find((method) =>
    method.name.includes(configuration.paymentMethodName)
  );

  if (!hidePaymentMethod) {
    return NO_CHANGES;
  }

  return {
    operations: [
      {
        hide: {
          paymentMethodId: hidePaymentMethod.id,
        },
      },
    ],
  };
};
