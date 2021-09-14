import {ShippingMethodsAPI, Configuration, Address} from '@shopify/scripts-checkout-apis-ts';

type Payload = ShippingMethodsAPI.Payload;
type Output = ShippingMethodsAPI.Output;
type Configuration = Configuration.Configuration;

enum ProviceCodeMatchType {
  ALL = 'All',
  INCLUDE = 'Include',
  EXCLUDE = 'Exclude',
}

export const main = ({input, configuration}: Payload): Output => ({
  sortResponse: null,
  filterResponse: null,
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

    const countryMatch = address.countryCode === countryCode && provinceCodeMatchType === ProviceCodeMatchType.ALL;
    const inclusiveMatch =
      provinceCodeMatchType === ProviceCodeMatchType.INCLUDE &&
      provinceCodes &&
      provinceCodes.includes(address.provinceCode);
    const exclusiveMatch =
      provinceCodes &&
      provinceCodeMatchType === ProviceCodeMatchType.EXCLUDE &&
      !provinceCodes.includes(address.provinceCode);

    if (countryMatch || inclusiveMatch || exclusiveMatch) {
      renameTo = Configuration.getIndexed(conf, 'message', i);
      break;
    }
  }

  return renameTo;
};
