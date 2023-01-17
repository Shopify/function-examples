use shopify_function::prelude::*;
use shopify_function::Result;

use serde::Serialize;

// Use the shopify_function crate to generate structs for the function input and output
generate_types!(
    query_path = "./input.graphql",
    schema_path = "./schema.graphql"
);

// Use the shopify_function crate to declare your function entrypoint
#[shopify_function]
fn function(input: input::ResponseData) -> Result<output::FunctionResult> {
    let no_changes = output::FunctionResult { operations: vec![] };

    // Get the cart total from the function input, and return early if it's below 100
    let cart_total = input.cart.cost.total_amount.amount.parse::<f64>().unwrap();
    if cart_total < 100.0 {
        // You can use STDERR for debug logs in your function
        eprintln!("Cart total is not high enough, no need to hide the payment method.");
        return Ok(no_changes);
    }

    // Find the payment method to hide, and create a hide output operation from it
    // (this will be None if not found)
    let hide_payment_method = input
        .payment_methods
        .iter()
        .find(|&method| method.name.contains(&"Cash on Delivery".to_string()))
        .map(|method| output::HideOperation {
            payment_method_id: method.id.to_string(),
        });

    // The shopify_function crate serializes your function result and write it to STDOUT
    Ok(output::FunctionResult {
        operations: vec![output::Operation {
            hide: hide_payment_method,
            move_: None,
            rename: None,
        }],
    })
}

#[cfg(test)]
mod tests;
