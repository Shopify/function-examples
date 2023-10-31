import { describe, it, expect } from "vitest";
import { run } from './run';

describe("cart transform function", () => {
  it("returns NO_CHANGES when cart is empty", () => {
    expect(
      run({
        cart: {
          lines: [],
        },
      })
    ).toStrictEqual({ operations: [] });
  });

  it("returns NO_CHANGES when cart contains no lines with a fabric length", () => {
    expect(
      run({
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
              fabricLength: null,
              merchandise: {
                __typename: "ProductVariant",
                id: "gid://shopify/ProductVariant/1",
                title: "Some product",
              },
            },
          ],
        },
      })
    ).toStrictEqual({ operations: [] });
  });

  it("returns operations when cart contains lines with a fabric length", () => {
    expect(
      run({
        cart: {
          lines: [
            {
              id: "1",
              cost: {
                amountPerQuantity: {
                  amount: "10.0",
                  currencyCode: "CAD"
                }
              },
              fabricLength: {
                value: "5"
              },
              merchandise: {
                __typename: "ProductVariant",
                id: "gid://shopify/ProductVariant/2",
                title: "Custom Fabric"
              },
            },
          ],
        },
      })
    ).toStrictEqual({
      operations: [
        {
          update: {
            cartLineId: "1",
            title: "Custom Fabric (5m)",
            price: {
              adjustment: {
                fixedPricePerUnit: {
                  amount: "50.00"
                }
              }
            }
          },
        },
      ],
    });
  });
});
