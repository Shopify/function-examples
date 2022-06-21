use serde::{Deserialize, Serialize};

mod api;
use api::*;

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Configuration {
    pub value: f64,
}

impl Configuration {
    pub const DEFAULT_VALUE: f64 = 50.0;

    fn from_str(str: &str) -> Self {
        serde_json::from_str(str).unwrap()
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
    let delivery_groups = &input.cart.delivery_groups;
    let config = input.configuration();
    let targets = targets(delivery_groups);
    Ok(build_result(config.value, targets))
}

fn targets(delivery_groups: &[input::CartDeliveryGroup]) -> Vec<Target> {
    delivery_groups
        .iter()
        .map(|delivery_group| {
            let id = delivery_group.selected_delivery_option.id.to_string();
            Target::ShippingLine { id }
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
            "cart": {
                "deliveryGroups": [
                  {
                    "selectedDeliveryOption": {
                      "id": "gid://shopify/CartDeliveryOption/not-free",
                      "title": "Not free",
                      "cost": { "amount": "1.0", "currencyCode": "USD" }
                    }
                  }
                ]
            },
            "discountNode": { "metafield": null }
        }
        "#;
        let default_input: input::Input = serde_json::from_str(input).unwrap();
        let discount_node = input::DiscountNode {
            metafield: configuration.map(|value| {
                let value = serde_json::to_string(&value).unwrap();
                input::Metafield { value }
            }),
        };

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
                        { "shippingLine": { "id": "gid://shopify/CartDeliveryOption/not-free" } }
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
        let input = input(Some(Configuration { value: 10.0 }));
        let result = serde_json::json!(function(input).unwrap());

        let expected_json = r#"
            {
                "discounts": [{
                    "targets": [
                        { "shippingLine": { "id": "gid://shopify/CartDeliveryOption/not-free" } }
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
    fn test_discount_with_no_delivery_groups() {
        let input = input::Input {
            cart: input::Cart {
                delivery_groups: vec![],
            },
            ..input(Some(Configuration::default()))
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
