// @ts-check

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").CartDeliveryOptionsTransformRunResult} CartDeliveryOptionsTransformRunResult
 * @typedef {import("../generated/api").Operation} Operation
 */

/**
 * @type {CartDeliveryOptionsTransformRunResult}
 */
const NO_CHANGES = {
  operations: [],
};

/**
 * @param {RunInput} input
 * @returns {CartDeliveryOptionsTransformRunResult}
 */
export function run(input) {
  /**
   * @type {{
  *   stateProvinceCode: string
  *   message: number
  * }}
  */
  const configuration = JSON.parse(
    input?.deliveryCustomization?.metafield?.value ?? "{}"
  );
  if (!configuration.stateProvinceCode || !configuration.message) {
    return NO_CHANGES;
  }

  let toRename = input.cart.deliveryGroups
    .filter(group => group.deliveryAddress?.provinceCode &&
      group.deliveryAddress.provinceCode == configuration.stateProvinceCode)
    .flatMap(group => group.deliveryOptions)
    .map(option => /** @type {Operation} */({
      deliveryOptionRename: {
        deliveryOptionHandle: option.handle,
        title: option.title ? `${option.title} - ${configuration.message}` : configuration.message
      }
    }));

  return {
    operations: toRename
  };
};
