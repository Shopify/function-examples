use serde::{Deserialize, Serialize};

mod api;
use api::*;

#[derive(Clone, Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Configuration {
    pub payment_method: String,
    pub cart_subtotal: u64,
}

impl Configuration {
    fn from_str(value: &str) -> Self {
        serde_json::from_str(value).expect("Unable to parse configuration value from metafield")
    }
}

impl Input {
    pub fn configuration(&self) -> Option<Configuration> {
        for customization in self.payment_customizations.iter_mut() {
            customization.metafield.as_ref()
                .map(|metafield| Configuration::from_str(&metafield.value))
        }
    }
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let input: Input = serde_json::from_reader(std::io::BufReader::new(std::io::stdin()))?;
    let mut out = std::io::stdout();
    let mut serializer = serde_json::Serializer::new(&mut out);
    function(input)?.serialize(&mut serializer)?;
    Ok(())
}

fn function(input: Input) -> Result<FunctionResult, Box<dyn std::error::Error>> {
    let configuration = input.configuration();
    // there might be multiple payment customizations
    // need to convert this to loop through all of them
    // and if in any of them the cart subtotal is higher than
    // the one specified in the configuration, then we should hide it
    match configuration {
        Some(Configuration { payment_method, cart_subtotal }) => {
            let subtotal_amount = input.cart.cost.subtotal_amount;
            let cart_subtotal_threshold = convert_to_cart_currency(
                cart_subtotal,
                input.presentment_currency_rate,
                subtotal_amount.currency,
            );

            println!("Presentment currency rate: {}", input.presentment_currency_rate);
            println!("Cart subtotal: {}", subtotal_amount.subunits);
            println!("Threshold: {}", cart_subtotal_threshold.subunits);

            if cart_subtotal > 0 && subtotal_amount.subunits >= cart_subtotal_threshold.subunits {
                let payment_methods = &input.payment_methods;
                let payment_method_name = payment_method;
                let operations = payment_methods
                    .iter()
                    .filter_map(|payment_method| {
                        if payment_method.name.contains(&payment_method_name) {
                            Some(Operation {
                                hide: Some(HideOperation {
                                    payment_method_id: payment_method.id.clone(),
                                }),
                            })
                        } else {
                            None
                        }
                    })
                    .collect();

                Ok(FunctionResult { operations })
            } else {
                Ok(FunctionResult { operations: vec![] })
            }
        },
        None => { Ok(FunctionResult { operations: vec![] }) }
    }
}

fn convert_to_cart_currency(
    subunits: u64,
    presentment_currency_rate: f64,
    currency: String,
) -> Money {
    Money {
        subunits: (subunits as f64 * presentment_currency_rate) as u64,
        currency,
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    fn input(configuration: Option<Configuration>) -> Input {
        let input = r#"
        {
            "cart": {
                "cost": {
                    "subtotalAmount": {
                        "subunits": 1000,
                        "currency": "CAD"
                    }
                }
            },
            "paymentMethods": [
                {
                    "id": "gid://shopify/PaymentCustomizationPaymentMethod/0",
                    "name": "Method A"
                },
                {
                    "id": "gid://shopify/PaymentCustomizationPaymentMethod/1",
                    "name": "Method B"
                },
                {
                    "id": "gid://shopify/PaymentCustomizationPaymentMethod/2",
                    "name": "Method C"
                }
            ],
            "paymentCustomizations": [{ "metafield": null }],
            "presentmentCurrencyRate": "2.00"
        }
        "#;
        let default_input: Input = serde_json::from_str(input).unwrap();
        let metafield = configuration.map(|config| Metafield { value: serde_json::to_string(&config).unwrap() });

        Input {
            payment_customizations: PaymentCustomizations { metafield },
            ..default_input
        }
    }

    #[test]
    fn test_with_no_configuration() {
        let input = input(None);
        let operations = function(input).unwrap().operations;

        assert!(operations.is_empty());
    }

    #[test]
    fn test_does_not_hide_payment_method_when_subtotal_below_configured_cart_subtotal() {
        let input = input(Some(Configuration {
            payment_method: "Method C".to_string(),
            cart_subtotal: 10000,
        }));
        let operations = function(input).unwrap().operations;

        assert!(operations.is_empty());
    }

    #[test]
    fn test_hides_payment_method_when_subtotal_exceeds_configured_cart_subtotal() {
        let input = input(Some(Configuration {
            payment_method: "Method C".to_string(),
            cart_subtotal: 10000,
        }));
        let operations = function(input).unwrap().operations;

        assert_eq!(operations.len(), 1);
        assert_eq!(
            operations[0].hide.as_ref().unwrap().payment_method_id,
            "gid://shopify/PaymentCustomizationPaymentMethod/2"
        );
    }
}
