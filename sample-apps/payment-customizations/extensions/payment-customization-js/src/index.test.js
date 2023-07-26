import { describe, it, expect } from "vitest";
import paymentCustomization from "./index";

/**
 * @typedef {import("../generated/api").FunctionResult} FunctionResult
 */

describe("payment customization function", () => {
  it("returns no operations without configuration", () => {
    const result = paymentCustomization({
      cart: {
        cost: {
          totalAmount: {
            amount: "0",
          },
        },
      },
      paymentMethods: [],
      paymentCustomization: {
        metafield: null,
      },
    });
    const expected = /** @type {FunctionResult} */ ({ operations: [] });

    expect(result).toEqual(expected);
  });

  it("returns no operations if total is less than configured", () => {
    const result = paymentCustomization({
      cart: {
        cost: {
          totalAmount: {
            amount: "1",
          },
        },
      },
      paymentMethods: [
        {
          id: "1",
          name: "Test",
        },
      ],
      paymentCustomization: {
        metafield: {
          value: '{"paymentMethodName": "Test", "cartTotal": 10}',
        },
      },
    });
    const expected = /** @type {FunctionResult} */ ({ operations: [] });

    expect(result).toEqual(expected);
  });

  it("returns no operations if no payment method matches the configured name", () => {
    const result = paymentCustomization({
      cart: {
        cost: {
          totalAmount: {
            amount: "11",
          },
        },
      },
      paymentMethods: [
        {
          id: "1",
          name: "Another payment method",
        },
      ],
      paymentCustomization: {
        metafield: {
          value: '{"paymentMethodName": "Test", "cartTotal": 10}',
        },
      },
    });
    const expected = /** @type {FunctionResult} */ ({ operations: [] });

    expect(result).toEqual(expected);
  });

  it("hides a matching payment method", () => {
    const result = paymentCustomization({
      cart: {
        cost: {
          totalAmount: {
            amount: "11",
          },
        },
      },
      paymentMethods: [
        {
          id: "1",
          name: "Test",
        },
      ],
      paymentCustomization: {
        metafield: {
          value: '{"paymentMethodName": "Test", "cartTotal": 10}',
        },
      },
    });
    const expected = /** @type {FunctionResult} */ ({
      operations: [
        {
          hide: {
            paymentMethodId: "1",
          },
        },
      ],
    });

    expect(result).toEqual(expected);
  });
});
