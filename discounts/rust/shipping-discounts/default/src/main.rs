use serde::{Deserialize, Serialize};

use graphql_client::GraphQLQuery;

type UnsignedInt64 = u64;
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
    query_path = "output.graphql",
    response_derives = "Debug, Clone, PartialEq",
    normalization = "rust"
)]
struct HandleResult;

#[derive(Clone, Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct Config {
    value: Option<String>,
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
    let delivery_lines = &input.delivery_lines.unwrap_or_default();
    let targets = delivery_lines
        .iter()
        .map(|line| handle_result::Target {
            shippingLine: Some(handle_result::ShippingLineTarget { id: line.id }),
        })
        .collect();
    Ok(build_result(value, targets))
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
                "deliveryLines": [
                    { "id": "gid://shopify/DeliveryLine/0" },
                    { "id": "gid://shopify/DeliveryLine/1" }
                ]
            },
            "configuration": {
                "value": null
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
        let payload = payload(Config { value: None });
        let output = serde_json::json!(script(payload).unwrap());

        let expected_json = r#"
            {
                "discounts": [{
                    "message": "50% off",
                    "conditions": null,
                    "targets": [
                        { "shippingLine": { "id": "gid://shopify/DeliveryLine/0" } },
                        { "shippingLine": { "id": "gid://shopify/DeliveryLine/1" } }
                    ],
                    "value": {
                        "percentage": { "value": 50.0 },
                        "fixedAmount": null
                    }
                }],
                "discountApplicationStrategy": "FIRST"
            }
        "#;

        let expected_output: serde_json::Value = serde_json::from_str(expected_json).unwrap();
        assert_eq!(output.to_string(), expected_output.to_string());
    }

    #[test]
    fn test_discount_with_value() {
        let payload = payload(Config {
            value: Some("10".to_string()),
        });
        let output = serde_json::json!(script(payload).unwrap());

        let expected_json = r#"
            {
                "discounts": [{
                    "message": "10% off",
                    "conditions": null,
                    "targets": [
                        { "shippingLine": { "id": "gid://shopify/DeliveryLine/0" } },
                        { "shippingLine": { "id": "gid://shopify/DeliveryLine/1" } }
                    ],
                    "value": {
                        "percentage": { "value": 10.0 },
                        "fixedAmount": null
                    }
                }],
                "discountApplicationStrategy": "FIRST"
            }
        "#;

        let expected_output: serde_json::Value = serde_json::from_str(expected_json).unwrap();
        assert_eq!(output.to_string(), expected_output.to_string());
    }
}
