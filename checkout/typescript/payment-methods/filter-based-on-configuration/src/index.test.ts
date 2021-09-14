import {main} from './';
import * as input from './input.json';

describe('filter based on configuration', () => {
  it('should not filter any payment methods if the names do not match', () => {
    const {configuration} = input;

    const {renameResponse, filterResponse, sortResponse} = main({
      ...(input as any),
      configuration: {
        entries: configuration.entries.map((e: any) => ({key: e.key, value: `${e.value}_1`})),
      },
    });

    expect(renameResponse).toBe(null);
    expect(filterResponse).toEqual({hiddenMethods: []});
    expect(sortResponse).toBe(null);
  });

  it('should not filter if the total price is less than the threshold', () => {
    const {configuration} = input;
    const {filterResponse, renameResponse, sortResponse} = main({
      ...(input as any),
      configuration: {
        entries: configuration.entries.map((e: any) => {
          if (e.key === 'threshold') {
            return {
              key: e.key,
              value: '10000000000',
            };
          }
          return e;
        }),
      },
    });

    expect(filterResponse).toEqual({hiddenMethods: []});
    expect(renameResponse).toBe(null);
    expect(sortResponse).toBe(null);
  });

  it('should filter if the payment method name matches and the price is above the threshold', () => {
    const {renameResponse, sortResponse, filterResponse} = main(input as any);
    expect(renameResponse).toBe(null);
    expect(sortResponse).toBe(null);
    expect(filterResponse).toEqual({
      hiddenMethods: [{id: 123456789, name: 'Shopify payments', cards: ['Visa', 'Mastercard', 'Discover']}],
    });
  });
});
