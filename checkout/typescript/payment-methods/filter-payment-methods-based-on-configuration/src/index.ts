/*
 * This script filters payment methods when both of the following conditions are met:
 *   - The payment method name matches the `paymentMethodName` field from the configuration.
 *   - The total price of the checkout (purchase proposal) is greater than the threshold field
 *     from the configuration in CAD.
 */

import {Money, PurchaseProposal, PaymentMethodsAPI, Currency} from '@shopify/scripts-checkout-apis';

interface Configuration {
  paymentMethodName: string;
  threshold: string;
}

type Payload = PaymentMethodsAPI.Payload<Configuration>;
type Output = PaymentMethodsAPI.Output;

export const main = (payload: Payload): Output => {
  const {paymentMethods, purchaseProposal} = payload.input;
  const configuration = payload.configuration;

  const name = configuration.paymentMethodName;
  const configuredThreshold = threshold(configuration);
  const totalPrice = proposalTotalPrice(purchaseProposal);

  return {
    sortResponse: {
      proposedOrder: [],
    },
    filterResponse: {
      hiddenMethods: paymentMethods.filter((method) => method.name === name && totalPrice.gt(configuredThreshold)),
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
  const threshold = isNaN(configuredThreshold) ? 100 : configuredThreshold;

  // You can do math with Money types.
  // It's recommended to perform any Math operations
  // that involve money using the Money API
  // to prevent precision loss
  return Money.fromAmount(threshold, Currency.fromCode('CAD')).multiply(2.0).divide(2.0);
};
