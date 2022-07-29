mod api;
use api::*;

impl input::Input {
    pub fn function_result(&self) -> String {
        match &self.discount_node.metafield {
            Some(metafield) => metafield.value.clone(),
            None => "{}".to_string(),
        }
    }
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let input: input::Input = serde_json::from_reader(std::io::BufReader::new(std::io::stdin()))?;
    println!("{}", input.function_result());
    Ok(())
}
