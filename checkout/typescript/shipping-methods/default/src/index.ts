import {ShippingMethodsAPI} from '@shopify/scripts-checkout-apis-ts';

type Payload = ShippingMethodsAPI.Payload;
type Output = ShippingMethodsAPI.Output;

export const main = (payload: Payload): Output => {
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
