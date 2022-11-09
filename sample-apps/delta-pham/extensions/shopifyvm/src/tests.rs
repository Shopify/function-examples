use super::*;
use shopify_function::{run_function_with_input, Result};

#[test]
fn test_discount_with_shopify_email() -> Result<()> {
    let result = run_function_with_input(
        function,
        r#"
            {
                "cart": {
                    "buyerIdentity": {
                      "email": "d.pham@shopify.com"
                    },
                    "lines": [
                        {
                            "merchandise": {
                                "__typename": "ProductVariant",
                                "id": "gid://shopify/ProductVariant/0",
                                "product": {
                                  "taggedShopifyVM": true
                                }
                            },
                            "quantity": 5
                        },
                        {
                            "merchandise": {
                                "__typename": "ProductVariant",
                                "id": "gid://shopify/ProductVariant/1",
                                "product": {
                                  "taggedShopifyVM": false
                                }
                            },
                            "quantity": 1
                        }
                    ]
                },
                "discountNode": {
                    "metafield": null
                }
            }
        "#,
    )?;
    let expected = crate::output::FunctionResult {
        discounts: vec![crate::output::Discount {
            message: None,
            targets: vec![crate::output::Target {
                product_variant: Some(crate::output::ProductVariantTarget {
                    id: "gid://shopify/ProductVariant/0".to_string(),
                    quantity: None,
                }),
            }],
            value: crate::output::Value {
                percentage: Some(crate::output::Percentage {
                    value: "100".to_string(),
                }),
                fixed_amount: None,
            },
        }],
        discount_application_strategy: crate::output::DiscountApplicationStrategy::FIRST,
    };

    assert_eq!(result, expected);
    Ok(())
}

#[test]
fn test_discount_without_shopify_email() -> Result<()> {
    let result = run_function_with_input(
        function,
        r#"
            {
                "cart": {
                    "buyerIdentity": {
                      "email": "d.pham@sbobify.com"
                    },
                    "lines": [
                        {
                            "merchandise": {
                                "__typename": "ProductVariant",
                                "id": "gid://shopify/ProductVariant/0",
                                "product": {
                                  "taggedShopifyVM": true
                                }
                            },
                            "quantity": 5
                        },
                        {
                            "merchandise": {
                                "__typename": "ProductVariant",
                                "id": "gid://shopify/ProductVariant/1",
                                "product": {
                                  "taggedShopifyVM": false
                                }
                            },
                            "quantity": 1
                        }
                    ]
                },
                "discountNode": {
                    "metafield": null
                }
            }
        "#,
    )?;
    let expected = crate::output::FunctionResult {
        discounts: vec![],
        discount_application_strategy: crate::output::DiscountApplicationStrategy::FIRST,
    };

    assert_eq!(result, expected);
    Ok(())
}

#[test]
fn test_discount_without_buyer_identity() -> Result<()> {
    let result = run_function_with_input(
        function,
        r#"
            {
                "cart": {
                    "buyerIdentity": null,
                    "lines": [
                        {
                            "merchandise": {
                                "__typename": "ProductVariant",
                                "id": "gid://shopify/ProductVariant/0",
                                "product": {
                                  "taggedShopifyVM": true
                                }
                            },
                            "quantity": 5
                        },
                        {
                            "merchandise": {
                                "__typename": "ProductVariant",
                                "id": "gid://shopify/ProductVariant/1",
                                "product": {
                                  "taggedShopifyVM": false
                                }
                            },
                            "quantity": 1
                        }
                    ]
                },
                "discountNode": {
                    "metafield": null
                }
            }
        "#,
    )?;
    let expected = crate::output::FunctionResult {
        discounts: vec![],
        discount_application_strategy: crate::output::DiscountApplicationStrategy::FIRST,
    };

    assert_eq!(result, expected);
    Ok(())
}

#[test]
fn test_discount_without_buyer_identity_email() -> Result<()> {
    let result = run_function_with_input(
        function,
        r#"
            {
                "cart": {
                    "buyerIdentity": {
                      "email": null
                    },
                    "lines": [
                        {
                            "merchandise": {
                                "__typename": "ProductVariant",
                                "id": "gid://shopify/ProductVariant/0",
                                "product": {
                                  "taggedShopifyVM": true
                                }
                            },
                            "quantity": 5
                        },
                        {
                            "merchandise": {
                                "__typename": "ProductVariant",
                                "id": "gid://shopify/ProductVariant/1",
                                "product": {
                                  "taggedShopifyVM": false
                                }
                            },
                            "quantity": 1
                        }
                    ]
                },
                "discountNode": {
                    "metafield": null
                }
            }
        "#,
    )?;
    let expected = crate::output::FunctionResult {
        discounts: vec![],
        discount_application_strategy: crate::output::DiscountApplicationStrategy::FIRST,
    };

    assert_eq!(result, expected);
    Ok(())
}
