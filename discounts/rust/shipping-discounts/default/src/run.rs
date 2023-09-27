use shopify_function::prelude::*;
use shopify_function::Result;

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Default, PartialEq)]
#[serde(rename_all(deserialize = "camelCase"))]
struct Configuration {}

impl Configuration {
    fn from_str(value: &str) -> Self {
        serde_json::from_str(value).expect("Unable to parse configuration value from metafield")
    }
}

#[shopify_function_target(query_path = "src/run.graphql", schema_path = "schema.graphql")]
fn run(input: input::ResponseData) -> Result<output::FunctionRunResult> {
    let no_discount = output::FunctionRunResult {
        discounts: vec![],
        discount_application_strategy: output::DiscountApplicationStrategy::FIRST,
    };

    let _config = match input.discount_node.metafield {
        Some(input::InputDiscountNodeMetafield { value }) => Configuration::from_str(&value),
        None => return Ok(no_discount),
    };

    Ok(output::FunctionRunResult {
        discounts: vec![],
        discount_application_strategy: output::DiscountApplicationStrategy::FIRST,
    })
}

#[cfg(test)]
mod tests {
    use super::*;
    use shopify_function::{run_function_with_input, Result};

    #[test]
    fn test_result_contains_no_discounts() -> Result<()> {
        use run::output::*;

        let result = run_function_with_input(
            run,
            r#"
                {
                    "discountNode": {
                        "metafield": null
                    }
                }
            "#,
        )?;
        let expected = FunctionRunResult {
            discounts: vec![],
            discount_application_strategy: DiscountApplicationStrategy::FIRST,
        };

        assert_eq!(result, expected);
        Ok(())
    }
}
