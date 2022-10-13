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

fn function(input: Input) -> Result<FunctionResult, Box<dyn std::error::Error>> {
    let operations = input.payment_methods.iter().map(|payment_method| {
        Operation {
            rename: Some(RenameOperation {
                payment_method_id: payment_method.id.clone(),
                name: format!("{} renamed", payment_method.name.clone()),
            }),
        }
    }).collect();
    Ok(
        FunctionResult {
            operations,
        }
    )
}

#[cfg(test)]
mod tests {
    use super::*;
    fn default_input() -> Input {
        Input {
            payment_methods: vec![
                PaymentMethod {
                    id: "1".to_string(),
                    name: "payment method 1".to_string()
                },
                PaymentMethod {
                    id: "2".to_string(),
                    name: "payment method 2".to_string()
                },
                PaymentMethod {
                    id: "3".to_string(),
                    name: "payment method 3".to_string()
                },
            ]
        }
    }

    #[test]
    fn test_result_contains_rename_operations() {
        let input = default_input();
        let operations = function(input).unwrap().operations;

        assert_eq!(operations.len(), 3);
        assert_eq!(
            operations[0].rename.as_ref().unwrap().payment_method_id,
            "1"
        );
        assert_eq!(
            operations[0].rename.as_ref().unwrap().name,
            "payment method 1 renamed"
        );

        assert_eq!(
            operations[1].rename.as_ref().unwrap().payment_method_id,
            "2"
        );
        assert_eq!(
            operations[1].rename.as_ref().unwrap().name,
            "payment method 2 renamed"
        );

        assert_eq!(
            operations[2].rename.as_ref().unwrap().payment_method_id,
            "3"
        );
        assert_eq!(
            operations[2].rename.as_ref().unwrap().name,
            "payment method 3 renamed"
        );
    }
}
