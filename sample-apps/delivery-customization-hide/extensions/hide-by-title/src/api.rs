use serde::{Deserialize, Serialize};
use serde_with::{serde_as, DisplayFromStr};

pub type Decimal = f64;

#[serde_as]
#[derive(Clone, Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Input {
    pub cart: Cart,
    pub delivery_customization: DeliveryCustomization,
    pub localization: Localization,
    #[serde_as(as = "DisplayFromStr")]
    pub presentment_currency_rate: Decimal,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Cart {
    pub delivery_groups: Vec<CartDeliveryGroup>,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct CartDeliveryGroup {
    pub delivery_options: Vec<CartDeliveryOption>,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct CartDeliveryOption {
    pub handle: String,
    pub title: String,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct DeliveryCustomization {
    pub metafield: Option<Metafield>,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct Metafield {
    pub value: String,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct Localization {
    pub country: Country,
    pub language: Language,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Country {
    pub iso_code: String,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Language {
    pub iso_code: String,
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
    pub delivery_option_handle: String,
}
