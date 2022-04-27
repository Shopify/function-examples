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
    pub shipping_methods: Vec<ShippingMethod>,
}

#[derive(Clone, Debug, Deserialize)]
pub struct PurchaseProposal {
    pub delivery_lines: Vec<DeliveryLine>,
}
 
#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct Money {
    pub currency: String,
    pub subunits: u64,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct ShippingMethod {
    pub id: u64,
    pub title: String,
    pub code: String,
    pub phone_required: bool,
    pub amount: Money,
    pub markup: Option<Money>,
}

#[derive(Clone, Debug, Deserialize)]
pub struct DeliveryLine {
    pub strategy: Option<Strategy>,
}

#[derive(Clone, Debug, Deserialize)]
pub struct Strategy {
    pub carrier_identifier: Option<String>,
}

type ShippingMethodReference = String;

#[derive(Clone, Debug, Serialize)]
pub struct Output {
    pub sort_response: SortResponse,
    pub filter_response: FilterResponse,
    pub rename_response: RenameResponse,
}
#[derive(Clone, Debug, Serialize)]
pub struct SortResponse {
    pub proposed_order: Vec<ShippingMethodReference>,
}
#[derive(Clone, Debug, Serialize)]
pub struct RenameProposal {
    pub shipping_method: ShippingMethodReference,
    pub name: String,
    pub renamed: bool,
}
#[derive(Clone, Debug, Serialize)]
pub struct RenameResponse {
    pub rename_proposals: Vec<RenameProposal>,
}
#[derive(Clone, Debug, Serialize)]
pub struct FilterResponse {
    pub hidden_methods: Vec<ShippingMethodReference>,
}
