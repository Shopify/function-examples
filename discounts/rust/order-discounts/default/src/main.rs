use serde::{Deserialize, Serialize};

mod api;
use api::*;

#[derive(Clone, Debug, Deserialize)]
pub struct Payload {
    pub configuration: Configuration,
}

#[derive(Clone, Debug, Deserialize)]
#[serde(rename_all(deserialize = "camelCase"))]
pub struct Configuration {
    pub value: Option<String>,
    pub excluded_variant_ids: Option<Vec<String>>,
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
    Ok(FunctionResult {
        discounts: vec![Discount {
            value: Value::Percentage(Percentage { value }),
            targets: vec![Target::OrderSubtotal {
                excluded_variant_ids: config.excluded_variant_ids(),
            }],
            message: Some(format!("{}% off", value)),
            conditions: None,
        }],
        discount_application_strategy: DiscountApplicationStrategy::First,
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_discount_with_default_value() {
        let payload = Payload {
            configuration: Configuration {
                value: None,
                excluded_variant_ids: None,
            },
        };
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
        let payload = Payload {
            configuration: Configuration {
                value: Some("10".to_string()),
                excluded_variant_ids: None,
            },
        };
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
        let payload = Payload {
            configuration: Configuration {
                value: None,
                excluded_variant_ids: Some(vec!["gid://shopify/ProductVariant/1".to_string()]),
            },
        };
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
