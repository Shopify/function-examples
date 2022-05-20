use serde::{Deserialize, Serialize};

mod api;
use api::*;

#[derive(Clone, Debug, Deserialize)]
pub struct Payload {
    pub input: input::Input,
    pub configuration: Configuration,
}

#[derive(Clone, Debug, Deserialize)]
#[serde(rename_all(deserialize = "camelCase"))]
pub struct Configuration {
    pub value: Option<String>,
    pub excluded_variant_ids: Option<Vec<ID>>,
}

impl Configuration {
    const DEFAULT_VALUE: f64 = 50.0;

    fn get_value(&self) -> f64 {
        match &self.value {
            Some(value) => value.parse().unwrap(),
            _ => Self::DEFAULT_VALUE,
        }
    }

    fn excluded_variant_ids(&self) -> Vec<ID> {
        self.excluded_variant_ids
            .as_ref()
            .unwrap_or(&vec![])
            .to_vec()
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
    let value: f64 = config.get_value();
    let merchandise_lines = &input.merchandise_lines.unwrap_or_default();
    let excluded_variant_ids = config.excluded_variant_ids();
    let targets = targets(merchandise_lines, &excluded_variant_ids);
    Ok(build_result(value, targets))
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
                "merchandiseLines": [
                    { "variant": { "id": "gid://shopify/ProductVariant/0" } },
                    { "variant": { "id": "gid://shopify/ProductVariant/1" } }
                ]
            },
            "configuration": {
                "value": null,
                "excludedVariantIds": null
            }
        }
        "#;
        let default_payload: Payload = serde_json::from_str(input).unwrap();
        Payload {
            configuration,
            ..default_payload
        }
    }

    #[test]
    fn test_discount_with_default_value() {
        let payload = payload(Configuration {
            value: None,
            excluded_variant_ids: None,
        });
        let handle_result = serde_json::json!(function(payload).unwrap());

        let expected_json = r#"
            {
                "discounts": [{
                    "message": "50% off",
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
        let payload = payload(Configuration {
            value: Some("10".to_string()),
            excluded_variant_ids: None,
        });
        let handle_result = serde_json::json!(function(payload).unwrap());

        let expected_json = r#"
            {
                "discounts": [{
                    "message": "10% off",
                    "targets": [
                        { "productVariant": { "id": "gid://shopify/ProductVariant/0" } },
                        { "productVariant": { "id": "gid://shopify/ProductVariant/1" } }
                    ],
                    "value": { "percentage": { "value": 10.0 } }
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
    fn test_discount_with_excluded_variant_gids() {
        let payload = payload(Configuration {
            value: None,
            excluded_variant_ids: Some(vec!["gid://shopify/ProductVariant/0".to_string()]),
        });
        let handle_result = serde_json::json!(function(payload).unwrap());

        let expected_json = r#"
        {
            "discounts": [{
                "message": "50% off",
                "targets": [
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
    fn test_discount_with_no_merchandise_lines() {
        let payload = Payload {
            input: input::Input {
                delivery_lines: None,
                merchandise_lines: None,
                customer: None,
                locale: None,
            },
            configuration: Configuration {
                value: None,
                excluded_variant_ids: None,
            },
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
    fn test_discount_with_no_variant_ids() {
        let payload = Payload {
            input: input::Input {
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
            },
            configuration: Configuration {
                value: None,
                excluded_variant_ids: None,
            },
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
