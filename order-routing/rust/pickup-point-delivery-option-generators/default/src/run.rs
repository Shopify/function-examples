use shopify_function::prelude::*;
use shopify_function::Result;

use serde_json::Value;

type TimeWithoutTimezone = String;

#[shopify_function_target(query_path = "src/run.graphql", schema_path = "schema.graphql")]
fn run(input: run::input::ResponseData) -> Result<run::output::FunctionRunResult> {
    match input.fetch_result {
        Some(run::input::InputFetchResult { status: 200, body }) => {
            let external_api_data: Value = serde_json::from_str(&body.unwrap()).unwrap();
            let external_api_delivery_points = &external_api_data["deliveryPoints"]
                .as_array()
                .unwrap()
                .clone();
            let operations =
                build_pickup_point_delivery_option_operations(external_api_delivery_points);
            Ok(run::output::FunctionRunResult { operations })
        }
        _ => Ok(run::output::FunctionRunResult { operations: vec![] }),
    }
}

fn build_pickup_point_delivery_option_operations(
    external_api_delivery_points: &[Value],
) -> Vec<run::output::Operation> {
    external_api_delivery_points
        .iter()
        .filter_map(|external_api_delivery_point| {
            build_pickup_point_delivery_option(external_api_delivery_point)
        })
        .map(|op| run::output::Operation { add: op })
        .collect()
}

fn build_pickup_point_delivery_option(
    external_api_delivery_point: &Value,
) -> Option<run::output::PickupPointDeliveryOption> {
    Some(run::output::PickupPointDeliveryOption {
        cost: None,
        pickup_point: run::output::PickupPoint {
            external_id: external_api_delivery_point["pointId"]
                .as_str()
                .unwrap()
                .to_string(),
            name: external_api_delivery_point["pointName"]
                .as_str()
                .unwrap()
                .to_string(),
            provider: build_provider(),
            address: build_address(external_api_delivery_point)?,
            business_hours: build_business_hours(external_api_delivery_point),
        },
        metafields: Some(vec![]),
    })
}

fn build_provider() -> run::output::Provider {
    run::output::Provider {
        name: "Shopify Rust Demo".to_string(),
        logo_url: "https://cdn.shopify.com/s/files/1/0628/3830/9033/files/shopify_icon_146101.png?v=1706120545".to_string(),
    }
}

fn build_address(external_api_delivery_point: &Value) -> Option<run::output::PickupAddress> {
    let address = run::output::PickupAddress {
        address1: format!(
            "{} {}",
            external_api_delivery_point["location"]["addressComponents"]["streetNumber"]
                .as_str()
                .unwrap(),
            external_api_delivery_point["location"]["addressComponents"]["route"]
                .as_str()
                .unwrap()
        ),
        address2: None,
        city: external_api_delivery_point["location"]["addressComponents"]["locality"]
            .as_str()
            .unwrap()
            .to_string(),
        country: Some(
            external_api_delivery_point["location"]["addressComponents"]["country"]
                .as_str()
                .unwrap()
                .to_string(),
        ),
        country_code: external_api_delivery_point["location"]["addressComponents"]["countryCode"]
            .as_str()
            .unwrap()
            .to_string(),
        latitude: external_api_delivery_point["location"]["geometry"]["location"]["lat"]
            .as_f64()
            .unwrap_or_default(),
        longitude: external_api_delivery_point["location"]["geometry"]["location"]["lng"]
            .as_f64()
            .unwrap_or_default(),
        phone: None,
        province: Some(
            external_api_delivery_point["location"]["addressComponents"]["administrativeArea"]
                ["name"]
                .as_str()
                .unwrap()
                .to_string(),
        ),
        province_code: Some(
            external_api_delivery_point["location"]["addressComponents"]["administrativeArea"]
                ["code"]
                .as_str()
                .unwrap()
                .to_string(),
        ),
        zip: Some(
            external_api_delivery_point["location"]["addressComponents"]["postalCode"]
                .as_str()
                .unwrap()
                .to_string(),
        ),
    };
    Some(address)
}

/// Transforms the opening hours of a delivery point into a vector of `BusinessHours` objects.
/// Each day's opening hours are represented using a `BusinessHours` object as follows:
/// "Monday: 9:00 AM – 5:00 PM" is transformed to {day: Monday, periods: [{opening_time: "09:00:00", closing_time: "17:00:00"}]}
/// "Tuesday: Closed" is transformed to {day: Tuesday, periods: []}
fn build_business_hours(
    external_api_delivery_point: &Value,
) -> Option<Vec<run::output::BusinessHours>> {
    if external_api_delivery_point["openingHours"].is_null() {
        return None;
    }

    let business_hours = external_api_delivery_point["openingHours"]["weekdayText"]
        .as_array()
        .unwrap()
        .iter()
        .map(|day| {
            let day_parts: Vec<&str> = day.as_str().unwrap().split(": ").collect();
            let day_name = serde_json::from_str::<run::output::Weekday>(
                format!("\"{}\"", &day_parts[0].to_uppercase()).as_str(),
            )
            .unwrap();
            if day_parts[1] == "Closed" {
                run::output::BusinessHours {
                    day: day_name,
                    periods: vec![],
                }
            } else {
                let opening_closing_times: Vec<&str> = day_parts[1].split(" – ").collect();
                run::output::BusinessHours {
                    day: day_name,
                    periods: vec![run::output::BusinessHoursPeriod {
                        opening_time: format_time(opening_closing_times[0]),
                        closing_time: format_time(opening_closing_times[1]),
                    }],
                }
            }
        })
        .collect();

    Some(business_hours)
}

/// Converts a time string from 12-hour to 24-hour format.
/// Example: "9:00 AM" => "09:00:00", "5:00 PM" => "17:00:00"
fn format_time(time: &str) -> TimeWithoutTimezone {
    let time_parts: Vec<&str> = time.split_whitespace().collect();
    let hour_min: Vec<&str> = time_parts[0].split(':').collect();
    let hour: u32 = hour_min[0].parse().unwrap();
    let min: &str = hour_min[1];
    let period: &str = time_parts[1];

    let hour_in_24_format = match period {
        "AM" => {
            if hour == 12 {
                0
            } else {
                hour
            }
        }
        "PM" => {
            if hour == 12 {
                hour
            } else {
                hour + 12
            }
        }
        _ => hour,
    };

    format!("{:02}:{:02}:00", hour_in_24_format, min)
}

#[cfg(test)]
mod tests {
    use super::*;
    use shopify_function::{run_function_with_input, Result};

    #[test]
    fn test_result_has_pickup_point_delivery_options_when_receiving_fetch_result_for_successful_response(
    ) -> Result<()> {
        use run::output::*;
        use serde_json::json;

        let external_api_body = json!({
            "deliveryPoints": [
                {
                    "pointId": "001",
                    "pointName": "Toronto Store",
                    "location": {
                        "addressComponents": {
                            "streetNumber": "620",
                            "route": "King St W",
                            "locality": "Toronto",
                            "administrativeArea": {
                                "name": "Ontario",
                                "code": "ON"
                            },
                            "postalCode": "M5V 1M6",
                            "country": "Canada",
                            "countryCode": "CA"
                        },
                        "geometry": {
                            "location": {
                                "lat": 43.644664618786685,
                                "lng": -79.40066267417106
                            }
                        }
                    },
                    "openingHours": {
                        "weekdayText": [
                            "Monday: 9:00 AM – 9:00 PM",
                            "Tuesday: 9:00 AM – 9:00 PM",
                            "Wednesday: 9:00 AM – 9:00 PM",
                            "Thursday: 9:00 AM – 9:00 PM",
                            "Friday: 9:00 AM – 9:00 PM",
                            "Saturday: 10:00 AM – 6:00 PM",
                            "Sunday: Closed"
                        ]
                    }
                }
            ]
        });

        let result = run_function_with_input(
            run,
            &json!({
                "fetchResult": {
                    "status": 200,
                    "body": external_api_body.to_string()
                }
            })
            .to_string(),
        )?;

        let expected = FunctionRunResult {
            operations: vec![Operation {
                add: PickupPointDeliveryOption {
                    cost: None,
                    pickup_point: PickupPoint {
                        address: PickupAddress {
                            address1: "620 King St W".to_string(),
                            address2: None,
                            city: "Toronto".to_string(),
                            country: Some("Canada".to_string()),
                            country_code: "CA".to_string(),
                            latitude: 43.644664618786685,
                            longitude: -79.40066267417106,
                            phone: None,
                            province: Some("Ontario".to_string()),
                            province_code: Some("ON".to_string()),
                            zip: Some("M5V 1M6".to_string()),
                        },
                        business_hours: Some(vec![
                            BusinessHours {
                                day: Weekday::MONDAY,
                                periods: vec![BusinessHoursPeriod {
                                    opening_time: "09:00:00".to_string(),
                                    closing_time: "21:00:00".to_string(),
                                }],
                            },
                            BusinessHours {
                                day: Weekday::TUESDAY,
                                periods: vec![BusinessHoursPeriod {
                                    opening_time: "09:00:00".to_string(),
                                    closing_time: "21:00:00".to_string(),
                                }],
                            },
                            BusinessHours {
                                day: Weekday::WEDNESDAY,
                                periods: vec![BusinessHoursPeriod {
                                    opening_time: "09:00:00".to_string(),
                                    closing_time: "21:00:00".to_string(),
                                }],
                            },
                            BusinessHours {
                                day: Weekday::THURSDAY,
                                periods: vec![BusinessHoursPeriod {
                                    opening_time: "09:00:00".to_string(),
                                    closing_time: "21:00:00".to_string(),
                                }],
                            },
                            BusinessHours {
                                day: Weekday::FRIDAY,
                                periods: vec![BusinessHoursPeriod {
                                    opening_time: "09:00:00".to_string(),
                                    closing_time: "21:00:00".to_string(),
                                }],
                            },
                            BusinessHours {
                                day: Weekday::SATURDAY,
                                periods: vec![BusinessHoursPeriod {
                                    opening_time: "10:00:00".to_string(),
                                    closing_time: "18:00:00".to_string(),
                                }],
                            },
                            BusinessHours {
                                day: Weekday::SUNDAY,
                                periods: vec![],
                            },
                        ]),
                        provider: Provider {
                            name: "Shopify Rust Demo".to_string(),
                            logo_url: "https://cdn.shopify.com/s/files/1/0628/3830/9033/files/shopify_icon_146101.png?v=1706120545".to_string(),
                        },
                        external_id: "001".to_string(),
                        name: "Toronto Store".to_string(),
                    },
                    metafields: Some(vec![]),
                },
            }],
        };

        assert_eq!(result, expected);
        Ok(())
    }
    #[test]
    fn test_result_has_no_pickup_point_delivery_options_when_receiving_fetch_result_for_failed_response(
    ) -> Result<()> {
        use run::output::*;

        let result = run_function_with_input(
            run,
            r#"
                {
                    "fetchResult": {
                        "status": 500,
                        "body": "Server Error"
                    }
                }
            "#,
        )?;

        let expected = FunctionRunResult { operations: vec![] };
        assert_eq!(result, expected);
        Ok(())
    }

    #[test]
    fn test_result_has_pickup_point_delivery_option_with_null_business_hours_when_fetch_result_has_null_opening_hours(
    ) -> Result<()> {
        use run::output::*;
        use serde_json::json;

        let external_api_body = json!({
            "deliveryPoints": [
                {
                    "pointId": "001",
                    "pointName": "Toronto Store",
                    "location": {
                        "addressComponents": {
                            "streetNumber": "620",
                            "route": "King St W",
                            "locality": "Toronto",
                            "administrativeArea": {
                                "name": "Ontario",
                                "code": "ON"
                            },
                            "postalCode": "M5V 1M6",
                            "country": "Canada",
                            "countryCode": "CA"
                        },
                        "geometry": {
                            "location": {
                                "lat": 43.644664618786685,
                                "lng": -79.40066267417106
                            }
                        }
                    },
                    "openingHours": null
                }
            ]
        });

        let result = run_function_with_input(
            run,
            &json!({
                "fetchResult": {
                    "status": 200,
                    "body": external_api_body.to_string()
                }
            })
            .to_string(),
        )?;

        let expected = FunctionRunResult {
            operations: vec![Operation {
                add: PickupPointDeliveryOption {
                    cost: None,
                    pickup_point: PickupPoint {
                        address: PickupAddress {
                            address1: "620 King St W".to_string(),
                            address2: None,
                            city: "Toronto".to_string(),
                            country: Some("Canada".to_string()),
                            country_code: "CA".to_string(),
                            latitude: 43.644664618786685,
                            longitude: -79.40066267417106,
                            phone: None,
                            province: Some("Ontario".to_string()),
                            province_code: Some("ON".to_string()),
                            zip: Some("M5V 1M6".to_string()),
                        },
                        business_hours: None,
                        provider: Provider {
                            name: "Shopify Rust Demo".to_string(),
                            logo_url: "https://cdn.shopify.com/s/files/1/0628/3830/9033/files/shopify_icon_146101.png?v=1706120545".to_string(),
                        },
                        external_id: "001".to_string(),
                        name: "Toronto Store".to_string(),
                    },
                    metafields: Some(vec![]),
                },
            }],
        };

        assert_eq!(result, expected);
        Ok(())
    }
}
