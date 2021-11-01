import {main} from './';
import * as input from './input.json';

describe('rename first shipping method', () => {
  it('renames the first shipping method', () => {
    const {renameResponse} = main(input as any);

    expect(renameResponse).toEqual({
      renameProposals: [
        {
          shippingMethod: {
            id: 123456789,
            title: 'Same day',
            code: 'ACCELERATED',
            amount: {subunits: 1000, currency: 'CAD'},
            phoneRequired: true,
          },
          name: 'Renamed shipping method',
          renamed: true,
        },
      ],
    });
  });
});
