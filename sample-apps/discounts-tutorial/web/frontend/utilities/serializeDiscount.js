import { DiscountMethod } from "@shopify/discount-app-components";
import metafields from '../metafields';

export function serializeDiscount(discount) {
  const serialized = {
    title: discount.method === DiscountMethod.Automatic ? discount.title : discount.code,
    startsAt: discount.startsAt,
    endsAt: discount.endsAt,
    combinesWith: discount.combinesWith,
    metafields: [
      // store configuration in app metafield
      {
        namespace: metafields.namespace,
        key: metafields.key,
        type: 'json',
        value: JSON.stringify(discount.configuration)
      }
    ]
  };

  if (discount.method === DiscountMethod.Code) {
    serialized.usageLimit = discount.usageLimit;
    serialized.appliesOncePerCustomer = discount.appliesOncePerCustomer;
    serialized.code = discount.code;
  }

  // metafield id is required for update
  if (discount.configurationId) {
    serialized.metafields[0].id = discount.configurationId;
  }

  return serialized;
}