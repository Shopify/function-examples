use super::*;
use shopify_function::{run_function_with_input, Result};

#[test]
fn test_returns_no_operations_without_configuration() -> Result<()> {
    let result = run_function_with_input(
        function,
        r#"
            {
                "cart": {
                    "deliveryGroups": []
                },
                "deliveryCustomization": {
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
fn test_renames_delivery_options_if_province_matches() -> Result<()> {
    let result = run_function_with_input(
        function,
        r#"
            {
                "cart": {
                    "deliveryGroups": [{
                        "deliveryAddress": {
                            "provinceCode": "ON"
                        },
                        "deliveryOptions": [{
                            "handle": "test_delivery_option",
                            "title": "Test Delivery Option"
                        }, {
                            "handle": "test_delivery_option_2",
                            "title": "Test Delivery Option 2"
                        }]
                    }]
                },
                "deliveryCustomization": {
                    "metafield": {
                        "value": "{\"stateProvinceCode\": \"ON\", \"message\": \"Test Message\"}"
                    }
                }
            }
        "#,
    )?;
    let expected = crate::output::FunctionResult {
        operations: vec![
            output::Operation::Rename(output::RenameOperation {
                delivery_option_handle: "test_delivery_option".to_string(),
                title: "Test Delivery Option - Test Message".to_string(),
            }),
            output::Operation::Rename(output::RenameOperation {
                delivery_option_handle: "test_delivery_option_2".to_string(),
                title: "Test Delivery Option 2 - Test Message".to_string(),
            }),
        ],
    };

    assert_eq!(result, expected);
    Ok(())
}

#[test]
fn test_returns_no_operations_if_province_code_does_not_match() -> Result<()> {
    let result = run_function_with_input(
        function,
        r#"
            {
                "cart": {
                    "deliveryGroups": [{
                        "deliveryAddress": {
                            "provinceCode": "NC"
                        },
                        "deliveryOptions": [{
                            "handle": "test_delivery_option",
                            "title": "Test Delivery Option"
                        }]
                    }]
                },
                "deliveryCustomization": {
                    "metafield": {
                        "value": "{\"stateProvinceCode\": \"ON\", \"message\": \"Test Message\"}"
                    }
                }
            }
        "#,
    )?;
    let expected = crate::output::FunctionResult { operations: vec![] };

    assert_eq!(result, expected);
    Ok(())
}
