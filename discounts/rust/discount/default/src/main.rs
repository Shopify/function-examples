use std::process;
pub mod cart_delivery_options_discounts_generate_run;
pub mod cart_lines_discounts_generate_run;

fn main() {
    eprintln!("Please invoke a named export.");
    process::exit(1);
}
