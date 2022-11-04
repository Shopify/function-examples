use serde::Serialize;

mod api;
use api::*;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let input: Input = serde_json::from_reader(std::io::BufReader::new(std::io::stdin()))?;
    let mut out = std::io::stdout();
    let mut serializer = serde_json::Serializer::new(&mut out);
    function(input)?.serialize(&mut serializer)?;
    Ok(())
}

fn function(_input: Input) -> Result<FunctionResult, Box<dyn std::error::Error>> {
    Ok(FunctionResult { operations: vec![] })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_result_contains_no_operations() {
        let input = Input {
            delivery_customization: DeliveryCustomization { metafield: None },
        };
        let operations = function(input).unwrap().operations;

        assert!(operations.is_empty());
    }
}
