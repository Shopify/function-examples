import {main} from './';
import camelcaseKeys from 'camelcase-keys';
import * as rawInput from './input.json';

const input = camelcaseKeys(rawInput, {deep: true});

describe('sorting shipping methods', () => {
  it('should sort shipping methods in descending order if specified in the configuration.', () => {
    const {sortResponse} = main(input as any);
    const actual = sortResponse?.proposedOrder.map(({title}) => title);
    expect(['Z', 'A']).toEqual(actual);
  });

  it('should sort shipping methods in ascending order by default', () => {
    const {sortResponse} = main({
      ...(input as any),
      configuration: {
        sortDirection: '',
      },
    });
    const actual = sortResponse?.proposedOrder.map(({title}) => title);
    expect(['A', 'Z']).toEqual(actual);
  });

  it('should throw if an invalid sortDirection is given', () => {
    expect(() => {
      main({
        ...(input as any),
        configuration: {
          ...input.configuration,
          sortDirection: 'SOUTH_EAST',
        },
      });
    }).toThrow();
  });
});
