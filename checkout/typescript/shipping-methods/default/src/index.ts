/*
 * This script does nothing: it leaves the shipping methods unchanged.
 * This is the script that gets created when you run `shopify script create`
 * for the shipping methods API.
 */

import {ShippingMethodsAPI} from '@shopify/scripts-checkout-apis';

type Payload = ShippingMethodsAPI.Payload;
type Output = ShippingMethodsAPI.Output;

export const main = (payload: Payload): Output => {
  // Use console.log to print output from your script
  console.log('Hello, world!');
  return {
    sortResponse: {
      proposedOrder: payload.input.shippingMethods,
    },
    filterResponse: {
      hiddenMethods: [],
    },
    renameResponse: {
      renameProposals: [],
    },
  };
};
