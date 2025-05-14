---
name: Cart Transform # LLM prompt for the example
api_name: cart_transform
api_version: 2025-01
url: https://shopify.dev/docs/api/functions/2025-01/cart-transform
example_name:  Cart Transform Expand Operation Bundle Expansion
example_description: This function implements a bundle expansion using the cart transform expand operation.
---

# Cart Transform Expand Operation Example: Bundle Expansion

This example demonstrates how to implement a bundle expansion using the Cart Transform expand operation. When a customer adds a bundle product to their cart, it's automatically expanded into its individual components. For example, a "Holiday Package" bundle could be expanded into three separate products, each with its own price.

## How it Works

1. A customer adds a bundle product to their cart (e.g., "Holiday Package")
2. The cart transform function reads the bundle configuration from the product's metafields
3. The single cart line is expanded to show all component products with their respective prices

## Implementation Details

The function works by:
1. Checking each cart line for bundle configuration in the product's metafields
2. When found, it expands the cart line to include all component products
3. Each component is added as a separate line item with its specified price
4. The prices are adjusted according to the presentment currency rate
