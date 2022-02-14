import {main} from '.';
import camelcaseKeys from 'camelcase-keys';
import * as rawPayload from './input.json';

const payload = camelcaseKeys(rawPayload, {deep: true});

describe('Percentage discount type script', () => {
  it('returns 100% discount off merchandise lines by default', () => {
    const result = main(payload);

    expect(result.discounts).toStrictEqual([
      expect.objectContaining({
        title: '100% off',
        value: {type: 'percentage', value: 100},
        allocations: [{lineIndex: 0}, {lineIndex: 1}, {lineIndex: 2}],
        target: 'line',
      }),
    ]);
  });

  it('returns configured discount title if present', () => {
    const configuration = {title: 'Super sale'};
    const result = main({...payload, configuration});

    expect(result.discounts).toStrictEqual([
      expect.objectContaining({
        title: 'Super sale',
        value: {type: 'percentage', value: 100},
        allocations: [{lineIndex: 0}, {lineIndex: 1}, {lineIndex: 2}],
        target: 'line',
      }),
    ]);
  });

  it('returns configured percentage value if present', () => {
    const configuration = {value: 20};
    const result = main({...payload, configuration});

    expect(result.discounts).toStrictEqual([
      expect.objectContaining({
        title: '20% off',
        value: {type: 'percentage', value: 20},
        allocations: [{lineIndex: 0}, {lineIndex: 1}, {lineIndex: 2}],
        target: 'line',
      }),
    ]);
  });
});
