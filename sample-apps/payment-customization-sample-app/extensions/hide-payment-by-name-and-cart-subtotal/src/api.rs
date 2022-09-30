use serde::{Deserialize, Serialize};
use serde_with::{serde_as, DisplayFromStr};

pub type Decimal = f64;
pub type ID = String;

#[serde_as]
#[derive(Clone, Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Input {
    pub cart: Cart,
    pub payment_methods: Vec<PaymentMethod>,
    pub payment_customization: PaymentCustomization,
    #[serde_as(as = "DisplayFromStr")]
    pub presentment_currency_rate: Decimal,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct Cart {
    pub cost: CartCost,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct CartCost {
    pub subtotal_amount: Money,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct Money {
    pub subunits: u64,
    pub currency: String,
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
