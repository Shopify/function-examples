import { Discount } from '../../types';
import { Configuration } from './types';

export function serializeDiscount(
  discount: Discount<Configuration>,
): Discount<string> {
  return {
    title: discount.title,
    configuration: JSON.stringify({
      message: discount.configuration.message,
      variantId: discount.configuration.variantId,
      discountPercentage: discount.configuration.discountPercentage.toString(),
      minimumQuantity: discount.configuration.minimumQuantity.toString(),
    }),
    startsAt: new Date(),
  };
}
