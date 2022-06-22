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
    let cart_lines = &input.cart.lines;
    let config: Configuration = input.configuration();

    let converted_value = convert_to_cart_currency(config.value, &input);
    let targets = targets(cart_lines);
    Ok(build_result(converted_value, targets))
}

fn convert_to_cart_currency(value: f64, input: &input::Input) -> f64 {
    let rate = &input.presentment_currency_rate;
    value
        * rate
            .parse::<f64>()
            .expect("presentment_currency_rate is malformed.")
}

fn targets(cart_lines: &[input::CartLine]) -> Vec<Target> {
    cart_lines
        .iter()
        .filter_map(|line| {
            line.merchandise
                .id
                .as_ref()
                .map(|id| Target::ProductVariant {
                    id: id.to_string(),
                    quantity: None,
                })
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
            value: Value::FixedAmount(FixedAmount {
                amount: format!("{}", amount),
                applies_to_each_item: Some(false),
            }),
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
        configuration: Option<Configuration>,
        presentment_currency_rate: Option<Decimal>,
    ) -> input::Input {
        let cart = input::Cart {
            lines: vec![
                input::CartLine {
                    id: "gid://shopify/CartLine/0".to_string(),
                    merchandise: input::Merchandise {
                        id: Some("gid://shopify/ProductVariant/0".to_string()),
                    },
                },
                input::CartLine {
                    id: "gid://shopify/CartLine/1".to_string(),
                    merchandise: input::Merchandise {
                        id: Some("gid://shopify/ProductVariant/1".to_string()),
                    },
                },
            ],
        };
        let discount_node = input::DiscountNode {
            metafield: configuration.map(|value| {
                let value = serde_json::to_string(&value).unwrap();
                input::Metafield { value }
            }),
        };
        let presentment_currency_rate =
            presentment_currency_rate.unwrap_or_else(|| "1.00".to_string());
        input::Input {
            cart,
            discount_node,
            presentment_currency_rate,
        }
    }

    #[test]
    fn test_discount_with_no_configuration() {
        let input = input(None, None);
        let handle_result = serde_json::json!(function(input).unwrap());

        let expected_handle_result = serde_json::json!({
            "discounts": [
                {
                    "targets": [
                        { "productVariant": { "id": "gid://shopify/ProductVariant/0" } },
                        { "productVariant": { "id": "gid://shopify/ProductVariant/1" } },
                    ],
                    "value": { "fixedAmount": { "amount": "50", "appliesToEachItem": false } },
                }
            ],
            "discountApplicationStrategy": "FIRST",
        });
        assert_eq!(handle_result, expected_handle_result);
    }

    #[test]
    fn test_discount_with_value() {
        let input = input(Some(Configuration { value: 12.34 }), None);
        let handle_result = serde_json::json!(function(input).unwrap());

        let expected_handle_result = serde_json::json!({
            "discounts": [
                {
                    "targets": [
                        { "productVariant": { "id": "gid://shopify/ProductVariant/0" } },
                        { "productVariant": { "id": "gid://shopify/ProductVariant/1" } },
                    ],
                    "value": { "fixedAmount": { "amount": "12.34", "appliesToEachItem": false } },
                }
            ],
            "discountApplicationStrategy": "FIRST",
        });
        assert_eq!(handle_result, expected_handle_result);
    }

    #[test]
    fn test_discount_with_presentment_currency_rate() {
        let input = input(
            Some(Configuration { value: 10.0 }),
            Some("2.00".to_string()),
        );
        let handle_result = serde_json::json!(function(input).unwrap());

        let expected_handle_result = serde_json::json!({
            "discounts": [
                {
                    "targets": [
                        { "productVariant": { "id": "gid://shopify/ProductVariant/0" } },
                        { "productVariant": { "id": "gid://shopify/ProductVariant/1" } },
                    ],
                    "value": { "fixedAmount": { "amount": "20", "appliesToEachItem": false } },
                }
            ],
            "discountApplicationStrategy": "FIRST",
        });
        assert_eq!(handle_result, expected_handle_result);
    }

    #[test]
    fn test_discount_with_empty_cart_lines() {
        let input = input::Input {
            cart: input::Cart { lines: vec![] },
            discount_node: input::DiscountNode { metafield: None },
            presentment_currency_rate: "1.00".to_string(),
        };
        let handle_result = serde_json::json!(function(input).unwrap());

        let expected_handle_result = serde_json::json!({
            "discounts": [],
            "discountApplicationStrategy": "FIRST",
        });
        assert_eq!(handle_result, expected_handle_result);
    }
}
