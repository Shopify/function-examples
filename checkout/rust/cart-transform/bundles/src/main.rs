use shopify_function::prelude::*;
use shopify_function::Result;
use crate::output::CartLineInput;
use crate::output::PriceAdjustment;
use crate::output::PriceAdjustmentValue;
use crate::output::CartOperation;
use crate::output::ExpandOperation;
use crate::output::ExpandedItem;
use crate::output::MergeOperation;
use crate::input::InputCart as Cart;
use crate::input::InputCartLinesMerchandiseOnProductVariant;
use crate::input::InputCartLinesMerchandise::ProductVariant as ProductVariant;
use serde::{Deserialize, Serialize};

generate_types!(
    query_path = "./input.graphql",
    schema_path = "./schema.graphql"
);

type URL = String;

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

#[shopify_function]
fn function(input: input::ResponseData) -> Result<output::FunctionResult> {
    let mut cart_operations: Vec<CartOperation> = get_merge_cart_operations(&input.cart);
    cart_operations.extend(get_expand_cart_operations(&input.cart));

    Ok(output::FunctionResult { operations: Some(cart_operations) })
 }

 // merge operation logic

fn get_merge_cart_operations(cart: &Cart) -> Vec<CartOperation> {
    let merge_parent_defintions: Vec<ComponentParent> = get_merge_parent_definitions(cart);
    let mut result: Vec<CartOperation> = Vec::new();

    for definition in merge_parent_defintions.iter() {
        let (components_in_cart, parent_variant_quantity) =
            get_components_in_cart(cart, definition);
        if components_in_cart.len() == definition.component_reference.len() {
            let cart_lines: Vec<CartLineInput> = components_in_cart
                .iter()
                .map(|component| CartLineInput {
                    cart_line_id: component.cart_line_id.clone(),
                    quantity: parent_variant_quantity * component.quantity,
                })
                .collect();

            let mut price: Option<PriceAdjustment> = None;

            if let Some(price_adjustment) = &definition.price_adjustment {
                price = Some(PriceAdjustment {
                    percentage_decrease: Some(PriceAdjustmentValue {
                        value: *price_adjustment
                    })
                });
            }

            let merge_operation: MergeOperation = MergeOperation {
                parent_variant_id: definition.id.clone(),
                title: None,
                cart_lines: cart_lines.clone(),
                image: None,
                price: price,
            };

            result.push(CartOperation {merge: Some(merge_operation), expand: None});
        }
    }

    return result;
}

fn get_components_in_cart(
    cart: &Cart,
    definition: &ComponentParent,
) -> (Vec<CartLineInput>, i64) {
    let mut line_results: Vec<CartLineInput> = Vec::new();
    let mut maximum_available_component: Vec<i64> = Vec::new();
    for (reference, quantity) in definition
        .component_reference
        .iter()
        .zip(definition.component_quantities.iter())
    {
        for line in cart.lines.iter() {
            let variant = match &line.merchandise {
                ProductVariant(variant) => Some(variant),
                _ => None,
            };
            if variant == None {
                continue;
            }

            if let Some(merchandise) = &variant {
              if reference == &merchandise.id && &line.quantity >= quantity {
                  line_results.push(CartLineInput {
                      cart_line_id: line.id.clone(),
                      quantity: quantity.clone(),
                  });
                  let maximum_available = if quantity > &0 {
                      line.quantity / quantity
                  } else {
                      0
                  };
                  maximum_available_component.push(maximum_available)
              }
            }
        }
    }
    let parent_variant_quantity: i64 = match maximum_available_component.iter().min() {
        Some(available) => available.clone(),
        None => 0,
    };

    return (line_results, parent_variant_quantity);
}

fn get_merge_parent_definitions(cart: &Cart) -> Vec<ComponentParent> {
    let mut merge_parent_defintions: Vec<ComponentParent> = Vec::new();

    for line in cart.lines.iter() {
        let variant = match &line.merchandise {
            ProductVariant(variant) => Some(variant),
            _ => None,
        };
        if variant == None {
            continue;
        }

        if let Some(merchandise) = &variant {
            merge_parent_defintions.append(&mut get_component_parents(&merchandise));
        }
    }
    merge_parent_defintions.dedup_by(|a, b| a.id == b.id);
    return merge_parent_defintions;
}

fn get_component_parents(variant: &InputCartLinesMerchandiseOnProductVariant) -> Vec<ComponentParent> {
    let mut component_parents: Vec<ComponentParent> = Vec::new();
    if let Some(component_parents_metafield) = &variant.component_parents {
        let value: Vec<ComponentParentMetafield> =
            serde_json::from_str(&component_parents_metafield.value).unwrap();
        for parent_definition in value.iter() {
            let mut price: Option<f64> = None;

            if let Some(price_adjustment) = &parent_definition.price_adjustment {
                price = Some(price_adjustment.value.clone());
            }

            component_parents.push(ComponentParent {
                id: parent_definition.id.clone(),
                component_reference: parent_definition.component_reference.value.clone(),
                component_quantities: parent_definition.component_quantities.value.clone(),
                price_adjustment: price,
            });
        }
    }

    return component_parents;
}

// expand operation logic

fn get_expand_cart_operations(cart: &Cart) -> Vec<CartOperation> {
    let mut result: Vec<CartOperation> = Vec::new();

    for line in cart.lines.iter() {
        let variant = match &line.merchandise {
            ProductVariant(variant) => Some(variant),
            _ => None,
        };
        if variant == None {
            continue;
        }

        if let Some(merchandise) = &variant {
            let component_references: Vec<ID> = get_component_references(&merchandise);
            let component_quantities: Vec<i64> = get_component_quantities(&merchandise);

            if component_references.is_empty() || component_references.len() != component_quantities.len() {
                continue;
            }

            let mut expand_relationships: Vec<ExpandedItem> = Vec::new();

            for (reference, quantity) in component_references.iter().zip(component_quantities.iter()) {
                let expand_relationship: ExpandedItem = ExpandedItem {
                    merchandise_id: reference.clone(),
                    quantity: quantity.clone(),
                };

                expand_relationships.push(expand_relationship);
            }

            let price: Option<PriceAdjustment> = get_price_adjustment(&merchandise);

            let expand_operation: ExpandOperation = ExpandOperation{
                cart_line_id: line.id.clone(),
                expanded_cart_items: expand_relationships,
                price: price,
            };

            result.push(CartOperation {expand: Some(expand_operation), merge: None});
        }
    }

    return result;
}

fn get_component_quantities(variant: &InputCartLinesMerchandiseOnProductVariant) -> Vec<i64> {
    if let Some(component_quantities_metafield) = &variant.component_quantities {
        return serde_json::from_str(&component_quantities_metafield.value).unwrap();
    }

    return Vec::new();
}

fn get_component_references(variant: &InputCartLinesMerchandiseOnProductVariant) -> Vec<ID> {
    if let Some(component_reference_metafield) = &variant.component_reference {
        return serde_json::from_str(&component_reference_metafield.value).unwrap();
    }

    return Vec::new();
}

fn get_price_adjustment(variant: &InputCartLinesMerchandiseOnProductVariant) -> Option<PriceAdjustment> {
    if let Some(price_adjustment) = &variant.price_adjustment {
      return Some(PriceAdjustment {
        percentage_decrease: Some(PriceAdjustmentValue {
          value: price_adjustment.value.parse().unwrap()
        })
      });
    }

    return None;
}
