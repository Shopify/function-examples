use serde::{Deserialize, Serialize};

pub type ID = String;

#[derive(Clone, Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Input {
    pub payment_methods: Vec<PaymentMethod>,
}

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
    pub rename: Option<RenameOperation>
}

#[derive(Clone, Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct RenameOperation {
    pub payment_method_id: ID,
    pub name: String
}
