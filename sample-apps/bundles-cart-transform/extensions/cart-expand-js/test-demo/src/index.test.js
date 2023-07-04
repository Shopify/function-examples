import { describe, it, expect } from 'vitest';
import cartTransform from './index';

/**
 * @typedef {import("../generated/api").FunctionResult} FunctionResult
 */

describe('cart transform function', () => {
  it('returns no operations', () => {
    const result = cartTransform({});
    const expected = /** @type {FunctionResult} */ ({ operations: [] });

    expect(result).toEqual(expected);
  });
});