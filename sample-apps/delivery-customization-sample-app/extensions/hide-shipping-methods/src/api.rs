use serde::{Deserialize, Serialize};
use serde_with::{serde_as, DisplayFromStr};

pub type Decimal = f64;
pub type ID = String;

#[derive(Clone, Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Input {
    pub cart: Cart,
    pub delivery_customization: DeliveryCustomization,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Cart {
    pub cost: CartCost,
    pub delivery_groups: Vec<CartDeliveryGroup>,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct CartDeliveryGroup {
    pub delivery_options: Vec<CartDeliveryOption>,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct CartDeliveryOption {
    pub handle: String,
    pub title: String,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct CartCost {
    pub subtotal_amount: Money,
}

#[serde_as]
#[derive(Clone, Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Money {
    #[serde_as(as = "DisplayFromStr")]
    pub amount: Decimal,
    pub currency_code: String,
}

#[derive(Clone, Debug, Serialize)]
pub struct FunctionResult {
    pub operations: Vec<Operation>,
}

// TODO: Comment on typo here - msg patterns team
// maybe, maybe not a typo - look at r#
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
    pub delivery_option_id: ID,
    pub index: u64,
}

#[derive(Clone, Debug, Serialize, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct RenameOperation {
    pub delivery_option_id: ID,
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
