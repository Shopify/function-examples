use serde::Serialize;

/*
 * This script provides a basic example of logging, deserialize input and
 * conguration values, and deserialize output (that leaves payment methods unchanged).
 */

mod api;
use api::*;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    // use stderr to print output
    eprintln!("Hello World");

    // read from stdin and write to stdout
    let payload: Payload = serde_json::from_reader(std::io::BufReader::new(std::io::stdin()))?;
    let mut out = std::io::stdout();
    let mut serializer = serde_json::Serializer::new(&mut out);
    script(payload)?.serialize(&mut serializer)?;
    Ok(())
}

fn script(payload: Payload) -> Result<FunctionResult, Box<dyn std::error::Error>> {
    let (input, _config) = (payload.input, payload.configuration);
    return Ok(build_result(input.payment_methods[0].id.clone()));
}

fn build_result(payment_method_to_remove: ID) -> FunctionResult {
    FunctionResult {
        operations: vec![Operation {
            hide: Some(HideOperation {
                payment_method_id: payment_method_to_remove,
            }),
            r#move: None,
            rename: None,
        }],
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    fn default_payload() -> Payload {
        Payload {
            input: Input {
                purchase_proposal: PurchaseProposal {},
                payment_methods: vec![
                    PaymentMethod {
                        id: "123456789".to_string(),
                        name: "Shopify payments".to_string(),
                    },
                    PaymentMethod {
                        id: "987654321".to_string(),
                        name: "Auth.net".to_string(),
                    },
                    PaymentMethod {
                        id: "523414132".to_string(),
                        name: "Cash on Delivery".to_string(),
                    },
                ],
            },
            configuration: Config {},
        }
    }

    #[test]
    fn test_result_contains_hide_operation() {
        let payload = default_payload();
        let operations = script(payload).unwrap().operations;

        assert_eq!(operations.len(), 1);
        assert_eq!(
            operations[0].hide.as_ref().unwrap().payment_method_id,
            "123456789"
        );
        assert_eq!(operations[0].rename, None);
        assert_eq!(operations[0].r#move, None);
    }
}
