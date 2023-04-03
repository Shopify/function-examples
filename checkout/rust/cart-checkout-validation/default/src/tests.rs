use super::*;
use shopify_function::{run_function_with_input, Result};

#[test]
fn test_result_contains_single_error_when_quantity_exceeds_one() -> Result<()> {
    let result = run_function_with_input(
        function,
        r#"
            {
                "cart": {
                    "lines": [
                        {
                            "quantity": 3
                        }
                    ]
                }
            }
        "#,
    )?;
    let expected = crate::output::FunctionResult {
        errors: vec![FunctionError {
            localized_message: "Not possible to order more than one of each".to_owned(),
            target: "cart".to_owned(),
        }],
    };

    assert_eq!(result, expected);
    Ok(())
}

#[test]
fn test_result_contains_no_errors_when_quantity_is_one() -> Result<()> {
    let result = run_function_with_input(
        function,
        r#"
            {
                "cart": {
                    "lines": [
                        {
                            "quantity": 1
                        }
                    ]
                }
            }
        "#,
    )?;
    let expected = crate::output::FunctionResult { errors: vec![] };

    assert_eq!(result, expected);
    Ok(())
}
