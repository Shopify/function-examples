import {PaymentMethodsAPI} from '@shopify/scripts-checkout-apis-ts';

type Payload = PaymentMethodsAPI.Payload;
type Output = PaymentMethodsAPI.Output;

export const main = (payload: Payload): Output => {
  console.log('Hello, world!');
  return {
    sortResponse: {
      proposedOrder: payload.input.paymentMethods,
    },
    filterResponse: null,
    renameResponse: null,
  };
};
