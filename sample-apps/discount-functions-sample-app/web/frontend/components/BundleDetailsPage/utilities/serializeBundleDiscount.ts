import { BundleDiscount } from '../types';

export default function serializeBundleDiscount(discount: BundleDiscount) {
  return {
    title: discount.title,
    configuration: JSON.stringify({
      title: discount.configuration.message,
      variantId: discount.configuration.variantId,
      discountPercentage: discount.configuration.discountPercentage.toString(),
      minimumQuantity: discount.configuration.minimumQuantity.toString(),
    }),
    startsAt: new Date().toISOString(),
  };
}
