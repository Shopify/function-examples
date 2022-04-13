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
    let payload: Payload = rmp_serde::decode::from_read(std::io::stdin())?;
    let mut out = std::io::stdout();
    let mut serializer = rmp_serde::Serializer::new(&mut out).with_struct_map();
    script(payload)?.serialize(&mut serializer)?;
    Ok(())
}

fn script(payload: Payload) -> Result<Output, Box<dyn std::error::Error>> {
    let (_input, _config) = (payload.input, payload.configuration);
    return Ok(
        Output {
            sort_response: SortResponse {
                proposed_order: vec![],
            },
            filter_response: FilterResponse {
                hidden_methods: vec![],
            },
            rename_response: RenameResponse {
                rename_proposals: vec![],
            },
        }
    );
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
                    ShippingRate {
                        id: 1,
                        title: "Ground".to_string(),
                        code: "ground".to_string(),
                        amount: Money {
                            subunits: 100,
                            currency: "USD".to_string(),
                        },
                        phone_required: false,
                        markup: Money {
                            subunits: 0,
                            currency: "USD".to_string(),
                        }
                    },
                    ShippingRate {
                        id: 2,
                        title: "Air".to_string(),
                        code: "air".to_string(),
                        amount: Money {
                            subunits: 100,
                            currency: "USD".to_string(),
                        },
                        phone_required: false,
                        markup: Money {
                            subunits: 0,
                            currency: "USD".to_string(),
                        }
                    },
                    ShippingRate {
                        id: 3,
                        title: "Sea".to_string(),
                        code: "sea".to_string(),
                        amount: Money {
                            subunits: 100,
                            currency: "USD".to_string(),
                        },
                        phone_required: false,
                        markup: Money {
                            subunits: 0,
                            currency: "USD".to_string(),
                        }
                    }
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
