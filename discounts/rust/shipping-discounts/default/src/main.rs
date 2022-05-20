use serde::{Deserialize, Serialize};

mod api;
use api::*;

#[derive(Clone, Debug, Deserialize)]
pub struct Payload {
    pub input: input::Input,
    pub configuration: Configuration,
}

#[derive(Clone, Debug, Deserialize)]
pub struct Configuration {
    pub value: Option<String>,
}

impl Configuration {
    const DEFAULT_VALUE: f64 = 50.0;

    fn get_value(&self) -> f64 {
        match &self.value {
            Some(value) => value.parse().unwrap(),
            _ => Self::DEFAULT_VALUE,
        }
    }
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let payload: Payload = serde_json::from_reader(std::io::BufReader::new(std::io::stdin()))?;
    let mut out = std::io::stdout();
    let mut serializer = serde_json::Serializer::new(&mut out);
    function(payload)?.serialize(&mut serializer)?;
    Ok(())
}

fn function(payload: Payload) -> Result<FunctionResult, Box<dyn std::error::Error>> {
    let (input, config) = (payload.input, payload.configuration);
    let value = config.get_value();
    let delivery_lines = input.delivery_lines.unwrap_or_default();
    Ok(build_result(value, targets(&delivery_lines)))
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
            message: Some(format!("{}% off", value)),
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

    fn payload(configuration: Configuration) -> Payload {
        let input = r#"
        {
            "input": {
                "deliveryLines": [
                    { "id": "gid://shopify/DeliveryLine/0" },
                    { "id": "gid://shopify/DeliveryLine/1" }
                ]
            },
            "configuration": {
                "value": null
            }
        }
        "#;
        let default_payload: Payload = serde_json::from_str(&input).unwrap();
        Payload {
            configuration,
            ..default_payload
        }
    }

    #[test]
    fn test_discount_with_default_value() {
        let payload = payload(Configuration { value: None });
        let result = serde_json::json!(function(payload).unwrap());

        let expected_json = r#"
            {
                "discounts": [{
                    "message": "50% off",
                    "targets": [
                        { "shippingLine": { "id": "gid://shopify/DeliveryLine/0" } },
                        { "shippingLine": { "id": "gid://shopify/DeliveryLine/1" } }
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
    fn test_discount_with_value() {
        let payload = payload(Configuration {
            value: Some("10".to_string()),
        });
        let result = serde_json::json!(function(payload).unwrap());

        let expected_json = r#"
            {
                "discounts": [{
                    "message": "10% off",
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
        let payload = Payload {
            input: input::Input {
                delivery_lines: None,
                merchandise_lines: None,
                customer: None,
                locale: None,
            },
            configuration: Configuration { value: None },
        };
        let handle_result = serde_json::json!(function(payload).unwrap());

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
        let payload = Payload {
            input: input::Input {
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
            },
            configuration: Configuration { value: None },
        };
        let handle_result = serde_json::json!(function(payload).unwrap());

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
