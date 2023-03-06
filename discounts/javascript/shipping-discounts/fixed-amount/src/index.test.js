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
        "deliveryGroups": [
          {"id": "gid://shopify/CartDeliveryGroup/0"},
          {"id": "gid://shopify/CartDeliveryGroup/1"}
        ]
      },
      "discountNode": {
          "metafield": null
      },
    });

    const expectedResult = /** @type {FunctionResult} */ {
      discounts: [
        {
          "targets": [
            { "deliveryGroup": { "id": "gid://shopify/CartDeliveryGroup/0" } },
            { "deliveryGroup": { "id": "gid://shopify/CartDeliveryGroup/1" } },
          ],
          "value": { "fixedAmount": { "amount": "50" } },
        }
      ],
      "discountApplicationStrategy": "FIRST",
    }
    expect(result).toEqual(expectedResult);
  });

  it('returns the fixed amount specified by the configuration value', () => {
    const result = orderDiscount({
      "cart": {
        "deliveryGroups": [
          {"id": "gid://shopify/CartDeliveryGroup/0"},
          {"id": "gid://shopify/CartDeliveryGroup/1"}
        ]
      },
      "discountNode": {
          "metafield": { "value": "12.34" }
      },
    });

    const expectedResult = /** @type {FunctionResult} */ {
      discounts: [{
        "targets": [
          { "deliveryGroup": { "id": "gid://shopify/CartDeliveryGroup/0" } },
          { "deliveryGroup": { "id": "gid://shopify/CartDeliveryGroup/1" } },
        ],
      "value": { "fixedAmount": { "amount": "12.34" } },
     }],
      "discountApplicationStrategy": "FIRST",
    }
    expect(result).toEqual(expectedResult);
  });

  it('returns the fixed amount specified by the configuration value and the presentment currency rate', () => {
    const result = orderDiscount({
      "cart": {
        "deliveryGroups": [
          {"id": "gid://shopify/CartDeliveryGroup/0"},
          {"id": "gid://shopify/CartDeliveryGroup/1"}
        ]
      },
      "discountNode": {
          "metafield": { "value": "12.34" }
      },
      "presentmentCurrencyRate": 2.0
    });

    const expectedResult = /** @type {FunctionResult} */ {
      discounts: [{
        "targets": [
          { "deliveryGroup": { "id": "gid://shopify/CartDeliveryGroup/0" } },
          { "deliveryGroup": { "id": "gid://shopify/CartDeliveryGroup/1" } },
        ],
      "value": { "fixedAmount": { "amount": "24.68" } },
     }],
      "discountApplicationStrategy": "FIRST",
    }
    expect(result).toEqual(expectedResult);
  });

  it('returns the no discount when there are no delivery groups in cart', () => {
    const result = orderDiscount({
      "cart": {
        "deliveryGroups": []
      },
      "discountNode": {
          "metafield": { "value": "12.34" }
      },
      "presentmentCurrencyRate": 2.0
    });

    const expectedResult = /** @type {FunctionResult} */ {
      discounts: [],
      "discountApplicationStrategy": "FIRST",
    }
    expect(result).toEqual(expectedResult);
  });
});
