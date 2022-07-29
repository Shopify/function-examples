#![allow(dead_code)]

pub type Boolean = bool;
pub type Decimal = f64;
pub type Int = i32;
pub type ID = String;

pub mod input {
    use serde::Deserialize;

    #[derive(Clone, Debug, Deserialize, PartialEq)]
    #[serde(rename_all(deserialize = "camelCase"))]
    pub struct Input {
        pub discount_node: DiscountNode,
    }

    #[derive(Clone, Debug, Deserialize, PartialEq)]
    pub struct DiscountNode {
        pub metafield: Option<Metafield>,
    }

    #[derive(Clone, Debug, Deserialize, PartialEq)]
    pub struct Metafield {
        pub value: String,
    }
}
