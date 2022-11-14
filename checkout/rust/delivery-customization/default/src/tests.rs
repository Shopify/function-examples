use super::*;
use shopify_function::{run_function_with_input, Result};

#[test]
fn test_result_contains_no_operations() -> Result<()> {
    let result = run_function_with_input(
        function,
        r#"
            {
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
