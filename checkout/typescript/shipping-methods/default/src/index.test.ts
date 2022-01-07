import {main} from './';
import camelcaseKeys from 'camelcase-keys';
import * as rawInput from './input.json';

const input = camelcaseKeys(rawInput, {deep: true});

describe('default shipping methods script', () => {
  it('returns the given shipping methods', () => {
    const result = main(input as any);
    expect(result.sortResponse?.proposedOrder).toEqual(input.input.shippingMethods);
  });
});
