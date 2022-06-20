#![allow(dead_code)]

pub type Boolean = bool;
pub type Float = f64;
pub type Int = i64;
pub type ID = String;

pub mod input {
    use super::*;
    use serde::Deserialize;

    #[derive(Clone, Debug, Deserialize)]
    #[serde(rename_all(deserialize = "camelCase"))]
    pub struct Input {
        pub discount_node: DiscountNode,
        pub cart: Cart,
    }

    #[derive(Clone, Debug, Deserialize, Default)]
    pub struct DiscountNode {
        pub metafield: Metafield,
    }

    #[derive(Clone, Debug, Deserialize, Default)]
    #[serde(rename_all(deserialize = "camelCase"))]
    pub struct Metafield {
        pub value: String,
    }

    #[derive(Clone, Debug, Serialize, Deserialize)]
    #[serde(rename_all = "camelCase")]
    pub struct Configuration {
        pub value: f64,
        pub excluded_variant_ids: Vec<ID>,
    }

    impl Configuration {
        pub const DEFAULT_VALUE: f64 = 50.0;

        fn from_str(str: &str) -> Self {
            serde_json::from_str(str).unwrap_or_default()
        }
    }

    impl Default for Configuration {
        fn default() -> Self {
            Configuration {
                value: Self::DEFAULT_VALUE,
                excluded_variant_ids: vec![],
            }
        }
    }

    impl input::Input {
        pub fn configuration(&self) -> Configuration {
            Configuration::from_str(&self.discount_node.metafield.value)
        }
    }

    #[derive(Clone, Debug, Deserialize)]
    pub struct Cart {
        pub lines: Vec<CartLine>,
    }

    #[derive(Clone, Debug, Deserialize)]
    pub struct CartLine {
        pub id: ID,
        pub merchandise: Merchandise,
    }

    #[derive(Clone, Debug, Deserialize)]
    pub struct Merchandise {
        pub id: Option<ID>,
    }
}

use serde::Serialize;
use serde_with::skip_serializing_none;

#[derive(Clone, Debug, Serialize)]
#[serde(rename_all(serialize = "camelCase"))]
pub struct FunctionResult {
    pub discount_application_strategy: DiscountApplicationStrategy,
    pub discounts: Vec<Discount>,
}

#[derive(Clone, Debug, Serialize)]
#[serde(rename_all(serialize = "SCREAMING_SNAKE_CASE"))]
pub enum DiscountApplicationStrategy {
    First,
    Maximum,
}

#[skip_serializing_none]
#[derive(Clone, Debug, Serialize)]
pub struct Discount {
    pub value: Value,
    pub targets: Vec<Target>,
    pub message: Option<String>,
    pub conditions: Option<Vec<Condition>>,
}

#[derive(Clone, Debug, Serialize)]
#[serde(rename_all(serialize = "camelCase"))]
pub enum Value {
    FixedAmount(FixedAmount),
    Percentage(Percentage),
}

#[derive(Clone, Debug, Serialize)]
#[serde(rename_all(serialize = "camelCase"))]
pub struct FixedAmount {
    pub applies_to_each_item: Option<Boolean>,
    pub value: Float,
}

#[derive(Clone, Debug, Serialize)]
pub struct Percentage {
    pub value: Float,
}

#[skip_serializing_none]
#[derive(Clone, Debug, Serialize)]
#[serde(rename_all(serialize = "camelCase"))]
pub enum Target {
    ProductVariant { id: ID, quantity: Option<Int> },
}

#[derive(Clone, Debug, Serialize)]
#[serde(rename_all(serialize = "camelCase"))]
pub enum Condition {
    #[serde(rename_all(serialize = "camelCase"))]
    ProductMinimumQuantity {
        ids: Vec<ID>,
        minimum_quantity: Int,
        target_type: ConditionTargetType,
    },
    #[serde(rename_all(serialize = "camelCase"))]
    ProductMinimumSubtotal {
        ids: Vec<ID>,
        minimum_amount: Float,
        target_type: ConditionTargetType,
    },
}

#[derive(Clone, Debug, Serialize)]
#[serde(rename_all(serialize = "SCREAMING_SNAKE_CASE"))]
pub enum ConditionTargetType {
    ProductVariant,
}
