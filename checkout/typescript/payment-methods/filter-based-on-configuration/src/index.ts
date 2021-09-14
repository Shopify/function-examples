import {Money, PurchaseProposal, PaymentMethodsAPI, Configuration, Currency} from '@shopify/scripts-checkout-apis-ts';

type Payload = PaymentMethodsAPI.Payload;
type Output = PaymentMethodsAPI.Output;

export const main = (payload: Payload): Output => {
  const {paymentMethods, purchaseProposal} = payload.input;
  const configuration = payload.configuration;

  const name = Configuration.get(configuration, 'paymentMethodName') || 'Unknown';
  const configuredThreshold = threshold(configuration);
  const totalPrice = proposalTotalPrice(purchaseProposal);

  return {
    sortResponse: null,
    filterResponse: {
      hiddenMethods: paymentMethods.filter((method) => method.name === name && totalPrice.gt(configuredThreshold)),
    },
    renameResponse: null,
  };
};

const proposalTotalPrice = (proposal: PurchaseProposal): Money =>
  proposal.merchandiseLines.reduce((total, {price}): Money => {
    total = total.add(Money.fromSubunits(price.subunits, Currency.fromCode(price.currency)));
    return total;
  }, Money.fromAmount(0, Currency.fromCode('CAD')));

const threshold = (conf: Configuration.Configuration): Money => {
  const configuredThreshold = parseFloat(Configuration.get(conf, 'threshold')!);
  const threshold = isNaN(configuredThreshold) ? 100 : configuredThreshold;

  return Money.fromAmount(threshold, Currency.fromCode('CAD')).multiply(2.0).divide(2.0);
};
