use shopify_function::prelude::*;
use shopify_function::Result;

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Default, PartialEq)]
struct Config {}

#[shopify_function_target(query_path = "src/run.graphql", schema_path = "schema.graphql")]
fn run(input: input::ResponseData) -> Result<output::CartFulfillmentGroupsLocationRankingsGenerateRunResult> {
    let operations = input
        .fulfillment_groups
        .iter()
        .map(|group| {
            let rankings = group
                .inventory_location_handles
                .iter()
                .map(|location_handle| output::RankedLocation {
                    location_handle: location_handle.clone(),
                    rank: 0,
                })
                .collect::<Vec<output::RankedLocation>>();

            output::Operation {
                fulfillment_group_location_ranking_add output::FulfillmentGroupLocationRankingAddOperation {
                    fulfillment_group_handle: group.handle.clone(),
                    rankings,
                },
            }
        })
        .collect();

    Ok(output::CartFulfillmentGroupsLocationRankingsGenerateRunResult { operations })
}

#[cfg(test)]
mod tests {
    use super::*;
    use shopify_function::{run_function_with_input, Result};

    #[test]
    fn test_result_ranks_all_locations_zero() -> Result<()> {
        use run::output::*;

        let result = run_function_with_input(
            run,
            r#"
                {
                    "fulfillmentGroups": [{
                        "handle": "123",
                        "inventoryLocationHandles": ["456"]
                    }]
                }
            "#,
        )?;
        let expected = CartFulfillmentGroupsLocationRankingsGenerateRunResult {
            operations: vec![Operation {
                fulfillment_group_location_ranking_add FulfillmentGroupLocationRankingAddOperation {
                    fulfillment_group_handle: "123".to_string(),
                    rankings: vec![RankedLocation {
                        location_handle: "456".to_string(),
                        rank: 0,
                    }],
                },
            }],
        };

        assert_eq!(result, expected);
        Ok(())
    }
}
