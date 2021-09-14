import {PaymentMethodsAPI, PaymentMethod} from '@shopify/scripts-checkout-apis-ts';

type Payload = PaymentMethodsAPI.Payload;
type Output = PaymentMethodsAPI.Output;

export const main = ({input}: Payload): Output => ({
  sortResponse: null,
  filterResponse: null,
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
