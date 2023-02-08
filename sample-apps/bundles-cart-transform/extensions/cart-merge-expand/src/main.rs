use serde::Serialize;

mod api;
use api::*;

#[allow(unused_must_use)]
fn main() -> Result<(), Box<dyn std::error::Error>> {
    let input: Input = serde_json::from_reader(std::io::BufReader::new(std::io::stdin()))?;

    let mut out = std::io::stdout();
    let mut serializer = serde_json::Serializer::new(&mut out);

    cart_transform(&input.cart).serialize(&mut serializer);

    Ok(())
}

fn cart_transform(cart: &Cart) -> FunctionResult {
    let mut merge_cart_operations: Vec<CartOperation> = get_merge_cart_operations(cart);
    let expand_cart_operations: Vec<CartOperation> = get_expand_cart_operations(cart);

    merge_cart_operations.extend(expand_cart_operations);

    return FunctionResult {
        operations: merge_cart_operations,
    };
}

// merge operation logic

fn get_merge_cart_operations(cart: &Cart) -> Vec<CartOperation> {
    let merge_parent_defintions: Vec<ComponentParent> = get_merge_parent_definitions(cart);
    let mut result: Vec<MergeOperation> = Vec::new();

    for definition in merge_parent_defintions.iter() {
        let (components_in_cart, parent_variant_quantity) =
            get_components_in_cart(cart, definition);
        if components_in_cart.len() == definition.component_reference.len() {
            let cart_lines: Vec<CartLineMergeOperation> = components_in_cart
                .iter()
                .map(|component| CartLineMergeOperation {
                    cartLineId: component.cartLineId.clone(),
                    quantity: parent_variant_quantity * component.quantity,
                })
                .collect();

            let mut price: Option<PriceAdjustment> = None;

            if let Some(price_adjustment) = &definition.price_adjustment {
                price = Some(PriceAdjustment {
                    percentageDecrease: Some(PriceAdjustmentValue {
                        value: *price_adjustment
                    })
                });
            }

            let merge_operation: MergeOperation = MergeOperation {
                parentVariantId: definition.id.clone(),
                title: None,
                cartLines: cart_lines.clone(),
                quantity: parent_variant_quantity.clone(),
                image: None,
                price: price,
            };

            result.push(merge_operation);
        }
    }

    return result.iter().map(|op| CartOperation::merge(op.clone())).collect();
}

fn get_components_in_cart(
    cart: &Cart,
    definition: &ComponentParent,
) -> (Vec<CartLineMergeOperation>, i32) {
    let mut line_results: Vec<CartLineMergeOperation> = Vec::new();
    let mut maximum_available_component: Vec<i32> = Vec::new();
    for (reference, quantity) in definition
        .component_reference
        .iter()
        .zip(definition.component_quantities.iter())
    {
        for line in cart.lines.iter() {
            if let Some(merchandise) = &line.merchandise {
                if reference == &merchandise.id && &line.quantity >= quantity {
                    line_results.push(CartLineMergeOperation {
                        cartLineId: line.id.clone(),
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
    let parent_variant_quantity: i32 = match maximum_available_component.iter().min() {
        Some(available) => available.clone(),
        None => 0,
    };

    return (line_results, parent_variant_quantity);
}

fn get_merge_parent_definitions(cart: &Cart) -> Vec<ComponentParent> {
    let mut merge_parent_defintions: Vec<ComponentParent> = Vec::new();

    for line in cart.lines.iter() {
        if let Some(merchandise) = &line.merchandise {
            merge_parent_defintions.append(&mut get_component_parents(&merchandise));
        }
    }
    merge_parent_defintions.dedup_by(|a, b| a.id == b.id);
    return merge_parent_defintions;
}

fn get_component_parents(variant: &ProductVariant) -> Vec<ComponentParent> {
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
    let mut result: Vec<ExpandOperation> = Vec::new();

    for line in cart.lines.iter() {
        if let Some(merchandise) = &line.merchandise {
            let component_references: Vec<ID> = get_component_references(&merchandise);
            let component_quantities: Vec<i32> = get_component_quantities(&merchandise);

            if component_references.is_empty() || component_references.len() != component_quantities.len() {
                continue;
            }

            let mut expand_relationships: Vec<ExpandRelationship> = Vec::new();

            for (reference, quantity) in component_references.iter().zip(component_quantities.iter()) {
                let expand_relationship: ExpandRelationship = ExpandRelationship {
                    merchandiseId: reference.clone(),
                    quantity: quantity.clone(),
                };

                expand_relationships.push(expand_relationship);
            }

            let price: Option<PriceAdjustment> = get_price_adjustment(&merchandise);

            let expand_operation: ExpandOperation = ExpandOperation{
                cartLineId: line.id.clone(),
                expandedCartItems: expand_relationships,
                price: price,
            };

            result.push(expand_operation);
        }
    }

    return result.iter().map(|op| CartOperation::expand(op.clone())).collect();
}

fn get_component_quantities(variant: &ProductVariant) -> Vec<i32> {
    if let Some(component_quantities_metafield) = &variant.component_quantities {
        return serde_json::from_str(&component_quantities_metafield.value).unwrap();
    }

    return Vec::new();
}

fn get_component_references(variant: &ProductVariant) -> Vec<ID> {
    if let Some(component_reference_metafield) = &variant.component_reference {
        return serde_json::from_str(&component_reference_metafield.value).unwrap();
    }

    return Vec::new();
}

fn get_price_adjustment(variant: &ProductVariant) -> Option<PriceAdjustment> {
    if let Some(price_adjustment) = &variant.price_adjustment {
      return Some(PriceAdjustment {
        percentageDecrease: Some(PriceAdjustmentValue {
          value: price_adjustment.value.parse().unwrap()
        })
      });
    }

    return None;
}
