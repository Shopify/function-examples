import {main} from './';
import * as input from './input.json';

describe('sorting shipping methods', () => {
  it('should sort shipping methods in descending order if specified in the configuration.', () => {
    const {sortResponse} = main(input as any);
    const actual = sortResponse?.proposedOrder.map(({title}) => title);
    expect(['Z', 'A']).toEqual(actual);
  });

  it('should sort shipping methos in ascending order by default', () => {
    const {sortResponse} = main({
      ...(input as any),
      configuration: {entries: []},
    });
    const actual = sortResponse?.proposedOrder.map(({title}) => title);
    expect(['A', 'Z']).toEqual(actual);
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
