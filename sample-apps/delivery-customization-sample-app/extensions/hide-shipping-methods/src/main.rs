use serde::{Deserialize, Serialize};
use serde_with::{serde_as, DisplayFromStr};

mod api;
use api::*;

#[serde_as]
#[derive(Clone, Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Configuration {
    pub shipping_method: String,
    #[serde_as(as = "DisplayFromStr")]
    pub cart_subtotal_threshhold: Decimal,
    pub exact_match: bool,
}

impl Configuration {
    fn from_str(value: &str) -> Self {
        serde_json::from_str(value).expect("Unable to parse configuration value from metafield")
    }
}

impl Input {
    pub fn configuration(&self) -> Option<Configuration> {
        self.delivery_customization
            .metafield
            .as_ref()
            .map(|metafield| Configuration::from_str(&metafield.value))
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
    eprintln!("Config {:?}", &configuration);

    match configuration {
        Some(Configuration {
            cart_subtotal_threshhold,
            shipping_method,
            exact_match,
        }) => {
            let subtotal_amount = input.cart.cost.subtotal_amount.amount;
            let delivery_options = delivery_options_from_cart(&input.cart);
            if subtotal_amount < cart_subtotal_threshhold {
                eprintln!("Good job, the function ran sucessfully without operations.");
                Ok(FunctionResult { operations: vec![] })
            } else {
                let operations =
                    generate_hide_operation(&shipping_method, exact_match, delivery_options);
                eprintln!("Good job, the function ran sucessfully with operations.");
                Ok(FunctionResult { operations })
            }
        }
        None => Ok(FunctionResult { operations: vec![] }),
    }
}

fn delivery_options_from_cart(cart: &Cart) -> Vec<&CartDeliveryOption> {
    cart.delivery_groups
        .iter()
        .flat_map(|delivery_group| &delivery_group.delivery_options)
        .collect()
}

fn generate_hide_operation(
    title: &str,
    exact: bool,
    delivery_options: Vec<&CartDeliveryOption>,
) -> Vec<Operation> {
    return delivery_options
        .iter()
        .filter_map(|delivery_option| {
            if exact {
                eprintln!("Exact Match Hide Operation");
                exact_match(delivery_option, title)
            } else {
                eprintln!("Includes Match Hide Operation");
                includes_match(delivery_option, title)
            }
        })
        .collect();
}

fn exact_match(delivery_option: &CartDeliveryOption, title_to_match: &str) -> Option<Operation> {
    if delivery_option.title == title_to_match {
        Some(Operation {
            hide: Some(HideOperation {
                delivery_option_handle: delivery_option.handle.clone(),
            }),
            r#move: None,
            rename: None,
        })
    } else {
        None
    }
}

fn includes_match(delivery_option: &CartDeliveryOption, title_to_match: &str) -> Option<Operation> {
    if delivery_option.title.contains(&title_to_match) {
        Some(Operation {
            hide: Some(HideOperation {
                delivery_option_handle: delivery_option.handle.clone(),
            }),
            r#move: None,
            rename: None,
        })
    } else {
        None
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_result_contains_no_operations() {
        let input = Input {
            cart: Cart {
                cost: CartCost {
                    subtotal_amount: Money {
                        amount: 1000.0,
                        currency_code: "CAD".to_string(),
                    },
                },
                delivery_groups: vec![CartDeliveryGroup {
                    delivery_options: vec![CartDeliveryOption {
                        handle: "handle1".to_string(),
                        title: "example title".to_string(),
                    }],
                }],
            },
            delivery_customization: DeliveryCustomization {
                metafield: {
                    Some(Metafield {
                        value: "{\"cartSubtotalThreshhold\": \"1000\", \"shippingMethod\": \"Express\", \"exactMatch\": true}".to_string(),
                    })
                },
            },
        };

        let operations = function(input).unwrap().operations;

        assert!(operations.is_empty());
    }

    #[test]
    fn test_result_contains_operations() {
        let input = Input {
            cart: Cart {
                cost: CartCost {
                    subtotal_amount: Money {
                        amount: 1000.0,
                        currency_code: "CAD".to_string(),
                    },
                },
                delivery_groups: vec![CartDeliveryGroup {
                    delivery_options: vec![CartDeliveryOption {
                        handle: "handle1".to_string(),
                        title: "Express".to_string(),
                    }],
                }],
            },
            delivery_customization: DeliveryCustomization {
                metafield: {
                    Some(Metafield {
                        value: "{\"cartSubtotalThreshhold\": \"1000\", \"shippingMethod\": \"Express\", \"exactMatch\": true}".to_string(),
                    })
                },
            },
        };

        let operations = function(input).unwrap().operations;

        assert_eq!(operations.len(), 1);
    }
}
