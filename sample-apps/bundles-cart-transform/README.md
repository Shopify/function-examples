# Bundles Cart Transform Sample App

The Bundles Cart Transform App is meant to serve as an example of how to implement a `cart_transform` function to update the cart. It offers an example of an implementation of the Merge transformation and the Expand transformation.

## App Deployment Instructions

There are two aspects of deployment; the deployment of the app itself, and the deployment of extensions.

### App Deployment

[Shopify.dev docs](https://shopify.dev/apps/deployment) cover how to deploy an app.

### Extension Deployment

To publish versions of the extensions, we will need to use the [Shopify CLI](https://shopify.dev/apps/tools/cli).

[Shopify.dev docs](https://shopify.dev/apps/deployment/extension) cover how to deploy extensions.

NOTE: publishing an extension using the `cart_transform` function must register the extension with ever shop that installs it. In this app, we set `config.after_authenticate_job = { job: "Shopify::AfterAuthenticateJob", inline: false }` in `web/config/initializers/shopify_app.rb`. This job sends the following mutation query to `ShopifyAPI` which registers the app's extension with the shop.

```graphql
mutation cartTransformCreate($functionId: String!) {
  cartTransformCreate(functionId: $functionId) {
    cartTransform {
      functionId
      id
    }
    userErrors {
      field
      message
    }
  }
}
```

## How to Build a Bundle

**1. Create metafields on variants**

- On the admin dashboard, go to your shop's settings
- Click on _Custom data_ in the side-navbar
  - _Note_: The button may say _Metafields_ depending on your shop's settings
- Under _Metafields_, click on _Variants_
- Click _Add definition_ to create a new variant metafield definition
- Create a `component_reference` metafield definition
  - Name: `component_reference`
  - Namespace and key (don't change the default): `custom.component_reference`
  - Description: `Components included in Bundle`
  - Select type: `Product Variant` - `List of product variants`
  - Click _Save_
- Click _Add definition_ to create a second variant metafield definition
- Create a `component_quantities` metafield definition
  - Name: `component_quantities`
  - Namespace and key (don't change the default): `custom.component_quantities`
  - Description: `Quantity of components included in Bundle`
  - Select type: `Integer` - `List of values`
  - Validation: `Minimum value` - `1`
  - Click _Save_
- Click _Add definition_ to create a third variant metafield definition
- Create a `component_parents` metafield definition
  - Name: `component_parents`
  - Namespace and key (don't change the default): `custom.component_parents`
  - Description: `Child component parent definition`
  - Select type: `JSON`
  - Rules:
    ```json
    {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "title": "Bundle component parents",
      "description": "A definition of the bundle a child belongs to",
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "description": "ID of bundle parent product variant: gid://shopify/ProductVariant/<id number>",
            "type": "string"
          },
          "component_reference": {
            "type": "object",
            "properties": {
              "value": {
                "description": "Array of product variant IDs: [gid://shopify/ProductVariant/<id number>]",
                "type": "array",
                "items": {
                  "type": "string"
                },
                "minItems": 1,
                "uniqueItems": true
              }
            },
            "required": ["value"]
          },
          "component_quantities": {
            "type": "object",
            "properties": {
              "value": {
                "description": "Array of quantities of product variants defined in component_reference: [1]",
                "type": "array",
                "items": {
                  "type": "integer"
                },
                "minItems": 1
              }
            },
            "required": ["value"]
          },
          "price_adjustment": {
            "type": "object",
            "properties": {
              "value": {
                "description": "Array of quantities of product variants defined in component_reference: [1]",
                "type": "number",
                "minimum": 0
              }
            },
            "required": ["value"]
          }
        },
        "required": ["id", "component_reference", "component_quantities"]
      }
    }
    ```
  - Click _Save_

**2. Create bundle parent product variant**

- Create a product that represents the bundle
  - _Required_: At least one available in inventory
  - _Required_: Price is more than 0
  - _Required_: At least one option, since we need access to the product variant
- After saving the product, click `Edit` next to the variant of the option
  - This will be the bundle parent product variant
- Scroll to the `Metafields` section of the variant edit page
- Open up the product variants that will be included in this bundle in separate browser tabs
  - _Note_: We'll need access to the product variant IDs of the bundled products while defining them
  - _Note_: The product variant IDs can be found in the URL of the product variant
    - `https://admin.shopify.com/store/<your store>/products/<product ID>/variants/<product variant ID>`
- On the parent product variant page, click the `component_reference` field under `Metafields`
- Select the product variants that will be bundled and click _Save_
- Select the `component_quantities` field under `Metafields`
  - _Note_: Add a quantity for each `component_reference` in this bundle
  - _Note_: The order matters, the quantity entered will correspond with the `component_reference` entered
- Click _Save_ on the parent product variant page
  - _Note_: Do not exit this page, we'll need the ID from the URL

**3. Define bundle on child product variants**
_Note_: Complete the following steps for each children product variant defined in `component_reference` in the previous step

- On the child product variant page, click the `componenet_parents` field under `Metafields`
- Using the JSON schema defined, build the bundle definition
  - _Note_: The `component_reference` and `component_quantities` values _MUST_ match the values defined on the parent in the previous step
    _Example_:

```json
[
  {
    "id": "gid://shopify/ProductVariant/<ID of parent product variant>",
    "component_reference": {
      "value": [
        "gid://shopify/ProductVariant/<ID of first child product variant>",
        "gid://shopify/ProductVariant/<ID of second child product variant>"
      ]
    },
    "component_quantities": {
      "value": [
        <quantity of first product variant in bundle>,
        <quantity of second product variant in bundle>
      ]
    }
  }
]
```

## Extensions

### `cart-merge-expand` Function Extension

The `cart-merge-expand` extension uses the `cart_transform` function in Shopify to update the cart. This app uses the extension accomplish two transformations:

- Merge bundle
- Expand bundle

**Merge bundle**

If the extension detects all of the components of a given bundle in the cart at checkout, it will return `merge` operation(s) to Shopify that will combine the respective components and present the given `parent_product_variant`.

In the reference app, the `merge` functionality reads over all of the `product_variants` looking for the `metafield` with the following properties: `namespace: "custom", key: "component_parents"`.

This is query is defined in `extensions/cart-merge-expand/input.graphql`.

```graphql
query Input {
  cart {
    lines {
      id
      quantity
      merchandise {
        ... on ProductVariant {
          id
          component_parents: metafield(
            namespace: "custom"
            key: "component_parents"
          ) {
            value
          }
        }
      }
    }
  }
}
```

The **`component_parents`** field is `metafield` on `product_variant` with the content type `JSON`. Its `value` is an array of objects defining the bundle rules. In order for the `merge` function to work in this app, each child belonging to a bundle _must_ have **`component_parents`** defined. A bundle rule has the following shape:

```json
{
  "id": <Bundle parent ProductVariant ID>,
  "component_reference": {
    "value": <Array of Bundle children ProductVariant IDs>
  },
  "component_quantities": {
    "value": <Array of quantities for children ProductVariant IDs>
  }
}
```

As an example, let's say we have a bundle that contains two shirts and one pair of pants. The bundle parent `product_variant` ID is `6`, the shirt `product_variant` ID included in the bundle is `3` and the pants `product_variant` ID included in the bundle is `4`. Below is value of the **`component_parents`** metafield that _must_ belongs to both the shirt `product_variant` and pants `product_variant` in order for the `merge` functionality in this extension to work.

```json
[
  {
    "id": "gid://shopify/ProductVariant/6",
    "component_reference": {
      "value": [
        "gid://shopify/ProductVariant/3",
        "gid://shopify/ProductVariant/4"
      ]
    },
    "component_quantities": {
      "value": [2, 1]
    }
  }
]
```

Note that the order of the `component_reference` and the `component_quantities` match up. In this example, we can see that the first `component_quantities` value (`2`) matches with the first `component_reference` value (`gid://shopify/ProductVariant/3`) since two shirts are required for the bundle to be complete.

Also, notice that the extension uses Shopify's `product_variant` gids. The ID of the `product_variant` must be prepended with `gid://shopify/ProductVariant/` denoting that it is a `product_variant` ID.

**Expand bundle**

If the extension detects a bundle product with the necessaroy `metadata` on how to expand it, it will return `expand` operation(s) to Shopify. This operation tells Shopify the `cart_line_id` that is being expanded and the `product_variants` that are being added by the given `cart_line_id`.

In the reference app, the `cart-merge-expand` extension looks for two `metafields` belonging to a `product_variant` to determine if the variant is a bundle and should be expanded. The extension looks for the following: `namespace: "custom", key: "component_reference"` and `namespace: "custom", key: "component_quantities"`.

This is query is defined in `extensions/cart-merge-expand/input.graphql`.

```graphql
query Input {
  cart {
    lines {
      id
      quantity
      merchandise {
        ... on ProductVariant {
          id
          component_reference: metafield(
            namespace: "custom"
            key: "component_reference"
          ) {
            value
          }
          component_quantities: metafield(
            namespace: "custom"
            key: "component_quantities"
          ) {
            value
          }
          price_adjustment: metafield(
            namespace: "custom"
            key: "price_adjustment"
          ) {
            value
          }
        }
      }
    }
  }
}
```

The **`component_reference`** field is `metafield` on `product_variant` with the content type `variants`. Its `value` is an array of IDs of `product_variants`.

```json
[
  "gid://shopify/ProductVariant/<product variant ID>",
  "gid://shopify/ProductVariant/<product variant ID>"
]
```

The **`component_quantities`** field is `metafield` on `product_variant` with the content type `integer`. Its `value` is an array of numbers that correspond with the quantity of `product_variants` defined in the `component_reference` field included in the bundle.

```json
[
  <quantity of first variant defined in `component_referece`>,
  <quantity of second variant defined in `component_referece`>
]
```

As an example, let's say we have a bundle that contains two shirts and one pair of pants. The shirt `product_variant` ID included in the bundle is `3` and the pants `product_variant` ID included in the bundle is `4`. The `product_variant` of the bundle would have the following metafields defined.

**`component_reference`**:

```json
["gid://shopify/ProductVariant/3", "gid://shopify/ProductVariant/4"]
```

**`component_quantity`**:

```json
[2, 1]
```

Note that the order of the `component_reference` and the `component_quantities` match up. In this example, we can see that the first `component_quantities` value (`2`) matches with the first `component_reference` value (`gid://shopify/ProductVariant/3`) since two shirts are required for the bundle to be complete.

**Price Adjustment [_Optional_]**

`cart_transform` provides the functionality to also adjust the price of expanded or merged components. By adding the metafield `namespace: "custom", key: "price_adjustment"` to a bundle parent _or_ the property `price_adjustment` to a `component_parents` metafield value, the `cart-merge-expand` extension will return a `percentageDecrease` of the given value.

For example:

_Input_

```json
{
  "cart": {
    "lines": [
      {
        "id": "gid://shopify/CartLine/4",
        "quantity": 9,
        "merchandise": {
          "id": "gid://shopify/ProductVariant/1111",
          "title": "A neat bundle",
          "component_reference": {
            "value": "[\"gid://shopify/ProductVariant/111\",\"gid://shopify/ProductVariant/222\"]"
          },
          "component_quantities": {
            "value": "[2,3]"
          },
          "price_adjustment": {
            "value": "10.5"
          }
        }
      }
    ]
  }
}
```

_Output_

```json
{
  “operations”: [
    {
      “expand”: {
        “cartLineId”: “gid://shopify/CartLine/4”,
        “expandedCartItems”: [
          {
            “merchandiseId”: “gid://shopify/ProductVariant/111”,
            “quantity”: 2
          },
          {
            “merchandiseId”: “gid://shopify/ProductVariant/222”,
            “quantity”: 3
          }
        ],
        “price”: {
          “percentageDecrease”: {
            “value”: 10.5
          }
        }
      }
    }
  ]
}
```
