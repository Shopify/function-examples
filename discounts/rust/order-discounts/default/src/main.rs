use serde::{Deserialize, Serialize};
use serde_with::skip_serializing_none;

use graphql_client::GraphQLQuery;

type Void = ();

#[derive(GraphQLQuery)]
#[graphql(
    schema_path = "schema.graphql",
    query_path = "handle-result.graphql",
    response_derives = "Debug, Clone, PartialEq",
    normalization = "rust"
)]
struct HandleResult;

#[derive(Clone, Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct Configuration {
    value: Option<String>,
    excluded_variant_ids: Option<Vec<String>>,
}

#[derive(Clone, Debug, Deserialize)]
struct Input {
    configuration: Configuration,
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let input: Input = serde_json::from_reader(std::io::BufReader::new(std::io::stdin()))?;
    let mut out = std::io::stdout();
    let mut serializer = serde_json::Serializer::new(&mut out);
    script(input)?.serialize(&mut serializer)?;
    Ok(())
}

fn script(input: Input) -> Result<handle_result::FunctionResult, Box<dyn std::error::Error>> {
    const DEFAULT_VALUE: f64 = 50.0;

    let config = input.configuration;
    let value: f64 = if let Some(value) = config.value {
        value.parse()?
    } else {
        DEFAULT_VALUE
    };
    let excluded_variant_ids = &config.excluded_variant_ids.unwrap_or_default();
    let targets = vec![target(excluded_variant_ids)];
    Ok(build_result(value, targets))
}

fn target(excluded_variant_ids: &[String]) -> handle_result::Target {
    handle_result::Target {
        orderSubtotal: Some(handle_result::OrderSubtotalTarget {
            excludedVariantIds: excluded_variant_ids
                .iter()
                .filter_map(|gid| gid.split('/').last().map(|id| id.parse().unwrap()))
                .collect(),
        }),
        productVariant: None,
    }
}

fn build_result(value: f64, targets: Vec<handle_result::Target>) -> handle_result::FunctionResult {
    handle_result::FunctionResult {
        discounts: vec![handle_result::Discount {
            message: Some(format!("{}% off", value)),
            conditions: None,
            targets,
            value: handle_result::Value {
                percentage: Some(handle_result::Percentage { value }),
                fixedAmount: None,
            },
        }],
        discountApplicationStrategy: handle_result::DiscountApplicationStrategy::First,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_discount_with_default_value() {
        let input = Input {
            configuration: Configuration {
                value: None,
                excluded_variant_ids: None,
            },
        };
        let result = serde_json::json!(script(input).unwrap());

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
        let input = Input {
            configuration: Configuration {
                value: Some("10".to_string()),
                excluded_variant_ids: None,
            },
        };
        let result = serde_json::json!(script(input).unwrap());

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
        let input = Input {
            configuration: Configuration {
                value: None,
                excluded_variant_ids: Some(vec!["gid://shopify/ProductVariant/0".to_string()]),
            },
        };
        let result = serde_json::json!(script(input).unwrap());

        let expected_json = r#"
            {
                "discounts": [{
                    "message": "50% off",
                    "targets": [{ "orderSubtotal": { "excludedVariantIds": [0] } }],
                    "value": { "percentage": { "value": 50.0 } }
                }],
                "discountApplicationStrategy": "FIRST"
            }
        "#;

        let expected_result: serde_json::Value = serde_json::from_str(expected_json).unwrap();
        assert_eq!(result.to_string(), expected_result.to_string());
    }
}
