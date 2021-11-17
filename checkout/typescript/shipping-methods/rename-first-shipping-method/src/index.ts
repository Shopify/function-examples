/*
 * This script renames the first shipping method to `Renamed shipping method`
 * if there are one or more shipping methods.
 *
 */
import {ShippingMethodsAPI, ShippingMethod} from '@shopify/scripts-checkout-apis';

type Payload = ShippingMethodsAPI.Payload;
type Output = ShippingMethodsAPI.Output;

export const main = ({input}: Payload): Output => ({
  // Checkout will remain unaffected if you return empty responses
  sortResponse: {proposedOrder: []},
  filterResponse: {hiddenMethods: []},
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
