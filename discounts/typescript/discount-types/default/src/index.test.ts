import {main} from '.';
import * as payload from './input.json';
import {DiscountTypes} from '@shopify/scripts-discount-types-apis-ts';

describe('default discounts script', () => {
  it('returns no discounts', () => {
    const result = main(payload as DiscountTypes.Payload);
    expect(result.merchandiseDiscounts).toEqual([]);
    expect(result.shippingDiscounts).toEqual([]);
  });
});
