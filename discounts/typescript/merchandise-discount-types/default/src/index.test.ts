import {main} from '.';
import {MerchandiseDiscountTypesAPI} from '@shopify/scripts-discounts-apis';
import camelcaseKeys from 'camelcase-keys';
import * as rawPayload from './input.json';

const payload = camelcaseKeys(rawPayload, {deep: true});

describe('default merchandise discount types script', () => {
  it('returns no discounts', () => {
    const result = main(payload as MerchandiseDiscountTypesAPI.Payload);
    expect(result.discounts).toEqual([]);
  });
});
