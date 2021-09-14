import {main} from './';
import * as input from './input.json';

describe('renaming shipping methods', () => {
  it('should append the shipping methods suffix when the province is included and match type is include', () => {
    const {renameResponse} = main({
      ...(input as any),
      configuration: {
        entries: input.configuration.entries.map(({key, value}) => {
          if (key === 'provinceCodeMatchType[0]') {
            return {key, value: 'Include'};
          }

          if (key === 'provinceCodes[0]') {
            return {key, value: 'QC,ON'};
          }
          return {key, value};
        }),
      },
    });
    expect(renameResponse?.renameProposals).toHaveLength(2);
    expect(renameResponse?.renameProposals.map(({name}) => name)).toEqual([
      'Fast - A custom message',
      'Slow - A custom message',
    ]);
  });

  it('should not append the shipping methods suffix when the province is not included and match type is include', () => {
    const {renameResponse} = main({
      ...(input as any),
      configuration: {
        entries: input.configuration.entries.map(({key, value}) => {
          if (key === 'provinceCodeMatchType[0]') {
            return {key, value: 'Include'};
          }

          if (key === 'provinceCodes[0]') {
            return {key, value: 'QC'};
          }
          return {key, value};
        }),
      },
    });
    expect(renameResponse).toBeNull();
  });

  it('should append the shipping methods suffix when the province is not included and match type is exclude', () => {
    const {renameResponse} = main({
      ...(input as any),
      configuration: {
        entries: input.configuration.entries.map(({key, value}) => {
          if (key === 'provinceCodeMatchType[0]') {
            return {key, value: 'Exclude'};
          }

          if (key === 'provinceCodes[0]') {
            return {key, value: 'QC'};
          }
          return {key, value};
        }),
      },
    });
    expect(renameResponse?.renameProposals).toHaveLength(2);
    expect(renameResponse?.renameProposals.map(({name}) => name)).toEqual([
      'Fast - A custom message',
      'Slow - A custom message',
    ]);
  });

  it('should not append the shipping methods suffix when the province is included and match type is exclude', () => {
    const {renameResponse} = main({
      ...(input as any),
      configuration: {
        entries: input.configuration.entries.map(({key, value}) => {
          if (key === 'provinceCodeMatchType[0]') {
            return {key, value: 'Exclude'};
          }

          if (key === 'provinceCodes[0]') {
            return {key, value: 'QC,ON'};
          }
          return {key, value};
        }),
      },
    });
    expect(renameResponse).toBeNull();
  });

  it('should append the shipping methods suffix when the country matches and match type is all', () => {
    const {renameResponse} = main(input as any);
    expect(renameResponse?.renameProposals).toHaveLength(2);
    expect(renameResponse?.renameProposals.map(({name}) => name)).toEqual([
      'Fast - A custom message',
      'Slow - A custom message',
    ]);
  });

  it('should not append the shipping methods suffix when the country does not match and match type is all', () => {
    const {renameResponse} = main({
      ...(input as any),
      configuration: {
        entries: input.configuration.entries.map(({key, value}) => {
          if (key === 'countryCode[0]') {
            return {key, value: 'NZ'};
          }
          return {key, value};
        }),
      },
    });
    expect(renameResponse).toBeNull();
  });

  it('should not return any rename proposals if the suffix is empty', () => {
    const {renameResponse} = main({
      ...(input as any),
      configuration: {
        entries: input.configuration.entries.map(({key, value}) => {
          if (key === 'message[0]') {
            return {key, value: ''};
          }
          return {key, value};
        }),
      },
    });
    expect(renameResponse).toBeNull();
  });
});
