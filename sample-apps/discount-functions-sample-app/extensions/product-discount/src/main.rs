use serde::{Deserialize, Serialize};

mod api;
use api::*;

#[derive(Clone, Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Configuration {
    pub value: f64,
    pub excluded_variant_ids: Vec<ID>,
}

impl Configuration {
    pub const DEFAULT_VALUE: f64 = 50.0;

    fn from_str(value: &str) -> Self {
        serde_json::from_str(value).expect("Unable to parse configuration value from metafield")
    }
}

impl Default for Configuration {
    fn default() -> Self {
        Configuration {
            value: Self::DEFAULT_VALUE,
            excluded_variant_ids: vec![],
        }
    }
}

impl input::Input {
    pub fn configuration(&self) -> Configuration {
        match &self.discount_node.metafield {
            Some(input::Metafield { value }) => Configuration::from_str(value),
            None => Configuration::default(),
        }
    }
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let input: input::Input = serde_json::from_reader(std::io::BufReader::new(std::io::stdin()))?;
    let mut out = std::io::stdout();
    let mut serializer = serde_json::Serializer::new(&mut out);
    function(input)?.serialize(&mut serializer)?;
    Ok(())
}

fn function(input: input::Input) -> Result<FunctionResult, Box<dyn std::error::Error>> {
    let config = input.configuration();
    let targets = targets(&input.cart.lines, &config.excluded_variant_ids);
    Ok(build_result(config.value, targets))
}

fn targets(cart_lines: &[input::CartLine], excluded_variant_ids: &[ID]) -> Vec<Target> {
    cart_lines
        .iter()
        .filter_map(|line| match &line.merchandise.id {
            Some(id) => {
                if !excluded_variant_ids.contains(id) {
                    Some(Target::ProductVariant {
                        id: id.to_string(),
                        quantity: None,
                    })
                } else {
                    None
                }
            }
            None => None,
        })
        .collect()
}

fn build_result(value: f64, targets: Vec<Target>) -> FunctionResult {
    let discounts = if targets.is_empty() {
        vec![]
    } else {
        vec![Discount {
            message: None,
            conditions: None,
            targets,
            value: Value::Percentage { value },
        }]
    };
    FunctionResult {
        discounts,
        discount_application_strategy: DiscountApplicationStrategy::First,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn input(
        config: Option<Configuration>,
        cart: Option<input::Cart>,
    ) -> input::Input {
        input::Input {
            discount_node: input::DiscountNode {
                metafield: Some(input::Metafield {
                    value: serde_json::to_string(&config.unwrap_or_default()).unwrap()
                })
            },
            cart: cart.unwrap_or_else(|| input::Cart {
                lines: vec![
                    input::CartLine {
                        id: "gid://shopify/CartLine/0".to_string(),
                        merchandise: input::Merchandise {
                            id: Some("gid://shopify/ProductVariant/0".to_string())
                        }
                    },
                    input::CartLine {
                        id: "gid://shopify/CartLine/1".to_string(),
                        merchandise: input::Merchandise {
                            id: Some("gid://shopify/ProductVariant/1".to_string())
                        }
                    }
                ]
            }),
        }
    }

    #[test]
    fn test_discount_with_no_configuration() {
        let input = input(None, None);
        let handle_result = serde_json::json!(function(input).unwrap());

        let expected_handle_result = serde_json::json!({
            "discounts": [{
                "targets": [
                    { "productVariant": { "id": "gid://shopify/ProductVariant/0" } },
                    { "productVariant": { "id": "gid://shopify/ProductVariant/1" } },
                ],
                "value": { "percentage": { "value": "50" } },
            }],
            "discountApplicationStrategy": "FIRST",
        });
        assert_eq!(handle_result, expected_handle_result);
    }

    #[test]
    fn test_discount_with_value() {
        let input = input(
            Some(Configuration {
                value: 12.34,
                excluded_variant_ids: vec![],
            }),
            None,
        );
        let result = serde_json::json!(function(input).unwrap());

        let expected_result = serde_json::json!({
            "discounts": [{
                "targets": [
                    { "productVariant": { "id": "gid://shopify/ProductVariant/0" } },
                    { "productVariant": { "id": "gid://shopify/ProductVariant/1" } },
                ],
                "value": { "percentage": { "value": "12.34" } },
            }],
            "discountApplicationStrategy": "FIRST",
        });
        assert_eq!(result, expected_result);
    }

    #[test]
    fn test_discount_with_excluded_variant_ids() {
        let input = input(
            Some(Configuration {
                value: Configuration::DEFAULT_VALUE,
                excluded_variant_ids: vec!["gid://shopify/ProductVariant/1".to_string()],
            }),
            None,
        );
        let result = serde_json::json!(function(input).unwrap());

        let expected_result = serde_json::json!({
            "discounts": [{
                "targets": [
                    { "productVariant": { "id": "gid://shopify/ProductVariant/0" } },
                ],
                "value": { "percentage": { "value": "50" } },
            }],
            "discountApplicationStrategy": "FIRST",
        });
        assert_eq!(result, expected_result);
    }

    #[test]
    fn test_discount_with_no_cart_lines() {
        let input = input(None, Some(input::Cart{ lines: vec![]}));
        let handle_result = serde_json::json!(function(input).unwrap());

        let expected_handle_result = serde_json::json!({
            "discounts": [],
            "discountApplicationStrategy": "FIRST",
        });
        assert_eq!(handle_result, expected_handle_result);
    }

    #[test]
    fn test_discount_with_no_variant_ids() {
        let input = input(
            None,
            Some(input::Cart {
                lines: vec![input::CartLine {
                id: "gid://shopify/CartLine/0".to_string(),
                merchandise: input::Merchandise { id: None },
            }]}),
        );
        let handle_result = serde_json::json!(function(input).unwrap());

        let expected_handle_result = serde_json::json!({
            "discounts": [],
            "discountApplicationStrategy": "FIRST",
        });
        assert_eq!(handle_result, expected_handle_result);
    }

    #[test]
    fn test_input_deserialization() {
        let input = r#"
        {
            "cart": {
                "lines": [
                    {
                        "id": "gid://shopify/CartLine/0",
                        "merchandise": { "id": "gid://shopify/ProductVariant/0" }
                    },
                    {
                        "id": "gid://shopify/CartLine/1",
                        "merchandise": { "id": "gid://shopify/ProductVariant/1" }
                    }
                ]
            },
            "discountNode": { "metafield": null }
        }
        "#;
        assert!(serde_json::from_str::<input::Input>(input).is_ok());
    }
}
