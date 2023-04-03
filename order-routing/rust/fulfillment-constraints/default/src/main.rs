use shopify_function::prelude::*;
use shopify_function::Result;

use serde::{Deserialize, Serialize};

generate_types!(
    query_path = "./input.graphql",
    schema_path = "./schema.graphql"
);

#[derive(Serialize, Deserialize, Default, PartialEq)]
struct Config {}

#[shopify_function]
fn function(_input: input::ResponseData) -> Result<output::FunctionResult> {
    let operations = vec![];

    // Build operations based on the input query response here.

    Ok(output::FunctionResult { operations })
}

#[cfg(test)]
mod tests;
