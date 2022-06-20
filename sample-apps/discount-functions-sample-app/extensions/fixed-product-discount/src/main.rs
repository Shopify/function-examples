use serde::{Deserialize, Serialize};
use serde_json::json;

mod api;
use api::*;

#[derive(Clone, Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Configuration {
    pub value: f64
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
    if input.merchandise_lines.is_none() {
        return Ok(FunctionResult {
            discounts: vec![],
            discount_application_strategy: DiscountApplicationStrategy::First,
        });
    }

    let merchandise_lines = input.merchandise_lines.as_ref().unwrap();
    let config: Configuration = input.configuration();

    let converted_value = convert_to_cart_currency(config.value, &input);
    let targets = targets(merchandise_lines);
    Ok(build_result(converted_value, targets))
}

fn convert_to_cart_currency(value: f64, input: &input::Input) -> f64 {
    if let Some(rate) = &input.presentment_currency_rate {
        value * rate.parse::<f64>().expect("presentment_currency_rate is malformed.")
    } else {
        panic!("Missing presentment_currency_rate! Cannot convert to cart currency.")
    }
}

fn targets(
    merchandise_lines: &[input::MerchandiseLine]
) -> Vec<Target> {
    variant_ids(merchandise_lines)
        .iter()
        .map(|id| {
            Target::ProductVariant {
                id: id.to_string(),
                quantity: None,
            }
        })
        .collect()
}

fn variant_ids(merchandise_lines: &[input::MerchandiseLine]) -> Vec<ID> {
    merchandise_lines
        .iter()
        .filter_map(|line| line.variant.as_ref())
        .filter_map(|variant| variant.id.as_ref().map(String::from))
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
                applies_to_each_item: None
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

    fn input(configuration: Option<Configuration>, presentment_currency_rate: Option<Decimal>) -> input::Input {
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
            presentment_currency_rate: presentment_currency_rate.or(Some("1.00".to_string())),
            ..default_input
        }
    }

    #[test]
    fn test_discount_with_no_configuration() {
        let input = input(None, None);
        let handle_result = serde_json::json!(function(input).unwrap());

        let expected_json = serde_json::json!(
            {
                "discounts": [{
                    "targets": [
                        { "productVariant": { "id": "gid://shopify/ProductVariant/0" } },
                        { "productVariant": { "id": "gid://shopify/ProductVariant/1" } }
                    ],
                    "value": { "fixedAmount": { "amount": "50", "appliesToEachItem": null } }
                }],
                "discountApplicationStrategy": "FIRST"
            }
        );

        assert_eq!(
            handle_result,
            expected_json
        );
    }

    #[test]
    fn test_discount_with_value() {
        let input = input(Some(Configuration {
            value: 10.0
        }), None);
        let result = serde_json::json!(function(input).unwrap());

        let expected_json = json!(
            {
                "discounts": [{
                    "targets": [
                        { "productVariant": { "id": "gid://shopify/ProductVariant/0" } },
                        { "productVariant": { "id": "gid://shopify/ProductVariant/1" } }
                    ],
                    "value": { "fixedAmount": { "appliesToEachItem": null, "amount": "10" } }
                }],
                "discountApplicationStrategy": "FIRST"
            }
        );

        assert_eq!(result, expected_json);
    }

    #[test]
    fn test_discount_with_presentment_rate() {
        let input = input(
            Some(Configuration {
                value: 10.0
            }),
            Some("2.00".to_string())
        );
        let result = serde_json::json!(function(input).unwrap());

        let expected_json = json!(
            {
                "discounts": [{
                    "targets": [
                        { "productVariant": { "id": "gid://shopify/ProductVariant/0" } },
                        { "productVariant": { "id": "gid://shopify/ProductVariant/1" } }
                    ],
                    "value": { "fixedAmount": { "amount": "20", "appliesToEachItem": null } }
                }],
                "discountApplicationStrategy": "FIRST"
            }
        );

        assert_eq!(result, expected_json);
    }
    #[test]
    fn test_discount_with_no_merchandise_lines() {
        let input = input::Input {
            delivery_lines: None,
            merchandise_lines: None,
            customer: None,
            locale: None,
            discount_node: None,
            presentment_currency_rate: None
        };
        let handle_result = serde_json::json!(function(input).unwrap());

        let expected_json = json!(
            {
                "discounts": [],
                "discountApplicationStrategy": "FIRST"
            }
        );

        assert_eq!(
            handle_result,
            expected_json
        );
    }
}
