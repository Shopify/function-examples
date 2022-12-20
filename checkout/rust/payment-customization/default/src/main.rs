use shopify_function::prelude::*;
use shopify_function::Result;

use serde::{Deserialize, Serialize};

generate_types!(
    query_path = "./input.graphql",
    schema_path = "./schema.graphql"
);

#[derive(Serialize, Deserialize, Default, PartialEq)]
#[serde(rename_all(deserialize = "camelCase"))]
struct Configuration {

}

impl Configuration {
    fn from_str(value: &str) -> Self {
        serde_json::from_str(value).expect("Unable to parse configuration value from metafield")
    }
}

#[shopify_function]
fn function(input: input::ResponseData) -> Result<output::FunctionResult> {
    let no_changes = output::FunctionResult { operations: vec![] };

    let _config = match input.payment_customization.metafield {
        Some(input::InputPaymentCustomizationMetafield { value }) =>
            Configuration::from_str(&value),
        None => return Ok(no_changes),
    };

    Ok(output::FunctionResult { operations: vec![] })
}

#[cfg(test)]
mod tests;
