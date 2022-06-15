use serde::Serialize;

mod api;
use api::*;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let input: input::Input = serde_json::from_reader(std::io::BufReader::new(std::io::stdin()))?;
    let mut out = std::io::stdout();
    let mut serializer = serde_json::Serializer::new(&mut out);
    function(input)?.serialize(&mut serializer)?;
    Ok(())
}

fn function(input: input::Input) -> Result<FunctionResult, Box<dyn std::error::Error>> {
    const DEFAULT_VALUE: f64 = 50.0;
    let delivery_lines = input.delivery_lines.unwrap_or_default();
    Ok(build_result(DEFAULT_VALUE, targets(&delivery_lines)))
}

fn targets(delivery_lines: &[input::DeliveryLineWithStrategy]) -> Vec<Target> {
    delivery_lines
        .iter()
        .filter_map(|line| {
            line.id
                .as_ref()
                .map(|id| Target::ShippingLine { id: id.to_string() })
        })
        .collect()
}

fn build_result(value: f64, targets: Vec<Target>) -> FunctionResult {
    let discounts = if targets.is_empty() {
        vec![]
    } else {
        vec![Discount {
            message: Some(format!("{}% off", value)),
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

    fn input() -> input::Input {
        let input = r#"
        {
            "deliveryLines": [
                { "id": "gid://shopify/DeliveryLine/0" },
                { "id": "gid://shopify/DeliveryLine/1" }
            ]
        }
        "#;
        serde_json::from_str(input).unwrap()
    }

    #[test]
    fn test_discount_with_default_value() {
        let input = input();
        let result = serde_json::json!(function(input).unwrap());

        let expected_json = r#"
            {
                "discounts": [{
                    "message": "50% off",
                    "targets": [
                        { "shippingLine": { "id": "gid://shopify/DeliveryLine/0" } },
                        { "shippingLine": { "id": "gid://shopify/DeliveryLine/1" } }
                    ],
                    "value": { "percentage": { "value": 50.0 } }
                }],
                "discountApplicationStrategy": "FIRST"
            }
        "#;

        let expected_result: serde_json::Value = serde_json::from_str(expected_json).unwrap();
        assert_eq!(result.to_string(), expected_result.to_string());
    }

    #[test]
    fn test_discount_with_no_delivery_lines() {
        let input = input::Input {
            delivery_lines: None,
            merchandise_lines: None,
            customer: None,
            locale: None,
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

    #[test]
    fn test_discount_with_no_delivery_line_ids() {
        let input = input::Input {
            delivery_lines: Some(vec![input::DeliveryLineWithStrategy {
                id: None,
                destination: None,
                price: None,
                strategy: None,
                subscription: None,
            }]),
            merchandise_lines: None,
            customer: None,
            locale: None,
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
