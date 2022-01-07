/*
 * This script is created by default when you run the `shopify script create`
 * command in Shopify CLI, and use the shipping methods API. The script does
 * nothing and leaves shipping methods unchanged.
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
