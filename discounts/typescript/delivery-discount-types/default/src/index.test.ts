import {main} from '.';
import {DeliveryDiscountTypesAPI} from '@shopify/scripts-discounts-apis';
import camelcaseKeys from 'camelcase-keys';
import * as rawPayload from './input.json';

const payload = camelcaseKeys(rawPayload, {deep: true});

describe('default delivery discount types script', () => {
  it('returns no discounts', () => {
    const result = main(payload as DeliveryDiscountTypesAPI.Payload);
    expect(result.discounts).toEqual([]);
  });
});
