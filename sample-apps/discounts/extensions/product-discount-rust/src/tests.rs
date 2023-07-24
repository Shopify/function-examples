use super::*;
use shopify_function::{run_function_with_input, Result};

#[test]
fn test_no_metafield_result_contains_no_discounts() -> Result<()> {
    let result = run_function_with_input(
        function,
        r#"
            {
                "cart": {
                    "lines": [
                        {
                            "quantity": 10,
                            "merchandise": {
                                "__typename": "ProductVariant",
                                "id": "gid://shopify/ProductVariant/123456789"
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
fn test_quantity_unmet_result_contains_no_discounts() -> Result<()> {
    let result = run_function_with_input(
        function,
        r#"
            {
                "cart": {
                    "lines": [
                        {
                            "quantity": 1,
                            "merchandise": {
                                "__typename": "ProductVariant",
                                "id": "gid://shopify/ProductVariant/123456789"
                            }
                        }
                    ]
                },
                "discountNode": {
                    "metafield": {
                        "value": "{\"quantity\":2,\"percentage\":5}"
                    }
                }
            }
        "#,
    )?;
    let expected = 0;

    assert_eq!(result.discounts.len(), expected);
    Ok(())
}

#[test]
fn test_quantity_met_discounts_variants() -> Result<()> {
    let result = run_function_with_input(
        function,
        r#"
            {
                "cart": {
                    "lines": [
                        {
                            "quantity": 2,
                            "merchandise": {
                                "__typename": "ProductVariant",
                                "id": "gid://shopify/ProductVariant/123456789"
                            }
                        },
                        {
                            "quantity": 3,
                            "merchandise": {
                                "__typename": "ProductVariant",
                                "id": "gid://shopify/ProductVariant/987654321"
                            }
                        }
                    ]
                },
                "discountNode": {
                    "metafield": {
                        "value": "{\"quantity\":2,\"percentage\":5}"
                    }
                }
            }
        "#,
    )?;
    let expected = output::FunctionResult {
        discount_application_strategy: output::DiscountApplicationStrategy::FIRST,
        discounts: vec![output::Discount {
            message: None,
            targets: vec![
                output::Target::ProductVariant(output::ProductVariantTarget {
                    id: "gid://shopify/ProductVariant/123456789".to_string(),
                    quantity: None,
                }),
                output::Target::ProductVariant(output::ProductVariantTarget {
                    id: "gid://shopify/ProductVariant/987654321".to_string(),
                    quantity: None,
                }),
            ],
            value: output::Value::Percentage(output::Percentage {
                value: "5".to_string(),
            }),
        }],
    };

    assert_eq!(result, expected);
    Ok(())
}
