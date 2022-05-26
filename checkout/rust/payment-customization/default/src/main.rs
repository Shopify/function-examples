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

fn script(payload: Payload) -> Result<Output, Box<dyn std::error::Error>> {
    let (_input, _config) = (payload.input, payload.configuration);
    return Ok(build_result(vec![]));
}

fn build_result(payment_methods_to_remove: Vec<PaymentMethod>) -> Output {
    Output {
        sort_response: SortResponse {
            proposed_order: vec![],
        },
        filter_response: FilterResponse {
            hidden_methods: payment_methods_to_remove,
        },
        rename_response: RenameResponse {
            rename_proposals: vec![],
        },
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    fn default_payload() -> Payload {
        Payload {
            input: Input {
                purchase_proposal: PurchaseProposal {
                    delivery_lines: vec![],
                },
                payment_methods: vec![
                    PaymentMethod {
                        id: 123456789,
                        name: "Shopify payments".to_string(),
                        cards: vec![
                            "Visa".to_string(),
                            "Mastercard".to_string(),
                            "Discover".to_string(),
                        ],
                    },
                    PaymentMethod {
                        id: 987654321,
                        name: "Auth.net".to_string(),
                        cards: vec!["Visa".to_string(), "Amex".to_string()],
                    },
                    PaymentMethod {
                        id: 523414132,
                        name: "Cash on Delivery".to_string(),
                        cards: vec![],
                    },
                ],
            },
            configuration: Config {
            },
        }
    }

    #[test]
    fn test_returns_empty_output() {
        let payload = default_payload();
        let output = script(payload).unwrap();

        assert_eq!(output.filter_response.hidden_methods.len(), 0);
        assert_eq!(output.filter_response.hidden_methods.len(), 0);
        assert_eq!(output.sort_response.proposed_order.len(), 0);
    }
}
