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
fn function(input: input::ResponseData) -> Result<output::FunctionResult> {
    let operations = input
        .fulfillment_groups
        .iter()
        .map(|group| {
            let rankings = group
                .inventory_locations
                .as_ref()
                .map(|locations| {
                    locations
                        .iter()
                        .map(|location| output::RankedLocation {
                            location_id: location.location.id.clone(),
                            rank: 0,
                        })
                        .collect()
                })
                .unwrap_or_else(Vec::new);

            output::Operation {
                rank: output::FulfillmentGroupRankedLocations {
                    fulfillment_group_id: group.id.clone(),
                    rankings,
                },
            }
        })
        .collect();

    Ok(output::FunctionResult { operations })
}

#[cfg(test)]
mod tests;
