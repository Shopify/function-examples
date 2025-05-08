use run::input::InputCart as Cart;
use run::input::InputCartLines;
use run::input::InputCartLinesMerchandise::CustomProduct;
use run::input::InputCartLinesMerchandise::ProductVariant;
use run::input::InputCartTransform as CartTransform;
use run::output::CartOperation;
use run::output::ExpandOperation;
use run::output::ExpandedItem;
use run::output::ExpandedItemFixedPricePerUnitAdjustment;
use run::output::ExpandedItemPriceAdjustment;
use run::output::ExpandedItemPriceAdjustmentValue;

use shopify_function::prelude::*;
use shopify_function::Result;

#[shopify_function_target(query_path = "src/run.graphql", schema_path = "schema.graphql")]
fn run(input: input::ResponseData) -> Result<output::FunctionRunResult> {
    let presentment_currency_rate_f64 = input.presentment_currency_rate.0;
    let cart_operations: Vec<CartOperation> = get_update_cart_operations(
        &input.cart,
        &input.cart_transform,
        presentment_currency_rate_f64,
    );

    Ok(output::FunctionRunResult {
        operations: cart_operations,
    })
}

fn get_update_cart_operations(
    cart: &Cart,
    cart_transform: &CartTransform,
    presentment_currency_rate: f64,
) -> Vec<CartOperation> {
    cart.lines
        .iter()
        .filter_map(|line| {
            let warranty_added = get_warranty_added(line);
            let warranty_cost_percentage = get_warranty_cost_percentage(line);
            let warranty_variant_id = &cart_transform.warranty_variant_id;
            if let (ProductVariant(variant), Some(_warranty_variant_id)) =
                (&line.merchandise, warranty_variant_id)
            {
                if warranty_added && warranty_cost_percentage > 0.0 {
                    let original_item = ExpandedItem {
                        merchandise_id: variant.id.clone(),
                        quantity: 1,
                        price: Some(ExpandedItemPriceAdjustment {
                            adjustment: ExpandedItemPriceAdjustmentValue::FixedPricePerUnit(
                                ExpandedItemFixedPricePerUnitAdjustment {
                                    amount: line.cost.amount_per_quantity.amount,
                                },
                            ),
                        }),
                        attributes: None,
                    };
                    let expanded_cart_item = ExpandedItem {
                        merchandise_id: _warranty_variant_id.value.clone(),
                        quantity: 1,
                        price: Some(ExpandedItemPriceAdjustment {
                            adjustment: ExpandedItemPriceAdjustmentValue::FixedPricePerUnit(
                                ExpandedItemFixedPricePerUnitAdjustment {
                                    amount: Decimal(
                                        line.cost.amount_per_quantity.amount.0
                                            * (warranty_cost_percentage / 100.0)
                                            * presentment_currency_rate,
                                    ),
                                },
                            ),
                        }),
                        attributes: None,
                    };
                    let expand_operation = ExpandOperation {
                        cart_line_id: line.id.clone(),
                        title: Some(variant.title.clone().unwrap_or_default()),
                        image: None,
                        price: None,
                        expanded_cart_items: vec![original_item, expanded_cart_item],
                    };
                    Some(CartOperation::Expand(expand_operation))
                } else {
                    None
                }
            } else {
                None
            }
        })
        .collect()
}

fn get_warranty_added(line: &InputCartLines) -> bool {
    match &line.warranty_added {
        Some(input_cart_lines_warranty_added) => match &input_cart_lines_warranty_added.value {
            Some(text) => text == "Yes",
            None => false,
        },
        None => false,
    }
}

fn get_warranty_cost_percentage(line: &InputCartLines) -> f64 {
    match &line.merchandise {
        ProductVariant(variant) => match &variant.product.warranty_cost_percentage {
            Some(warranty_cost_percentage) => {
                match &warranty_cost_percentage.value.parse::<f64>() {
                    Ok(value) => *value,
                    _parse_float_error => 100.0,
                }
            }
            None => 100.0,
        },
        CustomProduct => 100.0,
    }
}
