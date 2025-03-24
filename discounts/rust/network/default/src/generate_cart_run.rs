use serde::Deserialize;
use shopify_function::prelude::*;
use shopify_function::Result;

use cart_lines_discounts_generate_run::output::{
    CartLinesDiscountsGenerateRunResult, CartOperation, EnteredDiscountCodesAcceptOperation,
    OrderDiscountsAddOperation, ProductDiscountsAddOperation,
};

use cart_lines_discounts_generate_run::input::ResponseData;

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct OperationItem {
    #[serde(default)]
    product_discounts_add: Option<ProductDiscountsAddOperation>,
    #[serde(default)]
    order_discounts_add: Option<OrderDiscountsAddOperation>,
    #[serde(default)]
    entered_discount_codes_accept: Option<EnteredDiscountCodesAcceptOperation>,
    // Ignore other operation types that might be in the response but we don't use in cart context
    #[serde(flatten)]
    _other: std::collections::HashMap<String, serde_json::Value>,
}

#[shopify_function_target(
    target = "cartLinesDiscountsGenerateRun",
    query_path = "src/generate_cart_run.graphql",
    schema_path = "schema.graphql"
)]
fn generate_cart_run(input: ResponseData) -> Result<CartLinesDiscountsGenerateRunResult> {
    let fetch_result = input.fetch_result.ok_or("Missing fetch result")?;

    // Use jsonBody which is the only available property
    let json_body = fetch_result
        .json_body
        .ok_or("Missing json_body in response")?;

    // Parse using the JSON value
    let operation_items = serde_json::from_value::<Vec<OperationItem>>(json_body)
        .map_err(|e| format!("Failed to convert jsonBody: {}", e))?;

    // Convert the response into operations
    let mut operations = Vec::new();

    // Process each operation item
    for item in operation_items {
        if let Some(validations) = item.entered_discount_codes_accept {
            operations.push(CartOperation::EnteredDiscountCodesAccept(validations));
        }

        if let Some(product_discounts_add_operation) = item.product_discounts_add {
            operations.push(CartOperation::ProductDiscountsAdd(
                product_discounts_add_operation,
            ));
        }

        if let Some(order_discounts_add_operation) = item.order_discounts_add {
            operations.push(CartOperation::OrderDiscountsAdd(
                order_discounts_add_operation,
            ));
        }
        // Ignore delivery discounts for cart operations
    }

    Ok(CartLinesDiscountsGenerateRunResult { operations })
}
