use shopify_function::prelude::*;
use shopify_function::Result;

type Date = String;

#[shopify_function_target(query_path = "src/run.graphql", schema_path = "schema.graphql")]
fn run(input: input::ResponseData) -> Result<output::FunctionRunResult> {
    const TOTAL_DISCOUNTS_CAP_REACHED: &str = "Maximum discount limit reached for this cart";
    const SINGLE_DISCOUNT_CAP_REACHED: &str = "Maximum discount limit reached for this discount";

    fn get_target_line_index(target: &input::InputDiscountsDiscountProposalsTargets) -> usize {
      target.cart_line_id.chars().last().unwrap().to_digit(10).unwrap() as usize
    }

    fn calculate_current_target_price(input_cart_lines: &Vec<input::InputCartLines>, target: &input::InputDiscountsDiscountProposalsTargets) -> f64 {
      let target_line_index = get_target_line_index(target);
      let target_line = &input_cart_lines[target_line_index];
      f64::from(target_line.cost.amount_per_quantity.amount) * target.quantity as f64
    }

    let mut total_discounts_cap: f64 = input.shop.metafield
      .unwrap_or(input::InputShopMetafield {value: String::from("-1")})
      .value
      .parse().unwrap();
    let mut total_discount = 0.0;

    let mut all_lines_output_discounts = input.cart.lines
      .iter()
      .map(|line| output::LineDiscount {
        cart_line_id: line.id.clone(),
        quantity: line.quantity,
        allocations: vec![]
      })
      .collect::<Vec<output::LineDiscount>>();
    let mut displayable_errors = vec![];

    for discounts in input.discounts {
      for discount in discounts.iter() {
        let mut current_discount_cap: f64 = discount.metafield.clone()
          .unwrap_or(input::InputDiscountsMetafield {value: String::from("-1")})
          .value
          .parse().unwrap();
        let mut current_discount_total = 0.0;

        for proposal in discount.discount_proposals.iter() {
          // Calculate the total price of all targets of the proposal
          let total_targets_price = proposal.targets.iter().fold(0.0, |total, target| {
            total + calculate_current_target_price(&input.cart.lines, &target)
          });

          for target in proposal.targets.iter() {
            // Calculate the current target line total price
            let current_target_price = calculate_current_target_price(&input.cart.lines, &target);

            // what ratio of the total discount should be allocated to the current target
            let current_target_ratio = current_target_price / total_targets_price;

            let mut line_discount_amount: f64 = 0.0;
            if proposal.value_type == input::Value::FIXED_AMOUNT {
              line_discount_amount = f64::from(proposal.value) * current_target_ratio;
            } else if proposal.value_type == input::Value::PERCENTAGE {
              line_discount_amount = f64::from(proposal.value) / 100.0  * total_targets_price * current_target_ratio;
            }

            if current_discount_cap >= 0.0 && current_discount_total + line_discount_amount > current_discount_cap {
              line_discount_amount = current_discount_cap - current_discount_total;
              displayable_errors.push(output::DisplayableError {
                discount_id: discount.id.to_string(),
                reason: SINGLE_DISCOUNT_CAP_REACHED.to_string(),
              });
            }

            if total_discounts_cap >= 0.0 && total_discount + line_discount_amount > total_discounts_cap {
              line_discount_amount = total_discounts_cap - total_discount;
              displayable_errors.push(output::DisplayableError {
                discount_id: discount.id.to_string(),
                reason: TOTAL_DISCOUNTS_CAP_REACHED.to_string(),
              });
            }

            if line_discount_amount == 0.0 {  // Skip the discount if its allocation is 0
              continue;
            }

            total_discount += line_discount_amount;
            current_discount_total += line_discount_amount;

            let target_line_index = get_target_line_index(target);
            let target_allocation = output::OutputAllocations{
              discount_proposal_id: proposal.handle.clone(),
              amount: shopify_function::prelude::Decimal(line_discount_amount),
            };
            all_lines_output_discounts[target_line_index].allocations.push(target_allocation);
          }
        }
      }
    }

    let line_discounts = all_lines_output_discounts
      .into_iter()
      .filter(|output_discount| output_discount.allocations.len() > 0)
      .collect::<Vec<output::LineDiscount>>();

    // Remove duplicate errors
    displayable_errors.dedup();

    let output = output::FunctionRunResult {
      line_discounts: Some(line_discounts),
      displayable_errors: Some(displayable_errors)
    };

    Ok(output)
}

#[cfg(test)]
mod tests {
    use super::*;
    use shopify_function::run_function_with_input;
    use run::output;

    #[test]
    fn test_result_without_cart_max() -> Result<()> {
        let result = run_function_with_input(
            run,
            r#"
            {
              "discounts": [
                {
                  "id": "gid:\/\/shopify\/DiscountNode\/13",
                  "title": "CAPS",
                  "code": "CAPS",
                  "type": "CodePriceRule",
                  "discountApplicationStrategy": "FIRST",
                  "discountProposals": [
                    {
                      "handle": "8d783e44-14b9-4c2c-b431-2be340f1f4e1",
                      "message": "CAPS",
                      "valueType": "FIXED_AMOUNT",
                      "value": "10.0",
                      "targets": [
                        {
                          "cartLineId": "gid:\/\/shopify\/CartLine\/0",
                          "quantity": 5
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "gid:\/\/shopify\/DiscountNode\/8",
                  "title": "TIES",
                  "code": "TIES",
                  "type": "CodePriceRule",
                  "discountApplicationStrategy": "FIRST",
                  "discountProposals": [
                    {
                      "handle": "a7194cec-d807-4c46-9284-4fec7a3f5fbe",
                      "message": "TIES",
                      "valueType": "PERCENTAGE",
                      "value": "20.0",
                      "targets": [
                        {
                          "cartLineId": "gid:\/\/shopify\/CartLine\/1",
                          "quantity": 6
                        }
                      ]
                    }
                  ]
                }
              ],
              "presentmentCurrencyRate": "1.2706752",
              "cart": {
                "lines": [
                  {
                    "id": "gid:\/\/shopify\/CartLine\/0",
                    "quantity": 5,
                    "cost": {
                      "amountPerQuantity": {
                        "amount": "32.0",
                        "currencyCode": "CAD"
                      }
                    },
                    "merchandise": {
                      "__typename": "ProductVariant",
                      "id": "gid:\/\/shopify\/ProductVariant\/17",
                      "title": "Shorts",
                      "product": {
                        "id": "gid:\/\/shopify\/Product\/9",
                        "title": "Shorts"
                      }
                    }
                  },
                  {
                    "id": "gid:\/\/shopify\/CartLine\/1",
                    "quantity": 6,
                    "cost": {
                      "amountPerQuantity": {
                        "amount": "20.0",
                        "currencyCode": "CAD"
                      }
                    },
                    "merchandise": {
                      "__typename": "ProductVariant",
                      "id": "gid:\/\/shopify\/ProductVariant\/17",
                      "title": "Shorts",
                      "product": {
                        "id": "gid:\/\/shopify\/Product\/9",
                        "title": "Shorts"
                      }
                    }
                  }
                ]
              },
              "shop": {
                "metafield": null
              }
            }
            "#,
        )?;
        let expected = output::FunctionRunResult {
            line_discounts: Some(vec![
              output::LineDiscount {
                cart_line_id: String::from("gid://shopify/CartLine/0"),
                quantity: 5,
                allocations: vec![
                  output::OutputAllocations{
                    discount_proposal_id: String::from("8d783e44-14b9-4c2c-b431-2be340f1f4e1"),
                    amount: shopify_function::prelude::Decimal(10.0),
                  }
                ]
              },
              output::LineDiscount {
                cart_line_id: String::from("gid://shopify/CartLine/1"),
                quantity: 6,
                allocations: vec![
                  output::OutputAllocations{
                    discount_proposal_id: String::from("a7194cec-d807-4c46-9284-4fec7a3f5fbe"),
                    amount: shopify_function::prelude::Decimal(24.0),
                  }
                ]
              }
            ]),
            displayable_errors: Some(vec![]),
        };

        assert_eq!(result, expected);
        Ok(())
    }

    #[test]
    fn test_result_with_10_cart_max() -> Result<()> {
      let result = run_function_with_input(
          run,
          r#"
          {
            "discounts": [
              {
                "id": "gid:\/\/shopify\/DiscountNode\/13",
                "title": "CAPS",
                "code": "CAPS",
                "type": "CodePriceRule",
                "discountApplicationStrategy": "FIRST",
                "discountProposals": [
                  {
                    "handle": "8d783e44-14b9-4c2c-b431-2be340f1f4e1",
                    "message": "CAPS",
                    "valueType": "PERCENTAGE",
                    "value": "5.0",
                    "targets": [
                      {
                        "cartLineId": "gid:\/\/shopify\/CartLine\/0",
                        "quantity": 5
                      }
                    ]
                  }
                ]
              },
              {
                "id": "gid:\/\/shopify\/DiscountNode\/8",
                "title": "TIES",
                "code": "TIES",
                "type": "CodePriceRule",
                "discountApplicationStrategy": "FIRST",
                "discountProposals": [
                  {
                    "handle": "a7194cec-d807-4c46-9284-4fec7a3f5fbe",
                    "message": "TIES",
                    "valueType": "PERCENTAGE",
                    "value": "10.0",
                    "targets": [
                      {
                        "cartLineId": "gid:\/\/shopify\/CartLine\/1",
                        "quantity": 6
                      }
                    ]
                  }
                ]
              }
            ],
            "presentmentCurrencyRate": "1.2706752",
            "cart": {
              "lines": [
                {
                  "id": "gid:\/\/shopify\/CartLine\/0",
                  "quantity": 5,
                  "cost": {
                    "amountPerQuantity": {
                      "amount": "32.0",
                      "currencyCode": "CAD"
                    }
                  },
                  "merchandise": {
                    "__typename": "ProductVariant",
                    "id": "gid:\/\/shopify\/ProductVariant\/17",
                    "title": "Shorts",
                    "product": {
                      "id": "gid:\/\/shopify\/Product\/9",
                      "title": "Shorts"
                    }
                  }
                },
                {
                  "id": "gid:\/\/shopify\/CartLine\/1",
                  "quantity": 6,
                  "cost": {
                    "amountPerQuantity": {
                      "amount": "20.0",
                      "currencyCode": "CAD"
                    }
                  },
                  "merchandise": {
                    "__typename": "ProductVariant",
                    "id": "gid:\/\/shopify\/ProductVariant\/17",
                    "title": "Shorts",
                    "product": {
                      "id": "gid:\/\/shopify\/Product\/9",
                      "title": "Shorts"
                    }
                  }
                }
              ]
            },
            "shop": {
              "localTime": {
                "date": "2023-11-15"
              },
              "metafield": {
                "value": "10.0"
              }
            }
          }
          "#,
      )?;
      let expected = output::FunctionRunResult {
          line_discounts: Some(vec![
            output::LineDiscount {
              cart_line_id: String::from("gid://shopify/CartLine/0"),
              quantity: 5,
              allocations: vec![
                output::OutputAllocations{
                  discount_proposal_id: String::from("8d783e44-14b9-4c2c-b431-2be340f1f4e1"),
                  amount: shopify_function::prelude::Decimal(8.0),
                }
              ]
            },
            output::LineDiscount {
              cart_line_id: String::from("gid://shopify/CartLine/1"),
              quantity: 6,
              allocations: vec![
                output::OutputAllocations{
                  discount_proposal_id: String::from("a7194cec-d807-4c46-9284-4fec7a3f5fbe"),
                  amount: shopify_function::prelude::Decimal(2.0),
                }
              ]
            }
          ]),
          displayable_errors:
          Some(
            vec![
              output::DisplayableError{
                discount_id: String::from("gid://shopify/DiscountNode/8"),
                reason: String::from("Maximum discount limit reached for this cart")
              }
            ]
          ),
      };

      assert_eq!(result, expected);
      Ok(())
  }
}
