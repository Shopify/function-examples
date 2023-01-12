use super::*;
use shopify_function::{run_function_with_input, Result};

#[test]
fn test_discount_with_no_configuration() -> Result<()> {
    let result = run_function_with_input(
        function,
        r#"
        {
            "cart": {
              "lines": [
                {
                  "quantity": 5,
                  "merchandise": {
                    "__typename": "ProductVariant",
                    "id": "gid://shopify/ProductVariant/0"
                  }
                }
              ]
            },
            "discountNode": {
              "metafield": null
            }
          }
        "#,
    )?;
    let expected = 0;

    assert_eq!(result.discounts.len(), expected);
    Ok(())
}

#[test]
fn test_discount_with_configuration() -> Result<()> {
    let result = run_function_with_input(
        function,
        r#"
        {
            "cart": {
              "lines": [
                {
                  "quantity": 5,
                  "merchandise": {
                    "__typename": "ProductVariant",
                    "id": "gid://shopify/ProductVariant/0"
                  }
                },
                {
                  "quantity": 1,
                  "merchandise": {
                    "__typename": "ProductVariant",
                    "id": "gid://shopify/ProductVariant/1"
                  }
                }
              ]
            },
            "discountNode": {
              "metafield": {
                "value": "{\"quantity\":5,\"percentage\":10.0}"
              }
            }
          }
        "#,
    )?;
    let expected = output::Target {
        product_variant: Some(output::ProductVariantTarget {
            id: "gid://shopify/ProductVariant/0".to_string(),
            quantity: None
        })
    };

    assert_eq!(result.discounts.first().unwrap().targets.first().unwrap(), &expected);
    Ok(())
}
