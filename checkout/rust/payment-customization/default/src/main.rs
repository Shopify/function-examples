use shopify_function::prelude::*;
use std::process;
pub mod run;

fn main() {
    log!("Please invoke a named export.");
    process::abort();
}
