use serde::Deserialize;
use shopify_function::prelude::*;
use shopify_function::Result;

use cart_lines_discounts_generate_run::output::{
    CartOperation, FunctionCartRunResult, OrderDiscounts, ProductDiscounts, ValidDiscountCodes,
};

use cart_lines_discounts_generate_run::input::ResponseData;

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct DiscountResponse {
    operations: Operations,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct Operations {
    #[serde(default)]
    add_product_discounts: Option<ProductDiscounts>,
    #[serde(default)]
    add_order_discounts: Option<OrderDiscounts>,
    #[serde(default)]
    add_discount_code_validations: Option<ValidDiscountCodes>,
}

#[shopify_function_target(
    target = "cartLinesDiscountsGenerateRun",
    query_path = "src/generate_cart_run.graphql",
    schema_path = "schema.graphql"
)]
fn generate_cart_run(input: ResponseData) -> Result<FunctionCartRunResult> {
    let fetch_result = input.fetch_result.ok_or("Missing fetch result")?;
    let body = fetch_result.body.ok_or("Missing response body")?;

    // Parse the response body directly into our types
    let response: DiscountResponse =
        serde_json::from_str(&body).map_err(|e| format!("Failed to parse JSON: {}", e))?;

    // Convert the response into operations
    let mut operations = Vec::new();

    if let Some(validations) = response.operations.add_discount_code_validations {
        operations.push(CartOperation::AddDiscountCodeValidations(validations));
    }

    if let Some(product_discounts) = response.operations.add_product_discounts {
        operations.push(CartOperation::AddProductDiscounts(product_discounts));
    }

    if let Some(order_discounts) = response.operations.add_order_discounts {
        operations.push(CartOperation::AddOrderDiscounts(order_discounts));
    }

    Ok(FunctionCartRunResult { operations })
}
