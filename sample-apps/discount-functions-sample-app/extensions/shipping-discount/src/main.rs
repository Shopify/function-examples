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
    if input.cart.delivery_groups.is_empty() {
        return Ok(FunctionResult {
            discounts: vec![],
            discount_application_strategy: DiscountApplicationStrategy::First,
        });
    }

    let delivery_groups = &input.cart.delivery_groups;
    let config: input::Configuration = input.configuration();
    let targets = targets(delivery_groups);
    Ok(build_result(config.value, targets))
}

fn targets(delivery_groups: &[input::CartDeliveryGroup]) -> Vec<Target> {
    delivery_groups
        .iter()
        .map(|delivery_group| {
            let id = delivery_group.selected_delivery_option.id.to_string();
            Target::ShippingLine { id }
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

    fn input(configuration: Option<input::Configuration>) -> input::Input {
        let input = r#"
        {
            "cart": {
                "deliveryGroups": [
                  {
                    "selectedDeliveryOption": {
                      "id": "gid://shopify/CartDeliveryOption/not-free",
                      "title": "Not free",
                      "cost": { "amount": "1.0", "currencyCode": "USD" }
                    }
                  }
                ]
            },
            "discountNode": {
                "metafield": {
                    "value": "{}"
                }
            }
        }
        "#;
        let default_input: input::Input = serde_json::from_str(input).unwrap();
        let discount_node = input::DiscountNode {
            metafield: input::Metafield {
                value: serde_json::to_string(&configuration).ok().unwrap(),
            },
        };

        input::Input {
            discount_node,
            ..default_input
        }
    }

    #[test]
    fn test_discount_with_no_configuration() {
        let input = input(None);
        let handle_result = serde_json::json!(function(input).unwrap());

        let expected_json = r#"
            {
                "discounts": [{
                    "targets": [
                        { "shippingLine": { "id": "gid://shopify/CartDeliveryOption/not-free" } }
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
        let input = input(Some(input::Configuration { value: 10.0 }));
        let result = serde_json::json!(function(input).unwrap());

        let expected_json = r#"
            {
                "discounts": [{
                    "targets": [
                        { "shippingLine": { "id": "gid://shopify/CartDeliveryOption/not-free" } }
                    ],
                    "value": { "percentage": { "value": 10.0 } }
                }],
                "discountApplicationStrategy": "FIRST"
            }
        "#;

        let expected_result: serde_json::Value = serde_json::from_str(expected_json).unwrap();
        assert_eq!(result.to_string(), expected_result.to_string());
    }

    #[test]
    fn test_discount_with_no_delivery_groups() {
        let input = input::Input {
            cart: input::Cart {
                delivery_groups: vec![],
            },
            ..input(Some(input::Configuration::default()))
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
