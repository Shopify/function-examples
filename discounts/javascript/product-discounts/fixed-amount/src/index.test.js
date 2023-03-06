import { describe, it, expect } from 'vitest';
import { DiscountApplicationStrategy } from '../generated/api';
import orderDiscount from './index';

/**
 * @typedef {import("../generated/api").FunctionResult} FunctionResult
 */

describe('order discount function', () => {
  let input = {
    "cart": {
      "lines": [
        {
          "id": "gid://shopify/CartLine/0",
          "merchandise": {"__typename": "ProductVariant", "id": "gid://shopify/ProductVariant/0"}
        },
        {
          "id": "gid://shopify/CartLine/1",
          "merchandise": {"__typename": "ProductVariant", "id": "gid://shopify/ProductVariant/1"}
        }
      ]
    },
    "discountNode": {
        "metafield": null
    },
  };

  it('returns the default fixed amount when there is no configuration', () => {
    const result = orderDiscount(input);

    const expectedResult = /** @type {FunctionResult} */ {
      discounts: [
        {
          "targets": [
            { "productVariant": { "id": "gid://shopify/ProductVariant/0" } },
            { "productVariant": { "id": "gid://shopify/ProductVariant/1" } },
          ],
          "value": { "fixedAmount": { "amount": "50", "appliesToEachItem": false } },
        }
      ],
      "discountApplicationStrategy": "FIRST",
    }
    expect(result).toEqual(expectedResult);
  });

  it('returns the discount by configuration value', () => {
    input.discountNode.metafield = { "value": "12.34" };
    const result = orderDiscount(input);

    const expectedResult = /** @type {FunctionResult} */ {
      discounts: [
        {
          "targets": [
            { "productVariant": { "id": "gid://shopify/ProductVariant/0" } },
            { "productVariant": { "id": "gid://shopify/ProductVariant/1" } },
          ],
          "value": { "fixedAmount": { "amount": "12.34", "appliesToEachItem": false } },
        }
      ],
      "discountApplicationStrategy": "FIRST",
    }
    expect(result).toEqual(expectedResult);
  });

  it('returns the discount by configuration value and presentment currency rate', () => {
    input.discountNode.metafield = { "value": "12.34" };
    input.presentmentCurrencyRate = 2.0;
    const result = orderDiscount(input);

    const expectedResult = /** @type {FunctionResult} */ {
      discounts: [
        {
          "targets": [
            { "productVariant": { "id": "gid://shopify/ProductVariant/0" } },
            { "productVariant": { "id": "gid://shopify/ProductVariant/1" } },
          ],
          "value": { "fixedAmount": { "amount": "24.68", "appliesToEachItem": false } },
        }
      ],
      "discountApplicationStrategy": "FIRST",
    }
    expect(result).toEqual(expectedResult);
  });

  it('returns no discount if there are no cart lines', () => {
    input.cart.lines = [];
    const result = orderDiscount(input);

    const expectedResult = /** @type {FunctionResult} */ {
      discounts: [],
      "discountApplicationStrategy": "FIRST",
    }
    expect(result).toEqual(expectedResult);
  });
});
