use serde_json::json;
use shopify_function::prelude::*;
use shopify_function::Result;

use cart_fetch::output::{
    FunctionCartFetchResult, HttpRequest as CartHttpRequest,
    HttpRequestMethod as CartHttpRequestMethod, HttpRequestPolicy as CartHttpRequestPolicy,
};

use delivery_fetch::output::FunctionDeliveryFetchResult;
use delivery_fetch::output::{
    HttpRequest as DeliveryHttpRequest, HttpRequestMethod as DeliveryHttpRequestMethod,
    HttpRequestPolicy as DeliveryHttpRequestPolicy,
};

type CartFetchResponseData = cart_fetch::input::ResponseData;
type DeliveryFetchResponseData = delivery_fetch::input::ResponseData;
type CartHttpRequestHeader = cart_fetch::output::HttpRequestHeader;
type DeliveryHttpRequestHeader = delivery_fetch::output::HttpRequestHeader;

#[shopify_function_target(
    target = "cart_fetch",
    query_path = "src/fetch.graphql",
    schema_path = "schema.graphql"
)]
fn cart_fetch(input: CartFetchResponseData) -> Result<FunctionCartFetchResult> {
    let body = json!({
        "enteredDiscountCodes": input.entered_discount_codes
    });

    Ok(FunctionCartFetchResult {
        request: Some(CartHttpRequest {
            body: Some(body.to_string()),
            headers: vec![CartHttpRequestHeader {
                name: "Accept".to_string(),
                value: "application/json; charset=utf-8".to_string(),
            }],
            json_body: Some(body.clone()),
            method: CartHttpRequestMethod::POST,
            policy: CartHttpRequestPolicy {
                read_timeout_ms: 2000,
            },
            url: "http://localhost:3000".to_string(),
        }),
    })
}

#[shopify_function_target(
    target = "delivery_fetch",
    query_path = "src/fetch.graphql",
    schema_path = "schema.graphql"
)]
fn delivery_fetch(input: DeliveryFetchResponseData) -> Result<FunctionDeliveryFetchResult> {
    let body = json!({
        "enteredDiscountCodes": input.entered_discount_codes
    });

    Ok(FunctionDeliveryFetchResult {
        request: Some(DeliveryHttpRequest {
            body: Some(body.to_string()),
            headers: vec![DeliveryHttpRequestHeader {
                name: "Accept".to_string(),
                value: "application/json; charset=utf-8".to_string(),
            }],
            json_body: Some(body.clone()),
            method: DeliveryHttpRequestMethod::POST,
            policy: DeliveryHttpRequestPolicy {
                read_timeout_ms: 2000,
            },
            url: "http://localhost:3000".to_string(),
        }),
    })
}

#[cfg(test)]
mod tests {
    use super::*;
    use shopify_function::{run_function_with_input, Result};

    fn get_fetch_input_json() -> serde_json::Value {
        json!({
            "enteredDiscountCodes": ["WELCOME10"]
        })
    }

    #[test]
    fn test_cart_fetch() -> Result<()> {
        let fetch_input = get_fetch_input_json();

        let expected_fetch_result = FunctionCartFetchResult {
            request: Some(CartHttpRequest {
                body: Some(fetch_input.to_string()),
                headers: vec![CartHttpRequestHeader {
                    name: "Accept".to_string(),
                    value: "application/json; charset=utf-8".to_string(),
                }],
                json_body: Some(fetch_input.clone()),
                method: CartHttpRequestMethod::POST,
                policy: CartHttpRequestPolicy {
                    read_timeout_ms: 2000,
                },
                url: "http://localhost:3000".to_string(),
            }),
        };

        assert_eq!(
            run_function_with_input(cart_fetch, &fetch_input.to_string())?,
            expected_fetch_result
        );
        Ok(())
    }

    #[test]
    fn test_delivery_fetch() -> Result<()> {
        let fetch_input = get_fetch_input_json();

        let expected_fetch_result = FunctionDeliveryFetchResult {
            request: Some(DeliveryHttpRequest {
                body: Some(fetch_input.to_string()),
                headers: vec![DeliveryHttpRequestHeader {
                    name: "Accept".to_string(),
                    value: "application/json; charset=utf-8".to_string(),
                }],
                json_body: Some(fetch_input.clone()),
                method: DeliveryHttpRequestMethod::POST,
                policy: DeliveryHttpRequestPolicy {
                    read_timeout_ms: 2000,
                },
                url: "http://localhost:3000".to_string(),
            }),
        };

        assert_eq!(
            run_function_with_input(delivery_fetch, &fetch_input.to_string())?,
            expected_fetch_result
        );
        Ok(())
    }
}
