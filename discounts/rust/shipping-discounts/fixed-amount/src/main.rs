use serde::{Deserialize, Serialize};

mod api;
use api::*;

#[derive(Clone, Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Configuration {
    pub value: f64,
}

impl Configuration {
    const DEFAULT_VALUE: f64 = 50.00;

    fn from_str(value: &str) -> Self {
        serde_json::from_str(value).expect("Unable to parse configuration value from metafield")
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
    let converted_value = convert_to_cart_currency(config.value, input.presentment_currency_rate);
    let targets = targets(&input.cart.delivery_groups);
    Ok(build_result(converted_value, targets))
}

fn convert_to_cart_currency(value: f64, presentment_currency_rate: f64) -> f64 {
    value * presentment_currency_rate
}

fn targets(delivery_groups: &[input::CartDeliveryGroup]) -> Vec<Target> {
    delivery_groups
        .iter()
        .map(|line| Target::DeliveryGroup {
            id: line.id.to_string(),
        })
        .collect()
}

fn build_result(amount: f64, targets: Vec<Target>) -> FunctionResult {
    let discounts = if targets.is_empty() {
        vec![]
    } else {
        vec![Discount {
            message: None,
            conditions: None,
            targets,
            value: Value::FixedAmount { amount },
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
        presentment_currency_rate: Option<Decimal>,
        delivery_groups: Option<Vec<input::CartDeliveryGroup>>,
    ) -> input::Input {
        let delivery_groups = delivery_groups.unwrap_or_else(|| {
            vec![
                input::CartDeliveryGroup {
                    id: "gid://shopify/CartDeliveryGroup/0".to_string(),
                },
                input::CartDeliveryGroup {
                    id: "gid://shopify/CartDeliveryGroup/1".to_string(),
                },
            ]
        });
        input::Input {
            discount_node: input::DiscountNode {
                metafield: Some(input::Metafield {
                    value: serde_json::to_string(&config.unwrap_or_default()).unwrap(),
                }),
            },
            presentment_currency_rate: presentment_currency_rate.unwrap_or(1.00),
            cart: input::Cart { delivery_groups },
        }
    }

    #[test]
    fn test_discount_with_no_configuration() {
        let input = input(None, None, None);
        let handle_result = serde_json::json!(function(input).unwrap());

        let expected_handle_result = serde_json::json!({
            "discounts": [
                {
                    "targets": [
                        { "deliveryGroup": { "id": "gid://shopify/CartDeliveryGroup/0" } },
                        { "deliveryGroup": { "id": "gid://shopify/CartDeliveryGroup/1" } },
                    ],
                    "value": { "fixedAmount": { "amount": "50" } },
                }
            ],
            "discountApplicationStrategy": "FIRST",
        });
        assert_eq!(handle_result, expected_handle_result);
    }

    #[test]
    fn test_discount_with_value() {
        let input = input(Some(Configuration { value: 12.34 }), None, None);
        let handle_result = serde_json::json!(function(input).unwrap());

        let expected_handle_result = serde_json::json!({
            "discounts": [
                {
                    "targets": [
                        { "deliveryGroup": { "id": "gid://shopify/CartDeliveryGroup/0" } },
                        { "deliveryGroup": { "id": "gid://shopify/CartDeliveryGroup/1" } },
                    ],
                    "value": { "fixedAmount": { "amount": "12.34" } },
                }
            ],
            "discountApplicationStrategy": "FIRST",
        });
        assert_eq!(handle_result, expected_handle_result);
    }

    #[test]
    fn test_discount_with_presentment_currency_rate() {
        let input = input(Some(Configuration { value: 10.00 }), Some(2.00), None);
        let handle_result = serde_json::json!(function(input).unwrap());

        let expected_handle_result = serde_json::json!({
            "discounts": [
                {
                    "targets": [
                        { "deliveryGroup": { "id": "gid://shopify/CartDeliveryGroup/0" } },
                        { "deliveryGroup": { "id": "gid://shopify/CartDeliveryGroup/1" } },
                    ],
                    "value": { "fixedAmount": { "amount": "20" } },
                }
            ],
            "discountApplicationStrategy": "FIRST",
        });
        assert_eq!(handle_result, expected_handle_result);
    }

    #[test]
    fn test_discount_with_empty_cart_delivery_groups() {
        let input = input(None, None, Some(vec![]));
        let handle_result = serde_json::json!(function(input).unwrap());

        let expected_handle_result = serde_json::json!({
            "discounts": [],
            "discountApplicationStrategy": "FIRST",
        });
        assert_eq!(handle_result, expected_handle_result);
    }

    #[test]
    fn test_input_deserialization() {
        let input_json = r#"
        {
            "cart": {
                "deliveryGroups": [{ "id": "gid://shopify/CartDeliveryGroup/0" }]
            },
            "discountNode": { "metafield": { "value": "{\"value\":10.0}" } },
            "presentmentCurrencyRate": "2.00"
        }
        "#;

        let expected_input = input(
            Some(Configuration { value: 10.00 }),
            Some(2.00),
            Some(vec![input::CartDeliveryGroup {
                id: "gid://shopify/CartDeliveryGroup/0".to_string(),
            }]),
        );
        assert_eq!(
            expected_input,
            serde_json::from_str::<input::Input>(input_json).unwrap()
        );
    }
}
