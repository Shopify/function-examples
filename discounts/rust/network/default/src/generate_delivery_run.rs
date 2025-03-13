use serde::Deserialize;
use shopify_function::prelude::*;
use shopify_function::Result;

use cart_delivery_options_discounts_generate_run::output::{
    DeliveryDiscounts, DeliveryOperation, FunctionDeliveryRunResult, ValidDiscountCodes,
};

use cart_delivery_options_discounts_generate_run::input::ResponseData;

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct DiscountResponse {
    operations: Operations,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct Operations {
    #[serde(default)]
    add_delivery_discounts: Option<DeliveryDiscounts>,
    #[serde(default)]
    add_discount_code_validations: Option<ValidDiscountCodes>,
}

#[shopify_function_target(
    target = "cartDeliveryOptionsDiscountsGenerateRun",
    query_path = "src/generate_delivery_run.graphql",
    schema_path = "schema.graphql"
)]
fn generate_delivery_run(input: ResponseData) -> Result<FunctionDeliveryRunResult> {
    let fetch_result = input.fetch_result.ok_or("Missing fetch result")?;
    let body = fetch_result.body.ok_or("Missing response body")?;

    // Parse the response body directly into our types
    let response: DiscountResponse =
        serde_json::from_str(&body).map_err(|e| format!("Failed to parse JSON: {}", e))?;

    // Convert the response into operations
    let mut operations = Vec::new();

    if let Some(validations) = response.operations.add_discount_code_validations {
        operations.push(DeliveryOperation::AddDiscountCodeValidations(validations));
    }

    if let Some(delivery_discounts) = response.operations.add_delivery_discounts {
        operations.push(DeliveryOperation::AddDeliveryDiscounts(delivery_discounts));
    }

    Ok(FunctionDeliveryRunResult { operations })
}
