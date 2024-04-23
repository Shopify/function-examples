use shopify_function::prelude::*;
use shopify_function::Result;

#[shopify_function_target(query_path = "src/fetch.graphql", schema_path = "schema.graphql")]
fn fetch(input: fetch::input::ResponseData) -> Result<fetch::output::FunctionFetchResult> {
    let delivery_address = &input.delivery_address;
    if let (Some(country_code), Some(longitude), Some(latitude)) = (
        &delivery_address.country_code,
        &delivery_address.longitude,
        &delivery_address.latitude,
    ) {
        if country_code.as_str() == "CA" {
            return Ok(fetch::output::FunctionFetchResult {
                request: Some(build_external_api_request(latitude, longitude)),
            });
        }
    }

    Ok(fetch::output::FunctionFetchResult { request: None })
}

fn build_external_api_request(latitude: &f64, longitude: &f64) -> fetch::output::HttpRequest {
    // The latitude and longitude parameters are included in the URL for demonstration purposes only. They do not influence the result.
    let url = format!(
        "https://cdn.shopify.com/s/files/1/0628/3830/9033/files/pickup-points-external-api-v1.json?v=1712853748&lat={}&lon={}",
        latitude, longitude
    );

    fetch::output::HttpRequest {
        method: fetch::output::HttpRequestMethod::GET,
        url,
        headers: vec![fetch::output::HttpRequestHeader {
            name: "Accept".to_string(),
            value: "application/json; charset=utf-8".to_string(),
        }],
        body: None,
        policy: fetch::output::HttpRequestPolicy {
            read_timeout_ms: 500,
        },
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use shopify_function::{run_function_with_input, Result};

    #[test]
    fn test_fetch_returns_request_when_country_is_canada() -> Result<()> {
        use fetch::output::*;

        let result = run_function_with_input(
            fetch,
            r#"
                {
                    "deliveryAddress": {
                        "countryCode": "CA",
                        "longitude": 43.70,
                        "latitude": -79.42
                    }
                }
            "#,
        )?;

        let expected = FunctionFetchResult {
            request: Some(HttpRequest {
                method: HttpRequestMethod::GET,
                url: "https://cdn.shopify.com/s/files/1/0628/3830/9033/files/pickup-points-external-api-v1.json?v=1712853748&lat=-79.42&lon=43.7".to_string(),

                headers: vec![
                    HttpRequestHeader {
                        name: "Accept".to_string(),
                        value: "application/json; charset=utf-8".to_string(),
                    },
                ],
                body: None,
                policy: HttpRequestPolicy {
                    read_timeout_ms: 500,
                },
            }),
        };

        assert_eq!(result, expected);
        Ok(())
    }

    #[test]
    fn test_fetch_returns_no_request_when_country_is_not_canada() -> Result<()> {
        let result = run_function_with_input(
            fetch,
            r#"
                {
                    "deliveryAddress": {
                        "countryCode": "US",
                        "longitude": 40.71,
                        "latitude": -74.01
                    }
                }
            "#,
        )?;

        assert!(result.request.is_none());
        Ok(())
    }
}
