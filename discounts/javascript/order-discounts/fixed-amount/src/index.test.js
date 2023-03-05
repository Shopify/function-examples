import { describe, it, expect } from 'vitest';
import { DiscountApplicationStrategy } from '../generated/api';
import orderDiscount from './index';

/**
 * @typedef {import("../generated/api").FunctionResult} FunctionResult
 */

describe('order discount function', () => {
  it('returns the default fixed amount when there is no configuration', () => {
    const result = orderDiscount({
      "cart": {
        "lines": [
          {
            "quantity": 10,
            "merchandise": {
              "__typename": "ProductVariant",
              "id": "gid://shopify/ProductVariant/123456789"
            }
          }
        ]
      },
      "discountNode": {
        "metafield": null
      },
      "presentmentCurrencyRate": 1.0
    });

    const expectedResult = /** @type {FunctionResult} */ {
      discounts: [
        {
          targets: [{ orderSubtotal: { excludedVariantIds: [] } }],
          value: { fixedAmount: { amount: "50" } },
        }
      ],
      "discountApplicationStrategy": "FIRST",
    }
    expect(result).toEqual(expectedResult);
  });

  it('returns the discount specified by the configuration value', () => {
    const result = orderDiscount({
      "cart": {
          "lines": [
              {
                  "quantity": 10,
                  "merchandise": {
                      "__typename": "ProductVariant",
                      "id": "gid://shopify/ProductVariant/123456789"
                  }
              }
          ]
      },
      "discountNode": {
          "metafield": { "value": "12.34" }
      }
    });

    const expectedResult = /** @type {FunctionResult} */ {
      discounts: [
        {
          targets: [{ orderSubtotal: { excludedVariantIds: [] } }],
          value: { fixedAmount: { amount: "12.34" } },
        }
      ],
      "discountApplicationStrategy": "FIRST",
    }
    expect(result).toEqual(expectedResult);
  });

  it('returns the discount specified by the configuration value and presentment currency rate', () => {
    const result = orderDiscount({
      "cart": {
        "lines": [
          {
            "quantity": 10,
            "merchandise": {
              "__typename": "ProductVariant",
              "id": "gid://shopify/ProductVariant/123456789"
            }
          }
        ]
      },
      "discountNode": {
          "metafield": { "value": "12.34" }
      },
      "presentmentCurrencyRate": 2.0
    });

    const expectedResult = /** @type {FunctionResult} */ {
      discounts: [
        {
          targets: [{ orderSubtotal: { excludedVariantIds: [] } }],
          value: { fixedAmount: { amount: "24.68" } },
        }
      ],
      "discountApplicationStrategy": "FIRST",
    }
    expect(result).toEqual(expectedResult);
  });
});
