use shopify_function::prelude::*;
use shopify_function::Result;

use serde::{Deserialize, Serialize};

// Use the shopify_function crate to generate structs for the function input and output
generate_types!(
    query_path = "./input.graphql",
    schema_path = "./schema.graphql"
);

// Create a structure that matches the JSON structure that you'll use for your configuration
#[derive(Serialize, Deserialize, PartialEq)]
#[serde(rename_all(deserialize = "camelCase"))]
struct Configuration {
    pub quantity: i64,
    pub percentage: f64,
}

impl Configuration {
    const DEFAULT_QUANTITY: i64 = 999;
    const DEFAULT_PERCENTAGE: f64 = 0.0;

    // Parse the JSON metafield value using serde
    fn from_str(value: &str) -> Self {
        serde_json::from_str(value).expect("Unable to parse configuration value from metafield")
    }
}

impl Default for Configuration {
    fn default() -> Self {
        Configuration {
            quantity: Self::DEFAULT_QUANTITY,
            percentage: Self::DEFAULT_PERCENTAGE,
        }
    }
}

#[shopify_function]
fn function(input: input::ResponseData) -> Result<output::FunctionResult> {
    let no_discount = output::FunctionResult {
        discounts: vec![],
        discount_application_strategy: output::DiscountApplicationStrategy::FIRST,
    };

    // Get the configuration from the metafield on your function owner
    let config = match input.discount_node.metafield {
        Some(input::InputDiscountNodeMetafield { value }) =>
            Configuration::from_str(&value),
        None => return Ok(no_discount),
    };

    let targets = input.cart.lines
        .iter()
        // Use the configured quantity instead of a hardcoded value
        .filter(|line| line.quantity >= config.quantity)
        .filter_map(|line| match &line.merchandise {
            input::InputCartLinesMerchandise::ProductVariant(variant) => Some(variant),
            input::InputCartLinesMerchandise::CustomProduct => None,
        })
        .map(|variant| output::Target {
            product_variant: Some(output::ProductVariantTarget {
                id: variant.id.to_string(),
                quantity: None,
           })
        })
        .collect::<Vec<output::Target>>();

    if targets.is_empty() {
        eprintln!("No cart lines qualify for volume discount.");
        return Ok(no_discount);
    }

    Ok(output::FunctionResult {
        discounts: vec![output::Discount {
            message: None,
            targets,
            // Use the configured percentage instead of a hardcoded value
            value: output::Value {
                fixed_amount: None,
                percentage: Some(output::Percentage {
                    value: config.percentage.to_string()
                })
            }
        }],
        discount_application_strategy: output::DiscountApplicationStrategy::FIRST,
    })
}

#[cfg(test)]
mod tests;