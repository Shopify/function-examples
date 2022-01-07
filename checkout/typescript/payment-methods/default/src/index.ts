/*
 * This script is created by default when you run the `shopify script create`
 * command in Shopify CLI, and use the payment methods API. The script does
 * nothing and leaves payment methods unchanged.
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
