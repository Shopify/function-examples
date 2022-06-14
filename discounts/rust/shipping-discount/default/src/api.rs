// Types defined in this file conforms to the schema https://github.com/Shopify/shopify/blob/main/db/graphql/shopify_vm/shipping_discounts.graphql
// All input fields are optional as they may not be included in the input query
#![allow(dead_code)]

pub type Boolean = bool;
pub type Float = f64;
pub type Int = i64;
pub type ID = String;

pub mod input {
    use super::*;
    use serde::Deserialize;
    pub type UnsignedInt64 = u64;

    #[derive(Clone, Debug, Deserialize)]
    #[serde(rename_all(deserialize = "camelCase"))]
    pub struct Input {
        pub customer: Option<Customer>,
        pub delivery_lines: Option<Vec<DeliveryLineWithStrategy>>,
        pub locale: Option<String>,
        pub merchandise_lines: Option<Vec<MerchandiseLine>>,
    }

    #[derive(Clone, Debug, Deserialize)]
    #[serde(rename_all(deserialize = "camelCase"))]
    pub struct Customer {
        pub accepts_marketing: Option<Boolean>,
        pub email: Option<String>,
        pub id: Option<ID>,
        pub order_count: Option<Int>,
        pub phone: Option<String>,
        pub tags: Option<Vec<String>>,
        pub total_spent: Option<Money>,
    }

    #[derive(Clone, Debug, Deserialize)]
    pub struct Money {
        pub currency: String,
        pub subunits: UnsignedInt64,
    }

    #[derive(Clone, Debug, Deserialize)]
    pub struct DeliveryLineWithStrategy {
        pub destination: Option<Address>,
        pub id: Option<ID>,
        pub price: Option<Money>,
        pub strategy: Option<DeliveryStrategy>,
        pub subscription: Option<Boolean>,
    }

    #[derive(Clone, Debug, Deserialize)]
    pub struct DeliveryStrategy {
        code: Option<String>,
        name: Option<String>,
        source: Option<String>,
    }

    #[derive(Clone, Debug, Deserialize)]
    #[serde(rename_all(deserialize = "camelCase"))]
    pub struct Address {
        pub city: Option<String>,
        pub country_code: Option<String>,
        pub phone: Option<String>,
        pub po_box: Option<Boolean>,
        pub province_code: Option<String>,
        pub zip: Option<String>,
    }

    #[derive(Clone, Debug, Deserialize)]
    #[serde(rename_all(deserialize = "camelCase"))]
    pub struct MerchandiseLine {
        pub id: Option<ID>,
        pub price: Option<Money>,
        pub properties: Option<Vec<Properties>>,
        pub quantity: Option<Int>,
        pub selling_plan: Option<SellingPlan>,
        pub variant: Option<Variant>,
        pub weight: Option<Int>,
    }

    #[derive(Clone, Debug, Deserialize)]
    pub struct Properties {
        pub key: Option<String>,
        pub value: Option<String>,
    }

    #[derive(Clone, Debug, Deserialize)]
    pub struct SellingPlan {
        pub id: Option<ID>,
    }

    #[derive(Clone, Debug, Deserialize)]
    #[serde(rename_all(deserialize = "camelCase"))]
    pub struct Variant {
        pub compare_at_price: Option<Money>,
        pub id: Option<ID>,
        pub product: Option<Product>,
        pub sku: Option<String>,
        pub title: Option<String>,
    }

    #[derive(Clone, Debug, Deserialize)]
    #[serde(rename_all(deserialize = "camelCase"))]
    pub struct Product {
        pub gift_card: Option<Boolean>,
        pub id: Option<ID>,
        pub tags: Option<Vec<String>>,
        pub title: Option<String>,
        pub type_: Option<String>,
        pub vendor: Option<String>,
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
    ShippingLine { id: ID },
}

#[derive(Clone, Debug, Serialize)]
#[serde(rename_all(serialize = "camelCase"))]
pub enum Condition {
    #[serde(rename_all(serialize = "camelCase"))]
    OrderMinimumSubtotal {
        excluded_variant_ids: Vec<ID>,
        minimum_amount: Float,
        target_type: ConditionTargetType,
    },
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
    OrderSubtotal,
    ProductVariant,
}
