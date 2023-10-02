use shopify_function::prelude::*;
use shopify_function::Result;

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, PartialEq)]
#[serde(rename_all(deserialize = "camelCase"))]
struct Configuration {
    pub quantity: i64,
    pub percentage: f64,
}

impl Configuration {
    const DEFAULT_QUANTITY: i64 = 999;
    const DEFAULT_PERCENTAGE: f64 = 0.0;

    fn from_str(value: &str) -> Self {
        serde_json::from_str(value).expect("Unable to parse configuration value from metafield")
    }
}

impl Default for Configuration {
    fn default() -> Self {
        Configuration {
            quantity: Self::DEFAULT_QUANTITY,
            percentage: Self::DEFAULT_PERCENTAGE,
        }
    }
}

#[shopify_function_target(query_path = "src/run.graphql", schema_path = "schema.graphql")]
fn run(input: input::ResponseData) -> Result<output::FunctionRunResult> {
    let no_discount = output::FunctionRunResult {
        discounts: vec![],
        discount_application_strategy: output::DiscountApplicationStrategy::FIRST,
    };

    let config = match input.discount_node.metafield {
        Some(input::InputDiscountNodeMetafield { value }) => Configuration::from_str(&value),
        None => return Ok(no_discount),
    };

    let targets = input
        .cart
        .lines
        .iter()
        .filter(|line| line.quantity >= config.quantity)
        .filter_map(|line| match &line.merchandise {
            input::InputCartLinesMerchandise::ProductVariant(variant) => Some(variant),
            input::InputCartLinesMerchandise::CustomProduct => None,
        })
        .map(|variant| {
            output::Target::ProductVariant(output::ProductVariantTarget {
                id: variant.id.to_string(),
                quantity: None,
            })
        })
        .collect::<Vec<output::Target>>();

    if targets.is_empty() {
        eprintln!("No cart lines qualify for volume discount.");
        return Ok(no_discount);
    }

    Ok(output::FunctionRunResult {
        discounts: vec![output::Discount {
            message: None,
            targets,
            value: output::Value::Percentage(output::Percentage {
                value: Decimal(config.percentage),
            }),
        }],
        discount_application_strategy: output::DiscountApplicationStrategy::FIRST,
    })
}

#[cfg(test)]
mod tests {
    use super::*;
    use shopify_function::{run_function_with_input, Result};

    #[test]
    fn test_no_metafield_result_contains_no_discounts() -> Result<()> {
        let result = run_function_with_input(
            run,
            r#"
                {
                    "cart": {
                        "lines": [
                            {
                                "quantity": 10,
                                "merchandise": {
                                    "__typename": "ProductVariant",
                                    "id": "gid://shopify/ProductVariant/123456789"
                                }
                            }
                        ]
                    },
                    "discountNode": {
                        "metafield": null
                    }
                }
            "#,
        )?;
        let expected = 0;

        assert_eq!(result.discounts.len(), expected);
        Ok(())
    }

    #[test]
    fn test_quantity_unmet_result_contains_no_discounts() -> Result<()> {
        let result = run_function_with_input(
            run,
            r#"
                {
                    "cart": {
                        "lines": [
                            {
                                "quantity": 1,
                                "merchandise": {
                                    "__typename": "ProductVariant",
                                    "id": "gid://shopify/ProductVariant/123456789"
                                }
                            }
                        ]
                    },
                    "discountNode": {
                        "metafield": {
                            "value": "{\"quantity\":2,\"percentage\":5}"
                        }
                    }
                }
            "#,
        )?;
        let expected = 0;

        assert_eq!(result.discounts.len(), expected);
        Ok(())
    }

    #[test]
    fn test_quantity_met_discounts_variants() -> Result<()> {
        use run::output::*;

        let result = run_function_with_input(
            run,
            r#"
                {
                    "cart": {
                        "lines": [
                            {
                                "quantity": 2,
                                "merchandise": {
                                    "__typename": "ProductVariant",
                                    "id": "gid://shopify/ProductVariant/123456789"
                                }
                            },
                            {
                                "quantity": 3,
                                "merchandise": {
                                    "__typename": "ProductVariant",
                                    "id": "gid://shopify/ProductVariant/987654321"
                                }
                            }
                        ]
                    },
                    "discountNode": {
                        "metafield": {
                            "value": "{\"quantity\":2,\"percentage\":5}"
                        }
                    }
                }
            "#,
        )?;
        let expected = FunctionRunResult {
            discount_application_strategy: DiscountApplicationStrategy::FIRST,
            discounts: vec![Discount {
                message: None,
                targets: vec![
                    Target::ProductVariant(ProductVariantTarget {
                        id: "gid://shopify/ProductVariant/123456789".to_string(),
                        quantity: None,
                    }),
                    Target::ProductVariant(ProductVariantTarget {
                        id: "gid://shopify/ProductVariant/987654321".to_string(),
                        quantity: None,
                    }),
                ],
                value: Value::Percentage(Percentage {
                    value: Decimal(5f64),
                }),
            }],
        };

        assert_eq!(result, expected);
        Ok(())
    }
}
