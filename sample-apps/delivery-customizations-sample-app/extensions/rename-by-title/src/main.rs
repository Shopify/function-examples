use shopify_function::prelude::*;
use shopify_function::Result;

use graphql_client;
use serde::Serialize;
use serde_json;

generate_types!(
    query_path = "./input.graphql",
    schema_path = "./schema.graphql"
);

#[shopify_function]
fn function(input: input::ResponseData) -> Result<output::FunctionResult> {
    let title_to_rename: Option<String> = input.delivery_customization.metafield.map(|m| m.value);
    if title_to_rename.is_none() {
        return Ok(output::FunctionResult { operations: vec![] });
    }

    let delivery_options = delivery_options(&input.cart);
    let operations = delivery_options
        .iter()
        .filter_map(|delivery_option| {
            let delivery_option_title = delivery_option.title.as_ref().unwrap().as_str();
            if title_to_rename.as_ref().unwrap() == delivery_option_title {
                Some(output::Operation {
                    rename: Some(output::RenameOperation {
                        delivery_option_handle: delivery_option.handle.clone(),
                        title: format!("{} {}", delivery_option_title, "renamed"),
                    }),
                    hide: None,
                    move_: None,
                })
            } else {
                None
            }
        })
        .collect();

    Ok(output::FunctionResult { operations })
}

fn delivery_options(
    cart: &input::InputCart,
) -> Vec<&input::InputCartDeliveryGroupsDeliveryOptions> {
    cart.delivery_groups
        .iter()
        .flat_map(|delivery_group| &delivery_group.delivery_options)
        .collect()
}

#[cfg(test)]
mod tests;
