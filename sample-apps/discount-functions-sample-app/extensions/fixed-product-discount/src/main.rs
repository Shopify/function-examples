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
    const DEFAULT_VALUE: f64 = 50.0;

    fn from_str(str: &str) -> Self {
        serde_json::from_str(str).unwrap_or_default()
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
    fn configuration(&self) -> Configuration {
        let value: Option<&str> = self.discount_node.as_ref().and_then(|discount_node| {
            discount_node
                .metafield
                .as_ref()
                .and_then(|metafield| metafield.value.as_deref())
        });
        value.map(Configuration::from_str).unwrap_or_default()
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
    if input.merchandise_lines.is_none() {
        return Ok(FunctionResult {
            discounts: vec![],
            discount_application_strategy: DiscountApplicationStrategy::First,
        });
    }

    let merchandise_lines = input.merchandise_lines.as_ref().unwrap();
    let config: Configuration = input.configuration();
    let targets = targets(merchandise_lines, &config.excluded_variant_ids);
    Ok(build_result(config.value, targets))
}

fn variant_ids(merchandise_lines: &[input::MerchandiseLine]) -> Vec<ID> {
    merchandise_lines
        .iter()
        .filter_map(|line| line.variant.as_ref())
        .filter_map(|variant| variant.id.as_ref().map(String::from))
        .collect()
}

fn targets(
    merchandise_lines: &[input::MerchandiseLine],
    excluded_variant_ids: &[ID],
) -> Vec<Target> {
    variant_ids(merchandise_lines)
        .iter()
        .filter_map(|id| {
            if !excluded_variant_ids.contains(id) {
                Some(Target::ProductVariant {
                    id: id.to_string(),
                    quantity: None,
                })
            } else {
                None
            }
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
            value: Value::Percentage(Percentage { value }),
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

    fn input(configuration: Option<Configuration>) -> input::Input {
        let input = r#"
        {
            "merchandiseLines": [
                { "variant": { "id": "gid://shopify/ProductVariant/0" } },
                { "variant": { "id": "gid://shopify/ProductVariant/1" } }
            ]
        }
        "#;
        let default_input: input::Input = serde_json::from_str(input).unwrap();
        let discount_node = Some(input::DiscountNode {
            metafield: Some(input::Metafield {
                value: serde_json::to_string(&configuration).ok(),
            }),
        });

        input::Input {
            discount_node,
            ..default_input
        }
    }

    #[test]
    fn test_discount_with_no_configuration() {
        let input = input(None);
        let handle_result = serde_json::json!(function(input).unwrap());

        let expected_json = r#"
            {
                "discounts": [{
                    "targets": [
                        { "productVariant": { "id": "gid://shopify/ProductVariant/0" } },
                        { "productVariant": { "id": "gid://shopify/ProductVariant/1" } }
                    ],
                    "value": { "percentage": { "value": 50.0 } }
                }],
                "discountApplicationStrategy": "FIRST"
            }
        "#;

        let expected_handle_result: serde_json::Value =
            serde_json::from_str(expected_json).unwrap();
        assert_eq!(
            handle_result.to_string(),
            expected_handle_result.to_string()
        );
    }

    #[test]
    fn test_discount_with_value() {
        let input = input(Some(Configuration {
            value: 10.0,
            excluded_variant_ids: vec![],
        }));
        let result = serde_json::json!(function(input).unwrap());

        let expected_json = r#"
            {
                "discounts": [{
                    "targets": [
                        { "productVariant": { "id": "gid://shopify/ProductVariant/0" } },
                        { "productVariant": { "id": "gid://shopify/ProductVariant/1" } }
                    ],
                    "value": { "percentage": { "value": 10.0 } }
                }],
                "discountApplicationStrategy": "FIRST"
            }
        "#;

        let expected_result: serde_json::Value = serde_json::from_str(expected_json).unwrap();
        assert_eq!(result.to_string(), expected_result.to_string());
    }

    #[test]
    fn test_discount_with_excluded_variant_ids() {
        let input = input(Some(Configuration {
            value: Configuration::DEFAULT_VALUE,
            excluded_variant_ids: vec!["gid://shopify/ProductVariant/1".to_string()],
        }));
        let result = serde_json::json!(function(input).unwrap());

        let expected_json = r#"
            {
                "discounts": [{
                    "targets": [
                        { "productVariant": { "id": "gid://shopify/ProductVariant/0" } }
                    ],
                    "value": { "percentage": { "value": 50.0 } }
                }],
                "discountApplicationStrategy": "FIRST"
            }
        "#;

        let expected_result: serde_json::Value = serde_json::from_str(expected_json).unwrap();
        assert_eq!(result.to_string(), expected_result.to_string());
    }

    #[test]
    fn test_discount_with_no_merchandise_lines() {
        let input = input::Input {
            delivery_lines: None,
            merchandise_lines: None,
            customer: None,
            locale: None,
            discount_node: None,
        };
        let handle_result = serde_json::json!(function(input).unwrap());

        let expected_json = r#"
            {
                "discounts": [],
                "discountApplicationStrategy": "FIRST"
            }
        "#;

        let expected_handle_result: serde_json::Value =
            serde_json::from_str(expected_json).unwrap();
        assert_eq!(
            handle_result.to_string(),
            expected_handle_result.to_string()
        );
    }

    #[test]
    fn test_discount_with_no_variant_ids() {
        let input = input::Input {
            delivery_lines: None,
            merchandise_lines: Some(vec![input::MerchandiseLine {
                id: None,
                variant: Some(input::Variant {
                    id: None,
                    compare_at_price: None,
                    product: None,
                    sku: None,
                    title: None,
                }),
                price: None,
                properties: None,
                quantity: None,
                selling_plan: None,
                weight: None,
            }]),
            customer: None,
            locale: None,
            discount_node: None,
        };
        let handle_result = serde_json::json!(function(input).unwrap());

        let expected_json = r#"
            {
                "discounts": [],
                "discountApplicationStrategy": "FIRST"
            }
        "#;

        let expected_handle_result: serde_json::Value =
            serde_json::from_str(expected_json).unwrap();
        assert_eq!(
            handle_result.to_string(),
            expected_handle_result.to_string()
        );
    }
}
