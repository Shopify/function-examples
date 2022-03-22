use serde::Serialize;

mod api;
use api::*;

fn main() -> Result<(), Box<dyn std::error::Error>> {
  let payload: Payload = rmp_serde::decode::from_read(std::io::stdin())?;
  let mut out = std::io::stdout();
  let mut serializer = rmp_serde::Serializer::new(&mut out).with_struct_map();
  script(payload)?.serialize(&mut serializer)?;
  Ok(())
}

fn script(payload: Payload) -> Result<Output, Box<dyn std::error::Error>> {
  let config = payload.configuration;

  let percentage: f64 = config.percentage.parse()?;
  let minimum_order_subtotal: Money = config.minimum_order_subtotal;
  Ok(build_result(percentage, minimum_order_subtotal))
}

fn build_result(percentage: f64, minimum_order_subtotal: Money) -> Output {
  Output {
    discount_candidates: vec![Discount {
      message: Some(format!(
        "Spend ${} get {}% off",
        minimum_order_subtotal.subunits / 100,
        percentage
      )),
      conditions: vec![Condition::OrderMinimumSubtotal {
        target_type: "order_subtotal".to_string(),
        excluded_line_indexes: vec![],
        minimum_amount: minimum_order_subtotal,
      }],
      entitlements: vec![OrderSubtotalEntitlement {
        target_type: "order_subtotal".to_string(),
        excluded_line_indexes: vec![],
        value: Value {
          value_type: "percentage".to_string(),
          value: percentage,
        },
      }],
    }],
  }
}

#[cfg(test)]
mod tests {
  use super::*;

  fn default_payload() -> Payload {
    Payload {
      configuration: Config {
        percentage: "10".to_string(),
        minimum_order_subtotal: Money { subunits: 10000 },
      },
    }
  }
  #[test]
  fn test_default_payload() {
    let payload = default_payload();
    let output = script(payload).unwrap();

    let discount = &output.discount_candidates[0];
    assert_eq!(discount.message, Some("Spend $100 get 10% off".to_string()));

    let Condition::OrderMinimumSubtotal {
      target_type,
      excluded_line_indexes,
      minimum_amount,
    } = &discount.conditions[0];
    assert_eq!(target_type, "order_subtotal");
    assert_eq!(excluded_line_indexes, &([] as [u64; 0]));
    assert_eq!(minimum_amount.subunits, 10000);

    let OrderSubtotalEntitlement {
      target_type,
      excluded_line_indexes,
      value,
    } = &discount.entitlements[0];
    assert_eq!(target_type, "order_subtotal");
    assert_eq!(excluded_line_indexes, &([] as [u64; 0]));
    assert_eq!(value.value_type, "percentage");
    assert_eq!(value.value, 10.0);
  }
}
