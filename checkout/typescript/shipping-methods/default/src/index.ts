import {ShippingMethodsAPI} from '@shopify/scripts-checkout-apis-temp';

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
