use serde::{Deserialize, Serialize};

mod api;
use api::*;

#[derive(Clone, Debug, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct Configuration {
    pub shipping_method_name: String,
}

impl Configuration {
    fn from_str(value: &str) -> Self {
        serde_json::from_str(value).expect("Unable to parse configuration value from metafield")
    }
}

impl Input {
    pub fn configuration(&self) -> Configuration {
        match &self.delivery_customization.metafield {
            Some(Metafield { value }) => Configuration::from_str(value),
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
    let shipping_method_name = input.configuration().shipping_method_name;
    let operations = delivery_options
        .iter()
        .filter_map(|delivery_option| {
            if (&shipping_method_name.as_bytes() == &delivery_option.title.as_bytes()) {
                Some(Operation {
                    rename: Some(RenameOperation {
                        delivery_option_handle: delivery_option.handle.clone(),
                        title: format!("{} {}", delivery_option.title.clone(), "renamed"),
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
    fn input(configuration: Option<Configuration>) -> Input {
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
            "deliveryCustomization": { "metafield": null },
            "localization": {
                "country": { "isoCode": "CA" },
                "language": { "isoCode": "EN" }
            },
            "presentmentCurrencyRate": "2.0"
        }
        "#;
        let default_input: Input = serde_json::from_str(input).unwrap();
        let value = serde_json::to_string(&configuration.unwrap_or_default()).unwrap();

        Input {
            delivery_customization: DeliveryCustomization {
                metafield: Some(Metafield { value }),
            },
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
    fn test_rename_operations_with_configuration() {
        let input = input(Some(Configuration {
            shipping_method_name: vec!["Method A".to_string(), "Method C".to_string()],
        }));
        let operations = function(input).unwrap().operations;

        assert_eq!(operations.len(), 2);
        assert_eq!(
            operations[0]
                .rename
                .as_ref()
                .unwrap()
                .delivery_option_handle,
            "method-a"
        );
        assert_eq!(
            operations[0].rename.as_ref().unwrap().title,
            "Method A renamed"
        );
        assert_eq!(
            operations[1]
                .rename
                .as_ref()
                .unwrap()
                .delivery_option_handle,
            "method-c"
        );
        assert_eq!(
            operations[1].rename.as_ref().unwrap().title,
            "Method C renamed"
        );
    }
}
