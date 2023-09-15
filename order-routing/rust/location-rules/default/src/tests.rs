use super::*;
use shopify_function::{run_function_with_input, Result};

#[test]
fn test_result_ranks_all_locations_zero() -> Result<()> {
    let result = run_function_with_input(
        function,
        r#"
            {
                "fulfillmentGroups": [{
                    "handle": "123",
                    "inventoryLocationHandles": ["456"]
                }]
            }
        "#,
    )?;
    let expected = output::FunctionResult {
        operations: vec![output::Operation {
            rank: output::FulfillmentGroupRankedLocations {
                fulfillment_group_handle: "123".to_string(),
                rankings: vec![output::RankedLocation {
                    location_handle: "456".to_string(),
                    rank: 0,
                }],
            },
        }],
    };

    assert_eq!(result, expected);
    Ok(())
}
