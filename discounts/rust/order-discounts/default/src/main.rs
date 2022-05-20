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
    let config = payload.configuration;
    let value = config.get_value();
    let excluded_variant_ids = config.excluded_variant_ids();
    Ok(FunctionResult {
        discounts: vec![Discount {
            message: Some(format!("{}% off", value)),
            conditions: None,
            targets: vec![Target::OrderSubtotal {
                excluded_variant_ids,
            }],
            value: Value::Percentage(Percentage { value }),
        }],
        discount_application_strategy: DiscountApplicationStrategy::First,
    })
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
        let result = serde_json::json!(function(payload).unwrap());

        let expected_json = r#"
            {
                "discounts": [{
                    "message": "50% off",
                    "targets": [{ "orderSubtotal": { "excludedVariantIds": [] } }],
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
            excluded_variant_ids: None,
        });
        let result = serde_json::json!(function(payload).unwrap());

        let expected_json = r#"
            {
                "discounts": [{
                    "message": "10% off",
                    "targets": [{ "orderSubtotal": { "excludedVariantIds": [] } }],
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
        let payload = payload(Configuration {
            value: None,
            excluded_variant_ids: Some(vec!["gid://shopify/ProductVariant/1".to_string()]),
        });
        let result = serde_json::json!(function(payload).unwrap());

        let expected_json = r#"
            {
                "discounts": [{
                    "message": "50% off",
                    "targets": [{
                        "orderSubtotal": {
                            "excludedVariantIds": ["gid://shopify/ProductVariant/1"]
                        }
                    }],
                    "value": { "percentage": { "value": 50.0 } }
                }],
                "discountApplicationStrategy": "FIRST"
            }
        "#;

        let expected_result: serde_json::Value = serde_json::from_str(expected_json).unwrap();
        assert_eq!(result.to_string(), expected_result.to_string());
    }
}
