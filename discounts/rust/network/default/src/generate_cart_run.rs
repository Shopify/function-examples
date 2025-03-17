use serde::Deserialize;
use shopify_function::prelude::*;
use shopify_function::Result;

use cart_lines_discounts_generate_run::output::{
    CartOperation, FunctionCartRunResult, OrderDiscounts, ProductDiscounts, ValidDiscountCodes,
};

use cart_lines_discounts_generate_run::input::ResponseData;

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct OperationItem {
    #[serde(default)]
    add_product_discounts: Option<ProductDiscounts>,
    #[serde(default)]
    add_order_discounts: Option<OrderDiscounts>,
    #[serde(default)]
    add_discount_code_validations: Option<ValidDiscountCodes>,
    // Ignore other operation types that might be in the response but we don't use in cart context
    #[serde(flatten)]
    _other: std::collections::HashMap<String, serde_json::Value>,
}

#[shopify_function_target(
    target = "cartLinesDiscountsGenerateRun",
    query_path = "src/generate_cart_run.graphql",
    schema_path = "schema.graphql"
)]
fn generate_cart_run(input: ResponseData) -> Result<FunctionCartRunResult> {
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
        if let Some(validations) = item.add_discount_code_validations {
            operations.push(CartOperation::AddDiscountCodeValidations(validations));
        }

        if let Some(product_discounts) = item.add_product_discounts {
            operations.push(CartOperation::AddProductDiscounts(product_discounts));
        }

        if let Some(order_discounts) = item.add_order_discounts {
            operations.push(CartOperation::AddOrderDiscounts(order_discounts));
        }
        // Ignore delivery discounts for cart operations
    }

    Ok(FunctionCartRunResult { operations })
}
