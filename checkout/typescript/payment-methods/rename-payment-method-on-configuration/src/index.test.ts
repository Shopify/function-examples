import {main} from './';
import * as input from './input.json';

describe('rename based on configuration', () => {
  it('renames the matching methods', () => {
    const {renameResponse} = main(input as any);
    expect(renameResponse).toEqual({
      renameProposals: renameResponse?.renameProposals,
    });
  });

  it('throws if renameTo is not set', () => {
    expect(() => {
      main({
        ...(input as any),
        configuration: input.configuration.entries.map((e: any) => {
          if (e.key == 'renameTo') {
            return {...e, value: null};
          }
          return e;
        }),
      });
    }).toThrow();
  });
});
