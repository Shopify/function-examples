use shopify_function::prelude::*;
use std::process;
pub mod cart_delivery_options_discounts_generate_run;
pub mod cart_lines_discounts_generate_run;

fn main() {
    log!("Please invoke a named export.");
    process::abort();
}
