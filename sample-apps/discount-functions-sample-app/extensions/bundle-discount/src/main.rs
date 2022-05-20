use graphql_client::GraphQLQuery;
use serde::{Deserialize, Serialize};

type UnsignedInt64 = u64;

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

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct Configuration {
    message: String,
    variant_id: u64,
    minimum_quantity: i64,
    discount_percentage: f64,
}

#[derive(Deserialize)]
struct Payload {
    input: input::ResponseData,
    configuration: Configuration,
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Read the payload from STDIN
    let payload: Payload = serde_json::from_reader(std::io::BufReader::new(std::io::stdin()))?;

    // Prepare a STDOUT serializer for the Function output
    let mut out = std::io::stdout();
    let mut serializer = serde_json::Serializer::new(&mut out);

    // Calculate discounts and write them to STDOUT
    calculate_discounts(payload)?.serialize(&mut serializer)?;
    Ok(())
}

fn calculate_discounts(payload: Payload) -> Result<output::Variables, Box<dyn std::error::Error>> {
    let (input, configuration) = (payload.input, payload.configuration);

    let targets: Vec<output::ProductVariantTarget> = input
        .merchandise_lines
        .unwrap_or(vec![])
        .iter()
        .filter(|line| {
            !line.index.is_none()
                && !line.variant.is_none()
                && line.variant.as_ref().unwrap().id == configuration.variant_id
                && line.quantity.unwrap_or(0) >= configuration.minimum_quantity
        })
        .map(|line| output::ProductVariantTarget {
            id: line.variant.as_ref().unwrap().id,
            quantity: line.quantity,
        })
        .collect();

    let discounts: Vec<output::Discount> = if targets.len() > 0 {
        let discount = output::Discount {
            message: Some(configuration.message),
            value: output::Value {
                value: configuration.discount_percentage,
            },
            targets,
            conditions: None,
        };

        vec![discount]
    } else {
        vec![]
    };

    Ok(output::Variables { discounts })
}
