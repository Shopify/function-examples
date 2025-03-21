use shopify_function::prelude::*;
use shopify_function::Result;

use cart_delivery_options_discounts_generate_run::output::{
    CartDeliveryOptionsDiscountsGenerateRunResult, DeliveryDiscountCandidate,
    DeliveryDiscountCandidateTarget, DeliveryDiscountCandidateValue,
    DeliveryDiscountSelectionStrategy, DeliveryDiscountsAddOperation, DeliveryGroupTarget,
    DeliveryOperation, Percentage,
};

use cart_delivery_options_discounts_generate_run::input::ResponseData;

#[shopify_function_target(
    target = "cartDeliveryOptionsDiscountsGenerateRun",
    query_path = "src/generate_delivery_run.graphql",
    schema_path = "schema.graphql"
)]
fn generate_delivery_run(
    input: ResponseData,
) -> Result<CartDeliveryOptionsDiscountsGenerateRunResult> {
    let first_delivery_group = input
        .cart
        .delivery_groups
        .first()
        .ok_or("No delivery groups found")?;

    Ok(CartDeliveryOptionsDiscountsGenerateRunResult {
        operations: vec![DeliveryOperation::DeliveryDiscountsAdd(
            DeliveryDiscountsAddOperation {
                selection_strategy: DeliveryDiscountSelectionStrategy::ALL,
                candidates: vec![DeliveryDiscountCandidate {
                    targets: vec![DeliveryDiscountCandidateTarget::DeliveryGroup(
                        DeliveryGroupTarget {
                            id: first_delivery_group.id.clone(),
                        },
                    )],
                    value: DeliveryDiscountCandidateValue::Percentage(Percentage {
                        value: Decimal(100.0),
                    }),
                    message: Some("FREE DELIVERY".to_string()),
                    associated_discount_code: None,
                }],
            },
        )],
    })
}
