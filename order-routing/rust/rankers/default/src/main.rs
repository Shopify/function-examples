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
                .inventory_location_handles
                .iter()
                .map(|inventory_location_handle| output::RankedLocation {
                    location_handle: inventory_location_handle.clone(),
                    rank: 0,
                })
                .collect::<Vec<output::RankedLocation>>();

            output::Operation {
                rank: output::FulfillmentGroupRankedLocations {
                    fulfillment_group_handle: group.handle.clone(),
                    rankings,
                },
            }
        })
        .collect();

    Ok(output::FunctionResult { operations })
}

#[cfg(test)]
mod tests;
