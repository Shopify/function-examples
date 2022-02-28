/*
 * This script filters payment methods when both of the following conditions are met:
 *   - The payment method name matches the `payment_method_name` field from the configuration.
 *   - The total price of the checkout (`purchase_proposal`) is greater than the `threshold` field
 *     from the configuration in CAD.
 */

use serde::Serialize;

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
    let (input, config) = (payload.input, payload.configuration);

    // for now, all configuration values are strings, and casting is needed
    let threshold = config.threshold.parse::<f32>().unwrap();
    let payment_method_name  = config.payment_method_name;

    // this example only works for some currencies such as CAD
    let total_price = (input.purchase_proposal.merchandise_lines.iter().fold(
        0, |sum, line| sum + line.price.subunits) as f32)/100.00;

    let mut hidden_methods = vec![];

    if total_price <= threshold {
        hidden_methods = input.payment_methods.into_iter()
          .filter(|payment_method| payment_method.name==payment_method_name).collect();
    }

    return Ok(build_result(hidden_methods));
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
                    merchandise_lines: vec![
                        MerchandiseLine {
                            quantity: 2,
                            price: Money {
                                subunits: 5000,
                                currency: "CAD".to_string(),
                            }
                        },
                        MerchandiseLine {
                            quantity: 3,
                            price: Money {
                                subunits: 1000,
                                currency: "CAD".to_string(),
                            }
                        },
                    ],
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
                payment_method_name: "Shopify payments".to_string(),
                threshold: "30.05".to_string(),
            },
        }
    }

    #[test]
    fn test_returns_empty_output_when_name_does_not_match() {
        let mut payload = default_payload();
        payload.configuration.payment_method_name = "Bogus Payment".to_string();
        let output = script(payload).unwrap();

        assert_eq!(output.filter_response.hidden_methods.len(), 0);
        assert_eq!(output.rename_response.rename_proposals.len(), 0);
        assert_eq!(output.sort_response.proposed_order.len(), 0);
    }

    #[test]
    fn test_returns_return_empty_output_when_below_threshold() {
        let payload = default_payload();
        let output = script(payload).unwrap();

        assert_eq!(output.filter_response.hidden_methods.len(), 0);
        assert_eq!(output.rename_response.rename_proposals.len(), 0);
        assert_eq!(output.sort_response.proposed_order.len(), 0);
    }

    #[test]
    fn test_returns_1_hidden_method() {
        let mut payload = default_payload();
        payload.configuration.threshold = "300.01".to_string();
        let output = script(payload).unwrap();

        assert_eq!(output.filter_response.hidden_methods[0].name, "Shopify payments".to_string());
        assert_eq!(output.rename_response.rename_proposals.len(), 0);
        assert_eq!(output.sort_response.proposed_order.len(), 0);
    }
}
