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
    let mut operations = vec![];
    let length = input.payment_methods.len() as u8;
    for (i, payment_method) in input.payment_methods.iter().enumerate() {
        let new_position = length - 1 - (i as u8);
        operations.push(Operation {
            r#move: Some(MoveOperation {
                payment_method_id: payment_method.id.clone(),
                index: new_position
            })
        })
    }
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
                    id: "payment_method_id_1".to_string(),
                },
                PaymentMethod {
                    id: "payment_method_id_2".to_string(),
                },
                PaymentMethod {
                    id: "payment_method_id_3".to_string(),
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
            operations[0].r#move.as_ref().unwrap().payment_method_id,
            "payment_method_id_1"
        );
        assert_eq!(
            operations[0].r#move.as_ref().unwrap().index,
            2
        );

        assert_eq!(
            operations[1].r#move.as_ref().unwrap().payment_method_id,
            "payment_method_id_2"
        );
        assert_eq!(
            operations[1].r#move.as_ref().unwrap().index,
            1
        );

        assert_eq!(
            operations[2].r#move.as_ref().unwrap().payment_method_id,
            "payment_method_id_3"
        );
        assert_eq!(
            operations[2].r#move.as_ref().unwrap().index,
            0
        );
    }
}
