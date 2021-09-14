import {main} from './';
import * as input from './input.json';

describe('sorting payment methods', () => {
  it('should sort payment methods in descending order if specified in the configuration.', () => {
    const {sortResponse} = main(input as any);
    const actual = sortResponse?.proposedOrder.map(({name}) => name);
    expect(['Z', 'B', 'A']).toEqual(actual);
  });

  it('should sort payment methos in ascending order by default', () => {
    const {sortResponse} = main({
      ...(input as any),
      configuration: {entries: []},
    });
    const actual = sortResponse?.proposedOrder.map(({name}) => name);
    expect(['A', 'B', 'Z']).toEqual(actual);
  });

  it('should throw if an invalid sortDirection is given', () => {
    expect(() => {
      main({
        ...(input as any),
        configuration: {
          entries: [{key: 'sortDirection', value: 'SOUTH_EAST'}],
        },
      });
    }).toThrow();
  });
});
