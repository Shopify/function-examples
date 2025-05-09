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
fn run(input: input::ResponseData) -> Result<output::CartDeliveryOptionsTransformRunResult> {
    let no_changes = output::CartDeliveryOptionsTransformRunResult { operations: vec![] };

    let _config = match input.delivery_customization.metafield {
        Some(input::InputDeliveryCustomizationMetafield { value }) => {
            Configuration::from_str(&value)
        }
        None => return Ok(no_changes),
    };

    Ok(output::CartDeliveryOptionsTransformRunResult { operations: vec![] })
}

#[cfg(test)]
mod tests {
    use super::*;
    use shopify_function::{run_function_with_input, Result};

    #[test]
    fn test_result_contains_no_operations() -> Result<()> {
        use run::output::*;

        let result = run_function_with_input(
            run,
            r#"
                {
                    "deliveryCustomization": {
                        "metafield": null
                    }
                }
            "#,
        )?;
        let expected = CartDeliveryOptionsTransformRunResult { operations: vec![] };

        assert_eq!(result, expected);
        Ok(())
    }
}
