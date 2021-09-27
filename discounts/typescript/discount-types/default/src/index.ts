import {DiscountTypes} from '@shopify/scripts-discount-types-apis-ts';

type Payload = DiscountTypes.Payload;
type Output = DiscountTypes.Output;

export const main  = ({input, configuration}: Payload): Output => {
  console.log('Hello, world!');
  return {
    merchandiseDiscounts: [],
    shippingDiscounts: [],
  };
};
