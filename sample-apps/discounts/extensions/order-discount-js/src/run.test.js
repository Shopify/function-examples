import { describe, it, expect } from "vitest";
import { DiscountApplicationStrategy } from "../generated/api";
import { run as productDiscount } from "./run";

/**
 * @typedef {import("../generated/api").FunctionResult} FunctionResult
 */

describe("product discount function", () => {
  it("returns no discounts without configuration", () => {
    const result = productDiscount({
      cart: {
        lines: [
          {
            quantity: 10,
            merchandise: {
              __typename: "ProductVariant",
              id: "gid://shopify/ProductVariant/123456789",
            },
          },
        ],
      },
      discountNode: {
        metafield: null,
      },
    });

    expect(result.discounts.length).toBe(0);
  });

  it("returns discounts with conditions for minimumAmount set", () => {
    const result = productDiscount({
      cart: {
        lines: [
          {
            quantity: 1,
            merchandise: {
              __typename: "ProductVariant",
              id: "gid://shopify/ProductVariant/123456789",
            },
          },
        ],
      },
      discountNode: {
        metafield: {
          value: '{"minimumAmount":2000,"percentage":5}',
        },
      },
    });

    expect(result.discounts.length).toBe(1);
  });

  it("sends discounts in function result with minimumAmount condition", () => {
    const result = productDiscount({
      cart: {
        lines: [
          {
            quantity: 2,
            merchandise: {
              __typename: "ProductVariant",
              id: "gid://shopify/ProductVariant/123456789",
            },
          },
          {
            quantity: 3,
            merchandise: {
              __typename: "ProductVariant",
              id: "gid://shopify/ProductVariant/987654321",
            },
          },
        ],
      },
      discountNode: {
        metafield: {
          value: '{"minimumAmount":4,"percentage":5}',
        },
      },
    });
    const expected = /** @type {FunctionResult} */ ({
      discountApplicationStrategy: DiscountApplicationStrategy.First,
      discounts: [
        {
          conditions: [
            {
              orderMinimumSubtotal: {
                excludedVariantIds: [],
                minimumAmount: 4,
                targetType: "ORDER_SUBTOTAL",
              },
            },
          ],
          targets: [
            {
              productVariant: {
                id: "gid://shopify/ProductVariant/123456789",
              },
            },
            {
              productVariant: {
                id: "gid://shopify/ProductVariant/987654321",
              },
            },
          ],
          value: {
            percentage: {
              value: "5",
            },
          },
        },
      ],
    });

    expect(result).toEqual(expected);
  });
});
