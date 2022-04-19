use serde_json::json;

mod api;
use api::*;

const DEFAULT_PERCENTAGE: u64 = 50;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let payload: Payload = serde_json::from_reader(std::io::BufReader::new(std::io::stdin()))?;
    println!("{}", json!(script(payload)));
    Ok(())
}

fn script(payload: Payload) -> Output {
    let input = payload.input;
    let config = payload.configuration;

    let value = if let Some(percentage) = config.percentage_off {
        percentage
    } else {
        DEFAULT_PERCENTAGE
    };
    let excluded_variant_ids = if let Some(excluded_variant_ids) = config.excluded_variant_ids {
        excluded_variant_ids
    } else {
        vec![]
    };

    Output {
        discounts: vec![Discount {
            targets: targets(&input.merchandise_lines, &excluded_variant_ids),
            value: Value {
                value_type: "percentage".to_string(),
                value,
            },
        }],
        discount_application_strategy: "first".to_string(),
    }
}

fn targets(
    merchandise_lines: &[MerchandiseLine],
    excluded_variant_ids: &[u64],
) -> Vec<ProductVariantTarget> {
    merchandise_lines
        .iter()
        .filter_map(|line| match line.variant {
            Some(ref variant) if !excluded_variant_ids.contains(&variant.id) => {
                Some(ProductVariantTarget {
                    target_type: "product_variant".to_string(),
                    id: variant.id,
                })
            }
            _ => None,
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    fn payload(configuration: Config) -> Payload {
        let input = r#"
        {
            "input": {
                "merchandiseLines": [
                    { "variant": { "id": 0 } },
                    { "variant": { "id": 1 } }
                ]
             },
             "configuration": {
                 "percentageOff": null,
                 "excluded_variant_ids": null
             }
         }
        "#;
        let default_payload: Payload = serde_json::from_str(&input).unwrap();
        Payload {
            configuration,
            ..default_payload
        }
    }

    #[test]
    fn test_with_excluded_variant_ids() {
        let payload = payload(Config {
            percentage_off: Some(20),
            excluded_variant_ids: Some(vec![0]),
        });
        let output = dbg!(script(payload));

        assert_eq!(output.discounts.len(), 1);
        assert_eq!(output.discount_application_strategy, "first".to_string());

        let discount = &output.discounts[0];
        assert_eq!(discount.targets.len(), 1);

        let target = &discount.targets[0];
        assert_eq!(target.target_type, "product_variant".to_string());
        assert_eq!(target.id, 1);

        let value = &discount.value;
        assert_eq!(value.value_type, "percentage".to_string());
        assert_eq!(value.value, 20);
    }

    #[test]
    fn test_with_no_excluded_variant_ids() {
        let payload = payload(Config {
            percentage_off: Some(20),
            excluded_variant_ids: Some(vec![]),
        });
        let output = dbg!(script(payload));

        assert_eq!(output.discounts.len(), 1);
        assert_eq!(output.discount_application_strategy, "first".to_string());

        let discount = &output.discounts[0];
        assert_eq!(discount.targets.len(), 2);

        let target = &discount.targets[0];
        assert_eq!(target.target_type, "product_variant".to_string());
        assert_eq!(target.id, 0);

        let target = &discount.targets[1];
        assert_eq!(target.target_type, "product_variant".to_string());
        assert_eq!(target.id, 1);

        let value = &discount.value;
        assert_eq!(value.value_type, "percentage".to_string());
        assert_eq!(value.value, 20);
    }

    #[test]
    fn test_with_empty_config() {
        let payload = payload(Config {
            percentage_off: None,
            excluded_variant_ids: None,
        });
        let output = dbg!(script(payload));

        assert_eq!(output.discounts.len(), 1);
        assert_eq!(output.discount_application_strategy, "first".to_string());

        let discount = &output.discounts[0];
        assert_eq!(discount.targets.len(), 2);

        let target = &discount.targets[0];
        assert_eq!(target.target_type, "product_variant".to_string());
        assert_eq!(target.id, 0);

        let target = &discount.targets[1];
        assert_eq!(target.target_type, "product_variant".to_string());
        assert_eq!(target.id, 1);

        let value = &discount.value;
        assert_eq!(value.value_type, "percentage".to_string());
        assert_eq!(value.value, DEFAULT_PERCENTAGE);
    }
}
