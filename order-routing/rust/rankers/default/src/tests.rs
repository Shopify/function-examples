use super::*;
use shopify_function::{run_function_with_input, Result};

#[test]
fn test_result_ranks_all_locations_zero() -> Result<()> {
    let result = run_function_with_input(
        function,
        r#"
            {
                "fulfillmentGroups": [{
                    "id": "gid://shopify/FulfillmentGroup/123",
                    "inventoryLocations": [{
                        "location": {
                            "id": "gid://shopify/Location/456"
                        }
                    }]
                }]
            }
        "#,
    )?;
    let expected = output::FunctionResult {
        operations: vec![output::Operation {
            rank: output::FulfillmentGroupRankedLocations {
                fulfillment_group_id: "gid://shopify/FulfillmentGroup/123".to_string(),
                rankings: vec![output::RankedLocation {
                    location_id: "gid://shopify/Location/456".to_string(),
                    rank: 0,
                }],
            },
        }],
    };

    assert_eq!(result, expected);
    Ok(())
}
