use serde::{de::DeserializeOwned, Deserialize};

use shopify_function::prelude::*;
use shopify_function::Result;

use cart_fetch::output::FunctionCartFetchResult;
use cart_run::output::FunctionCartRunResult;
use delivery_fetch::output::FunctionDeliveryFetchResult;
use delivery_run::output::FunctionDeliveryRunResult;

type CartResponseData = cart_run::input::ResponseData;
type DeliveryResponseData = delivery_run::input::ResponseData;
type CartFetchResponseData = cart_fetch::input::ResponseData;

#[derive(Deserialize)]
struct Wrapper {
    cart: Option<FunctionCartRunResult>,
    delivery: Option<FunctionDeliveryRunResult>,
}

#[shopify_function_target(
    target = "cart_run",
    query_path = "src/run.graphql",
    schema_path = "schema.graphql"
)]
fn cart_run(input: CartResponseData) -> Result<FunctionCartRunResult> {
    let fetch_result = input.fetch_result.as_ref().expect("Missing fetch result");
    let body = fetch_result.body.as_ref().expect("Missing body");
    let result = string_to_config::<Wrapper>(&body)
        .cart
        .unwrap_or_else(|| FunctionCartRunResult { operations: vec![] });

    Ok(result)
}

#[shopify_function_target(
    target = "delivery_run",
    query_path = "src/run.graphql",
    schema_path = "schema.graphql"
)]
fn delivery_run(input: DeliveryResponseData) -> Result<FunctionDeliveryRunResult> {
    let fetch_result = input.fetch_result.as_ref().expect("Missing fetch result");
    let body = fetch_result.body.as_ref().expect("Missing body");
    let result = string_to_config::<Wrapper>(&body)
        .delivery
        .unwrap_or_else(|| FunctionDeliveryRunResult { operations: vec![] });

    Ok(result)
}

#[shopify_function_target(
    target = "cart_fetch",
    query_path = "src/fetch.graphql",
    schema_path = "schema.graphql"
)]
fn cart_fetch(input: CartFetchResponseData) -> Result<FunctionCartFetchResult> {
    let metafield = input
        .discount_node
        .metafield
        .expect("Missing required metafield configuration");

    Ok(string_to_config::<FunctionCartFetchResult>(
        &metafield.value,
    ))
}

#[shopify_function_target(
    target = "delivery_fetch",
    query_path = "src/fetch.graphql",
    schema_path = "schema.graphql"
)]
fn delivery_fetch(input: CartFetchResponseData) -> Result<FunctionDeliveryFetchResult> {
    let metafield = input
        .discount_node
        .metafield
        .expect("Missing required metafield configuration");

    Ok(string_to_config::<FunctionDeliveryFetchResult>(
        &metafield.value,
    ))
}

fn string_to_config<T: DeserializeOwned>(value: &str) -> T {
    serde_json::from_str(value).expect("Unable to parse configuration value from metafield")
}

#[cfg(test)]
mod tests {
    use super::*;
    use cart_fetch::output::{
        HttpRequest as CartHttpRequest, HttpRequestMethod as CartHttpRequestMethod,
        HttpRequestPolicy as CartHttpRequestPolicy,
    };
    use cart_run::output::{
        CartOperation, OrderDiscountSelectionStrategy, OrderDiscounts,
        ProductDiscountSelectionStrategy, ProductDiscounts,
    };
    use delivery_fetch::output::{
        HttpRequest as DeliveryHttpRequest, HttpRequestMethod as DeliveryHttpRequestMethod,
        HttpRequestPolicy as DeliveryHttpRequestPolicy,
    };
    use delivery_run::output::{
        DeliveryDiscountSelectionStrategy, DeliveryDiscounts, DeliveryOperation,
        FunctionDeliveryRunResult,
    };
    use serde_json::json;
    use shopify_function::{run_function_with_input, Result};

    #[test]
    fn test_cart_run() -> Result<()> {
        let query_input_json = json!({
            "fetchResult": {
                "body": json!(
                    {
                        "cart": {
                            "operations": [
                                {
                                    "addOrderDiscounts": {"selectionStrategy":"FIRST","candidates":[]},
                                }, {
                                    "addProductDiscounts": {"selectionStrategy":"FIRST","candidates":[]}
                                }
                            ]
                        }
                    }
                ).to_string()
            }
        });

        let expected = FunctionCartRunResult {
            operations: vec![
                CartOperation::AddOrderDiscounts(OrderDiscounts {
                    selection_strategy: OrderDiscountSelectionStrategy::FIRST,
                    candidates: vec![],
                }),
                CartOperation::AddProductDiscounts(ProductDiscounts {
                    selection_strategy: ProductDiscountSelectionStrategy::FIRST,
                    candidates: vec![],
                }),
            ],
        };

        assert_eq!(
            run_function_with_input(cart_run, &query_input_json.to_string())?,
            expected
        );
        Ok(())
    }

    #[test]
    fn test_delivery_run() -> Result<()> {
        let query_input_json = json!({
            "fetchResult": {
                "body": json!(
                    {
                        "delivery": {
                            "operations": [
                                {
                                    "addDeliveryDiscounts": {"selectionStrategy":"ALL","candidates":[]},
                                }
                            ]
                        }
                    }
                ).to_string()
            }
        });

        let expected = FunctionDeliveryRunResult {
            operations: vec![DeliveryOperation::AddDeliveryDiscounts(DeliveryDiscounts {
                selection_strategy: DeliveryDiscountSelectionStrategy::ALL,
                candidates: vec![],
            })],
        };

        assert_eq!(
            run_function_with_input(delivery_run, &query_input_json.to_string())?,
            expected
        );
        Ok(())
    }

    #[test]
    fn test_cart_fetch() -> Result<()> {
        let body = json!({
            "cart": {
                "operations": [
                    {
                        "addOrderDiscounts": {"selectionStrategy": "FIRST", "candidates": []},
                        "addProductDiscounts": {"selectionStrategy": "FIRST", "candidates": []}
                    }
                ]
            }
        });

        let expected_fetch_result = FunctionCartFetchResult {
            request: Some(CartHttpRequest {
                body: Some(body.to_string()),
                headers: vec![],
                json_body: Some(body.clone()),
                method: CartHttpRequestMethod::POST,
                policy: CartHttpRequestPolicy {
                    read_timeout_ms: 2000,
                },
                url: "https://example.com".to_string(),
            }),
        };

        let metafield = json!({
            "discountNode": {
                "metafield": {
                    "value": json!({
                        "request": {
                            "body": Some(body.to_string()),
                            "headers": [],
                            "jsonBody": Some(body.clone()),
                            "method": "POST",
                            "policy": {
                                "readTimeoutMs": 2000,
                            },
                            "url": "https://example.com",
                        }
                    }).to_string(),
                }
            }
        });

        assert_eq!(
            run_function_with_input(cart_fetch, &metafield.to_string())?,
            expected_fetch_result
        );
        Ok(())
    }

    #[test]
    fn test_delivery_fetch() -> Result<()> {
        let body = json!({
            "delivery": {
                "operations": [
                    {
                        "addDeliveryDiscounts": {"selectionStrategy": "ALL", "candidates": []},
                    }
                ]
            }
        });

        let expected_fetch_result = FunctionDeliveryFetchResult {
            request: Some(DeliveryHttpRequest {
                body: Some(body.to_string()),
                headers: vec![],
                json_body: Some(body.clone()),
                method: DeliveryHttpRequestMethod::POST,
                policy: DeliveryHttpRequestPolicy {
                    read_timeout_ms: 2000,
                },
                url: "https://example.com".to_string(),
            }),
        };

        let metafield = json!({
            "discountNode": {
                "metafield": {
                    "value": json!({
                        "request": {
                            "body": Some(body.to_string()),
                            "headers": [],
                            "jsonBody": Some(body.clone()),
                            "method": "POST",
                            "policy": {
                                "readTimeoutMs": 2000,
                            },
                            "url": "https://example.com",
                        }
                    }).to_string(),
                }
            }
        });

        assert_eq!(
            run_function_with_input(delivery_fetch, &metafield.to_string())?,
            expected_fetch_result
        );
        Ok(())
    }
}
