use serde::Serialize;

mod api;
use api::*;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    // use stderr to print output
    eprintln!("Hello World");

    // read from stdin and write to stdout
    let input: Input = serde_json::from_reader(std::io::BufReader::new(std::io::stdin()))?;
    let mut out = std::io::stdout();
    let mut serializer = serde_json::Serializer::new(&mut out);
    function(input)?.serialize(&mut serializer)?;
    Ok(())
}

fn function(input: Input) -> Result<FunctionResult, Box<dyn std::error::Error>> {
    Ok(build_result(input.payment_methods[0].id.clone()))
}

fn build_result(payment_method_to_remove: ID) -> FunctionResult {
    FunctionResult {
        operations: vec![Operation {
            hide: Some(HideOperation {
                payment_method_id: payment_method_to_remove,
            }),
        }],
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    fn default_input() -> Input {
        Input {
            payment_methods: vec![
                PaymentMethod {
                    id: "123456789".to_string(),
                },
                PaymentMethod {
                    id: "987654321".to_string(),
                },
                PaymentMethod {
                    id: "523414132".to_string(),
                },
            ],
            payment_customization: PaymentCustomization {
                metafield: None
            }
        }
    }

    #[test]
    fn test_result_contains_hide_operation() {
        let input = default_input();
        let operations = function(input).unwrap().operations;

        assert_eq!(operations.len(), 1);
        assert_eq!(
            operations[0].hide.as_ref().unwrap().payment_method_id,
            "123456789"
        );
    }
}
