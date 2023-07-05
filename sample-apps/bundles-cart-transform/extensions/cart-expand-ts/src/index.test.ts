import { describe, it, expect } from 'vitest';
import cartTransform from './index';
import { FunctionResult } from '../generated/api';

describe('cart transform function', () => {
  it('returns no operations', () => {
    const result = cartTransform({
      cart: {
        lines: []
      }
    });
    const expected: FunctionResult = { operations: [] };

    expect(result).toEqual(expected);
  });
});