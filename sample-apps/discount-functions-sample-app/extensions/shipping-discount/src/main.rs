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
        serde_json::from_str(str).expect("Unable to parse configuration value from metafield")
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
        .map(|delivery_group| Target::DeliveryGroup {
            id: delivery_group.id.to_string(),
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

    impl Default for input::Input {
        fn default() -> Self {
            serde_json::from_str(
                r#"
            {
                "cart": {
                    "deliveryGroups": [
                        { "id": "gid://shopify/CartDeliveryGroup/0" },
                        { "id": "gid://shopify/CartDeliveryGroup/1" }
                    ]
                },
                "discountNode": { "metafield": null },
                "presentmentCurrencyRate": "1.00"
            }
            "#,
            )
            .unwrap()
        }
    }

    fn input(
        config: Option<Configuration>,
        cart_delivery_groups: Option<Vec<input::CartDeliveryGroup>>,
    ) -> input::Input {
        let default_input = input::Input::default();
        let discount_node = config.map(|value| {
            let value = serde_json::to_string(&value).unwrap();
            input::DiscountNode {
                metafield: Some(input::Metafield { value }),
            }
        });
        input::Input {
            cart: input::Cart {
                delivery_groups: cart_delivery_groups.unwrap_or(default_input.cart.delivery_groups),
            },
            discount_node: discount_node.unwrap_or(default_input.discount_node),
        }
    }

    #[test]
    fn test_discount_with_no_configuration() {
        let input = input(None, None);
        let handle_result = serde_json::json!(function(input).unwrap());

        let expected_handle_result = serde_json::json!({
            "discounts": [{
                "targets": [
                    { "deliveryGroup": { "id": "gid://shopify/CartDeliveryGroup/0" } },
                    { "deliveryGroup": { "id": "gid://shopify/CartDeliveryGroup/1" } },
                ],
                "value": { "percentage": { "value": "50" } },
            }],
            "discountApplicationStrategy": "FIRST",
        });
        assert_eq!(handle_result, expected_handle_result);
    }

    #[test]
    fn test_discount_with_value() {
        let input = input(Some(Configuration { value: 12.34 }), None);
        let result = serde_json::json!(function(input).unwrap());

        let expected_result = serde_json::json!({
            "discounts": [{
                "targets": [
                    { "deliveryGroup": { "id": "gid://shopify/CartDeliveryGroup/0" } },
                    { "deliveryGroup": { "id": "gid://shopify/CartDeliveryGroup/1" } },
                ],
                "value": { "percentage": { "value": "12.34" } },
            }],
            "discountApplicationStrategy": "FIRST",
        });
        assert_eq!(result, expected_result);
    }

    #[test]
    fn test_discount_with_no_delivery_groups() {
        let input = input(None, Some(vec![]));
        let handle_result = serde_json::json!(function(input).unwrap());

        let expected_handle_result = serde_json::json!({
            "discounts": [],
            "discountApplicationStrategy": "FIRST",
        });
        assert_eq!(handle_result, expected_handle_result);
    }
}
