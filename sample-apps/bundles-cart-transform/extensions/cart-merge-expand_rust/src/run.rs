use run::input::InputCart as Cart;
use run::input::InputCartLines as CartLine;
use run::input::InputCartLinesMerchandise::ProductVariant;
use run::input::InputCartLinesMerchandiseOnProductVariant;
use run::output::*;
use serde::Deserialize;
use shopify_function::prelude::*;
use shopify_function::Result;
use std::collections::HashMap;

#[derive(Clone, Debug, PartialEq)]
struct ComponentParent {
    pub id: ID,
    pub component_reference: Vec<ID>,
    pub component_quantities: Vec<i64>,
    pub price_adjustment: Option<f64>,
}

#[derive(Clone, Debug, Deserialize)]
pub struct ComponentParentMetafield {
    pub id: ID,
    pub component_reference: ComponentParentMetafieldReference,
    pub component_quantities: ComponentParentMetafieldQuantities,
    pub price_adjustment: Option<ComponentParentMetafieldPriceAdjustment>,
}

#[derive(Clone, Debug, Deserialize)]
pub struct ComponentParentMetafieldReference {
    pub value: Vec<String>,
}

#[derive(Clone, Debug, Deserialize)]
pub struct ComponentParentMetafieldQuantities {
    pub value: Vec<i64>,
}

#[derive(Clone, Debug, Deserialize)]
pub struct ComponentParentMetafieldPriceAdjustment {
    pub value: f64,
}

#[shopify_function_target(query_path = "src/run.graphql", schema_path = "schema.graphql")]
fn run(input: input::ResponseData) -> Result<output::FunctionRunResult> {
    let cart_operations: Vec<CartOperation> = get_merge_cart_operations(&input.cart)
        .chain(get_expand_cart_operations(&input.cart))
        .collect();

    Ok(output::FunctionRunResult {
        operations: cart_operations,
    })
}

// merge operation logic

fn get_merge_cart_operations(cart: &Cart) -> impl Iterator<Item = CartOperation> + '_ {
    let merge_parent_defintions = get_merge_parent_definitions(cart);

    let mut cart_lines: Vec<CartLine> = Vec::new();
    cart.lines
        .iter()
        .for_each(|line| cart_lines.push(line.clone()));

    merge_parent_defintions
        .into_iter()
        .filter_map(move |definition| {
            let components_in_cart = get_components_in_cart(&mut cart_lines, &definition);
            (components_in_cart.len() == definition.component_reference.len()).then(|| {
                let cart_lines: Vec<CartLineInput> = components_in_cart
                    .into_iter()
                    .map(|component| CartLineInput {
                        cart_line_id: component.cart_line_id,
                        quantity: component.quantity,
                    })
                    .collect();

                let price = definition
                    .price_adjustment
                    .map(|price_adjustment| PriceAdjustment {
                        percentage_decrease: Some(PriceAdjustmentValue {
                            value: Decimal(price_adjustment),
                        }),
                    });

                let merge_operation = MergeOperation {
                    parent_variant_id: definition.id,
                    title: None,
                    cart_lines,
                    image: None,
                    price,
                    attributes: None,
                };

                CartOperation::Merge(merge_operation)
            })
        })
}

fn get_components_in_cart(
    cart_lines: &mut Vec<CartLine>,
    definition: &ComponentParent,
) -> Vec<CartLineInput> {
    let line_results: Vec<CartLineInput> = definition
        .component_reference
        .iter()
        .zip(definition.component_quantities.iter())
        .filter_map(|(reference, &quantity)| {
          cart_lines.iter().find_map(move |line| {
                matches!(
                    &line.merchandise,
                    ProductVariant(merchandise) if reference == &merchandise.id && line.quantity >= quantity,
                ).then(|| CartLineInput { cart_line_id: line.id.clone(), quantity })
            })
        })
        .collect();

    update_cart_lines_from_function_result(cart_lines, line_results.clone());

    line_results
}

fn update_cart_lines_from_function_result(
    cart_lines: &mut Vec<CartLine>,
    line_results: Vec<CartLineInput>,
) {
    let mut cart_line_tracker: HashMap<String, i64> = cart_lines
        .iter()
        .map(|cart_line| (cart_line.id.clone(), cart_line.quantity))
        .collect();

    for line_result in line_results.iter() {
        if let Some(target_cart_line) = cart_lines
            .iter()
            .find(|cart_line| cart_line.id == line_result.cart_line_id)
        {
            let new_quantity = cart_line_tracker[&target_cart_line.id] - line_result.quantity;
            cart_line_tracker.insert(target_cart_line.id.clone(), new_quantity);
        }
    }

    cart_lines.retain(|line| cart_line_tracker[&line.id] > 0);

    for cart_line in cart_lines.iter_mut() {
        if cart_line_tracker[&cart_line.id] > 0 {
            cart_line.quantity = cart_line_tracker[&cart_line.id];
        }
    }
}

fn get_merge_parent_definitions(cart: &Cart) -> Vec<ComponentParent> {
    let mut merge_parent_defintions: Vec<ComponentParent> = Vec::new();

    for line in cart.lines.iter() {
        if let ProductVariant(merchandise) = &line.merchandise {
            merge_parent_defintions.extend(get_component_parents(merchandise));
        }
    }

    merge_parent_defintions
}

fn get_component_parents(
    variant: &InputCartLinesMerchandiseOnProductVariant,
) -> impl Iterator<Item = ComponentParent> {
    variant
        .component_parents
        .as_ref()
        .map(|component_parents_metafield| {
            let value: Vec<ComponentParentMetafield> =
                serde_json::from_str(&component_parents_metafield.value).unwrap();
            value.into_iter().map(|parent_definition| {
                let price = parent_definition
                    .price_adjustment
                    .as_ref()
                    .map(|price_adjustment| price_adjustment.value);

                ComponentParent {
                    id: parent_definition.id,
                    component_reference: parent_definition.component_reference.value,
                    component_quantities: parent_definition.component_quantities.value,
                    price_adjustment: price,
                }
            })
        })
        .into_iter()
        .flatten()
}

// expand operation logic

fn get_expand_cart_operations(cart: &Cart) -> impl Iterator<Item = CartOperation> + '_ {
    cart.lines.iter().filter_map(|line| {
        if let ProductVariant(merchandise) = &line.merchandise {
            let component_references: Vec<ID> = get_component_references(merchandise);
            let component_quantities: Vec<i64> = get_component_quantities(merchandise);

            if component_references.is_empty()
                || component_references.len() != component_quantities.len()
            {
                None
            } else {
                let expand_relationships: Vec<ExpandedItem> = component_references
                    .into_iter()
                    .zip(component_quantities.iter())
                    .map(|(reference, &quantity)| ExpandedItem {
                        merchandise_id: reference,
                        quantity,
                        price: None,
                        attributes: None,
                    })
                    .collect();

                let price = get_price_adjustment(merchandise);

                CartOperation::Expand(ExpandOperation {
                    cart_line_id: line.id.clone(),
                    expanded_cart_items: expand_relationships,
                    price,
                    image: None,
                    title: None,
                })
                .into()
            }
        } else {
            None
        }
    })
}

fn get_component_quantities(variant: &InputCartLinesMerchandiseOnProductVariant) -> Vec<i64> {
    if let Some(component_quantities_metafield) = &variant.component_quantities {
        serde_json::from_str(&component_quantities_metafield.value).unwrap()
    } else {
        Vec::new()
    }
}

fn get_component_references(variant: &InputCartLinesMerchandiseOnProductVariant) -> Vec<ID> {
    if let Some(component_reference_metafield) = &variant.component_reference {
        serde_json::from_str(&component_reference_metafield.value).unwrap()
    } else {
        Vec::new()
    }
}

fn get_price_adjustment(
    variant: &InputCartLinesMerchandiseOnProductVariant,
) -> Option<PriceAdjustment> {
    variant
        .price_adjustment
        .as_ref()
        .map(|price_adjustment| PriceAdjustment {
            percentage_decrease: Some(PriceAdjustmentValue {
                value: Decimal(price_adjustment.value.parse().unwrap()),
            }),
        })
}
