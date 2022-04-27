use serde::Serialize;

/*
 * This script provides a basic example of logging, deserialize input and
 * conguration values, and deserialize output (that leaves payment methods unchanged).
 */

mod api;
use api::*;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    // use stderr to print output
    eprintln!("Hello World1");

    // read from stdin and write to stdout
    let payload: Payload = serde_json::from_reader(std::io::BufReader::new(std::io::stdin()))?;
    let mut out = std::io::stdout();
    let mut serializer = serde_json::Serializer::new(&mut out);
    script(payload)?.serialize(&mut serializer)?;
    Ok(())
}

fn script(payload: Payload) -> Result<Output, Box<dyn std::error::Error>> {
    let (input, _config) = (payload.input, payload.configuration);
    let rename_proposals = vec![
        RenameProposal {
            shipping_method: input.shipping_methods[0].id.to_string(),
            name: "My Renamed Shipping Method".to_string(),
            renamed: true
        }
    ];

    Ok(Output {
        sort_response: SortResponse {
            proposed_order: vec![],
        },
        filter_response: FilterResponse {
            hidden_methods: vec![],
        },
        rename_response: RenameResponse {
            rename_proposals: rename_proposals,
        },
    })
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
                shipping_methods: vec![
                    ShippingMethod {
                        id: 123456789,
                        title: "A shipping method".to_string(),
                        code: "abcdefghijklmnopqrstuvwxyz".to_string(),
                        phone_required: false,
                        amount: Money {
                            currency: "USD".to_string(),
                            subunits: 123456789,
                        },
                        markup: None,
                    },
                    ShippingMethod {
                        id: 123456789,
                        title: "Another shipping method".to_string(),
                        code: "1232131".to_string(),
                        phone_required: false,
                        amount: Money {
                            currency: "USD".to_string(),
                            subunits: 123456789,
                        },
                        markup: None
                    },
                ],
            },
            configuration: Config {
            },
        }
    }

    #[test]
    fn test_renames_first_shipping_method() {
        let payload = default_payload();
        let output = script(payload).unwrap();

        assert_eq!(output.filter_response.hidden_methods.len(), 0);
        assert_eq!(output.sort_response.proposed_order.len(), 0);
        assert_eq!(output.rename_response.rename_proposals.len(), 1);

        assert_eq!(output.rename_response.rename_proposals[0].name, "My Renamed Shipping Method");
    }
}
