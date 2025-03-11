use shopify_function::prelude::*;
use shopify_function::Result;

use delivery_run::output::{
    DeliveryDiscountCandidate, DeliveryDiscountCandidateTarget, DeliveryDiscountCandidateValue,
    DeliveryDiscountSelectionStrategy, DeliveryDiscounts, DeliveryGroupTarget, DeliveryOperation,
    FunctionDeliveryRunResult, Percentage,
};

use delivery_run::input::ResponseData;

#[shopify_function_target(
    target = "delivery_run",
    query_path = "src/generate_delivery_run.graphql",
    schema_path = "schema.graphql"
)]
fn generate_delivery_run(input: ResponseData) -> Result<FunctionDeliveryRunResult> {
    let first_delivery_group = input
        .cart
        .delivery_groups
        .first()
        .ok_or("No delivery groups found")?;

    Ok(FunctionDeliveryRunResult {
        operations: vec![DeliveryOperation::AddDeliveryDiscounts(DeliveryDiscounts {
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
        })],
    })
}
