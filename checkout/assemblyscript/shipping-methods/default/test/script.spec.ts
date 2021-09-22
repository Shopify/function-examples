import {
  CheckoutDomain as Domain,
  ShippingMethods,
  Currencies,
  Configuration,
  Money,
} from '@shopify/scripts-checkout-apis';
import {shippingMethodsHandler} from '../src/script';

/**
 * This function uses builder classes from Domain.TestHelper
 * to make it easier to create fake input objects such as
 * a Checkout. Edit this function or create copies to define
 * your own custom checkout objects to test against.
 */
function createPurchaseProposal(): Domain.PurchaseProposal {
  return new Domain.TestHelper.PurchaseProposalBuilder()
    .setLines([
      Domain.TestHelper.PurchaseProposalBuilder.line(
        new Domain.TestHelper.VariantBuilder()
          .withProduct(new Domain.TestHelper.ProductBuilder().titled('Red Delicious').addTag('fruits').buildWithId(1))
          .buildWithId(1),
        1,
        Money.fromAmount(1, Currencies.CAD),
      ),
      Domain.TestHelper.PurchaseProposalBuilder.line(
        new Domain.TestHelper.VariantBuilder()
          .withProduct(new Domain.TestHelper.ProductBuilder().titled('Florida').addTag('fruits').buildWithId(2))
          .buildWithId(2),
        1,
        Money.fromAmount(1, Currencies.CAD),
      ),
    ])
    .build();
}

describe('run', () => {
  it('does nothing', () => {
    const purchaseProposal: Domain.PurchaseProposal = createPurchaseProposal();
    let cheapShippingMethod = new Domain.TestHelper.ShippingMethodBuilder()
      .withTitle('Cheap Option')
      .withAmount(Money.fromAmount(1, Currencies.CAD))
      .buildWithId(1);
    let expensiveShippingMethod = new Domain.TestHelper.ShippingMethodBuilder()
      .withTitle('Expensive Option')
      .withAmount(Money.fromAmount(2, Currencies.CAD))
      .buildWithId(2);
    const shippingMethods = [cheapShippingMethod, expensiveShippingMethod];

    const result: ShippingMethods.Result = shippingMethodsHandler(
      new ShippingMethods.Input(purchaseProposal, shippingMethods),
      Configuration.fromMap(new Map<string, string>()),
    );

    const sortResponse = result.sortResponse!;

    expect(sortResponse.proposedOrder[0].title).toBe('Cheap Option');
    expect(sortResponse.proposedOrder[1].title).toBe('Expensive Option');
    expect(sortResponse.proposedOrder.length).toBe(2);
    expect(result.renameResponse!.renameProposals.length).toBe(0);
    expect(result.filterResponse!.hiddenMethods.length).toBe(0);
  });
});
