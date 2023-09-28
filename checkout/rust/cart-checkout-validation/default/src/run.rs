use shopify_function::prelude::*;
use shopify_function::Result;

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Default, PartialEq)]
struct Config {}

#[shopify_function_target(query_path = "src/run.graphql", schema_path = "schema.graphql")]
fn run(input: input::ResponseData) -> Result<output::FunctionRunResult> {
    let mut errors = Vec::new();

    if input
        .cart
        .lines
        .iter()
        .map(|line| line.quantity)
        .any(|quantity| quantity > 1)
    {
        errors.push(output::FunctionError {
            localized_message: "Not possible to order more than one of each".to_owned(),
            target: "cart".to_owned(),
        })
    }
    Ok(output::FunctionRunResult { errors })
}

#[cfg(test)]
mod tests {
    use super::*;
    use shopify_function::{run_function_with_input, Result};

    #[test]
    fn test_result_contains_single_error_when_quantity_exceeds_one() -> Result<()> {
        use run::output::*;

        let result = run_function_with_input(
            run,
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
        let expected = FunctionRunResult {
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
        use run::output::*;

        let result = run_function_with_input(
            run,
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
        let expected = FunctionRunResult { errors: vec![] };

        assert_eq!(result, expected);
        Ok(())
    }
}
