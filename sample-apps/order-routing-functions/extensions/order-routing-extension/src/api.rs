#![allow(dead_code)]

pub type Boolean = bool;
pub type Decimal = f64;
pub type Int = i32;
pub type ID = String;

pub mod input {
    use super::*;
    use serde::Deserialize;

    #[derive(Clone, Debug, Deserialize, PartialEq)]
    #[serde(rename_all(deserialize = "camelCase"))]
    pub struct Input {
        pub locations: Vec<Location>,
    }
}

use serde::Serialize;
use serde_with::{serde_as, skip_serializing_none, DisplayFromStr};

#[derive(Clone, Debug, Serialize)]
#[serde(rename_all(serialize = "camelCase"))]
pub struct FunctionResult {
    pub locations: Vec<Location>,
}

#[derive(Clone, Debug, Deserialize, PartialEq)]
pub struct Location {
    pub id: ID,
}
