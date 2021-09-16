import { Money, Configuration, Currency } from '@shopify/scripts-checkout-apis-ts';
export const main = (payload) => {
    const { shippingMethods, purchaseProposal } = payload.input;
    const configuration = payload.configuration;
    const name = Configuration.get(configuration, 'shippingMethodName') || 'Unknown';
    const configuredThreshold = threshold(configuration);
    const totalPrice = proposalTotalPrice(purchaseProposal);
    return {
        sortResponse: null,
        filterResponse: {
            hiddenMethods: shippingMethods.filter((method) => method.title === name && totalPrice.gt(configuredThreshold)),
        },
        renameResponse: null,
    };
};
const proposalTotalPrice = (proposal) => proposal.merchandiseLines.reduce((total, { price }) => {
    total = total.add(Money.fromSubunits(price.subunits, Currency.fromCode(price.currency)));
    return total;
}, Money.fromAmount(0, Currency.fromCode('CAD')));
const threshold = (conf) => {
    const configuredThreshold = parseFloat(Configuration.get(conf, 'threshold'));
    const threshold = isNaN(configuredThreshold) ? 100 : configuredThreshold;
    return Money.fromAmount(threshold, Currency.fromCode('CAD')).multiply(2.0).divide(2.0);
};
