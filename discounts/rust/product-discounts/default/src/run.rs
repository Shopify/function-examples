use shopify_function::prelude::*;
use shopify_function::Result;

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Default, PartialEq, Clone, Debug)]
#[serde(rename_all(deserialize = "camelCase"))]
struct Configuration {}

#[typegen("schema.graphql")]
mod schema {
    #[query(
        "src/run.graphql",
        custom_scalar_overrides = {
            "Input.discountNode.metafield.jsonValue" => super::Configuration,
        }
    )]
    pub mod run {}
}

#[shopify_function]
fn run(input: schema::run::Input) -> Result<schema::FunctionRunResult> {
    let no_discount = schema::FunctionRunResult {
        discounts: vec![],
        discount_application_strategy: schema::DiscountApplicationStrategy::First,
    };

    let Some(schema::run::input::discount_node::Metafield {
        json_value: _config,
    }) = input.discount_node.metafield
    else {
        return Ok(no_discount);
    };

    Ok(schema::FunctionRunResult {
        discounts: vec![],
        discount_application_strategy: schema::DiscountApplicationStrategy::First,
    })
}

#[cfg(test)]
mod tests {
    use super::*;
    use shopify_function::{run_function_with_input, Result};

    #[test]
    fn test_result_contains_no_discounts() -> Result<()> {
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
        let expected = schema::FunctionRunResult {
            discounts: vec![],
            discount_application_strategy: schema::DiscountApplicationStrategy::First,
        };

        assert_eq!(result, expected);
        Ok(())
    }
}
