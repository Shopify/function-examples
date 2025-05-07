use shopify_function::prelude::*;
use shopify_function::Result;

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Default, PartialEq)]
struct Config {}

#[shopify_function_target(query_path = "src/run.graphql", schema_path = "schema.graphql")]
fn run(_input: input::ResponseData) -> Result<output::CartFulfillmentConstraintsGenerateRunResult> {
    let operations = vec![];

    // Build operations based on the input query response here.

    Ok(output::CartFulfillmentConstraintsGenerateRunResult { operations })
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
                "cart": {
                  "deliverableLines": [
                    {
                      "id": "gid://shopify/DeliverableCartLine/1"
                    },
                    {
                      "id": "gid://shopify/DeliverableCartLine/2"
                    }
                  ]
                },
                "fulfillmentConstraintRule": {
                  "metafield": null
                }
              }
            "#,
        )?;

        let expected = CartFulfillmentConstraintsGenerateRunResult { operations: vec![] };

        assert_eq!(result, expected);
        Ok(())
    }
}
