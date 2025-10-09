use shopify_function::prelude::*;
use shopify_function::Result;

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Default, PartialEq)]
#[allow(dead_code)]
struct Config {}

#[shopify_function_target(query_path = "src/run.graphql", schema_path = "schema.graphql")]
fn run(_input: input::ResponseData) -> Result<output::FunctionRunResult> {
    let operations = vec![output::Operation {
        add: output::LocalPickupDeliveryOption {
            title: Some("Main St.".to_string()),
            cost: Some(Decimal(1.99)),
            pickup_location: output::PickupLocation {
                location_handle: "2578303".to_string(),
                pickup_instruction: Some("Usually ready in 24 hours.".to_string()),
            },
            metafields: None,
        },
    }];

    // Build operations based on the input query response here.

    Ok(output::FunctionRunResult { operations })
}

#[cfg(test)]
mod tests {
    use super::run::*;
    use super::*;
    use shopify_function::{run_function_with_input, Result};

    #[test]
    fn test_result_contains_no_operations() -> Result<()> {
        let result = run_function_with_input(
            run,
            r#"
          {
            "cart": {
              "lines": [
                {
                  "id": "gid://shopify/CartLine/1"
                }
              ]
            },
            "fulfillmentGroups": [
              {
                "handle":  "1",
                "lines": [
                  {
                    "id": "gid://shopify/CartLine/1"
                  }
                ],
                "deliveryGroup": {
                  "id": "gid://shopify/CartDeliveryGroup/1"
                },
                "inventoryLocationHandles": ["2578303"]
              }
            ],
            "locations": [
              {
                "handle": "2578303",
                "name": "Main St.",
                "address": {
                  "address1": "123 Main St."
                }
              }
            ],
            "deliveryOptionGenerator": {
              "metafield": null
            }
          }
        "#,
        )?;

        let operations = vec![output::Operation {
            add: output::LocalPickupDeliveryOption {
                title: Some("Main St.".to_string()),
                cost: Some(Decimal(1.99)),
                pickup_location: output::PickupLocation {
                    location_handle: "2578303".to_string(),
                    pickup_instruction: Some("Usually ready in 24 hours.".to_string()),
                },
                metafields: None,
            },
        }];

        let expected = output::FunctionRunResult { operations };

        assert_eq!(result, expected);
        Ok(())
    }
}
