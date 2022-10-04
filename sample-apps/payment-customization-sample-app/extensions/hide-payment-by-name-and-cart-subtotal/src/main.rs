use serde::{Deserialize, Serialize};

mod api;
use api::*;

#[derive(Clone, Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Configuration {
    pub payment_method: String,
    pub cart_subtotal: u64,
}

impl Input {
    pub fn configurations(&self) -> Vec<Configuration> {
        match &self.payment_customization.metafield {
            Some(Metafield { value }) => {
                serde_json::from_str(value).expect("Unable to parse configuration value from metafield")
            },
            None => vec![],
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
    Ok(FunctionResult {
        operations: ids_to_hide(&input)
            .iter()
            .map(|id| Operation { hide: Some(HideOperation { payment_method_id: id.to_string() }) })
            .collect(),
    })
}

fn convert_to_cart_currency(
    subunits: u64,
    presentment_currency_rate: f64,
    currency: &str,
) -> Money {
    Money {
        subunits: (subunits as f64 * presentment_currency_rate) as u64,
        currency: currency.to_string(),
    }
}

fn names_to_hide(input: &Input) -> Vec<String> {
    let configurations = input.configurations();
    if configurations.is_empty() {
        return vec![];
    }

    let cart_subtotal = &input.cart.cost.subtotal_amount;
    let presentment_currency_rate = input.presentment_currency_rate;

    configurations.iter().filter_map(|configuration| {
        let threshold = convert_to_cart_currency(
            configuration.cart_subtotal,
            presentment_currency_rate,
            &cart_subtotal.currency,
        );
        if cart_subtotal.subunits >= threshold.subunits {
            Some(configuration.payment_method.clone())
        } else {
            None
        }
    }).collect()
}

fn ids_to_hide(input: &Input) -> Vec<String> {
    let names = names_to_hide(input);
    (&input.payment_methods).iter().filter_map(|payment_method| {
        if names.contains(&payment_method.name) {
            Some(payment_method.id.clone())
        } else {
            None
        }
    }).collect()
}

#[cfg(test)]
mod tests {
    use super::*;
    fn input(configurations: Vec<Configuration>) -> Input {
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
            "paymentCustomization": { "metafield": null },
            "presentmentCurrencyRate": "2.00"
        }
        "#;
        let default_input: Input = serde_json::from_str(input).unwrap();

        if configurations.is_empty() {
            Input { ..default_input }
        } else {
            let value = serde_json::to_string(&configurations).unwrap();
            Input {
                payment_customization: PaymentCustomization { metafield: Some(Metafield { value }) },
                ..default_input
            }
        }
    }

    #[test]
    fn test_with_no_configuration() {
        let input = input(vec![]);
        let operations = function(input).unwrap().operations;

        assert!(operations.is_empty());
    }

    #[test]
    fn test_does_not_hide_payment_method_when_subtotal_below_configured_cart_subtotal() {
        let input = input(vec![
            Configuration {
                payment_method: "Method A".to_string(),
                cart_subtotal: 3000,
            },
            Configuration {
                payment_method: "Method C".to_string(),
                cart_subtotal: 10000,
            },
        ]);
        let operations = function(input).unwrap().operations;

        assert!(operations.is_empty());
    }

    #[test]
    fn test_hides_payment_method_when_subtotal_exceeds_configured_cart_subtotal() {
        let input = input(vec![
            Configuration {
                payment_method: "Method A".to_string(),
                cart_subtotal: 500,
            },
            Configuration {
                payment_method: "Method C".to_string(),
                cart_subtotal: 10000,
            },
        ]);
        let operations = function(input).unwrap().operations;

        assert_eq!(operations.len(), 1);
        assert_eq!(
            operations[0].hide.as_ref().unwrap().payment_method_id,
            "gid://shopify/PaymentCustomizationPaymentMethod/0"
        );
    }
}
