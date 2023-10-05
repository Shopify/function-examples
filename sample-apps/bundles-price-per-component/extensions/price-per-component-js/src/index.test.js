import { describe, it, expect } from "vitest";
import cartTransform from "./index";

describe("cart transform function", () => {
  it("returns NO_CHANGES when cart is empty", () => {
    expect(
      cartTransform({
        cart: {
          lines: [],
        },
      })
    ).toStrictEqual({ operations: [] });
  });

  it("returns NO_CHANGES when cart contains no bundles", () => {
    expect(
      cartTransform({
        cart: {
          lines: [
            {
              id: "1",
              merchandise: {
                __typename: "ProductVariant",
                product: {
                  bundledComponentData: null,
                },
              },
            },
          ],
        },
      })
    ).toStrictEqual({ operations: [] });
  });

  it("returns operations when cart contains a bundle", () => {
    expect(
      cartTransform({
        cart: {
          lines: [
            {
              id: "1",
              merchandise: {
                __typename: "ProductVariant",
                product: {
                  bundledComponentData: {
                    value: JSON.stringify([
                      { id: "gid://shopify/ProductVariant/2", price: "25.00" },
                      { id: "gid://shopify/ProductVariant/3", price: "25.00" },
                    ]),
                  },
                },
              },
            },
          ],
        },
      })
    ).toStrictEqual({
      operations: [
        {
          expand: {
            cartLineId: "1",
            expandedCartItems: [
              {
                merchandiseId: "gid://shopify/ProductVariant/2",
                quantity: 1,
                price: {
                  adjustment: {
                    fixedPricePerUnit: {
                      amount: "25.00",
                    },
                  },
                },
              },
              {
                merchandiseId: "gid://shopify/ProductVariant/3",
                quantity: 1,
                price: {
                  adjustment: {
                    fixedPricePerUnit: {
                      amount: "25.00",
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

  describe("error cases", () => {
    it("throws an error when bundledComponentData length is 0", () => {
      expect(() =>
        cartTransform({
          cart: {
            lines: [
              {
                id: "1",
                merchandise: {
                  __typename: "ProductVariant",
                  product: {
                    bundledComponentData: { value: JSON.stringify([]) },
                  },
                },
              },
            ],
          },
        })
      ).toThrow("Invalid bundle composition");
    });
  });
});
