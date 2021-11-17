/*
 * This script does nothing: it leaves the payment methods unchanged.
 * This is the script that gets created when you run `shopify script create`
 * for the payment methods API.
 */

import {PaymentMethodsAPI} from '@shopify/scripts-checkout-apis';

type Payload = PaymentMethodsAPI.Payload;
type Output = PaymentMethodsAPI.Output;

export const main = (payload: Payload): Output => {
  // Use console.log to print output from your script
  console.log('Hello, world!');
  return {
    sortResponse: {
      proposedOrder: payload.input.paymentMethods,
    },
    filterResponse: {
      hiddenMethods: [],
    },
    renameResponse: {
      renameProposals: [],
    },
  };
};
