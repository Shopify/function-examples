use shopify_function::prelude::*;
use shopify_function::Result;

use serde::Serialize;

// Use the shopify_function crate to generate structs for the function input and output
generate_types!(
    query_path = "./input.graphql",
    schema_path = "./schema.graphql"
);

// Use the shopify_function crate to declare your function entrypoint
#[shopify_function]
fn function(input: input::ResponseData) -> Result<output::FunctionResult> {
    // The message we wish to add to the delivery option
    let message = "May be delayed due to weather conditions";

    let to_rename = input
        .cart
        .delivery_groups
        .iter()
        // Filter for delivery groups with a shipping address containing the affected state or province
        .filter(|group| {
            let state_province = group
                .delivery_address
                .as_ref()
                .and_then(|address| address.province_code.as_ref());
            match state_province {
                Some(code) => code == "NC",
                None => false,
            }
        })
        // Collect the delivery options from these groups
        .flat_map(|group| &group.delivery_options)
        // Construct a rename operation for each, adding the message to the option title
        .map(|option| output::RenameOperation {
            delivery_option_handle: option.handle.to_string(),
            title: match &option.title {
                Some(title) => format!("{} - {}", title, message),
                None => message.to_string(),
            },
        })
        // Wrap with an Operation
        .map(|rename| output::Operation {
            rename: Some(rename),
            hide: None,
            move_: None,
        })
        .collect();

    // The shopify_function crate serializes your function result and writes it to STDOUT
    Ok(output::FunctionResult {
        operations: to_rename,
    })
}

#[cfg(test)]
mod tests;
