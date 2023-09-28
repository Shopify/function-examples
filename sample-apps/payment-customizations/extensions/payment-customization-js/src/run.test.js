import { describe, it, expect } from "vitest";
import { run } from "./run";

/**
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

describe("payment customization function", () => {
  it("returns no operations without configuration", () => {
    const result = run({
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
    const expected = /** @type {FunctionRunResult} */ ({ operations: [] });

    expect(result).toEqual(expected);
  });

  it("returns no operations if total is less than configured", () => {
    const result = run({
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
    const expected = /** @type {FunctionRunResult} */ ({ operations: [] });

    expect(result).toEqual(expected);
  });

  it("returns no operations if no payment method matches the configured name", () => {
    const result = run({
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
    const expected = /** @type {FunctionRunResult} */ ({ operations: [] });

    expect(result).toEqual(expected);
  });

  it("hides a matching payment method", () => {
    const result = run({
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
    const expected = /** @type {FunctionRunResult} */ ({
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
