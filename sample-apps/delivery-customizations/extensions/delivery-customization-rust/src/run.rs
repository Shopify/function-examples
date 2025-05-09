use shopify_function::prelude::*;
use shopify_function::Result;

use serde::{Deserialize, Serialize};

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

#[shopify_function_target(query_path = "src/run.graphql", schema_path = "schema.graphql")]
fn run(input: input::ResponseData) -> Result<output::CartDeliveryOptionsTransformRunResult> {
    let no_changes = output::CartDeliveryOptionsTransformRunResult { operations: vec![] };

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
        .map(|option| {
            output::Operation::DeliveryOptionRename(output::DeliveryOptionRenameOperation {
                delivery_option_handle: option.handle.to_string(),
                title: match &option.title {
                    // Use the configured message, instead of a hardcoded value
                    Some(title) => format!("{} - {}", title, config.message),
                    None => config.message.to_string(),
                },
            })
        })
        .collect();

    Ok(output::CartDeliveryOptionsTransformRunResult {
        operations: to_rename,
    })
}

#[cfg(test)]
mod tests {
    use super::*;
    use shopify_function::{run_function_with_input, Result};

    #[test]
    fn test_returns_no_operations_without_configuration() -> Result<()> {
        use run::output::*;

        let result = run_function_with_input(
            run,
            r#"
                {
                    "cart": {
                        "deliveryGroups": []
                    },
                    "deliveryCustomization": {
                        "metafield": null
                    }
                }
            "#,
        )?;
        let expected = CartDeliveryOptionsTransformRunResult { operations: vec![] };

        assert_eq!(result, expected);
        Ok(())
    }

    #[test]
    fn test_renames_delivery_options_if_province_matches() -> Result<()> {
        use run::output::*;

        let result = run_function_with_input(
            run,
            r#"
                {
                    "cart": {
                        "deliveryGroups": [{
                            "deliveryAddress": {
                                "provinceCode": "ON"
                            },
                            "deliveryOptions": [{
                                "handle": "test_delivery_option",
                                "title": "Test Delivery Option"
                            }, {
                                "handle": "test_delivery_option_2",
                                "title": "Test Delivery Option 2"
                            }]
                        }]
                    },
                    "deliveryCustomization": {
                        "metafield": {
                            "value": "{\"stateProvinceCode\": \"ON\", \"message\": \"Test Message\"}"
                        }
                    }
                }
            "#,
        )?;
        let expected = CartDeliveryOptionsTransformRunResult {
            operations: vec![
                Operation::DeliveryOptionRename(DeliveryOptionRenameOperation {
                    delivery_option_handle: "test_delivery_option".to_string(),
                    title: "Test Delivery Option - Test Message".to_string(),
                }),
                Operation::DeliveryOptionRename(DeliveryOptionRenameOperation {
                    delivery_option_handle: "test_delivery_option_2".to_string(),
                    title: "Test Delivery Option 2 - Test Message".to_string(),
                }),
            ],
        };

        assert_eq!(result, expected);
        Ok(())
    }

    #[test]
    fn test_returns_no_operations_if_province_code_does_not_match() -> Result<()> {
        use run::output::*;

        let result = run_function_with_input(
            run,
            r#"
                {
                    "cart": {
                        "deliveryGroups": [{
                            "deliveryAddress": {
                                "provinceCode": "NC"
                            },
                            "deliveryOptions": [{
                                "handle": "test_delivery_option",
                                "title": "Test Delivery Option"
                            }]
                        }]
                    },
                    "deliveryCustomization": {
                        "metafield": {
                            "value": "{\"stateProvinceCode\": \"ON\", \"message\": \"Test Message\"}"
                        }
                    }
                }
            "#,
        )?;
        let expected = CartDeliveryOptionsTransformRunResult { operations: vec![] };

        assert_eq!(result, expected);
        Ok(())
    }
}
