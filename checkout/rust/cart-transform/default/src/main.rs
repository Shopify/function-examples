use shopify_function::prelude::*;
use shopify_function::Result;

#[allow(clippy::upper_case_acronyms)]
type URL = String;

generate_types!(
    query_path = "./input.graphql",
    schema_path = "./schema.graphql"
);

#[shopify_function]
fn function(_input: input::ResponseData) -> Result<output::FunctionResult> {
    let no_changes = output::FunctionResult { operations: vec![] };

    Ok(no_changes)
}
