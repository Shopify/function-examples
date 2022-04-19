use serde::{Deserialize, Serialize};

use graphql_client::GraphQLQuery;

#[derive(GraphQLQuery)]
#[graphql(
    schema_path = "schema.graphql",
    query_path = "input.graphql",
    response_derives = "Debug, Clone",
    normalization = "rust"
)]
struct Input;

#[derive(GraphQLQuery)]
#[graphql(
    schema_path = "schema.graphql",
    query_path = "output.graphql",
    response_derives = "Debug, Clone",
    normalization = "rust"
)]
struct Output;

#[derive(Clone, Debug, Deserialize)]
struct Config {
    value: String,
}

#[derive(Clone, Debug, Deserialize)]
struct Payload {
    input: input::ResponseData,
    configuration: Config,
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let payload: Payload = serde_json::from_reader(std::io::BufReader::new(std::io::stdin()))?;
    let mut out = std::io::stdout();
    let mut serializer = serde_json::Serializer::new(&mut out);
    script(payload)?.serialize(&mut serializer)?;
    Ok(())
}

fn script(payload: Payload) -> Result<output::Variables, Box<dyn std::error::Error>> {
    let (input, config) = (payload.input, payload.configuration);
    let value: f64 = config.value.parse()?;
    let allocations = input
        .merchandise_lines
        .unwrap_or_default()
        .iter()
        .map(|line| output::LineAllocation {
            line_index: line.index.unwrap(),
        })
        .collect::<Vec<_>>();
    return Ok(build_result(value, allocations));
}

fn build_result(value: f64, allocations: Vec<output::LineAllocation>) -> output::Variables {
    output::Variables {
        discounts: vec![output::Discount {
            title: format!("{}% off", value),
            value: output::Value {
                type_: output::ValueType::Percentage,
                value: value,
            },
            allocations: Some(allocations),
            target: output::TargetType::Order,
        }],
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    type MerchandiseLine = input::InputMerchandiseLines;

    fn default_payload() -> Payload {
        Payload {
            input: input::ResponseData {
                merchandise_lines: Some(vec![
                    MerchandiseLine { index: Some(0) },
                    MerchandiseLine { index: Some(1) },
                ]),
            },
            configuration: Config {
                value: "10".to_string(),
            },
        }
    }
    #[test]
    fn test_default_payload() {
        let payload = default_payload();
        let output = script(payload).unwrap();

        assert_eq!(output.discounts[0].title, "10% off".to_string());
    }

    #[test]
    fn test_value_in_title_change() {
        let mut payload = default_payload();
        payload.configuration.value = 20.to_string();
        let output = script(payload).unwrap();

        assert_eq!(output.discounts[0].title, "20% off".to_string());
    }

    #[test]
    fn test_allocations_for_all_lines() {
        let payload = default_payload();
        let output = script(payload).unwrap();

        assert_eq!(output.discounts[0].allocations.as_ref().unwrap().len(), 2);
    }
}
