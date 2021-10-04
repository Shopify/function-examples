/*
 * This script renames the first payment method to `Renamed payment method`,
 * if there are one or more payment methods.
 *
 */

import {PaymentMethodsAPI, PaymentMethod} from '@shopify/scripts-checkout-apis-temp';

type Payload = PaymentMethodsAPI.Payload;
type Output = PaymentMethodsAPI.Output;

export const main = ({input}: Payload): Output => ({
  // The checkout will be unaffected if you return empty responses
  sortResponse: {proposedOrder: []},
  filterResponse: {hiddenMethods: []},
  renameResponse: rename(input.paymentMethods),
});

const rename = ([paymentMethod]: Array<PaymentMethod>): PaymentMethodsAPI.RenameResponse | null => {
  if (paymentMethod) {
    return {
      renameProposals: [
        {
          paymentMethod: paymentMethod,
          name: 'Renamed payment method',
          renamed: true,
        },
      ],
    };
  }

  return null;
};
