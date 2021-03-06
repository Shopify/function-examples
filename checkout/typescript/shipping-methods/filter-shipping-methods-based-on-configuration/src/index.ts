/*
 * This script filters shipping methods when both of the following conditions are met:
 *
 *  - The shipping method name matches the `shippingMethodName` field from the configuration
 *  - The total price of the checkout (purchase proposal) is greater than the threshold field
 *    from the configuration in CAD, or $100.00 CAD if the field wasn't set in the configuration.
 *
 */

import {Money, PurchaseProposal, ShippingMethodsAPI, Currency} from '@shopify/scripts-checkout-apis';

interface Configuration {
  shippingMethodName: string;
  threshold: string;
}
type Payload = ShippingMethodsAPI.Payload<Configuration>;
type Output = ShippingMethodsAPI.Output;

export const main = (payload: Payload): Output => {
  const {shippingMethods, purchaseProposal} = payload.input;
  const configuration = payload.configuration;

  const name = configuration.shippingMethodName;
  const configuredThreshold = threshold(configuration);
  const totalPrice = proposalTotalPrice(purchaseProposal);

  // The checkout will remain unaffected if you return empty responses
  return {
    sortResponse: {
      proposedOrder: [],
    },
    filterResponse: {
      hiddenMethods: shippingMethods.filter((method) => method.title === name && totalPrice.gt(configuredThreshold)),
    },
    renameResponse: {
      renameProposals: [],
    },
  };
};

const proposalTotalPrice = (proposal: PurchaseProposal): Money =>
  proposal.merchandiseLines.reduce((total, {price}): Money => {
    total = total.add(Money.fromSubunits(price.subunits, Currency.fromCode(price.currency)));
    return total;
  }, Money.fromAmount(0, Currency.fromCode('CAD')));

const threshold = (conf: Configuration): Money => {
  const configuredThreshold = parseFloat(conf.threshold);
  const threshold = isNaN(configuredThreshold) ? 100.0 : configuredThreshold;

  return Money.fromAmount(threshold, Currency.fromCode('CAD')).multiply(2.0).divide(2.0);
};
