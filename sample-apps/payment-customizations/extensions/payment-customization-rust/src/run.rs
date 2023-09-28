use shopify_function::prelude::*;
use shopify_function::Result;

use serde::{Deserialize, Serialize};

// Create a structure that matches the JSON structure that you'll use for your configuration
#[derive(Serialize, Deserialize, Default, PartialEq)]
#[serde(rename_all(deserialize = "camelCase"))]
struct Configuration {
    payment_method_name: String,
    cart_total: f64,
}

// Parse the JSON metafield value using serde
impl Configuration {
    fn from_str(value: &str) -> Self {
        serde_json::from_str(value).expect("Unable to parse configuration value from metafield")
    }
}

#[shopify_function_target(query_path = "src/run.graphql", schema_path = "schema.graphql")]
fn run(input: input::ResponseData) -> Result<output::FunctionRunResult> {
    let no_changes = output::FunctionRunResult { operations: vec![] };

    // Get the configuration from the metafield on your function owner
    let config = match input.payment_customization.metafield {
        Some(input::InputPaymentCustomizationMetafield { value }) => {
            Configuration::from_str(&value)
        }
        None => return Ok(no_changes),
    };

    // Use the configured cart total instead of a hardcoded value
    let cart_total: f64 = input.cart.cost.total_amount.amount.into();
    if cart_total < config.cart_total {
        eprintln!("Cart total is not high enough, no need to hide the payment method.");
        return Ok(no_changes);
    }

    // Use the configured payment method name instead of a hardcoded value
    let operations = input
        .payment_methods
        .iter()
        .find(|&method| {
            method
                .name
                .contains(&config.payment_method_name.to_string())
        })
        .map(|method| {
            vec![output::Operation::Hide(output::HideOperation {
                payment_method_id: method.id.to_string(),
            })]
        })
        .unwrap_or_default();

    Ok(output::FunctionRunResult { operations })
}

#[cfg(test)]
mod tests {
    use super::*;
    use shopify_function::{run_function_with_input, Result};

    #[test]
    fn test_returns_no_operations_without_configuration() -> Result<()> {
        use run::output::*;

        let result = run_function_with_input(
            run,
            r#"
                {
                    "cart": {
                        "cost": {
                            "totalAmount": {
                                "amount": "0"
                            }
                        }
                    },
                    "paymentMethods": [],
                    "paymentCustomization": {
                        "metafield": null
                    }
                }
            "#,
        )?;
        let expected = FunctionRunResult { operations: vec![] };

        assert_eq!(result, expected);
        Ok(())
    }

    #[test]
    fn test_returns_no_operations_if_total_less_than_configured() -> Result<()> {
        use run::output::*;

        let result = run_function_with_input(
            run,
            r#"
                {
                    "cart": {
                        "cost": {
                            "totalAmount": {
                                "amount": "1"
                            }
                        }
                    },
                    "paymentMethods": [{
                        "id": "1",
                        "name": "Test"
                    }],
                    "paymentCustomization": {
                        "metafield": {
                            "value": "{\"paymentMethodName\": \"Test\", \"cartTotal\": 10}"
                        }
                    }
                }
            "#,
        )?;
        let expected = FunctionRunResult { operations: vec![] };

        assert_eq!(result, expected);
        Ok(())
    }

    #[test]
    fn test_returns_no_operations_if_no_payment_method_matches_configured_name() -> Result<()> {
        use run::output::*;

        let result = run_function_with_input(
            run,
            r#"
                {
                    "cart": {
                        "cost": {
                            "totalAmount": {
                                "amount": "11"
                            }
                        }
                    },
                    "paymentMethods": [{
                        "id": "1",
                        "name": "Another payment method"
                    }],
                    "paymentCustomization": {
                        "metafield": {
                            "value": "{\"paymentMethodName\": \"Test\", \"cartTotal\": 10}"
                        }
                    }
                }
            "#,
        )?;
        let expected = FunctionRunResult { operations: vec![] };

        assert_eq!(result, expected);
        Ok(())
    }

    #[test]
    fn test_hides_matching_payment_method() -> Result<()> {
        use run::output::*;

        let result = run_function_with_input(
            run,
            r#"
                {
                    "cart": {
                        "cost": {
                            "totalAmount": {
                                "amount": "11"
                            }
                        }
                    },
                    "paymentMethods": [{
                        "id": "1",
                        "name": "Test"
                    }],
                    "paymentCustomization": {
                        "metafield": {
                            "value": "{\"paymentMethodName\": \"Test\", \"cartTotal\": 10}"
                        }
                    }
                }
            "#,
        )?;
        let expected = FunctionRunResult {
            operations: vec![Operation::Hide(HideOperation {
                payment_method_id: "1".to_string(),
            })],
        };

        assert_eq!(result, expected);
        Ok(())
    }
}
