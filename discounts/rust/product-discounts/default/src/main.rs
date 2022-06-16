use serde::{Deserialize, Serialize};

mod api;
use api::*;

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct ConfigurationValue {}

#[derive(Clone, Debug, Serialize, Deserialize, Default)]
pub struct Configuration {}

impl Configuration {
    fn from_str(_str: &str) -> Self {
        Configuration {}
    }
}

impl input::Input {
    fn configuration(&self) -> Configuration {
        let value: Option<&str> = self.discount_node.as_ref().and_then(|discount_node| {
            discount_node
                .metafield
                .as_ref()
                .and_then(|metafield| metafield.value.as_deref())
        });
        value.map(Configuration::from_str).unwrap_or_default()
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
    let _configuration = input.configuration();
    Ok(FunctionResult {
        discounts: vec![],
        discount_application_strategy: DiscountApplicationStrategy::First,
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    fn input(value: ConfigurationValue) -> input::Input {
        let input = r#"
        {
            "merchandiseLines": [
                { "variant": { "id": "gid://shopify/ProductVariant/0" } },
                { "variant": { "id": "gid://shopify/ProductVariant/1" } }
            ]
        }
        "#;
        let default_input: input::Input = serde_json::from_str(input).unwrap();
        let discount_node = Some(input::DiscountNode {
            metafield: Some(input::Metafield {
                id: "gid://shopify/Metafield/0".to_string(),
                value: Some(serde_json::to_string(&value).unwrap()),
            }),
        });

        input::Input {
            discount_node,
            ..default_input
        }
    }

    #[test]
    fn test_returns_no_discounts() {
        let input = input(ConfigurationValue {});
        let handle_result = serde_json::json!(function(input).unwrap());

        let expected_json = r#"
            {
                "discounts": [],
                "discountApplicationStrategy": "FIRST"
            }
        "#;

        let expected_handle_result: serde_json::Value =
            serde_json::from_str(expected_json).unwrap();
        assert_eq!(
            handle_result.to_string(),
            expected_handle_result.to_string()
        );
    }
}
