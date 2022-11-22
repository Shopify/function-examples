use super::*;
use shopify_function::{run_function_with_input, Result};

#[test]
fn test_result_with_no_title_contains_no_operations() -> Result<()> {
    let result = run_function_with_input(
        function,
        r#"
            {
                "cart": {
                    "deliveryGroups": [
                        {
                            "deliveryOptions": [
                                { "handle": "method-a", "title": "Method A" }
                            ]
                        },
                        {
                            "deliveryOptions": [
                                { "handle": "method-b", "title": "Method B" },
                                { "handle": "method-c", "title": "Method C" }
                            ]
                        }
                    ]
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
fn test_result_with_title_contains_rename_operation() -> Result<()> {
    let result = run_function_with_input(
        function,
        r#"
            {
                "cart": {
                    "deliveryGroups": [
                        {
                            "deliveryOptions": [
                                { "handle": "method-a", "title": "Method A" }
                            ]
                        },
                        {
                            "deliveryOptions": [
                                { "handle": "method-b", "title": "Method B" },
                                { "handle": "method-c", "title": "Method C" }
                            ]
                        }
                    ]
                },
                "deliveryCustomization": {
                    "metafield": {
                        "value": "Method A"
                    }
                }
            }
        "#,
    )?;
    let expected = crate::output::FunctionResult {
        operations: vec![crate::output::Operation {
            rename: Some(crate::output::RenameOperation {
                delivery_option_handle: "method-a".to_string(),
                title: "Method A renamed".to_string(),
            }),
            hide: None,
            move_: None,
        }],
    };

    assert_eq!(result, expected);
    Ok(())
}
