import {PaymentMethodsAPI, Configuration, PaymentMethod} from '@shopify/scripts-checkout-apis-ts';

type Payload = PaymentMethodsAPI.Payload;
type Output = PaymentMethodsAPI.Output;
type Configuration = Configuration.Configuration;

enum SortingDirection {
  ASC = 'ascending',
  DESC = 'descending',
}

export const main = ({input, configuration}: Payload): Output => ({
  sortResponse: {
    proposedOrder: sort(input.paymentMethods, configuration),
  },
  filterResponse: {hiddenMethods: []},
  renameResponse: {renameProposals: []},
});

const sort = (methods: Array<PaymentMethod>, conf: Configuration): Array<PaymentMethod> => {
  const direction = configuredSortDirection(conf);
  return methods.sort((lhs, rhs) => {
    if (direction === SortingDirection.ASC) {
      return lhs.name.localeCompare(rhs.name);
    }

    return rhs.name.localeCompare(lhs.name);
  });
};

const configuredSortDirection = (conf: Configuration): SortingDirection => {
  const direction = Configuration.get(conf, 'sortDirection')?.toLowerCase();

  if (!direction) {
    return SortingDirection.ASC;
  }

  if (direction === SortingDirection.ASC || direction === SortingDirection.DESC) {
    return direction;
  }

  throw new Error(
    `sortDirection must be either ${SortingDirection.ASC} or ${SortingDirection.DESC}. ${direction} not supported`,
  );
};
