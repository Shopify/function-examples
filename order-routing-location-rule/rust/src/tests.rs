use super::*;
use shopify_function::{run_function_with_input, Result};

#[test]
fn test_result_contains_no_operations() -> Result<()> {
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
    let expected = crate::output::FunctionResult { operations: vec![
        crate::output::Operation {
            rank: crate::output::FulfillmentGroupRankedLocations {
                fulfillment_group_id: "gid://shopify/FulfillmentGroup/123".to_string(),
                rankings: vec![
                    crate::output::RankedLocation {
                        location_id: "gid://shopify/Location/456".to_string(),
                        rank: 0,
                    }
                ]
            }
        }
    ]};

    assert_eq!(result, expected);
    Ok(())
}
