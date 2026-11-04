use shopify_function::prelude::*;
use shopify_function::Result;

#[shopify_function_target(
    query_path = "src/cart_delivery_options_discounts_generate_run.graphql",
    schema_path = "schema.graphql"
)]
fn cart_delivery_options_discounts_generate_run(
    input: input::ResponseData,
) -> Result<output::CartDeliveryOptionsDiscountsGenerateRunResult> {
    let has_shipping_discount_class = input
        .discount
        .discount_classes
        .contains(&input::DiscountClass::SHIPPING);
    if !has_shipping_discount_class {
        return Ok(output::CartDeliveryOptionsDiscountsGenerateRunResult { operations: vec![] });
    }

    // A split cart can list the pickup group first, so discount every group.
    let targets: Vec<output::DeliveryDiscountCandidateTarget> = input
        .cart
        .delivery_groups
        .iter()
        .map(|group| {
            output::DeliveryDiscountCandidateTarget::DeliveryGroup(output::DeliveryGroupTarget {
                id: group.id.clone(),
            })
        })
        .collect();

    if targets.is_empty() {
        return Ok(output::CartDeliveryOptionsDiscountsGenerateRunResult { operations: vec![] });
    }

    Ok(output::CartDeliveryOptionsDiscountsGenerateRunResult {
        operations: vec![output::DeliveryOperation::DeliveryDiscountsAdd(
            output::DeliveryDiscountsAddOperation {
                selection_strategy: output::DeliveryDiscountSelectionStrategy::ALL,
                candidates: vec![output::DeliveryDiscountCandidate {
                    targets,
                    value: output::DeliveryDiscountCandidateValue::Percentage(output::Percentage {
                        value: Decimal(100.0),
                    }),
                    message: Some("FREE DELIVERY".to_string()),
                    associated_discount_code: None,
                }],
            },
        )],
    })
}

#[cfg(test)]
mod tests {
    use super::*;
    use cart_delivery_options_discounts_generate_run::output;
    use shopify_function::run_function_with_input;

    const PICKUP_GROUP: &str = r#"{ "id": "gid://shopify/CartDeliveryGroup/0" }"#;
    const SHIPPING_GROUP: &str = r#"{ "id": "gid://shopify/CartDeliveryGroup/1" }"#;

    fn run(
        delivery_groups: &[&str],
        discount_classes: &str,
    ) -> Result<Vec<output::DeliveryOperation>> {
        let input = format!(
            r#"{{
                "cart": {{ "deliveryGroups": [{}] }},
                "discount": {{ "discountClasses": {} }}
            }}"#,
            delivery_groups.join(","),
            discount_classes
        );
        let result = run_function_with_input(cart_delivery_options_discounts_generate_run, &input)?;
        Ok(result.operations)
    }

    fn free_delivery_operations(group_ids: &[&str]) -> Vec<output::DeliveryOperation> {
        vec![output::DeliveryOperation::DeliveryDiscountsAdd(
            output::DeliveryDiscountsAddOperation {
                selection_strategy: output::DeliveryDiscountSelectionStrategy::ALL,
                candidates: vec![output::DeliveryDiscountCandidate {
                    targets: group_ids
                        .iter()
                        .map(|id| {
                            output::DeliveryDiscountCandidateTarget::DeliveryGroup(
                                output::DeliveryGroupTarget { id: id.to_string() },
                            )
                        })
                        .collect(),
                    value: output::DeliveryDiscountCandidateValue::Percentage(output::Percentage {
                        value: Decimal(100.0),
                    }),
                    message: Some("FREE DELIVERY".to_string()),
                    associated_discount_code: None,
                }],
            },
        )]
    }

    #[test]
    fn returns_no_operations_without_the_shipping_discount_class() -> Result<()> {
        assert_eq!(run(&[SHIPPING_GROUP], "[]")?, vec![]);
        Ok(())
    }

    #[test]
    fn discounts_the_delivery_group() -> Result<()> {
        assert_eq!(
            run(&[SHIPPING_GROUP], r#"["SHIPPING"]"#)?,
            free_delivery_operations(&["gid://shopify/CartDeliveryGroup/1"])
        );
        Ok(())
    }

    #[test]
    fn discounts_every_group_when_the_pickup_group_is_first_in_a_split() -> Result<()> {
        assert_eq!(
            run(&[PICKUP_GROUP, SHIPPING_GROUP], r#"["SHIPPING"]"#)?,
            free_delivery_operations(&[
                "gid://shopify/CartDeliveryGroup/0",
                "gid://shopify/CartDeliveryGroup/1",
            ])
        );
        Ok(())
    }

    #[test]
    fn returns_no_operations_without_delivery_groups() -> Result<()> {
        assert_eq!(run(&[], r#"["SHIPPING"]"#)?, vec![]);
        Ok(())
    }
}
