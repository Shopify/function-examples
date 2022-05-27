use serde::{Deserialize, Serialize};

pub type ID = String;

#[derive(Clone, Debug, Deserialize)]
pub struct Payload {
    pub input: Input,
    pub configuration: Config,
}

#[derive(Clone, Debug, Deserialize)]
pub struct Config {}

#[derive(Clone, Debug, Deserialize)]
// Use the following container attribute if fields need to be camel cased.
// #[serde(rename_all = "camelCase")]
pub struct Input {
    pub purchase_proposal: PurchaseProposal,
    pub payment_methods: Vec<PaymentMethod>,
}

#[derive(Clone, Debug, Deserialize)]
pub struct PurchaseProposal {}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct PaymentMethod {
    pub id: ID,
    pub name: String,
}

#[derive(Clone, Debug, Serialize)]
pub struct FunctionResult {
    pub operations: Vec<Operation>,
}

#[derive(Clone, Debug, Serialize)]
pub struct Operation {
    pub hide: Option<HideOperation>,
    pub r#move: Option<MoveOperation>,
    pub rename: Option<RenameOperation>,
}

#[derive(Clone, Debug, Serialize)]
pub struct HideOperation {
    pub payment_method_id: ID,
}

#[derive(Clone, Debug, Serialize, PartialEq)]
pub struct MoveOperation {
    pub payment_method_id: ID,
    pub index: u64,
}

#[derive(Clone, Debug, Serialize, PartialEq)]
pub struct RenameOperation {
    pub payment_method_id: ID,
    pub name: String,
}
