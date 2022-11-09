use shopify_function::prelude::*;
use shopify_function::Result;

use graphql_client;
use serde::{Deserialize, Serialize};
use serde_json;

generate_types!(
    query_path = "./input.graphql",
    schema_path = "./schema.graphql"
);

#[derive(Serialize, Deserialize, Default, PartialEq)]
struct Config {}

#[shopify_function]
fn function(input: input::ResponseData) -> Result<output::FunctionResult> {
    let _config: Config = input
        .discount_node
        .metafield
        .as_ref()
        .map(|m| serde_json::from_str::<Config>(m.value.as_str()))
        .transpose()?
        .unwrap_or_default();

    let cart_lines = input.cart.lines;
    if cart_lines.is_empty() {
        return no_discounts();
    }

    let email = input.cart.buyer_identity.map_or_else(|| None, |b| b.email);
    if email.is_none() || !email.unwrap().ends_with("@shopify.com") {
        return no_discounts();
    }

    let mut targets = vec![];
    for line in cart_lines {
        match line.merchandise {
            input::InputCartLinesMerchandise::ProductVariant(variant) => {
                if variant.product.tagged_shopify_vm {
                    targets.push(output::Target {
                        product_variant: Some(output::ProductVariantTarget {
                            id: variant.id,
                            quantity: None,
                        }),
                    });
                }
            }
            _ => continue,
        }
    }

    if targets.is_empty() {
        return no_discounts();
    }

    Ok(output::FunctionResult {
        discounts: vec![output::Discount {
            message: None,
            targets,
            value: output::Value {
                percentage: Some(output::Percentage {
                    value: 100.to_string(),
                }),
                fixed_amount: None,
            },
        }],
        discount_application_strategy: output::DiscountApplicationStrategy::FIRST,
    })
}

fn no_discounts() -> Result<output::FunctionResult> {
    Ok(output::FunctionResult {
        discount_application_strategy: output::DiscountApplicationStrategy::FIRST,
        discounts: vec![],
    })
}

#[cfg(test)]
mod tests;
