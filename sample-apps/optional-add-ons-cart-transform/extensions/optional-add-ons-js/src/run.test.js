import { describe, it, expect } from "vitest";
import { run } from './run';

describe("cart transform function", () => {
  it("returns NO_CHANGES when cart is empty", () => {
    expect(
      run({
        presentmentCurrencyRate: 1,
        cart: {
          lines: [],
        },
        cartTransform: {
          warrantyVariantID: {
            value: "gid://shopify/ProductVariant/2",
          }
        }
      })
    ).toStrictEqual({ operations: [] });
  });

  it("returns NO_CHANGES when cart contains no add-ons", () => {
    expect(
      run({
        presentmentCurrencyRate: 1,
        cart: {
          lines: [
            {
              id: "1",
              cost: {
                amountPerQuantity: {
                  amount: "100.0",
                  currencyCode: "CAD"
                }
              },
              warrantyAdded: {
                value: "No"
              },
              merchandise: {
                __typename: "ProductVariant",
                product: {
                  warrantyCostPercentage: {
                    type: "number_integer",
                    value: 10,
                  },
                },
              },
            },
          ],
        },
        cartTransform: {
          warrantyVariantID: {
            value: "gid://shopify/ProductVariant/2",
          }
        }
      })
    ).toStrictEqual({ operations: [] });
  });

  it("returns NO_CHANGES when cart contains no add-on cost", () => {
    expect(
      run({
        presentmentCurrencyRate: 1,
        cart: {
          lines: [
            {
              id: "1",
              cost: {
                amountPerQuantity: {
                  amount: "100.0",
                  currencyCode: "CAD"
                }
              },
              warrantyAdded: {
                value: "Yes"
              },
              merchandise: {
                __typename: "ProductVariant",
                product: {
                  warrantyCostPercentage: null,
                },
              },
            },
          ],
        },
        cartTransform: {
          warrantyVariantID: {
            value: "gid://shopify/ProductVariant/2",
          }
        }
      })
    ).toStrictEqual({ operations: [] });
  });

  it("returns operations when cart contains an add-on", () => {
    expect(
      run({
        presentmentCurrencyRate: 1,
        cart: {
          lines: [
            {
              id: "1",
              cost: {
                amountPerQuantity: {
                  amount: "100.0",
                  currencyCode: "CAD"
                }
              },
              warrantyAdded: {
                value: "Yes"
              },
              merchandise: {
                __typename: "ProductVariant",
                title: "Fancy Watch",
                product: {
                  warrantyCostPercentage: {
                    type: "number_integer",
                    value: 10,
                  },
                },
              },
            },
          ],
        },
        cartTransform: {
          warrantyVariantID: {
            value: "gid://shopify/ProductVariant/2",
          }
        }
      })
    ).toStrictEqual({
      operations: [
        {
          expand: {
            cartLineId: "1",
            title: "Fancy Watch with warranty",
            expandedCartItems: [
              {
                merchandiseId: "gid://shopify/ProductVariant/2",
                quantity: 1,
                price: {
                  adjustment: {
                    fixedPricePerUnit: {
                      amount: "10.00",
                    },
                  },
                },
              },
            ],
          },
        },
      ],
    });
  });
});
