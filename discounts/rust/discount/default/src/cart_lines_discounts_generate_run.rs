use shopify_function::prelude::*;
use shopify_function::Result;

#[shopify_function_target(
    query_path = "src/cart_lines_discounts_generate_run.graphql",
    schema_path = "schema.graphql"
)]
fn cart_lines_discounts_generate_run(
    input: input::ResponseData,
) -> Result<output::CartLinesDiscountsGenerateRunResult> {
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
        .contains(&input::DiscountClass::ORDER);
    let has_product_discount_class = input
        .discount
        .discount_classes
        .contains(&input::DiscountClass::PRODUCT);

    if !has_order_discount_class && !has_product_discount_class {
        return Ok(output::CartLinesDiscountsGenerateRunResult { operations: vec![] });
    }

    let mut operations = vec![];

    // Check if the discount has the ORDER class
    if has_order_discount_class {
        operations.push(output::CartOperation::OrderDiscountsAdd(
            output::OrderDiscountsAddOperation {
                selection_strategy: output::OrderDiscountSelectionStrategy::FIRST,
                candidates: vec![output::OrderDiscountCandidate {
                    targets: vec![output::OrderDiscountCandidateTarget::OrderSubtotal(
                        output::OrderSubtotalTarget {
                            excluded_cart_line_ids: vec![],
                        },
                    )],
                    message: Some("10% OFF ORDER".to_string()),
                    value: output::OrderDiscountCandidateValue::Percentage(output::Percentage {
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
        operations.push(output::CartOperation::ProductDiscountsAdd(
            output::ProductDiscountsAddOperation {
                selection_strategy: output::ProductDiscountSelectionStrategy::FIRST,
                candidates: vec![output::ProductDiscountCandidate {
                    targets: vec![output::ProductDiscountCandidateTarget::CartLine(
                        output::CartLineTarget {
                            id: max_cart_line.id.clone(),
                            quantity: None,
                        },
                    )],
                    message: Some("20% OFF PRODUCT".to_string()),
                    value: output::ProductDiscountCandidateValue::Percentage(output::Percentage {
                        value: Decimal(20.0),
                    }),
                    associated_discount_code: None,
                }],
            },
        ));
    }

    Ok(output::CartLinesDiscountsGenerateRunResult { operations })
}
