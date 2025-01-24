use serde::{de::DeserializeOwned, Deserialize};

use serde_json::json;
use shopify_function::prelude::*;
use shopify_function::Result;

use cart_fetch::output::{
    FunctionCartFetchResult, HttpRequest as CartHttpRequest,
    HttpRequestMethod as CartHttpRequestMethod, HttpRequestPolicy as CartHttpRequestPolicy,
};
use cart_run::output::{
    CartLineTarget, CartOperation, FunctionCartRunResult, OrderDiscountCandidate,
    OrderDiscountCandidateTarget, OrderDiscountCandidateValue, OrderDiscountSelectionStrategy,
    OrderDiscounts, OrderSubtotalTarget, Percentage as CartPercentage, ProductDiscountCandidate,
    ProductDiscountCandidateTarget, ProductDiscountCandidateValue,
    ProductDiscountSelectionStrategy, ProductDiscounts,
};
use delivery_fetch::output::FunctionDeliveryFetchResult;
use delivery_fetch::output::{
    HttpRequest as DeliveryHttpRequest, HttpRequestMethod as DeliveryHttpRequestMethod,
    HttpRequestPolicy as DeliveryHttpRequestPolicy,
};
use delivery_run::output::{
    DeliveryDiscountCandidate, DeliveryDiscountCandidateTarget, DeliveryDiscountCandidateValue,
    DeliveryDiscountSelectionStrategy, DeliveryDiscounts, DeliveryGroupTarget, DeliveryOperation,
    FunctionDeliveryRunResult, Percentage as DeliveryPercentage,
};

type CartResponseData = cart_run::input::ResponseData;
type DeliveryResponseData = delivery_run::input::ResponseData;
type CartFetchResponseData = cart_fetch::input::ResponseData;
type DeliveryFetchResponseData = delivery_fetch::input::ResponseData;

impl CartResponseData {
    fn metafield(&self) -> Metafield {
        self.discount_node
            .metafield
            .as_ref()
            .map(|metafield| string_to_config::<Metafield>(&metafield.value))
            .expect("Missing required metafield configuration")
    }
}

impl DeliveryResponseData {
    fn metafield(&self) -> Metafield {
        self.discount_node
            .metafield
            .as_ref()
            .map(|metafield| string_to_config::<Metafield>(&metafield.value))
            .expect("Missing required metafield configuration")
    }
}

#[derive(Deserialize)]
struct Metafield {
    cart_percent: Option<Decimal>,
    product_percent: Option<Decimal>,
    delivery_percent: Option<Decimal>,
}

#[shopify_function_target(
    target = "cart_run",
    query_path = "src/run.graphql",
    schema_path = "schema.graphql"
)]
fn cart_run(input: CartResponseData) -> Result<FunctionCartRunResult> {
    let default = FunctionCartRunResult { operations: vec![] };

    let fetch_result = input.fetch_result.as_ref().expect("Missing fetch result");
    if fetch_result.status != 200 {
        return Ok(default);
    }

    let metafield = input.metafield();
    let mut operations: Vec<CartOperation> = vec![];

    if metafield.cart_percent.is_some() {
        operations.push(create_order_discount(&metafield));
    }

    if metafield.product_percent.is_some() {
        let highest_priced_line = input
            .cart
            .lines
            .iter()
            .max_by(|a, b| {
                let a_amount = a.cost.subtotal_amount.amount;
                let b_amount = b.cost.subtotal_amount.amount;
                a_amount.partial_cmp(&b_amount).unwrap()
            })
            .unwrap();
        operations.push(create_product_discount(&highest_priced_line.id, &metafield));
    }

    Ok(FunctionCartRunResult { operations })
}

#[shopify_function_target(
    target = "delivery_run",
    query_path = "src/run.graphql",
    schema_path = "schema.graphql"
)]
fn delivery_run(input: DeliveryResponseData) -> Result<FunctionDeliveryRunResult> {
    let default = FunctionDeliveryRunResult { operations: vec![] };

    let fetch_result = input.fetch_result.as_ref().expect("Missing fetch result");
    if fetch_result.status != 200 {
        return Ok(default);
    }

    let metafield = input.metafield();
    if metafield.delivery_percent.is_none() {
        return Ok(default);
    }

    let candidates = input
        .cart
        .delivery_groups
        .iter()
        .map(|group| create_delivery_discount_candidate(&group.id, &metafield))
        .collect::<Vec<_>>();

    Ok(FunctionDeliveryRunResult {
        operations: vec![DeliveryOperation::AddDeliveryDiscounts(DeliveryDiscounts {
            selection_strategy: DeliveryDiscountSelectionStrategy::ALL,
            candidates,
        })],
    })
}

#[shopify_function_target(
    target = "cart_fetch",
    query_path = "src/fetch.graphql",
    schema_path = "schema.graphql"
)]
fn cart_fetch(input: CartFetchResponseData) -> Result<FunctionCartFetchResult> {
    let body = json!({
        "buyerIdentity": {
            "email": input.cart.buyer_identity.as_ref().unwrap().email
        }
    });

    Ok(FunctionCartFetchResult {
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
    })
}

#[shopify_function_target(
    target = "delivery_fetch",
    query_path = "src/fetch.graphql",
    schema_path = "schema.graphql"
)]
fn delivery_fetch(input: DeliveryFetchResponseData) -> Result<FunctionDeliveryFetchResult> {
    let body = json!({
        "buyerIdentity": {
            "email": input.cart.buyer_identity.as_ref().unwrap().email
        }
    });

    Ok(FunctionDeliveryFetchResult {
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
    })
}

fn create_order_discount(metafield: &Metafield) -> CartOperation {
    CartOperation::AddOrderDiscounts(OrderDiscounts {
        selection_strategy: OrderDiscountSelectionStrategy::FIRST,
        candidates: vec![OrderDiscountCandidate {
            targets: vec![OrderDiscountCandidateTarget::OrderSubtotal(
                OrderSubtotalTarget {
                    excluded_variant_ids: vec![],
                },
            )],
            associated_discount_code: None,
            message: None,
            value: OrderDiscountCandidateValue::Percentage(CartPercentage {
                value: metafield.cart_percent.unwrap(),
            }),
            conditions: None,
        }],
    })
}

fn create_product_discount(cart_line_id: &str, metafield: &Metafield) -> CartOperation {
    CartOperation::AddProductDiscounts(ProductDiscounts {
        selection_strategy: ProductDiscountSelectionStrategy::FIRST,
        candidates: vec![ProductDiscountCandidate {
            targets: vec![ProductDiscountCandidateTarget::CartLine(CartLineTarget {
                id: cart_line_id.to_string(),
                quantity: Some(1),
            })],
            associated_discount_code: None,
            message: None,
            value: ProductDiscountCandidateValue::Percentage(CartPercentage {
                value: metafield.product_percent.unwrap(),
            }),
        }],
    })
}

fn create_delivery_discount_candidate(
    delivery_group_id: &str,
    metafield: &Metafield,
) -> DeliveryDiscountCandidate {
    DeliveryDiscountCandidate {
        targets: vec![DeliveryDiscountCandidateTarget::DeliveryGroup(
            DeliveryGroupTarget {
                id: delivery_group_id.to_string(),
            },
        )],
        value: DeliveryDiscountCandidateValue::Percentage(DeliveryPercentage {
            value: metafield.delivery_percent.unwrap(),
        }),
        message: None,
        associated_discount_code: None,
    }
}

fn string_to_config<T: DeserializeOwned>(value: &str) -> T {
    serde_json::from_str(value).expect("Unable to parse configuration value from metafield")
}

#[cfg(test)]
mod tests {
    use super::*;
    use cart_run::output::{
        CartOperation, OrderDiscountSelectionStrategy, OrderDiscounts,
        ProductDiscountSelectionStrategy, ProductDiscounts,
    };
    use delivery_run::output::{
        DeliveryDiscountSelectionStrategy, DeliveryDiscounts, DeliveryOperation,
        FunctionDeliveryRunResult,
    };
    use serde_json::json;
    use shopify_function::prelude::Decimal;
    use shopify_function::{run_function_with_input, Result};

    fn get_run_input() -> String {
        json!({
            "cart": {
                "lines": [
                    {
                        "id": "gid://shopify/CartLine/123",
                        "cost": {
                            "subtotalAmount": {
                                "amount": "100.00"
                            }
                        }
                    }
                ],
                "deliveryGroups": [
                    {
                        "id": "gid://shopify/DeliveryGroup/123"
                    }
                ]
            },
            "discountNode": {
                "metafield": {
                    "value": json!({
                        "cart_percent": "10",
                        "product_percent": "20",
                        "delivery_percent": "30",
                    }).to_string(),
                }
            },
            "fetchResult": {
                "status": 200,
            }
        })
        .to_string()
    }

    fn get_fetch_input_json() -> serde_json::Value {
        json!({
            "cart": {
                "buyerIdentity": {
                    "email": "test@example.com"
                }
            }
        })
    }

    #[test]
    fn test_cart_run() -> Result<()> {
        let expected = FunctionCartRunResult {
            operations: vec![
                CartOperation::AddOrderDiscounts(OrderDiscounts {
                    selection_strategy: OrderDiscountSelectionStrategy::FIRST,
                    candidates: vec![OrderDiscountCandidate {
                        targets: vec![OrderDiscountCandidateTarget::OrderSubtotal(
                            OrderSubtotalTarget {
                                excluded_variant_ids: vec![],
                            },
                        )],
                        associated_discount_code: None,
                        message: None,
                        value: OrderDiscountCandidateValue::Percentage(CartPercentage {
                            value: Decimal(10.0),
                        }),
                        conditions: None,
                    }],
                }),
                CartOperation::AddProductDiscounts(ProductDiscounts {
                    selection_strategy: ProductDiscountSelectionStrategy::FIRST,
                    candidates: vec![ProductDiscountCandidate {
                        targets: vec![ProductDiscountCandidateTarget::CartLine(CartLineTarget {
                            id: "gid://shopify/CartLine/123".to_string(),
                            quantity: Some(1),
                        })],
                        associated_discount_code: None,
                        message: None,
                        value: ProductDiscountCandidateValue::Percentage(CartPercentage {
                            value: Decimal(20.0),
                        }),
                    }],
                }),
            ],
        };

        assert_eq!(
            run_function_with_input(cart_run, &get_run_input())?,
            expected
        );
        Ok(())
    }

    #[test]
    fn test_delivery_run() -> Result<()> {
        let expected = FunctionDeliveryRunResult {
            operations: vec![DeliveryOperation::AddDeliveryDiscounts(DeliveryDiscounts {
                selection_strategy: DeliveryDiscountSelectionStrategy::ALL,
                candidates: vec![DeliveryDiscountCandidate {
                    targets: vec![DeliveryDiscountCandidateTarget::DeliveryGroup(
                        DeliveryGroupTarget {
                            id: "gid://shopify/DeliveryGroup/123".to_string(),
                        },
                    )],
                    value: DeliveryDiscountCandidateValue::Percentage(DeliveryPercentage {
                        value: Decimal(30.0),
                    }),
                    message: None,
                    associated_discount_code: None,
                }],
            })],
        };

        assert_eq!(
            run_function_with_input(delivery_run, &get_run_input())?,
            expected
        );
        Ok(())
    }

    #[test]
    fn test_cart_fetch() -> Result<()> {
        let fetch_input = get_fetch_input_json();
        let buyer_identity = &fetch_input["cart"];

        let expected_fetch_result = FunctionCartFetchResult {
            request: Some(CartHttpRequest {
                body: Some(buyer_identity.to_string()),
                headers: vec![],
                json_body: Some(buyer_identity.clone()),
                method: CartHttpRequestMethod::POST,
                policy: CartHttpRequestPolicy {
                    read_timeout_ms: 2000,
                },
                url: "https://example.com".to_string(),
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
        let buyer_identity = &fetch_input["cart"];

        let expected_fetch_result = FunctionDeliveryFetchResult {
            request: Some(DeliveryHttpRequest {
                body: Some(buyer_identity.to_string()),
                headers: vec![],
                json_body: Some(buyer_identity.clone()),
                method: DeliveryHttpRequestMethod::POST,
                policy: DeliveryHttpRequestPolicy {
                    read_timeout_ms: 2000,
                },
                url: "https://example.com".to_string(),
            }),
        };

        assert_eq!(
            run_function_with_input(delivery_fetch, &fetch_input.to_string())?,
            expected_fetch_result
        );
        Ok(())
    }
}
