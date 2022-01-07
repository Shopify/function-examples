import {main} from './';
import camelcaseKeys from 'camelcase-keys';
import * as rawInput from './input.json';

const input = camelcaseKeys(rawInput, {deep: true});

describe('filter based on configuration', () => {
  it('should not filter any payment methods if the names do not match', () => {
    const {configuration} = input;

    const {renameResponse, filterResponse, sortResponse} = main({
      ...(input as any),
      configuration: {
        ...configuration,
        paymentMethodName: `${configuration.paymentMethodName}_1`,
      },
    });

    expect(renameResponse).toEqual({renameProposals: []});
    expect(filterResponse).toEqual({hiddenMethods: []});
    expect(sortResponse).toEqual({proposedOrder: []});
  });

  it('should not filter if the total price is less than the threshold', () => {
    const {configuration} = input;
    const {filterResponse, renameResponse, sortResponse} = main({
      ...(input as any),
      configuration: {
        ...configuration,
        threshold: '10000000000.0',
      },
    });

    expect(renameResponse).toEqual({renameProposals: []});
    expect(filterResponse).toEqual({hiddenMethods: []});
    expect(sortResponse).toEqual({proposedOrder: []});
  });

  it('should filter if the payment method name matches and the price is above the threshold', () => {
    const {renameResponse, sortResponse, filterResponse} = main(input as any);
    expect(renameResponse).toEqual({renameProposals: []});
    expect(sortResponse).toEqual({proposedOrder: []});
    expect(filterResponse).toEqual({
      hiddenMethods: [{id: 123456789, name: 'Shopify payments', cards: ['Visa', 'Mastercard', 'Discover']}],
    });
  });
});
