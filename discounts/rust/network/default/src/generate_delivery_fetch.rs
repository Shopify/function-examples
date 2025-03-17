use serde_json::json;
use shopify_function;
use shopify_function::prelude::*;

use cart_delivery_options_discounts_generate_fetch::input::ResponseData as DeliveryFetchResponseData;
use cart_delivery_options_discounts_generate_fetch::output::{
    FunctionDeliveryFetchResult, HttpRequest as DeliveryFetchHttpRequest,
    HttpRequestHeader as DeliveryFetchHttpRequestHeader,
    HttpRequestMethod as DeliveryFetchHttpRequestMethod,
    HttpRequestPolicy as DeliveryFetchHttpRequestPolicy,
};

#[shopify_function_target(
    query_path = "src/generate_delivery_fetch.graphql",
    schema_path = "schema.graphql",
    target = "cartDeliveryOptionsDiscountsGenerateFetch"
)]
fn generate_delivery_fetch(
    input: DeliveryFetchResponseData,
) -> shopify_function::Result<FunctionDeliveryFetchResult> {
    let entered_discount_codes = &input.entered_discount_codes;
    let json_body = json!({ "enteredDiscountCodes": entered_discount_codes });

    let request = DeliveryFetchHttpRequest {
        headers: vec![
            DeliveryFetchHttpRequestHeader {
                name: "accept".to_string(),
                value: "application/json".to_string(),
            },
            DeliveryFetchHttpRequestHeader {
                name: "Content-Type".to_string(),
                value: "application/json".to_string(),
            },
        ],
        method: DeliveryFetchHttpRequestMethod::POST,
        policy: DeliveryFetchHttpRequestPolicy {
            read_timeout_ms: 2000,
        },
        url: "<external-server-url>".to_string(),
        body: Some(json_body.to_string()),
        json_body: Some(json_body.clone()),
    };

    Ok(FunctionDeliveryFetchResult {
        request: Some(request),
    })
}

#[cfg(test)]
mod tests {
    use super::*;
    use cart_delivery_options_discounts_generate_fetch::output::{
        FunctionDeliveryFetchResult, HttpRequest as DeliveryFetchHttpRequest,
        HttpRequestHeader as DeliveryFetchHttpRequestHeader,
        HttpRequestMethod as DeliveryFetchHttpRequestMethod,
        HttpRequestPolicy as DeliveryFetchHttpRequestPolicy,
    };
    use shopify_function::{run_function_with_input, Result};

    #[test]
    fn adds_entered_discount_codes_to_body_for_delivery() -> Result<()> {
        let input = json!({ "enteredDiscountCodes": ["ABC"] }).to_string();

        let result = run_function_with_input(generate_delivery_fetch, &input)?;
        let json_body = json!({ "enteredDiscountCodes": ["ABC"] });
        let expected = FunctionDeliveryFetchResult {
            request: Some(DeliveryFetchHttpRequest {
                headers: vec![
                    DeliveryFetchHttpRequestHeader {
                        name: "accept".to_string(),
                        value: "application/json".to_string(),
                    },
                    DeliveryFetchHttpRequestHeader {
                        name: "Content-Type".to_string(),
                        value: "application/json".to_string(),
                    },
                ],
                method: DeliveryFetchHttpRequestMethod::POST,
                policy: DeliveryFetchHttpRequestPolicy {
                    read_timeout_ms: 2000,
                },
                url: "<external-server-url>".to_string(),
                json_body: Some(json_body.clone()),
                body: Some(json_body.to_string()),
            }),
        };

        assert_eq!(result, expected);
        Ok(())
    }
}
