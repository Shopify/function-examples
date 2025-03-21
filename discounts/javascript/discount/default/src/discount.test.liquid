import { describe, it, expect } from "vitest";

import { generateCartRun } from "./generate_cart_run";
import { generateDeliveryRun } from "./generate_delivery_run";
import {
  OrderDiscountSelectionStrategy,
  ProductDiscountSelectionStrategy,
  DeliveryDiscountSelectionStrategy,
} from "../generated/api";

describe("discount", () => {
  it("cart.lines.discounts.generate.run returns a product and order discount", () => {
    const input = {
      cart: {
        lines: [
          {
            id: "gid://shopify/CartLine/0",
            cost: {
              subtotalAmount: 100,
            },
          },
        ],
      },
    };

    const result = generateCartRun(input);

    expect(result.operations.length).toBe(2);
    expect(result.operations[0]).toMatchObject({
      orderDiscountsAdd: {
        candidates: [
          {
            message: "10% OFF ORDER",
            targets: [
              {
                orderSubtotal: {
                  excludedCartLineIds: [],
                },
              },
            ],
            value: {
              percentage: {
                value: 10,
              },
            },
          },
        ],
        selectionStrategy: OrderDiscountSelectionStrategy.First,
      },
    });

    expect(result.operations[1]).toMatchObject({
      productDiscountsAdd: {
        candidates: [
          {
            message: "20% OFF PRODUCT",
            targets: [
              {
                cartLine: {
                  id: "gid://shopify/CartLine/0",
                },
              },
            ],
            value: {
              percentage: {
                value: 20,
              },
            },
          },
        ],
        selectionStrategy: ProductDiscountSelectionStrategy.First,
      },
    });
  });

  it("cart.delivery-options.generate.run returns a delivery discount", () => {
    const input = {
      cart: {
        deliveryGroups: [
          {
            id: "gid://shopify/DeliveryGroup/0",
          },
        ],
      },
    };

    const result = generateDeliveryRun(input);

    expect(result.operations.length).toBe(1);
    expect(result.operations[0]).toMatchObject({
      deliveryDiscountsAdd: {
        candidates: [
          {
            message: "FREE DELIVERY",
            targets: [
              {
                deliveryGroup: {
                  id: "gid://shopify/DeliveryGroup/0",
                },
              },
            ],
            value: {
              percentage: {
                value: 100,
              },
            },
          },
        ],
        selectionStrategy: DeliveryDiscountSelectionStrategy.All,
      },
    });
  });
});
