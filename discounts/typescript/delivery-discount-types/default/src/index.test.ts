import {main} from '.';
import camelcaseKeys from 'camelcase-keys';
import * as rawPayload from './input.json';

const payload = camelcaseKeys(rawPayload, {deep: true});

describe('free shipping discount type', () => {
  it('returns 100% discount targeting a delivery line', () => {
    const result = main(payload);

    expect(result.discounts).toStrictEqual([
      expect.objectContaining({
        title: 'Free shipping',
        value: {type: 'percentage', value: 100},
        allocations: [{lineIndex: 0}],
      }),
    ]);
  });

  it('returns configured discount title if present', () => {
    const configuration = {title: 'BFCM free shipping'};
    const result = main({...payload, configuration});

    expect(result.discounts).toStrictEqual([
      expect.objectContaining({
        title: 'BFCM free shipping',
        value: {type: 'percentage', value: 100},
        allocations: [{lineIndex: 0}],
      }),
    ]);
  });
});
