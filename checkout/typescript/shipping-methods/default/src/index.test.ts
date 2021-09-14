import {main} from './';
import * as input from './input.json';

describe('default shipping methods script', () => {
  it('returns the given shipping methods', () => {
    const result = main(input as any);
    expect(result.sortResponse?.proposedOrder).toEqual(input.input.shippingMethods);
  });
});
