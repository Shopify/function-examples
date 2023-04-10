import { describe, it, expect } from 'vitest';
import { DiscountApplicationStrategy } from '../generated/api';
import productDiscount from './index';

/**
 * @typedef {import("../generated/api").FunctionResult} FunctionResult
 */

describe('product discount function', () => {
    it('returns no discounts without configuration', () => {
        const result = productDiscount({
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
            }
        });

        expect(result.discounts.length).toBe(0);
    });

    it('returns no discounts when quantity is unmet', () => {
        const result = productDiscount({
            "cart": {
                "lines": [
                    {
                        "quantity": 1,
                        "merchandise": {
                            "__typename": "ProductVariant",
                            "id": "gid://shopify/ProductVariant/123456789"
                        }
                    }
                ]
            },
            "discountNode": {
                "metafield": {
                    "value": "{\"quantity\":2,\"percentage\":5}"
                }
            }
        });

        expect(result.discounts.length).toBe(0);
    });

    it('discounts variants when quantity is met', () => {
        const result = productDiscount({
            "cart": {
                "lines": [
                    {
                        "quantity": 2,
                        "merchandise": {
                            "__typename": "ProductVariant",
                            "id": "gid://shopify/ProductVariant/123456789"
                        }
                    },
                    {
                        "quantity": 3,
                        "merchandise": {
                            "__typename": "ProductVariant",
                            "id": "gid://shopify/ProductVariant/987654321"
                        }
                    }
                ]
            },
            "discountNode": {
                "metafield": {
                    "value": "{\"quantity\":2,\"percentage\":5}"
                }
            }
        });
        const expected = /** @type {FunctionResult} */ ({
            discountApplicationStrategy: DiscountApplicationStrategy.First,
            discounts: [{
                targets: [
                    {
                        productVariant: {
                            id: "gid://shopify/ProductVariant/123456789"
                        }
                    },
                    {
                        productVariant: {
                            id: "gid://shopify/ProductVariant/987654321"
                        }
                    }
                ],
                value: {
                    percentage: {
                        value: "5"
                    }
                }
            }]
        });

        expect(result).toEqual(expected);
    });
});
