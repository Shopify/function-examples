/* This script sorts shipping methods by name.
 *  - If no configuration is provided, then shipping methods are sorted in ascending order.
 *  - If the `sortDirection` field of the configuration is set to `ascending`,
 *    then shipping methods are sorted in ascending order.
 *  - If the `sortDirection` field of the configuration is set to `descending`,
 *    then shipping methods are sorted in descending order.
 *  - If the `sortDirection` field of the configuration is set to anything else,
 *    then the script raises an error.
 */

import {ShippingMethodsAPI, Configuration, ShippingMethod} from '@shopify/scripts-checkout-apis-temp';

type Payload = ShippingMethodsAPI.Payload;
type Output = ShippingMethodsAPI.Output;
type Configuration = Configuration.Configuration;

enum SortingDirection {
  ASC = 'ascending',
  DESC = 'descending',
}

export const main = ({input, configuration}: Payload): Output => ({
  sortResponse: {
    proposedOrder: sort(input.shippingMethods, configuration),
  },
  filterResponse: {hiddenMethods: []},
  renameResponse: {renameProposals: []},
});

const sort = (methods: Array<ShippingMethod>, conf: Configuration): Array<ShippingMethod> => {
  const direction = configuredSortDirection(conf);
  return methods.sort((lhs, rhs) => {
    if (direction === SortingDirection.ASC) {
      return lhs.title.localeCompare(rhs.title);
    }

    return rhs.title.localeCompare(lhs.title);
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
