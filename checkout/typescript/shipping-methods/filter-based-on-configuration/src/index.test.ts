import {main} from './';
import * as input from './input.json';

describe('filter based on configuration', () => {
  it('should not filter any shipping methods if the names do not match', () => {
    const {configuration} = input;

    const {renameResponse, filterResponse, sortResponse} = main({
      ...(input as any),
      configuration: {
        entries: configuration.entries.map((e: any) => ({key: e.key, value: `${e.value}_1`})),
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
