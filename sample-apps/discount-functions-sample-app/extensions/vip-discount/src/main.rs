use graphql_client::GraphQLQuery;
use serde::{Deserialize, Serialize};

type UnsignedInt64 = u64;
type Void = ();

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
struct HandleResult;

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct Configuration {
    message: String,
    vip_tag: String,
    discount_amount: f64,
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

fn calculate_discounts(
    payload: Payload,
) -> Result<handle_result::Variables, Box<dyn std::error::Error>> {
    let configuration = payload.configuration;
    let customer_tags = payload
        .input
        .customer
        .unwrap_or_default()
        .tags
        .unwrap_or_default();

    let discounts = if customer_tags.contains(&configuration.vip_tag) {
        vec![handle_result::Discount {
            conditions: None,
            message: Some(configuration.message),
            targets: vec![],
            value: handle_result::Value {
                percentage: None,
                fixedAmount: Some(handle_result::FixedAmount {
                    value: configuration.discount_amount,
                }),
            },
        }]
    } else {
        vec![]
    };

    Ok(handle_result::Variables {
        result: handle_result::FunctionResult {
            discountApplicationStrategy: handle_result::DiscountApplicationStrategy::Maximum,
            discounts,
        },
    })
}

impl Default for input::InputCustomer {
    fn default() -> Self {
        Self { tags: None }
    }
}
