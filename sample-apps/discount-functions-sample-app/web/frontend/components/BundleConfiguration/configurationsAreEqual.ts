import { Configuration } from './types';

export function configurationsAreEqual(
  left: Configuration,
  right: Configuration,
) {
  return (
    left.message === right.message &&
    left.discountPercentage === right.discountPercentage &&
    left.minimumQuantity === right.minimumQuantity &&
    left.variantId === right.variantId
  );
}
