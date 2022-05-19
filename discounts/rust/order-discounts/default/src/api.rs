use serde::{Deserialize, Serialize};
use serde_with::skip_serializing_none;

#[derive(Clone, Debug, Serialize)]
#[serde(rename_all(serialize = "camelCase"))]
pub struct FunctionResult {
    pub discounts: Vec<Discount>,
    pub discount_application_strategy: DiscountApplicationStrategy,
}

pub type ID = String;
pub type MoneySubunits = u64;

#[skip_serializing_none]
#[derive(Clone, Debug, Serialize)]
pub struct Discount {
    pub value: Value,
    pub targets: Vec<Target>,
    pub message: Option<String>,
    pub conditions: Option<Condition>,
}

#[derive(Clone, Debug, Serialize)]
#[serde(rename_all(serialize = "camelCase"))]
pub enum Value {
    FixedAmount(FixedAmount),
    Percentage(Percentage),
}

#[derive(Clone, Debug, Serialize)]
pub struct FixedAmount {
    pub value: MoneySubunits,
}

#[derive(Clone, Debug, Serialize)]
pub struct Percentage {
    pub value: f64,
}

#[skip_serializing_none]
#[derive(Clone, Debug, Serialize)]
#[serde(rename_all(serialize = "camelCase"))]
pub enum Target {
    #[serde(rename_all(serialize = "camelCase"))]
    OrderSubtotal {
        excluded_variant_ids: Vec<ID>,
    },
    ProductVariant {
        id: ID,
        quantity: Option<u64>,
    },
}

#[derive(Clone, Debug, Serialize)]
pub enum Condition {
    #[serde(rename_all(serialize = "camelCase"))]
    OrderMinimumSubtotal {
        target_type: ConditionTargetType,
        excluded_variant_ids: Vec<ID>,
        minimum_amount: MoneySubunits,
    },
    #[serde(rename_all(serialize = "camelCase"))]
    ProductMinimumQuantity {
        target_type: ConditionTargetType,
        excluded_variant_ids: Vec<ID>,
        minimum_amount: MoneySubunits,
    },
    #[serde(rename_all(serialize = "camelCase"))]
    ProductMinimumSubtotal {
        target_type: ConditionTargetType,
        excluded_variant_ids: Vec<ID>,
        minimum_amount: MoneySubunits,
    },
}

#[derive(Clone, Debug, Serialize)]
#[serde(rename_all(serialize = "SCREAMING_SNAKE_CASE"))]
pub enum ConditionTargetType {
    OrderSubtotal,
    ProductVariant,
}

#[derive(Clone, Debug, Serialize)]
#[serde(rename_all(serialize = "SCREAMING_SNAKE_CASE"))]
pub enum DiscountApplicationStrategy {
    First,
    Maximum,
}

#[derive(Clone, Debug, Deserialize)]
pub struct Input {}
