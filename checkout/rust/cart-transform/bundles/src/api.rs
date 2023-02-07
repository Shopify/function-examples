#![allow(non_camel_case_types, non_snake_case)]
use serde::{Deserialize, Serialize};

// Common types

pub type ID = String;

// Input types

#[derive(Clone, Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Input {
    pub cart: Cart,
}

#[derive(Clone, Debug, Deserialize)]
pub struct Cart {
    pub lines: Vec<CartLine>,
}

#[derive(Clone, Debug, Deserialize)]
pub struct CartLine {
    pub id: ID,
    pub quantity: i32,
    pub merchandise: Option<ProductVariant>,
}

#[derive(Clone, Debug, Deserialize)]
pub struct ProductVariant {
    pub id: ID,
    pub component_parents: Option<Metafield>,
    pub component_reference: Option<Metafield>,
    pub component_quantities: Option<Metafield>,
}

#[derive(Clone, Debug, Deserialize)]
pub struct Metafield {
    pub value: String,
}

#[derive(Clone, Debug, Deserialize)]
pub struct ComponentParentMetafield {
    pub id: ID,
    pub component_reference: ComponentParentMetafieldReference,
    pub component_quantities: ComponentParentMetafieldQuantities,
}

#[derive(Clone, Debug, Deserialize)]
pub struct ComponentParentMetafieldReference {
    pub value: Vec<String>,
}

#[derive(Clone, Debug, Deserialize)]
pub struct ComponentParentMetafieldQuantities {
    pub value: Vec<i32>,
}

#[derive(Clone, Debug, Deserialize, PartialEq)]
pub struct ComponentParent {
    pub id: ID,
    pub component_reference: Vec<ID>,
    pub component_quantities: Vec<i32>,
}
// Output types

#[derive(Clone, Debug, Serialize)]
pub struct FunctionResult {
    pub operations: Vec<CartOperation>,
}

#[derive(Clone, Debug, Serialize)]
pub enum CartOperation {
  merge(MergeOperation),
  expand(ExpandOperation),
}

#[derive(Clone, Debug, Serialize)]
pub struct ExpandOperation {
    pub cartLineId: ID,
    pub expandedCartItems: Vec<ExpandRelationship>,
    pub price: Option<PriceAdjustment>,
}

#[derive(Clone, Debug, Serialize)]
pub struct ExpandRelationship {
    pub merchandiseId: ID,
    pub quantity: i32,
}

#[derive(Clone, Debug, Serialize)]
pub struct MergeOperation {
    pub parentVariantId: ID,
    pub title: Option<String>,
    pub cartLines: Vec<CartLineMergeOperation>,
    pub price: Option<PriceAdjustment>,
    pub quantity: i32,
    pub image: Option<ImageInput>,
}

#[derive(Clone, Debug, Serialize)]
pub struct CartLineMergeOperation {
    pub cartLineId: ID,
    pub quantity: i32,
}

#[derive(Clone, Debug, Serialize)]
pub struct PriceAdjustment {
    pub percentageDecrease: Option<PriceAdjustmentValue>,
}

#[derive(Clone, Debug, Serialize)]
pub struct PriceAdjustmentValue {
    pub value: f64,
}

#[derive(Clone, Debug, Serialize)]
pub struct ImageInput {
    pub url: String,
}
