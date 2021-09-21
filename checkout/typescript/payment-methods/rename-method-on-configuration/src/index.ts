import {PaymentMethodsAPI, Configuration, PaymentMethod} from '@shopify/scripts-checkout-apis-ts';

type Payload = PaymentMethodsAPI.Payload;
type Output = PaymentMethodsAPI.Output;
type Configuration = Configuration.Configuration;

export const main = ({input, configuration}: Payload): Output => ({
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
