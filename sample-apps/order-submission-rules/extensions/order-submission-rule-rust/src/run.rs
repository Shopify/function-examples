use shopify_function::prelude::*;
use shopify_function::Result;

use crate::run::run::output::OrderSubmission;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Default, PartialEq)]
#[serde(rename_all(deserialize = "camelCase"))]
struct Configuration {
    cart_total: f64,
}

impl Configuration {
    fn from_str(value: &str) -> Self {
        serde_json::from_str(value).expect("Unable to parse configuration value from metafield")
    }
}

#[shopify_function_target(query_path = "src/run.graphql", schema_path = "schema.graphql")]
fn run(input: input::ResponseData) -> Result<output::FunctionRunResult> {
    let no_changes = output::FunctionRunResult { operations: vec![] };

    let config = match input.order_submission_rule.metafield {
        Some(input::InputOrderSubmissionRuleMetafield { value }) => Configuration::from_str(&value),
        None => return Ok(no_changes),
    };

    let cart_total: f64 = input.cart.cost.total_amount.amount.into();
    if cart_total < config.cart_total {
        eprintln!("Cart total is below threshold, set submission to Order");
        Ok(output::FunctionRunResult {
            operations: vec![output::Operation::Set(output::SetOperation {
                order_submission_type: OrderSubmission::ORDER,
            })],
        })
    } else {
        eprintln!("Cart total has met the threshold, set submission to Review");
        Ok(output::FunctionRunResult {
            operations: vec![output::Operation::Set(output::SetOperation {
                order_submission_type: OrderSubmission::REVIEW,
            })],
        })
    }
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
                    "orderSubmissionRule": {
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
    fn test_sets_order_when_total_less_than_configured() -> Result<()> {
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
                    "orderSubmissionRule": {
                        "metafield": {
                            "value": "{\"cartTotal\": 10}"
                        }
                    }
                }
            "#,
        )?;
        let expected = FunctionRunResult {
            operations: vec![Operation::Set(SetOperation {
                order_submission_type: OrderSubmission::ORDER,
            })],
        };

        assert_eq!(result, expected);
        Ok(())
    }

    #[test]
    fn test_sets_review_when_total_more_than_configured() -> Result<()> {
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
                    "orderSubmissionRule": {
                        "metafield": {
                            "value": "{\"cartTotal\": 10}"
                        }
                    }
                }
            "#,
        )?;

        let expected = FunctionRunResult {
            operations: vec![Operation::Set(SetOperation {
                order_submission_type: OrderSubmission::REVIEW,
            })],
        };

        assert_eq!(result, expected);
        Ok(())
    }
}
