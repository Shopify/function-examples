import {main} from './';
import camelcaseKeys from 'camelcase-keys';
import * as rawInput from './input.json';

const input = camelcaseKeys(rawInput, {deep: true});

describe('filter based on configuration', () => {
  it('should not filter any shipping methods if the names do not match', () => {
    const {configuration} = input;

    const {renameResponse, filterResponse, sortResponse} = main({
      ...(input as any),
      configuration: {
        ...input.configuration,
        shippingMethodName: `${input.configuration.shippingMethodName}_1`,
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
        ...input.configuration,
        threshold: '10000000000.0',
      },
    });

    expect(renameResponse).toEqual({renameProposals: []});
    expect(filterResponse).toEqual({hiddenMethods: []});
    expect(sortResponse).toEqual({proposedOrder: []});
  });

  it('should filter if the shipping method name matches and the price is above the threshold', () => {
    const {renameResponse, sortResponse, filterResponse} = main(input as any);
    expect(renameResponse).toEqual({renameProposals: []});
    expect(sortResponse).toEqual({proposedOrder: []});
    expect(filterResponse).toEqual({
      hiddenMethods: [
        {
          id: 123456789,
          title: 'Same day',
          code: 'ACCELERATED',
          amount: {subunits: 1000, currency: 'CAD'},
          phoneRequired: true,
        },
      ],
    });
  });
});
