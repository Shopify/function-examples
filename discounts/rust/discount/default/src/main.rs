use std::process;
pub mod generate_cart_run;
pub mod generate_delivery_run;

fn main() {
    eprintln!("Please invoke a named export.");
    process::exit(1);
}
