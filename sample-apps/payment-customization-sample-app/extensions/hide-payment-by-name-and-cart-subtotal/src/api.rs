use serde::{Deserialize, Serialize};

pub type ID = String;

#[derive(Clone, Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Input {
    pub payment_methods: Vec<PaymentMethod>,
    pub payment_customization: PaymentCustomization,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct PaymentCustomization {
    pub metafield: Option<Metafield>,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct Metafield {
    pub value: String,
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
    pub hide: Option<HideOperation>,
}

#[derive(Clone, Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct HideOperation {
    pub payment_method_id: ID,
}
