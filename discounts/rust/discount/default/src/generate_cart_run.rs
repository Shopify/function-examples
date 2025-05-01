use shopify_function::prelude::*;
use shopify_function::Result;

use cart_lines_discounts_generate_run::output::{
    CartLineTarget, CartLinesDiscountsGenerateRunResult, CartOperation, OrderDiscountCandidate,
    OrderDiscountCandidateTarget, OrderDiscountCandidateValue, OrderDiscountSelectionStrategy,
    OrderDiscountsAddOperation, OrderSubtotalTarget, Percentage, ProductDiscountCandidate,
    ProductDiscountCandidateTarget, ProductDiscountCandidateValue,
    ProductDiscountSelectionStrategy, ProductDiscountsAddOperation,
};

use cart_lines_discounts_generate_run::input::{DiscountClass, ResponseData};

#[shopify_function_target(
    target = "cartLinesDiscountsGenerateRun",
    query_path = "src/generate_cart_run.graphql",
    schema_path = "schema.graphql"
)]
fn generate_cart_run(input: ResponseData) -> Result<CartLinesDiscountsGenerateRunResult> {
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

    let has_order_discount_class = input
        .discount
        .discount_classes
        .contains(&DiscountClass::ORDER);
    let has_product_discount_class = input
        .discount
        .discount_classes
        .contains(&DiscountClass::PRODUCT);

    if !has_order_discount_class && !has_product_discount_class {
        return Ok(CartLinesDiscountsGenerateRunResult { operations: vec![] });
    }

    let mut operations = vec![];

    // Check if the discount has the ORDER class
    if has_order_discount_class {
        operations.push(CartOperation::OrderDiscountsAdd(
            OrderDiscountsAddOperation {
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
            },
        ));
    }

    // Check if the discount has the PRODUCT class
    if has_product_discount_class {
        operations.push(CartOperation::ProductDiscountsAdd(
            ProductDiscountsAddOperation {
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
            },
        ));
    }

    Ok(CartLinesDiscountsGenerateRunResult { operations })
}
