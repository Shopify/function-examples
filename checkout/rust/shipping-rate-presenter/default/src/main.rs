use serde::Serialize;

/*
 * This script provides a basic example of logging, deserialize input and
 * conguration values, and deserializing output. 
 *
 * It'll rename every shipping rate to match the email address of the customer. 
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
    script(&payload)?.serialize(&mut serializer)?;
    Ok(())
}

fn script(payload: &Payload) -> Result<Output, Box<dyn std::error::Error>> {
    let customer_email = &payload.input.purchase_proposal.buyer_identity.email;
    let shipping_rates = &payload.input.shipping_rates;

    return Ok(
        Output {
            rename_proposals: shipping_rates.iter().map(|rate| {
                RenameProposal {
                    shipping_rate_id: rate.id,
                    name: customer_email.clone(),
                }
            }).collect(),
            proposed_order: None,
            hidden_rate_ids: vec![],
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
                    buyer_identity: BuyerIdentity {
                        email: "bob@gmail.com".to_string(),
                    }
                },
                shipping_rates: vec![
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
    fn test_renames_all_methods() {
        let payload = default_payload();
        let output = script(&payload).unwrap();

        assert_eq!(output.rename_proposals.len(), 3);
        assert!(output.rename_proposals.iter().all(|proposal| proposal.name == payload.input.purchase_proposal.buyer_identity.email));
    }
}
