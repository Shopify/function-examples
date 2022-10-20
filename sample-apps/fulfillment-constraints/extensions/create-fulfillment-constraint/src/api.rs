use serde::{Deserialize, Serialize};

pub type ID = String;

#[derive(Clone, Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Input {
    pub cart: Cart,
    pub locations: Vec<Location>,
}

// #[derive(Clone, Debug, Serialize)]
// pub struct FulfillmentConstraint {
//     pub constrained_by: String,
//     pub line_items: Vec<ID>,
// }

// #[serde_as]
#[derive(Clone, Debug, Serialize)]
#[serde(rename_all(serialize = "camelCase"))]
pub enum FulfillmentConstraint {
    #[serde(rename_all(serialize = "camelCase"))]
    MustShipTogether {
        r#type: String,
        line_items: Vec<ID>,
    },
    #[serde(rename_all(serialize = "camelCase"))]
    MustShipFrom {
        r#type: String,
        line_items: Vec<ID>,
        location_id: String,
    },
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
    pub sku: String,
    pub metafield: Option<Metafield>,
}

#[derive(Clone, Debug, Deserialize, PartialEq)]
pub struct Metafield {
    pub value: String,
}

#[derive(Clone, Debug, Deserialize, PartialEq)]
pub struct Location {
    pub id: ID,
    pub name: String,
    pub address1: String,
}