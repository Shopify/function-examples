use serde::{Deserialize, Serialize};

pub type ID = String;

#[derive(Clone, Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Input {
    pub cart: Cart,
}

#[derive(Clone, Debug, Serialize)]
pub struct FulfillmentConstraint {
    pub constrained_by: String,
    pub line_items: Vec<ID>,
}

#[derive(Clone, Debug, Serialize)]
pub struct FunctionResult {
    pub fulfillment_constraints: Vec<FulfillmentConstraint>,
}

#[derive(Clone, Debug, Deserialize, PartialEq)]
pub struct Cart {
    pub lines: Vec<CartLine>,
}

#[derive(Clone, Debug, Deserialize, PartialEq)]
pub struct CartLine {
    pub id: ID,
    pub merchandise: Merchandise,
}

#[derive(Clone, Debug, Deserialize, PartialEq)]
pub struct Merchandise {
    pub id: Option<ID>,
    pub metafield: Option<Metafield>,
}

#[derive(Clone, Debug, Deserialize, PartialEq)]
pub struct Metafield {
    pub value: String,
}