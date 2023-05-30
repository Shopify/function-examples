use super::*;
use shopify_function::{run_function_with_input, Result};

#[test]
fn test_returns_no_operations_without_configuration() -> Result<()> {
    let result = run_function_with_input(
        function,
        r#"
            {
                "cart": {
                    "cost": {
                        "totalAmount": {
                            "amount": "0"
                        }
                    }
                },
                "paymentMethods": [],
                "paymentCustomization": {
                    "metafield": null
                }
            }
        "#,
    )?;
    let expected = crate::output::FunctionResult { operations: vec![] };

    assert_eq!(result, expected);
    Ok(())
}

#[test]
fn test_returns_no_operations_if_total_less_than_configured() -> Result<()> {
    let result = run_function_with_input(
        function,
        r#"
            {
                "cart": {
                    "cost": {
                        "totalAmount": {
                            "amount": "1"
                        }
                    }
                },
                "paymentMethods": [{
                    "id": "1",
                    "name": "Test"
                }],
                "paymentCustomization": {
                    "metafield": {
                        "value": "{\"paymentMethodName\": \"Test\", \"cartTotal\": 10}"
                    }
                }
            }
        "#,
    )?;
    let expected = crate::output::FunctionResult { operations: vec![] };

    assert_eq!(result, expected);
    Ok(())
}

#[test]
fn test_returns_no_operations_if_no_payment_method_matches_configured_name() -> Result<()> {
    let result = run_function_with_input(
        function,
        r#"
            {
                "cart": {
                    "cost": {
                        "totalAmount": {
                            "amount": "11"
                        }
                    }
                },
                "paymentMethods": [{
                    "id": "1",
                    "name": "Another payment method"
                }],
                "paymentCustomization": {
                    "metafield": {
                        "value": "{\"paymentMethodName\": \"Test\", \"cartTotal\": 10}"
                    }
                }
            }
        "#,
    )?;
    let expected = crate::output::FunctionResult { operations: vec![] };

    assert_eq!(result, expected);
    Ok(())
}

#[test]
fn test_hides_matching_payment_method() -> Result<()> {
    let result = run_function_with_input(
        function,
        r#"
            {
                "cart": {
                    "cost": {
                        "totalAmount": {
                            "amount": "11"
                        }
                    }
                },
                "paymentMethods": [{
                    "id": "1",
                    "name": "Test"
                }],
                "paymentCustomization": {
                    "metafield": {
                        "value": "{\"paymentMethodName\": \"Test\", \"cartTotal\": 10}"
                    }
                }
            }
        "#,
    )?;
    let expected = crate::output::FunctionResult {
        operations: vec![crate::output::Operation::Hide(
            crate::output::HideOperation {
                payment_method_id: "1".to_string(),
            },
        )],
    };

    assert_eq!(result, expected);
    Ok(())
}
