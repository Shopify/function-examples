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
    let expected = output::FunctionResult {
      discount_application_strategy: output::DiscountApplicationStrategy::FIRST,
      discounts: vec![
        output::Discount {
          message: None,
          value: output::Value {
            fixed_amount: None,
            percentage: Some(output::Percentage {
              value: "10".to_string()
            })
          },
          targets: vec![
            output::Target {
              product_variant: Some(output::ProductVariantTarget {
                  id: "gid://shopify/ProductVariant/0".to_string(),
                  quantity: None
              })
            }
          ]
        }
      ]
    };

    assert_eq!(result, expected);
    Ok(())
}
