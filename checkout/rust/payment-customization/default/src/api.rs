use serde::{Deserialize, Serialize};

pub type ID = String;

#[derive(Clone, Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Input {
    pub payment_customization: PaymentCustomization,
}

#[derive(Clone, Debug, Deserialize)]
pub struct PaymentCustomization {
    pub metafield: Option<Metafield>,
}

#[derive(Clone, Debug, Deserialize)]
pub struct Metafield {
    pub value: String,
}

#[derive(Clone, Debug, Serialize)]
pub struct FunctionResult {
    pub operations: Vec<Operation>,
}

#[derive(Clone, Debug, Serialize)]
pub struct Operation {
    pub hide: Option<HideOperation>,
    pub remove: Option<MoveOperation>,
    pub rename: Option<RenameOperation>,
}

#[derive(Clone, Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct HideOperation {
    pub payment_method_id: ID,
}

#[derive(Clone, Debug, Serialize, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct MoveOperation {
    pub payment_method_id: ID,
    pub index: u64,
}

#[derive(Clone, Debug, Serialize, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct RenameOperation {
    pub payment_method_id: ID,
    pub name: String,
}
