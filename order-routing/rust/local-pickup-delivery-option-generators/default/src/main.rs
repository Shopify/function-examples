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
    let operations = vec![output::Operation {
        add: output::LocalPickupDeliveryOption {
            fulfillment_group_ids: None,
            code: "Main St.".to_string(),
            title: "Main St.".to_string(),
            cost: Decimal(1.99),
            pickup_location: output::PickupLocation {
                location_handle: "2578303".to_string(),
                pickup_instruction: Some("Usually ready in 24 hours.".to_string()),
            },
            metadata: None,
        },
    }];

    // Build operations based on the input query response here.

    Ok(output::FunctionResult { operations })
}

#[cfg(test)]
mod tests;
