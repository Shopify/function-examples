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

    let first_delivery_group = input
        .cart
        .delivery_groups
        .first()
        .ok_or("No delivery groups found")?;

    Ok(output::CartDeliveryOptionsDiscountsGenerateRunResult {
        operations: vec![output::DeliveryOperation::DeliveryDiscountsAdd(
            output::DeliveryDiscountsAddOperation {
                selection_strategy: output::DeliveryDiscountSelectionStrategy::ALL,
                candidates: vec![output::DeliveryDiscountCandidate {
                    targets: vec![output::DeliveryDiscountCandidateTarget::DeliveryGroup(
                        output::DeliveryGroupTarget {
                            id: first_delivery_group.id.clone(),
                        },
                    )],
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
