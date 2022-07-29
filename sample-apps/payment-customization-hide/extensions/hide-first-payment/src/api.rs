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
#[serde(rename_all = "camelCase")]
pub struct Input {
    pub payment_methods: Vec<PaymentMethod>,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct PaymentMethod {
    pub id: ID,
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
pub struct HideOperation {
    pub payment_method_id: ID,
}