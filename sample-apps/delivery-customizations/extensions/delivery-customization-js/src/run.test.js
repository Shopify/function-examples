import { describe, it, expect } from 'vitest';
import { run } from './run';

/**
 * @typedef {import("../generated/api").CartDeliveryOptionsTransformRunResult} CartDeliveryOptionsTransformRunResult
 */

describe('delivery customization function', () => {
    it('returns no operations without configuration', () => {
        const result = run({
            "cart": {
                "deliveryGroups": []
            },
            "deliveryCustomization": {
                "metafield": null
            }
        });
        const expected = /** @type {CartDeliveryOptionsTransformRunResult} */ ({ operations: [] });

        expect(result).toEqual(expected);
    });

    it('renames delivery options if state/province matches', () => {
        const result = run({
            "cart": {
                "deliveryGroups": [{
                    "deliveryAddress": {
                        "provinceCode": "ON"
                    },
                    "deliveryOptions": [{
                        "handle": "test_delivery_option",
                        "title": "Test Delivery Option"
                    }, {
                        "handle": "test_delivery_option_2",
                        "title": "Test Delivery Option 2"
                    }]
                }]
            },
            "deliveryCustomization": {
                "metafield": {
                    "value": "{\"stateProvinceCode\": \"ON\", \"message\": \"Test Message\"}"
                }
            }
        });
        const expected = /** @type {CartDeliveryOptionsTransformRunResult} */ ({
            operations: [
                {
                    deliveryOptionRename: {
                        deliveryOptionHandle: "test_delivery_option",
                        title: "Test Delivery Option - Test Message"
                    }
                },
                {
                    deliveryOptionRename: {
                        deliveryOptionHandle: "test_delivery_option_2",
                        title: "Test Delivery Option 2 - Test Message"
                    }
                }
            ]
        });

        expect(result).toEqual(expected);
    });

    it('returns no operations if state/province code does not match', () => {
        const result = run({
            "cart": {
                "deliveryGroups": [{
                    "deliveryAddress": {
                        "provinceCode": "NC"
                    },
                    "deliveryOptions": [{
                        "handle": "test_delivery_option",
                        "title": "Test Delivery Option"
                    }]
                }]
            },
            "deliveryCustomization": {
                "metafield": {
                    "value": "{\"stateProvinceCode\": \"ON\", \"message\": \"Test Message\"}"
                }
            }
        });
        const expected = /** @type {CartDeliveryOptionsTransformRunResult} */ ({ operations: [] });

        expect(result).toEqual(expected);
    });
});
