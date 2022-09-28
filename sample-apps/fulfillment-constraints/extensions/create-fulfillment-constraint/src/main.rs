use serde::{Serialize};

mod api;
use api::*;
use std::collections::hash_map::{Entry, HashMap};

static MUST_BE_FULFILLED_TOGETHER: &str = "MUST_BE_FULFILLED_TOGETHER";
static MUST_NOT_BE_FULFILLED_TOGETHER: &str = "MUST_NOT_BE_FULFILLED_TOGETHER";

static NOT_FOUND_RESULT: &str = "NOT_FOUND";

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let input: Input = serde_json::from_reader(std::io::BufReader::new(std::io::stdin()))?;
    let mut out = std::io::stdout();
    let mut serializer = serde_json::Serializer::new(&mut out);
    function(input)?.serialize(&mut serializer)?;
    Ok(())
}

fn function(input: Input) -> Result<FunctionResult, Box<dyn std::error::Error>> {
    let line_item_groups = build_line_item_groups(&input.cart.lines);

    Ok(build_result(line_item_groups))
}

fn build_line_item_groups(cart_lines: &[CartLine]) -> HashMap<String, Vec<String>> {
    let mut groups = HashMap::new();

    for cart_line in cart_lines {
        let line_item_id = cart_line.id.to_string();
        let bundle_identifier = match &cart_line.merchandise.metafield {
            Some(Metafield { value }) => value.to_string(),
            None => NOT_FOUND_RESULT.to_string()
        };

        match groups.entry(bundle_identifier) {
            Entry::Vacant(e) => { e.insert(vec![line_item_id]); },
            Entry::Occupied(mut e) => { e.get_mut().push(line_item_id); }
        }
    }

    return groups;
}

fn build_result(groups: HashMap<String, Vec<String>>) -> FunctionResult {
    let mut fulfillment_constraints: Vec<FulfillmentConstraint> = Vec::new();

    for (bundle_identifier, line_item_ids) in groups {
        if bundle_identifier == NOT_FOUND_RESULT.to_string() || line_item_ids.len() < 2 { continue; }
        let fulfillment_constraint = FulfillmentConstraint {
            constrained_by: MUST_BE_FULFILLED_TOGETHER.to_string(),
            line_items: (&line_item_ids).to_vec(),
        };
    
        fulfillment_constraints.push(fulfillment_constraint);
    }

    FunctionResult {
        fulfillment_constraints: fulfillment_constraints
    }
}