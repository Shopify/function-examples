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
    pub payment_methods: Vec<PaymentMethod>,
}

#[derive(Clone, Debug, Deserialize)]
pub struct PurchaseProposal {
    pub delivery_lines: Vec<DeliveryLine>,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct PaymentMethod {
    pub id: u64,
    pub name: String,
    pub cards: Vec<String>,
}

#[derive(Clone, Debug, Deserialize)]
pub struct DeliveryLine {
    pub strategy: Option<Strategy>,
}

#[derive(Clone, Debug, Deserialize)]
pub struct Strategy {
    pub carrier_identifier: Option<String>,
}

#[derive(Clone, Debug, Serialize)]
pub struct Output {
    pub sort_response: SortResponse,
    pub filter_response: FilterResponse,
    pub rename_response: RenameResponse,
}
#[derive(Clone, Debug, Serialize)]
pub struct SortResponse {
    pub proposed_order: Vec<PaymentMethod>,
}
#[derive(Clone, Debug, Serialize)]
pub struct RenameProposal {
    pub payment_method: PaymentMethod,
    pub name: String,
    pub renamed: bool,
}
#[derive(Clone, Debug, Serialize)]
pub struct RenameResponse {
    pub rename_proposals: Vec<RenameProposal>,
}
#[derive(Clone, Debug, Serialize)]
pub struct FilterResponse {
    pub hidden_methods: Vec<PaymentMethod>,
}
