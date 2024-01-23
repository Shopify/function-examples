use shopify_function::prelude::*;
use shopify_function::Result;

#[shopify_function_target(query_path = "src/run.graphql", schema_path = "schema.graphql")]
fn run(input: input::ResponseData) -> Result<output::FunctionRunResult> {
    let no_discounts = output::FunctionRunResult {
      line_discounts: Some(vec![]),
      displayable_errors: Some(vec![]),
    };

    Ok(no_discounts)
}

#[cfg(test)]
mod tests {
    use super::*;
    use shopify_function::run_function_with_input;
    use run::output;

    #[test]
    fn test_result_with_no_discounts() -> Result<()> {
        let result = run_function_with_input(
            run,
            r#"
            {
              "shop": {
                "metafield": null
              }
            }
            "#,
        )?;
        let expected = output::FunctionRunResult {
          line_discounts: Some(vec![]),
          displayable_errors: Some(vec![]),
        };

        assert_eq!(result, expected);
        Ok(())
    }

}
