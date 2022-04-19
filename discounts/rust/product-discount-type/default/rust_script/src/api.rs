use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Deserialize)]
pub struct Payload {
    pub input: Input,
    pub configuration: Config,
}

#[derive(Clone, Debug, Deserialize)]
#[serde(rename_all(deserialize = "camelCase"))]
pub struct Input {
    pub merchandise_lines: Vec<MerchandiseLine>,
}

#[derive(Clone, Debug, Deserialize)]
pub struct MerchandiseLine {
    pub variant: Option<Variant>,
}

#[derive(Clone, Debug, Deserialize)]
pub struct Variant {
    pub id: u64,
}

#[derive(Clone, Debug, Deserialize)]
#[serde(rename_all(deserialize = "camelCase"))]
pub struct Config {
    pub percentage_off: Option<u64>,
    pub excluded_variant_ids: Option<Vec<u64>>,
}

#[derive(Clone, Debug, Serialize)]
pub struct Output {
    pub discounts: Vec<Discount>,
    pub discount_application_strategy: String,
}

#[derive(Clone, Debug, Serialize)]
pub struct Discount {
    pub targets: Vec<ProductVariantTarget>,
    pub value: Value,
}

#[derive(Clone, Debug, Serialize)]
pub struct ProductVariantTarget {
    pub target_type: String,
    pub id: u64,
}

#[derive(Clone, Debug, Serialize)]
pub struct Value {
    #[serde(rename(serialize = "type"))]
    pub value_type: String,
    pub value: u64,
}
