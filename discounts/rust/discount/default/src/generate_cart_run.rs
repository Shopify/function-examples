use shopify_function::prelude::*;
use shopify_function::Result;

use cart_lines_discounts_generate_run::output::{
    CartLineTarget, CartOperation, FunctionCartRunResult, OrderDiscountCandidate,
    OrderDiscountCandidateTarget, OrderDiscountCandidateValue, OrderDiscountSelectionStrategy,
    OrderDiscounts, OrderSubtotalTarget, Percentage, ProductDiscountCandidate,
    ProductDiscountCandidateTarget, ProductDiscountCandidateValue,
    ProductDiscountSelectionStrategy, ProductDiscounts,
};

use cart_lines_discounts_generate_run::input::ResponseData;

#[shopify_function_target(
    target = "cartLinesDiscountsGenerateRun",
    query_path = "src/generate_cart_run.graphql",
    schema_path = "schema.graphql"
)]
fn generate_cart_run(input: ResponseData) -> Result<FunctionCartRunResult> {
    let max_cart_line = input
        .cart
        .lines
        .iter()
        .max_by(|a, b| {
            a.cost
                .subtotal_amount
                .amount
                .partial_cmp(&b.cost.subtotal_amount.amount)
                .unwrap_or(std::cmp::Ordering::Equal)
        })
        .ok_or("No cart lines found")?;

    Ok(FunctionCartRunResult {
        operations: vec![
            CartOperation::AddOrderDiscounts(OrderDiscounts {
                selection_strategy: OrderDiscountSelectionStrategy::FIRST,
                candidates: vec![OrderDiscountCandidate {
                    targets: vec![OrderDiscountCandidateTarget::OrderSubtotal(
                        OrderSubtotalTarget {
                            excluded_cart_line_ids: vec![],
                        },
                    )],
                    message: Some("10% OFF ORDER".to_string()),
                    value: OrderDiscountCandidateValue::Percentage(Percentage {
                        value: Decimal(10.0),
                    }),
                    conditions: None,
                    associated_discount_code: None,
                }],
            }),
            CartOperation::AddProductDiscounts(ProductDiscounts {
                selection_strategy: ProductDiscountSelectionStrategy::FIRST,
                candidates: vec![ProductDiscountCandidate {
                    targets: vec![ProductDiscountCandidateTarget::CartLine(CartLineTarget {
                        id: max_cart_line.id.clone(),
                        quantity: None,
                    })],
                    message: Some("20% OFF PRODUCT".to_string()),
                    value: ProductDiscountCandidateValue::Percentage(Percentage {
                        value: Decimal(20.0),
                    }),
                    associated_discount_code: None,
                }],
            }),
        ],
    })
}
