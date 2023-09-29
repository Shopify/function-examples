use std::process;
pub mod run;

fn main() {
    eprintln!("Please invoke a named export.");
    process::exit(1);
}
