use shopify_function::prelude::*;
use shopify_function::Result;

use serde::{Deserialize, Serialize};

generate_types!(
    query_path = "./input.graphql",
    schema_path = "./schema.graphql"
);

// Create a structure that matches the JSON structure that you'll use for your configuration
#[derive(Serialize, Deserialize, Default, PartialEq)]
#[serde(rename_all(deserialize = "camelCase"))]
struct Configuration {
    state_province_code: String,
    message: String,
}

// Parse the JSON metafield value using serde
impl Configuration {
    fn from_str(value: &str) -> Self {
        serde_json::from_str(value).expect("Unable to parse configuration value from metafield")
    }
}

#[shopify_function]
fn function(input: input::ResponseData) -> Result<output::FunctionResult> {
    let no_changes = output::FunctionResult { operations: vec![] };

    // Get the configuration from the metafield on your function owner
    let config = match input.delivery_customization.metafield {
        Some(input::InputDeliveryCustomizationMetafield { value }) => {
            Configuration::from_str(&value)
        }
        None => return Ok(no_changes),
    };

    let to_rename = input
        .cart
        .delivery_groups
        .iter()
        .filter(|group| {
            let state_province = group
                .delivery_address
                .as_ref()
                .and_then(|address| address.province_code.as_ref());
            match state_province {
                // Use the configured state/province code instead of a hardcoded value
                Some(code) => code == &config.state_province_code,
                None => false,
            }
        })
        .flat_map(|group| &group.delivery_options)
        .map(|option| output::RenameOperation {
            delivery_option_handle: option.handle.to_string(),
            title: match &option.title {
                // Use the configured message, instead of a hardcoded value
                Some(title) => format!("{} - {}", title, config.message),
                None => config.message.to_string(),
            },
        })
        .map(|rename| output::Operation {
            rename: Some(rename),
            hide: None,
            move_: None,
        })
        .collect();

    Ok(output::FunctionResult {
        operations: to_rename,
    })
}

#[cfg(test)]
mod tests;
