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
    pub payment_methods: Vec<ShippingMethod>,
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
pub struct ShippingMethod {
    pub id: u64,
    pub title: String,
    pub code: String,
    pub amount: Money,
    pub phone_required: bool,
    pub markup: Money
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct Money {
    pub subunits: u64,
    pub currency: String,
}

#[derive(Clone, Debug, Serialize)]
pub struct Output {
    pub sort_response: SortResponse,
    pub filter_response: FilterResponse,
    pub rename_response: RenameResponse,
}
#[derive(Clone, Debug, Serialize)]
pub struct SortResponse {
    pub proposed_order: Vec<ShippingMethod>,
}
#[derive(Clone, Debug, Serialize)]
pub struct RenameProposal {
    pub payment_method: ShippingMethod,
    pub name: String,
    pub renamed: bool,
}
#[derive(Clone, Debug, Serialize)]
pub struct RenameResponse {
    pub rename_proposals: Vec<RenameProposal>,
}
#[derive(Clone, Debug, Serialize)]
pub struct FilterResponse {
    pub hidden_methods: Vec<ShippingMethod>,
}