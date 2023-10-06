import { describe, expect, it } from 'vitest';
import { OrderSubmission } from '../generated/api';
import { run } from './run';

/**
 * @typedef {import("../generated/api").FunctionResult} FunctionResult
 */

describe('order submission rule function', () => {
  it('returns no operations without configuration', () => {
    const result = run({
      cart: {
        cost: {
          totalAmount: {
            amount: "10.00"
          }
        }
      },
      orderSubmissionRule: {
        metafield: null
      }
    });
    const expected = /** @type {FunctionResult} */ ({ operations: [] });

    expect(result).toEqual(expected);
  });

  it("returns ORDER if total is less than configured", () => {
    const result = run({
      cart: {
        cost: {
          totalAmount: {
            amount: "1",
          },
        },
      },
      orderSubmissionRule: {
        metafield: {
          value: '{"cartTotal": 10}',
        },
      },
    });
    const expected = /** @type {FunctionResult} */ ({ operations: [
      {
        set: {
          orderSubmissionType: OrderSubmission.Order
        }
      }
    ] });

    expect(result).toEqual(expected);
  });

  it("returns DraftOrder if total is more than configured", () => {
    const result = run({
      cart: {
        cost: {
          totalAmount: {
            amount: "11",
          },
        },
      },
      orderSubmissionRule: {
        metafield: {
          value: '{"cartTotal": 10}',
        },
      },
    });
    const expected = /** @type {FunctionResult} */ ({ operations: [{
      set: {
        orderSubmissionType: OrderSubmission.DraftOrder
      }
    }] });

    expect(result).toEqual(expected);
  });
});
