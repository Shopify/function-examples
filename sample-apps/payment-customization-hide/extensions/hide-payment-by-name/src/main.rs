use serde::{Serialize, Deserialize};

mod api;
use api::*;

#[derive(Clone, Debug, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct Configuration {
    pub names_to_hide: Vec<String>,
}

impl Configuration {
    fn from_str(value: &str) -> Self {
        serde_json::from_str(value).expect("Unable to parse configuration value from metafield")
    }
}

impl Input {
    pub fn configuration(&self) -> Configuration {
        match &self.payment_customization.metafield {
            Some(Metafield { value }) => Configuration::from_str(value),
            None => Configuration::default(),
        }
    }
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    // use stderr to print output
    eprintln!("Hello World");

    // read from stdin and write to stdout
    let input: Input = serde_json::from_reader(std::io::BufReader::new(std::io::stdin()))?;
    let mut out = std::io::stdout();
    let mut serializer = serde_json::Serializer::new(&mut out);
    function(input)?.serialize(&mut serializer)?;
    Ok(())
}

fn function(input: Input) -> Result<FunctionResult, Box<dyn std::error::Error>> {
    Ok(build_result(input))
}

fn build_result(input: Input) -> FunctionResult {
    let payment_methods = &input.payment_methods;
    let names_to_hide = input.configuration().names_to_hide;
    let operations = payment_methods
        .iter()
        .filter_map(|payment_method|
            if names_to_hide.contains(&payment_method.name) {
                Some(Operation {
                    hide: Some(HideOperation {
                        payment_method_id: payment_method.id.clone()
                    })
                })
            } else {
                None
            }
        )
        .collect();

    FunctionResult { operations }
}

#[cfg(test)]
mod tests {
    use super::*;
    fn input(configuration: Option<Configuration>) -> Input {
        let input = r#"
        {
            "paymentMethods": [
                {
                    "id": "123456789",
                    "name": "Method A"
                },
                {
                    "id": "987654321",
                    "name": "Method B"
                },
                {
                    "id": "523414132",
                    "name": "Method C"
                }
            ],
            "paymentCustomization": { "metafield": null }
        }
        "#;
        let default_input: Input = serde_json::from_str(input).unwrap();
        let value = serde_json::to_string(&configuration.unwrap_or_default()).unwrap();

        Input {
            payment_customization: PaymentCustomization {
                metafield: Some(Metafield {
                    value
                })
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
    fn test_hide_operations_with_configuration() {
        let input = input(Some(Configuration {
            names_to_hide: vec![
                "Method A".to_string(),
                "Method C".to_string(),
            ]
        }));
        let operations = function(input).unwrap().operations;

        assert_eq!(operations.len(), 2);
        assert_eq!(
            operations[0].hide.as_ref().unwrap().payment_method_id,
            "123456789"
        );
        assert_eq!(
            operations[1].hide.as_ref().unwrap().payment_method_id,
            "523414132"
        );
    }
}
