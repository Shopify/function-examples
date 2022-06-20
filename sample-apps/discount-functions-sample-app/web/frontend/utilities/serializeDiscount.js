import { DiscountMethod } from "@shopify/discount-app-components";

export function serializeDiscount(discount) {
  const METAFIELD_NAMESPACE = 'discount-functions-sample-app';
  const METAFIELD_CONFIGURATION_KEY = 'function-configuration';

  const serialized = {
    title: discount.method === DiscountMethod.Automatic ? discount.title : discount.code,
    startsAt: new Date(),
    discountClass: discount.discountClass,
    metafields: [
      // store configuration in app metafield
      {
        namespace: METAFIELD_NAMESPACE,
        key: METAFIELD_CONFIGURATION_KEY,
        type: 'json',
        value: JSON.stringify(discount.configuration)
      }
    ]
  };

  if (discount.method === DiscountMethod.Code) {
    serialized.code = discount.code;
  }

  // metafield id is required for update
  if (discount.configurationId) {
    serialized.metafields[0].id = discount.configurationId;
  }

  return serialized;
}
