use run::input::InputCart as Cart;
use run::input::InputCartLinesMerchandise::ProductVariant;
use run::output::CartOperation;
use run::output::ExpandOperation;
use run::output::ExpandedItem;
use run::output::ExpandedItemFixedPricePerUnitAdjustment;
use run::output::ExpandedItemPriceAdjustment;
use run::output::ExpandedItemPriceAdjustmentValue;

use shopify_function::prelude::*;
use shopify_function::Result;
use serde_json::Value;

#[shopify_function_target(query_path = "src/run.graphql", schema_path = "schema.graphql")]
fn run(input: input::ResponseData) -> Result<output::FunctionRunResult> {
    let presentment_currency_rate_f64 = input.presentment_currency_rate.0;
    let cart_operations: Vec<CartOperation> = get_update_cart_operations(
        &input.cart,
        presentment_currency_rate_f64,
    );

    Ok(output::FunctionRunResult {
        operations: cart_operations,
    })
}

fn get_update_cart_operations(
    cart: &Cart,
    presentment_currency_rate: f64,
) -> Vec<CartOperation> {
    cart.lines
        .iter()
        .filter_map(|line| {
            if let ProductVariant(variant) = &line.merchandise {
                if let Some(bundle_data) = &variant.product.bundled_component_data {
                    if let Some(components) = parse_bundle_components(&bundle_data.value) {
                        let expanded_items = create_expanded_items(
                            components,
                            presentment_currency_rate,
                        );

                        if !expanded_items.is_empty() {
                            let expand_operation = ExpandOperation {
                                cart_line_id: line.id.clone(),
                                title: Some(variant.title.clone().unwrap_or_default()),
                                image: None,
                                price: None,
                                expanded_cart_items: expanded_items,
                            };
                            return Some(CartOperation::Expand(expand_operation));
                        }
                    }
                }
            }
            None
        })
        .collect()
}

fn parse_bundle_components(bundle_data: &str) -> Option<Vec<Value>> {
    match serde_json::from_str::<Vec<Value>>(bundle_data) {
        Ok(components) if !components.is_empty() => Some(components),
        _ => None,
    }
}

fn create_expanded_items(
    components: Vec<Value>,
    presentment_currency_rate: f64,
) -> Vec<ExpandedItem> {
    components
        .into_iter()
        .filter_map(|component| {
            let id = component.get("id")?.as_str()?;
            let price = component.get("price")?.as_str()?;
            let quantity = component.get("quantity").and_then(|q| q.as_u64()).unwrap_or(1);

            let price_float = price.parse::<f64>().ok()?;
            let adjusted_price = price_float * presentment_currency_rate;

            Some(ExpandedItem {
                merchandise_id: id.to_string(),
                quantity: quantity as i64,
                price: Some(ExpandedItemPriceAdjustment {
                    adjustment: ExpandedItemPriceAdjustmentValue::FixedPricePerUnit(
                        ExpandedItemFixedPricePerUnitAdjustment {
                            amount: Decimal(adjusted_price),
                        },
                    ),
                }),
                attributes: None,
            })
        })
        .collect()
}
