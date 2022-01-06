import {main} from './';
import camelcaseKeys from 'camelcase-keys';
import * as rawInput from './input.json';

const input = camelcaseKeys(rawInput, {deep: true});

describe('rename based on configuration', () => {
  it('renames the matching methods', () => {
    const {renameResponse} = main(input as any);
    expect(renameResponse).toEqual({
      renameProposals: renameResponse?.renameProposals,
    });
  });
});
