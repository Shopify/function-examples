/*
 * This script renames any payment method with a name equal to
 * the `nameToMatch` field from the configuration to the name specified
 * in the `renameTo` field from the configuration.
 *
 * > Note:
 * > Although most payment methods have unique names, there's no guarantee
 * > that the rename will be performed on the first matching method only
 *
 */
import {PaymentMethodsAPI, PaymentMethod} from '@shopify/scripts-checkout-apis';

interface Configuration {
  nameToMatch: string;
  renameTo: string;
}

type Payload = PaymentMethodsAPI.Payload<Configuration>;
type Output = PaymentMethodsAPI.Output;

export const main = ({input, configuration}: Payload): Output => ({
  // The checkout will be unaffected if you return empty responses
  sortResponse: {proposedOrder: []},
  filterResponse: {hiddenMethods: []},
  renameResponse: {
    renameProposals: rename(input.paymentMethods, configuration),
  },
});

const rename = (methods: Array<PaymentMethod>, conf: Configuration): Array<PaymentMethodsAPI.RenameProposal> => {
  const {renameTo, nameToMatch} = conf;

  return methods
    .filter(({name}) => name === nameToMatch)
    .map((method) => ({
      paymentMethod: method,
      name: renameTo,
      renamed: true,
    }));
};
