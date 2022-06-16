use serde::{Deserialize, Serialize};

mod api;
use api::*;

#[derive(Clone, Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Configuration {
    pub value: f64,
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
    if input.delivery_lines.is_none() {
        return Ok(FunctionResult {
            discounts: vec![],
            discount_application_strategy: DiscountApplicationStrategy::First,
        });
    }

    let delivery_lines = input.delivery_lines.as_ref().unwrap();
    let config: Configuration = input.configuration();
    let targets = targets(delivery_lines);
    Ok(build_result(config.value, targets))
}

fn targets(delivery_lines: &[input::DeliveryLineWithStrategy]) -> Vec<Target> {
    delivery_lines
        .iter()
        .filter_map(|line| {
            line.id
                .as_ref()
                .map(|id| Target::ShippingLine { id: id.to_string() })
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
            "deliveryLines": [
                { "id": "gid://shopify/DeliveryLine/0" },
                { "id": "gid://shopify/DeliveryLine/1" }
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
                        { "shippingLine": { "id": "gid://shopify/DeliveryLine/0" } },
                        { "shippingLine": { "id": "gid://shopify/DeliveryLine/1" } }
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
        }));
        let result = serde_json::json!(function(input).unwrap());

        let expected_json = r#"
            {
                "discounts": [{
                    "targets": [
                        { "shippingLine": { "id": "gid://shopify/DeliveryLine/0" } },
                        { "shippingLine": { "id": "gid://shopify/DeliveryLine/1" } }
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
    fn test_discount_with_no_delivery_lines() {
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
    fn test_discount_with_no_delivery_line_ids() {
        let input = input::Input {
            delivery_lines: Some(vec![input::DeliveryLineWithStrategy {
                id: None,
                destination: None,
                price: None,
                strategy: None,
                subscription: None,
            }]),
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
}
