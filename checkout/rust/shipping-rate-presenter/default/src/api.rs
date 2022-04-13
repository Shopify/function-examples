use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Deserialize)]
pub struct Payload {
    pub input: Input,
    pub configuration: Config,
}

#[derive(Clone, Debug, Deserialize)]
pub struct Config {
}

#[derive(Clone, Debug, Deserialize)]
// Use the following container attribute if fields need to be camel cased.
// #[serde(rename_all = "camelCase")]
pub struct Input {
    pub purchase_proposal: PurchaseProposal,
    pub shipping_rates: Vec<ShippingRate>,
}

#[derive(Clone, Debug, Deserialize)]
pub struct PurchaseProposal {
    pub buyer_identity: BuyerIdentity,
}

#[derive(Clone, Debug, Deserialize)]
pub struct BuyerIdentity {
    pub customer: Customer,
}

#[derive(Clone, Debug, Deserialize)]
pub struct Customer {
    pub email: String,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct ShippingRate {
    pub id: u64,
    pub title: String,
    pub code: String,
    pub amount: Money,
    pub phone_required: bool,
    pub markup: Money
}

#[derive(Clone, Debug, Deserialize)]
pub struct Strategy {
    pub carrier_identifier: Option<String>,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct Money {
    pub subunits: u64,
    pub currency: String,
}

#[derive(Clone, Debug, Serialize)]
pub struct Output {
    pub proposed_order: Option<Vec<u64>>,
    pub rename_proposals: Vec<RenameProposal>,
    pub hidden_rate_ids: Vec<u64>
}

#[derive(Clone, Debug, Serialize)]
pub struct RenameProposal {
    pub shipping_rate_id: u64,
    pub name: String,
}