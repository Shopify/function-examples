use serde::Deserialize;

use shopify_function::prelude::*;
use shopify_function::Result;

use cart_run::output::{
    AssociatedDiscountCode as CartAssociatedDiscountCode, CartLineTarget, CartOperation,
    FunctionCartRunResult, OrderDiscountCandidate, OrderDiscountCandidateTarget,
    OrderDiscountCandidateValue, OrderDiscountSelectionStrategy, OrderDiscounts,
    OrderSubtotalTarget, Percentage as CartPercentage, ProductDiscountCandidate,
    ProductDiscountCandidateTarget, ProductDiscountCandidateValue,
    ProductDiscountSelectionStrategy, ProductDiscounts, ValidDiscountCode as CartValidDiscountCode,
    ValidDiscountCodes as CartValidDiscountCodes,
};

use delivery_run::output::{
    AssociatedDiscountCode as DeliveryAssociatedDiscountCode, DeliveryDiscountCandidate,
    DeliveryDiscountCandidateTarget, DeliveryDiscountCandidateValue,
    DeliveryDiscountSelectionStrategy, DeliveryDiscounts, DeliveryGroupTarget, DeliveryOperation,
    FunctionDeliveryRunResult, Percentage as DeliveryPercentage,
    ValidDiscountCode as DeliveryValidDiscountCode,
    ValidDiscountCodes as DeliveryValidDiscountCodes,
};

type CartResponseData = cart_run::input::ResponseData;
type DeliveryResponseData = delivery_run::input::ResponseData;

impl CartResponseData {
    fn metafield(&self) -> Result<Metafield> {
        let metafield = self
            .discount_node
            .metafield
            .as_ref()
            .ok_or("Missing metafield")?;
        serde_json::from_str(&metafield.value)
            .map_err(|_| "Metafield value cannot be parsed".into())
    }
    fn valid_discount_codes(&self) -> Result<Vec<String>> {
        let fetch_result = self.fetch_result.as_ref().ok_or("Missing fetch result")?;
        let body = fetch_result.body.as_ref().ok_or("Missing body")?;
        serde_json::from_str(body).map_err(|_| "Fetch result body cannot be parsed".into())
    }
}

impl DeliveryResponseData {
    fn metafield(&self) -> Result<Metafield> {
        let metafield = self
            .discount_node
            .metafield
            .as_ref()
            .ok_or("Missing metafield")?;
        serde_json::from_str(&metafield.value)
            .map_err(|_| "Metafield value cannot be parsed".into())
    }

    fn valid_discount_codes(&self) -> Result<Vec<String>> {
        let fetch_result = self.fetch_result.as_ref().ok_or("Missing fetch result")?;
        let body = fetch_result.body.as_ref().ok_or("Missing body")?;
        serde_json::from_str(body).map_err(|_| "Fetch result body cannot be parsed".into())
    }
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct Metafield {
    order_percentage: Option<Decimal>,
    product_percentage: Option<Decimal>,
    delivery_percentage: Option<Decimal>,
}

#[shopify_function_target(
    target = "cart_run",
    query_path = "src/run.graphql",
    schema_path = "schema.graphql"
)]
fn cart_run(input: CartResponseData) -> Result<FunctionCartRunResult> {
    let codes = input.valid_discount_codes()?;
    let available_discount_code = codes.first();

    if available_discount_code.is_none() {
        return Ok(FunctionCartRunResult { operations: vec![] });
    }

    let metafield = input.metafield()?;
    let mut operations: Vec<CartOperation> = vec![];
    let available_discount_code = available_discount_code.unwrap();

    operations.push(CartOperation::AddValidDiscountCodes(
        CartValidDiscountCodes {
            codes: vec![CartValidDiscountCode {
                code: available_discount_code.to_string(),
            }],
        },
    ));

    if metafield.order_percentage.is_some() {
        operations.push(create_order_discount(&metafield, available_discount_code));
    }

    if metafield.product_percentage.is_some() {
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
        operations.push(create_product_discount(
            &highest_priced_line.id,
            &metafield,
            available_discount_code,
        ));
    }

    Ok(FunctionCartRunResult { operations })
}

#[shopify_function_target(
    target = "delivery_run",
    query_path = "src/run.graphql",
    schema_path = "schema.graphql"
)]
fn delivery_run(input: DeliveryResponseData) -> Result<FunctionDeliveryRunResult> {
    let codes = input.valid_discount_codes()?;
    let available_discount_code = codes.first();
    let metafield = input.metafield()?;

    if available_discount_code.is_none() || metafield.delivery_percentage.is_none() {
        return Ok(FunctionDeliveryRunResult { operations: vec![] });
    }

    let mut operations: Vec<DeliveryOperation> = vec![];
    let available_discount_code = available_discount_code.unwrap();

    operations.push(DeliveryOperation::AddValidDiscountCodes(
        DeliveryValidDiscountCodes {
            codes: vec![DeliveryValidDiscountCode {
                code: available_discount_code.to_string(),
            }],
        },
    ));

    let candidates = input
        .cart
        .delivery_groups
        .iter()
        .map(|group| {
            create_delivery_discount_candidate(&group.id, &metafield, available_discount_code)
        })
        .collect::<Vec<_>>();

    operations.push(DeliveryOperation::AddDeliveryDiscounts(DeliveryDiscounts {
        selection_strategy: DeliveryDiscountSelectionStrategy::ALL,
        candidates,
    }));

    Ok(FunctionDeliveryRunResult { operations })
}

fn create_order_discount(metafield: &Metafield, available_discount_code: &str) -> CartOperation {
    CartOperation::AddOrderDiscounts(OrderDiscounts {
        selection_strategy: OrderDiscountSelectionStrategy::FIRST,
        candidates: vec![OrderDiscountCandidate {
            targets: vec![OrderDiscountCandidateTarget::OrderSubtotal(
                OrderSubtotalTarget {
                    excluded_variant_ids: vec![],
                },
            )],
            associated_discount_code: Some(CartAssociatedDiscountCode {
                code: available_discount_code.to_string(),
            }),
            message: None,
            value: OrderDiscountCandidateValue::Percentage(CartPercentage {
                value: metafield.order_percentage.unwrap(),
            }),
            conditions: None,
        }],
    })
}

fn create_product_discount(
    cart_line_id: &str,
    metafield: &Metafield,
    available_discount_code: &str,
) -> CartOperation {
    CartOperation::AddProductDiscounts(ProductDiscounts {
        selection_strategy: ProductDiscountSelectionStrategy::FIRST,
        candidates: vec![ProductDiscountCandidate {
            targets: vec![ProductDiscountCandidateTarget::CartLine(CartLineTarget {
                id: cart_line_id.to_string(),
                quantity: Some(1),
            })],
            associated_discount_code: Some(CartAssociatedDiscountCode {
                code: available_discount_code.to_string(),
            }),
            message: None,
            value: ProductDiscountCandidateValue::Percentage(CartPercentage {
                value: metafield.product_percentage.unwrap(),
            }),
        }],
    })
}

fn create_delivery_discount_candidate(
    delivery_group_id: &str,
    metafield: &Metafield,
    available_discount_code: &str,
) -> DeliveryDiscountCandidate {
    DeliveryDiscountCandidate {
        targets: vec![DeliveryDiscountCandidateTarget::DeliveryGroup(
            DeliveryGroupTarget {
                id: delivery_group_id.to_string(),
            },
        )],
        value: DeliveryDiscountCandidateValue::Percentage(DeliveryPercentage {
            value: metafield.delivery_percentage.unwrap(),
        }),
        message: None,
        associated_discount_code: Some(DeliveryAssociatedDiscountCode {
            code: available_discount_code.to_string(),
        }),
    }
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
                        "orderPercentage": "10",
                        "productPercentage": "20",
                        "deliveryPercentage": "30",
                    }).to_string(),
                }
            },
            "fetchResult": {
                "body": "[\"WELCOME10\"]",
                "status": 200
            }
        })
        .to_string()
    }

    #[test]
    fn test_cart_run() -> Result<()> {
        let expected = FunctionCartRunResult {
            operations: vec![
                CartOperation::AddValidDiscountCodes(CartValidDiscountCodes {
                    codes: vec![CartValidDiscountCode {
                        code: "WELCOME10".to_string(),
                    }],
                }),
                CartOperation::AddOrderDiscounts(OrderDiscounts {
                    selection_strategy: OrderDiscountSelectionStrategy::FIRST,
                    candidates: vec![OrderDiscountCandidate {
                        targets: vec![OrderDiscountCandidateTarget::OrderSubtotal(
                            OrderSubtotalTarget {
                                excluded_variant_ids: vec![],
                            },
                        )],
                        associated_discount_code: Some(CartAssociatedDiscountCode {
                            code: "WELCOME10".to_string(),
                        }),
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
                        associated_discount_code: Some(CartAssociatedDiscountCode {
                            code: "WELCOME10".to_string(),
                        }),
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
            operations: vec![
                DeliveryOperation::AddValidDiscountCodes(DeliveryValidDiscountCodes {
                    codes: vec![DeliveryValidDiscountCode {
                        code: "WELCOME10".to_string(),
                    }],
                }),
                DeliveryOperation::AddDeliveryDiscounts(DeliveryDiscounts {
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
                        associated_discount_code: Some(DeliveryAssociatedDiscountCode {
                            code: "WELCOME10".to_string(),
                        }),
                    }],
                }),
            ],
        };

        assert_eq!(
            run_function_with_input(delivery_run, &get_run_input())?,
            expected
        );
        Ok(())
    }
}
