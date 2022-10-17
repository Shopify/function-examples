use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Input {
    pub delivery_customization: DeliveryCustomization,
}

#[derive(Clone, Debug, Deserialize)]
pub struct DeliveryCustomization {
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
    pub r#move: Option<MoveOperation>,
    pub rename: Option<RenameOperation>,
}

#[derive(Clone, Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct HideOperation {
    pub delivery_option_handle: String,
}

#[derive(Clone, Debug, Serialize, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct MoveOperation {
    pub delivery_option_handle: String,
    pub index: u64,
}

#[derive(Clone, Debug, Serialize, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct RenameOperation {
    pub delivery_option_handle: String,
    pub name: String,
}
