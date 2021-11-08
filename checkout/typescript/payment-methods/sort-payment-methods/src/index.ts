/*
 * This script sorts payment methods by name.
 *
 * - If no configuration is provided, then payment methods are sorted in ascending order.
 * - If the `sortDirection` field of the configuration is set to `ascending`, then payment
 * methods are sorted in ascending order.
 * - If the `sortDirection` field of the configuration is set to `descending`, then payment
 * methods are sorted in descending order.
 * - If the `sortDirection` field of the configuration is set to anything else, then the
 * script raises an error.
 *
 */

import {PaymentMethodsAPI, Configuration, PaymentMethod} from '@shopify/scripts-checkout-apis';

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
  // The checkout will rename unaffected if you return empty responses
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
  // It's a good idea to validate the values you expect from
  // the Configuration object. You can choose to provide default
  // values if one was not provided, and/or you can raise errors
  // if the value is missing or of an unexpected type.
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
