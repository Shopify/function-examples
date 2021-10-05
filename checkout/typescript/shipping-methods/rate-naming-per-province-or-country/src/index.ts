/* This is a complex and advanced script. It uses a configuration list,
 * which allows merchants to customize the script. Each item in the configuration
 * list contains the following fields:
 *
 * - `provinceCodes`: A comma-separated list of two-digit province codes.
 * - `provinceCodeMatchType`: Valid values: `All`, `Include`, or `Exclude`.
 * - `countryCode`: A two-digit country code.
 * - `message`: A string.
 *
 * The script iterates over all configuration list items to find one where the
 * `countryCode` matches the purchase proposal's country code, and the purchase
 * proposal's province code matches the `provinceCode` based on `provinceCodeMatchType`.
 * If a match is found, then every shipping option has the message appended to the end
 * of its name with a dash (`-`) as a separator.
 */

import {ShippingMethodsAPI, Configuration, Address} from '@shopify/scripts-checkout-apis-temp';

type Payload = ShippingMethodsAPI.Payload;
type Output = ShippingMethodsAPI.Output;
type Configuration = Configuration.Configuration;

enum ProvinceCodeMatchType {
  ALL = 'All',
  INCLUDE = 'Include',
  EXCLUDE = 'Exclude',
}

export const main = ({input, configuration}: Payload): Output => ({
  sortResponse: {proposedOrder: []},
  filterResponse: {hiddenMethods: []},
  renameResponse: rename(input, configuration),
});

const rename = (
  {purchaseProposal, shippingMethods}: ShippingMethodsAPI.Input,
  conf: Configuration,
): ShippingMethodsAPI.RenameResponse | null => {
  const suffix = findSuffix(conf, purchaseProposal.deliveryLines[0].destination);
  if (!suffix) {
    return null;
  }

  return {
    renameProposals: shippingMethods.map((shippingMethod) => ({
      shippingMethod,
      name: `${shippingMethod.title} - ${suffix}`,
      renamed: true,
    })),
  };
};

const findSuffix = (conf: Configuration, address: Address): string | null => {
  const length = Configuration.getLength(conf);
  let renameTo: string | null = null;

  for (let i = 0; i < length; i++) {
    const provinceCodes = Configuration.getIndexed(conf, 'provinceCodes', i)
      ?.split(',')
      .map((s) => s.trim());
    const provinceCodeMatchType = Configuration.getIndexed(conf, 'provinceCodeMatchType', i);
    const countryCode = Configuration.getIndexed(conf, 'countryCode', i);

    const countryMatch = address.countryCode === countryCode && provinceCodeMatchType === ProvinceCodeMatchType.ALL;
    const inclusiveMatch =
      provinceCodeMatchType === ProvinceCodeMatchType.INCLUDE &&
      provinceCodes &&
      provinceCodes.includes(address.provinceCode);
    const exclusiveMatch =
      provinceCodes &&
      provinceCodeMatchType === ProvinceCodeMatchType.EXCLUDE &&
      !provinceCodes.includes(address.provinceCode);

    if (countryMatch || inclusiveMatch || exclusiveMatch) {
      renameTo = Configuration.getIndexed(conf, 'message', i);
      break;
    }
  }

  return renameTo;
};
