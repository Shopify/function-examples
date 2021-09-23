/* 
 * This script renames any payment method with a name equal to
 * the `nameToMatch` field from the configuration to the name specified
 * in the `renameTo` field from the configuration.
 *
 * Note:
 * Although most payment methods have unique names, there's no guarantee
 * that the rename will be perform on the first matching method only
 *
 */
import {PaymentMethodsAPI, Configuration, PaymentMethod} from '@shopify/scripts-checkout-apis-ts';

type Payload = PaymentMethodsAPI.Payload;
type Output = PaymentMethodsAPI.Output;
type Configuration = Configuration.Configuration;

export const main = ({input, configuration}: Payload): Output => ({
  // The checkout will be unaffected if you return empty responses
  sortResponse: {proposedOrder: []},
  filterResponse: {hiddenMethods: []},
  renameResponse: {
    renameProposals: rename(input.paymentMethods, configuration),
  },
});

const rename = (methods: Array<PaymentMethod>, conf: Configuration): Array<PaymentMethodsAPI.RenameProposal> => {
  const renameTo = Configuration.get(conf, 'renameTo');

  if (!renameTo) {
    throw new Error('renameTo configuration value must be set');
  }

  return methods
    .filter(({name}) => name === Configuration.get(conf, 'nameToMatch'))
    .map((method) => ({
      paymentMethod: method,
      name: renameTo,
      renamed: true,
    }));
};
