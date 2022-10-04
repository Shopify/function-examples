use serde::{Deserialize, Serialize};

pub type ID = String;

#[derive(Clone, Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Input {
    pub delivery_options: Vec<DeliveryOption>,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct DeliveryOption {
    pub id: ID,
    pub title: String,
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
#[serde(rename_all = "camelCase")]
pub struct HideOperation {
    pub delivery_option_id: ID,
}

#[derive(Clone, Debug, Serialize, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct MoveOperation {
    pub delivery_option_id: ID,
    pub index: u64,
}

#[derive(Clone, Debug, Serialize, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct RenameOperation {
    pub delivery_option_id: ID,
    pub title: String,
}
