use shopify_function::prelude::*;
use shopify_function::Result;

#[allow(clippy::upper_case_acronyms)]
type URL = String;

#[shopify_function_target(query_path = "src/run.graphql", schema_path = "schema.graphql")]
fn run(_input: input::ResponseData) -> Result<output::FunctionRunResult> {
    let no_changes = output::FunctionRunResult { operations: vec![] };

    Ok(no_changes)
}
