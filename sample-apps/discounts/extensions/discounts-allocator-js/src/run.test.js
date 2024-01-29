import {describe, it, expect} from 'vitest';
import {run} from './run';
import Decimal from 'decimal.js';

describe('JS discount allocator function', () => {
  it('test result without cart max', () => {
    const result = run({
      discounts: [
        {
          id: 'gid://shopify/DiscountNode/13',
          title: 'CAPS',
          code: 'CAPS',
          type: 'CodePriceRule',
          discountApplicationStrategy: 'FIRST',
          discountProposals: [
            {
              handle: '8d783e44-14b9-4c2c-b431-2be340f1f4e1',
              message: 'CAPS',
              value: {
                __typename: "FixedAmount",
                amount: "10.0",
                appliesToEachItem: false
              },
              targets: [
                {
                  cartLineId: 'gid://shopify/CartLine/0',
                  quantity: 5,
                },
              ],
            },
          ],
        },
        {
          id: 'gid://shopify/DiscountNode/8',
          title: 'TIES',
          code: 'TIES',
          type: 'CodePriceRule',
          discountApplicationStrategy: 'FIRST',
          discountProposals: [
            {
              handle: 'a7194cec-d807-4c46-9284-4fec7a3f5fbe',
              message: 'TIES',
              value: {
                __typename: "Percentage",
                value: "20.0"
              },
              targets: [
                {
                  cartLineId: 'gid://shopify/CartLine/1',
                  quantity: 6,
                },
              ],
            },
          ],
        },
      ],
      presentmentCurrencyRate: '1.2706752',
      cart: {
        lines: [
          {
            id: 'gid://shopify/CartLine/0',
            quantity: 5,
            cost: {
              amountPerQuantity: {
                amount: '32.0',
              },
            },
            merchandise: {
              __typename: 'ProductVariant',
              id: 'gid://shopify/ProductVariant/17',
              title: 'Shorts',
              product: {
                id: 'gid://shopify/Product/9',
                title: 'Shorts',
              },
            },
          },
          {
            id: 'gid://shopify/CartLine/1',
            quantity: 6,
            cost: {
              amountPerQuantity: {
                amount: '20.0',
              },
            },
            merchandise: {
              __typename: 'ProductVariant',
              id: 'gid://shopify/ProductVariant/17',
              title: 'Shorts',
              product: {
                id: 'gid://shopify/Product/9',
                title: 'Shorts',
              },
            },
          },
        ],
      },
      shop: {
        metafield: null,
      },
    });

    const expected = {
      lineDiscounts: [
        {
          cartLineId: 'gid://shopify/CartLine/0',
          quantity: 5,
          allocations: [
            {
              discountProposalId: '8d783e44-14b9-4c2c-b431-2be340f1f4e1',
              amount: new Decimal(10.0),
            },
          ],
        },
        {
          cartLineId: 'gid://shopify/CartLine/1',
          quantity: 6,
          allocations: [
            {
              discountProposalId: 'a7194cec-d807-4c46-9284-4fec7a3f5fbe',
              amount: new Decimal(24.0),
            },
          ],
        },
      ],
      displayableErrors: [],
    };

    expect(result).toEqual(expected);
  });

  it('test result with each and across allocations', () => {
    const result = run({
      discounts: [
        {
          id: 'gid://shopify/DiscountNode/13',
          title: 'CAPS',
          code: 'CAPS',
          type: 'CodePriceRule',
          discountApplicationStrategy: 'FIRST',
          discountProposals: [
            {
              handle: '8d783e44-14b9-4c2c-b431-2be340f1f4e1',
              message: 'CAPS',
              value: {
                __typename: "FixedAmount",
                amount: "5.0",
                appliesToEachItem: true
              },
              targets: [
                {
                  cartLineId: 'gid://shopify/CartLine/0',
                  quantity: 5,
                },
              ],
            },
          ],
        },
        {
          id: 'gid://shopify/DiscountNode/8',
          title: 'TIES',
          code: 'TIES',
          type: 'CodePriceRule',
          discountApplicationStrategy: 'FIRST',
          discountProposals: [
            {
              handle: 'a7194cec-d807-4c46-9284-4fec7a3f5fbe',
              message: 'TIES',
              value: {
                __typename: "FixedAmount",
                amount: "10.0",
                appliesToEachItem: false
              },
              targets: [
                {
                  cartLineId: 'gid://shopify/CartLine/1',
                  quantity: 6,
                },
              ],
            },
          ],
        },
      ],
      presentmentCurrencyRate: '1.2706752',
      cart: {
        lines: [
          {
            id: 'gid://shopify/CartLine/0',
            quantity: 5,
            cost: {
              amountPerQuantity: {
                amount: '32.0',
              },
            },
            merchandise: {
              __typename: 'ProductVariant',
              id: 'gid://shopify/ProductVariant/17',
              title: 'Shorts',
              product: {
                id: 'gid://shopify/Product/9',
                title: 'Shorts',
              },
            },
          },
          {
            id: 'gid://shopify/CartLine/1',
            quantity: 6,
            cost: {
              amountPerQuantity: {
                amount: '20.0',
              },
            },
            merchandise: {
              __typename: 'ProductVariant',
              id: 'gid://shopify/ProductVariant/17',
              title: 'Shorts',
              product: {
                id: 'gid://shopify/Product/9',
                title: 'Shorts',
              },
            },
          },
        ],
      },
      shop: {
        metafield: null,
      },
    });

    const expected = {
      lineDiscounts: [
        {
          cartLineId: 'gid://shopify/CartLine/0',
          quantity: 5,
          allocations: [
            {
              discountProposalId: '8d783e44-14b9-4c2c-b431-2be340f1f4e1',
              amount: new Decimal(25.0), // $5 (each) * 5 (qty)
            },
          ],
        },
        {
          cartLineId: 'gid://shopify/CartLine/1',
          quantity: 6,
          allocations: [
            {
              discountProposalId: 'a7194cec-d807-4c46-9284-4fec7a3f5fbe',
              amount: new Decimal(10.0), // $10 (across)
            },
          ],
        },
      ],
      displayableErrors: [],
    };

    expect(result).toEqual(expected);
  });

  it('test result with 10 cart max', () => {
    const result = run({
      discounts: [
        {
          id: 'gid://shopify/DiscountNode/13',
          title: 'CAPS',
          code: 'CAPS',
          type: 'CodePriceRule',
          discountApplicationStrategy: 'FIRST',
          discountProposals: [
            {
              handle: '8d783e44-14b9-4c2c-b431-2be340f1f4e1',
              message: 'CAPS',
              value: {
                __typename: "Percentage",
                value: "5.0"
              },
              targets: [
                {
                  cartLineId: 'gid://shopify/CartLine/0',
                  quantity: 5,
                },
              ],
            },
          ],
        },
        {
          id: 'gid://shopify/DiscountNode/8',
          title: 'TIES',
          code: 'TIES',
          type: 'CodePriceRule',
          discountApplicationStrategy: 'FIRST',
          discountProposals: [
            {
              handle: 'a7194cec-d807-4c46-9284-4fec7a3f5fbe',
              message: 'TIES',
              value: {
                __typename: "Percentage",
                value: "10.0"
              },
              targets: [
                {
                  cartLineId: 'gid://shopify/CartLine/1',
                  quantity: 6,
                },
              ],
            },
          ],
        },
      ],
      presentmentCurrencyRate: '1.2706752',
      cart: {
        lines: [
          {
            id: 'gid://shopify/CartLine/0',
            quantity: 5,
            cost: {
              amountPerQuantity: {
                amount: '32.0',
              },
            },
            merchandise: {
              __typename: 'ProductVariant',
              id: 'gid://shopify/ProductVariant/17',
              title: 'Shorts',
              product: {
                id: 'gid://shopify/Product/9',
                title: 'Shorts',
              },
            },
          },
          {
            id: 'gid://shopify/CartLine/1',
            quantity: 6,
            cost: {
              amountPerQuantity: {
                amount: '20.0',
              },
            },
            merchandise: {
              __typename: 'ProductVariant',
              id: 'gid://shopify/ProductVariant/17',
              title: 'Shorts',
              product: {
                id: 'gid://shopify/Product/9',
                title: 'Shorts',
              },
            },
          },
        ],
      },
      shop: {
        localTime: {
          date: '2023-11-15',
        },
        metafield: {
          value: '10.0',
        },
      },
    });

    const expected = {
      lineDiscounts: [
        {
          cartLineId: 'gid://shopify/CartLine/0',
          quantity: 5,
          allocations: [
            {
              discountProposalId: '8d783e44-14b9-4c2c-b431-2be340f1f4e1',
              amount: new Decimal(8.0),
            },
          ],
        },
        {
          cartLineId: 'gid://shopify/CartLine/1',
          quantity: 6,
          allocations: [
            {
              discountProposalId: 'a7194cec-d807-4c46-9284-4fec7a3f5fbe',
              amount: new Decimal(2.0),
            },
          ],
        },
      ],
      displayableErrors: [
        {
          discountId: 'gid://shopify/DiscountNode/8',
          reason: 'Maximum discount limit reached for this cart',
        },
      ],
    };

    expect(result).toEqual(expected);
  });
});
