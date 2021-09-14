import {ShippingMethodsAPI, ShippingMethod} from '@shopify/scripts-checkout-apis-ts';

type Payload = ShippingMethodsAPI.Payload;
type Output = ShippingMethodsAPI.Output;

export const main = ({input}: Payload): Output => ({
  sortResponse: null,
  filterResponse: null,
  renameResponse: rename(input.shippingMethods),
});

const rename = ([shippingMethod]: Array<ShippingMethod>): ShippingMethodsAPI.RenameResponse | null => {
  if (shippingMethod) {
    return {
      renameProposals: [
        {
          shippingMethod,
          name: 'Renamed shipping method',
          renamed: true,
        },
      ],
    };
  }

  return null;
};
