import {main} from './';
import camelcaseKeys from 'camelcase-keys';
import * as rawInput from './input.json';

const input = camelcaseKeys(rawInput, {deep: true});

describe('rename first payment method', () => {
  it('renames the first payment method', () => {
    const {renameResponse} = main(input as any);

    expect(renameResponse).toEqual({
      renameProposals: [
        {
          paymentMethod: {id: 123456789, name: 'Shopify payments', cards: ['Visa', 'Mastercard', 'Discover']},
          name: 'Renamed payment method',
          renamed: true,
        },
      ],
    });
  });
});
