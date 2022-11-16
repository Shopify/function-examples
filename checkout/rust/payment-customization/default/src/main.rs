use shopify_function::prelude::*;
use shopify_function::Result;

use graphql_client;
use serde::{Deserialize, Serialize};
use serde_json;

generate_types!(
    query_path = "./input.graphql",
    schema_path = "./schema.graphql"
);

#[derive(Serialize, Deserialize, Default, PartialEq)]
struct Config {}

#[shopify_function]
fn function(input: input::ResponseData) -> Result<output::FunctionResult> {
    let _config: Config = input
        .payment_customization
        .metafield
        .as_ref()
        .map(|m| serde_json::from_str::<Config>(m.value.as_str()))
        .transpose()?
        .unwrap_or_default();

    Ok(output::FunctionResult { operations: vec![] })
}

#[cfg(test)]
mod tests;
