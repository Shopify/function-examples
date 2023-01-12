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
    let operations = input.fulfillment_groups.iter().map(|group| {
        let fulfillment_group_id = group.id.clone();
        let rankings = group.inventory_locations.clone().unwrap().iter().map(|inventory_location| {
            let location_id = inventory_location.location.id.clone();
            output::RankedLocation {
                location_id,
                rank: 0,
            }
        }).collect();
        let rank = output::FulfillmentGroupRankedLocations {
            fulfillment_group_id,
            rankings,
        };
        output::Operation { rank }
    }).collect();

    Ok(output::FunctionResult { operations })
}

#[cfg(test)]
mod tests;
