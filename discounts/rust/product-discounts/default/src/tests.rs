use super::*;
use shopify_function::{run_function_with_input, Result};

#[test]
fn test_result_contains_no_discounts() -> Result<()> {
    let result = run_function_with_input(
        function,
        r#"
            {
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
