use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Deserialize)]
pub struct Payload {
    pub configuration: Config,
}

#[derive(Clone, Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Config {
    pub percentage: String,
    pub minimum_order_subtotal: Money,
}

#[derive(Clone, Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct PurchaseProposal {
    pub merchandise_lines: Vec<MerchandiseLine>,
}

#[derive(Clone, Debug, Deserialize)]
pub struct MerchandiseLine {
    pub index: u64,
}

#[derive(Clone, Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Output {
    pub discount_candidates: Vec<Discount>,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct Money {
    pub subunits: u64,
}

#[derive(Clone, Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Discount {
    pub message: Option<String>,
    pub conditions: Vec<Condition>,
    pub entitlements: Vec<OrderSubtotalEntitlement>,
}

#[derive(Clone, Debug, Serialize)]
#[serde(untagged, rename_all = "camelCase")]
pub enum Condition {
    OrderMinimumSubtotal {
        target_type: String,
        excluded_line_indexes: Vec<u64>,
        minimum_amount: Money,
    },
}

#[derive(Clone, Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct OrderSubtotalEntitlement {
    pub target_type: String,
    pub excluded_line_indexes: Vec<u64>,
    pub value: Value,
}

#[derive(Clone, Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Value {
    #[serde(rename(serialize = "type"))]
    pub value_type: String,
    pub value: f64,
}
