use serde::{Deserialize, Serialize};

use graphql_client::GraphQLQuery;

type Void = ();

#[derive(GraphQLQuery)]
#[graphql(
    schema_path = "schema.graphql",
    query_path = "input.graphql",
    response_derives = "Debug, Clone, PartialEq",
    normalization = "rust"
)]
struct Input;

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
struct Config {
    value: Option<String>,
    excluded_variant_ids: Option<Vec<String>>,
}

#[derive(Clone, Debug, Deserialize)]
struct Payload {
    input: input::ResponseData,
    configuration: Config,
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let payload: Payload = serde_json::from_reader(std::io::BufReader::new(std::io::stdin()))?;
    let mut out = std::io::stdout();
    let mut serializer = serde_json::Serializer::new(&mut out);
    script(payload)?.serialize(&mut serializer)?;
    Ok(())
}

fn script(payload: Payload) -> Result<handle_result::FunctionResult, Box<dyn std::error::Error>> {
    const DEFAULT_VALUE: f64 = 50.0;

    let (input, config) = (payload.input, payload.configuration);
    let value: f64 = if let Some(value) = config.value {
        value.parse()?
    } else {
        DEFAULT_VALUE
    };
    let merchandise_lines = &input.merchandise_lines.unwrap_or_default();
    let excluded_variant_ids = &config.excluded_variant_ids.unwrap_or_default();
    let targets = targets(&merchandise_lines, &excluded_variant_ids);
    Ok(build_result(value, targets))
}

fn targets(
    merchandise_lines: &Vec<input::InputMerchandiseLines>,
    excluded_variant_ids: &[String],
) -> Vec<handle_result::Target> {
    merchandise_lines
        .iter()
        .filter_map(|line| match line.variant {
            Some(ref variant) if !excluded_variant_ids.contains(&(variant.id)) => {
                Some(handle_result::Target {
                    productVariant: Some(handle_result::ProductVariantTarget {
                        id: variant.id,
                        quantity: None,
                    }),
                })
            }
            _ => None,
        })
        .collect()
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

    fn payload(configuration: Config) -> Payload {
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
        let default_payload: Payload = serde_json::from_str(&input).unwrap();
        Payload {
            configuration,
            ..default_payload
        }
    }

    #[test]
    fn test_discount_with_default_value() {
        let payload = payload(Config {
            value: None,
            excluded_variant_ids: None,
        });
        let handle_result = serde_json::json!(script(payload).unwrap());

        let expected_json = r#"
            {
                "discounts": [{
                    "message": "50% off",
                    "conditions": null,
                    "targets": [
                        { "productVariant": { "id": "gid://shopify/ProductVariant/0", "quantity": null } },
                        { "productVariant": { "id": "gid://shopify/ProductVariant/1", "quantity": null } }
                    ],
                    "value": {
                        "percentage": { "value": 50.0 },
                        "fixedAmount": null
                    }
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
        let payload = payload(Config {
            value: Some("10".to_string()),
            excludedVariantIds: None,
        });
        let handle_result = serde_json::json!(script(payload).unwrap());

        let expected_json = r#"
            {
                "discounts": [{
                    "message": "10% off",
                    "conditions": null,
                    "targets": [
                        { "productVariant": { "id": "gid://shopify/ProductVariant/0", "quantity": null } },
                        { "productVariant": { "id": "gid://shopify/ProductVariant/1", "quantity": null } }
                    ],
                    "value": {
                        "percentage": { "value": 10.0 },
                        "fixedAmount": null
                    }
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
        let payload = payload(Config {
            value: None,
            excluded_variant_ids: Some(vec!["gid://shopify/ProductVariant/0".to_string()]),
        });
        let handle_result = serde_json::json!(script(payload).unwrap());

        let expected_json = r#"
            {
                "discounts": [{
                    "message": "50% off",
                    "conditions": null,
                    "targets": [
                        { "productVariant": { "id": "gid://shopify/ProductVariant/1", "quantity": null } }
                    ],
                    "value": {
                        "percentage": { "value": 50.0 },
                        "fixedAmount": null
                    }
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
}
