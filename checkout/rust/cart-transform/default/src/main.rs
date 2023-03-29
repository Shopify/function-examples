use shopify_function::prelude::*;
use shopify_function::Result;

use serde::{Deserialize, Serialize};

type URL = String;

generate_types!(
    query_path = "./input.graphql",
    schema_path = "./schema.graphql"
);

#[shopify_function]
fn function(input: input::ResponseData) -> Result<output::FunctionResult> {
    let no_changes = output::FunctionResult {
        operations: Some(vec![]),
    };

    Ok(no_changes)
}
