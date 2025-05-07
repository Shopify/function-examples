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

#[shopify_function_target(query_path = "src/cart_payment_methods_transform_run.graphql", schema_path = "schema.graphql")]
fn cart_payment_methods_transform_run(input: input::ResponseData) -> Result<output::CartPaymentMethodsTransformRunResult> {
    let no_changes = output::CartPaymentMethodsTransformRunResult { operations: vec![] };

    let _config = match input.payment_customization.metafield {
        Some(input::InputPaymentCustomizationMetafield { value }) => {
            Configuration::from_str(&value)
        }
        None => return Ok(no_changes),
    };

    Ok(output::CartPaymentMethodsTransformRunResult { operations: vec![] })
}

#[cfg(test)]
mod tests {
    use super::*;
    use shopify_function::{run_function_with_input, Result};

    #[test]
    fn test_result_contains_no_operations() -> Result<()> {
        use cart_payment_methods_transform_run::output::*;

        let result = run_function_with_input(
            cart_payment_methods_transform_run,
            r#"
                {
                    "paymentCustomization": {
                        "metafield": null
                    }
                }
            "#,
        )?;
        let expected = CartPaymentMethodsTransformRunResult { operations: vec![] };

        assert_eq!(result, expected);
        Ok(())
    }
}
