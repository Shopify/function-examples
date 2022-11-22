use serde::{Deserialize, Serialize};

mod api;
use api::*;

#[derive(Clone, Debug, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct Configuration {
    pub delivery_option_title: String,
}

impl Input {
    pub fn configuration(&self) -> Configuration {
        match &self.delivery_customization.metafield {
            Some(Metafield { value }) => Configuration {
                delivery_option_title: value.to_string(),
            },
            None => Configuration::default(),
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
    let delivery_options = delivery_options(&input.cart);
    let delivery_option_title = input.configuration().delivery_option_title;
    let operations = delivery_options
        .iter()
        .filter_map(|delivery_option| {
            if &delivery_option_title == &delivery_option.title.as_str() {
                Some(Operation {
                    r#move: Some(MoveOperation {
                        delivery_option_handle: delivery_option.handle.clone(),
                        index: delivery_options.len() as i32 - 1,
                    }),
                })
            } else {
                None
            }
        })
        .collect();

    Ok(FunctionResult { operations })
}

fn delivery_options(cart: &Cart) -> Vec<&CartDeliveryOption> {
    cart.delivery_groups
        .iter()
        .flat_map(|delivery_group| &delivery_group.delivery_options)
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;
    fn input(delivery_option_title: Option<String>) -> Input {
        let input = r#"
        {
            "cart": {
                "deliveryGroups": [
                    {
                        "deliveryOptions": [
                            { "handle": "method-a", "title": "Method A" }
                        ]
                    },
                    {
                        "deliveryOptions": [
                            { "handle": "method-b", "title": "Method B" },
                            { "handle": "method-c", "title": "Method C" }
                        ]
                    }
                ]
            },
            "deliveryCustomization": {
                "metafield": null
            },
            "localization": {
                "country": { "isoCode": "CA" },
                "language": { "isoCode": "EN" }
            },
            "presentmentCurrencyRate": "2.0"
        }
        "#;
        let default_input: Input = serde_json::from_str(input).unwrap();
        let metafield = delivery_option_title.map(|value| Metafield { value });

        Input {
            delivery_customization: DeliveryCustomization { metafield },
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
    fn test_move_operations_with_configuration() {
        let input = input(Some("Method A".to_string()));
        let operations = function(input).unwrap().operations;

        assert_eq!(operations.len(), 1);
        assert_eq!(
            operations[0]
                .r#move
                .as_ref()
                .unwrap()
                .delivery_option_handle,
            "method-a"
        );
        assert_eq!(operations[0].r#move.as_ref().unwrap().index, 2);
    }
}
