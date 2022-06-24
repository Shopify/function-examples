use serde::{Deserialize, Serialize};

mod api;
use api::*;

#[derive(Clone, Debug, Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct Configuration {}

impl Configuration {
    fn from_str(value: &str) -> Self {
        serde_json::from_str(value).expect("Unable to parse configuration value from metafield")
    }
}

impl input::Input {
    pub fn configuration(&self) -> Configuration {
        match &self.discount_node.metafield {
            Some(input::Metafield { value }) => Configuration::from_str(value),
            None => Configuration::default(),
        }
    }
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let input: input::Input = serde_json::from_reader(std::io::BufReader::new(std::io::stdin()))?;
    let mut out = std::io::stdout();
    let mut serializer = serde_json::Serializer::new(&mut out);
    function(input)?.serialize(&mut serializer)?;
    Ok(())
}

fn function(input: input::Input) -> Result<FunctionResult, Box<dyn std::error::Error>> {
    let _config = input.configuration();
    Ok(FunctionResult {
        discounts: vec![],
        discount_application_strategy: DiscountApplicationStrategy::First,
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    fn input(config: Option<Configuration>) -> input::Input {
        input::Input {
            discount_node: input::DiscountNode {
                metafield: Some(input::Metafield {
                    value: serde_json::to_string(&config.unwrap_or_default()).unwrap()
                }),
            },
        }
    }

    #[test]
    fn test_discount_with_no_configuration() {
        let input = input(None);
        let handle_result = serde_json::json!(function(input).unwrap());

        let expected_handle_result = serde_json::json!({
            "discounts": [],
            "discountApplicationStrategy": "FIRST",
        });
        assert_eq!(handle_result, expected_handle_result);
    }

    #[test]
    fn test_discount_with_configuration() {
        let input = input(Some(Configuration {}));
        let handle_result = serde_json::json!(function(input).unwrap());

        let expected_handle_result = serde_json::json!({
            "discounts": [],
            "discountApplicationStrategy": "FIRST",
        });
        assert_eq!(handle_result, expected_handle_result);
    }

    #[test]
    fn test_input_deserialization() {
        let input_json = r#"
        {
            "discountNode": { "metafield": { "value": "{}" } }
        }
        "#;

        let expected_input = input(Some(Configuration {}));
        assert_eq!(expected_input, serde_json::from_str::<input::Input>(input_json).unwrap());
    }
}
