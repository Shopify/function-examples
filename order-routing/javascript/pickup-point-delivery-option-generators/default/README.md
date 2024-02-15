# Pickup point delivery option generators demo

This repository contains a function that demonstrates how to generate pickup point delivery options based on an external
API accessible via an HTTP request. To simulate an external API, we have hosted a
[JSON file](https://cdn.shopify.com/s/files/1/0628/3830/9033/files/pickup-points-external-api.json?v=1706549257),
which contains pickup point information in the following format:

```json
{
  "deliveryPoints": [
    {
      "pointId": "001",
      "pointName": "Toronto Store",
      "location": {
        "addressComponents": {
          "streetNumber": "620",
          "route": "King St W",
          "locality": "Toronto",
          "administrativeAreaLevel1": "ON",
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
}
```

## Implementation details

A function can have one or more targets, each characterized by a specific input/output API. The Pickup Point Delivery
Option Generators have two targets: an optional **fetch** target and a **run** target. The input/output APIs are
represented as a GraphQL API within the attached [schema](./schema.graphql).

### Fetch target

The **fetch** target is responsible for generating an HTTP request to call the external API. Its input API is defined
by the `Input` type in the [schema](./schema.graphql). In our demo, we are only interested in the delivery address
country and latitude-longitude coordinates, which we specify within the [**fetch** target input query](./src/fetch.graphql).

The [**fetch** target](./src/fetch.js) reads the input and generates an output representing an HTTP request to the
external API if the address country is Canada. The output API is defined by the `FunctionFetchResult` type in
the [schema](./schema.graphql).

#### Fetch target input/output example

##### Input

```json
{
  "allocations": [
    {
      "deliveryAddress": {
        "countryCode": "CA",
        "longitude": 43.70,
        "latitude": -79.42
      }
    }
  ]
}
```

##### Output

```json
{
  "request": {
    "method": "GET",
    "url": "https://cdn.shopify.com/s/files/1/0628/3830/9033/files/demo-pickup-points_3dcda620-e196-40cb-ae6b-6dac17dc81c3.json?v=1706119857&lat=-79.42&lon=43.7",
    "headers": [
      {
        "name": "Accept",
        "value": "application/json; charset=utf-8"
      }
    ],
    "body": null,
    "policy": {
      "read_timeout_ms": 500
    }
  }
}
```

### Run target

The **run** target is responsible for generating the pickup point delivery options. Its input API is defined by
the `Input` type in the [schema](./schema.graphql). In our demo, we are only interested in the external API HTTP
response status and body, which we specify within the [**run** target input query](./src/run.graphql).

The [**run** target](./src/run.js) parses the response body and produces the pickup point data in the format
specified by the `FunctionRunResult` type in the [schema](./schema.graphql).

#### Run target input/output example

##### Input

```json
{
  "fetchResult": {
    "status": 200,
    "body": "{\"deliveryPoints\":[{\"pointId\":\"001\",\"pointName\":\"Toronto Store\",\"location\":{\"addressComponents\":{\"streetNumber\":\"620\",\"route\":\"King St W\",\"locality\":\"Toronto\",\"administrativeAreaLevel1\":\"ON\",\"postalCode\":\"M5V 1M6\",\"country\":\"Canada\",\"countryCode\":\"CA\"},\"geometry\":{\"location\":{\"lat\":43.644664618786685,\"lng\":-79.40066267417106}}},\"openingHours\":{\"weekdayText\":[\"Monday: 9:00 AM – 9:00 PM\",\"Tuesday: 9:00 AM – 9:00 PM\",\"Wednesday: 9:00 AM – 9:00 PM\",\"Thursday: 9:00 AM – 9:00 PM\",\"Friday: 9:00 AM – 9:00 PM\",\"Saturday: 10:00 AM – 6:00 PM\",\"Sunday: Closed\"]}}]}"
  }
}
```

##### Output

```json
{
  "operations": [
    {
      "add": {
        "cost": null,
        "pickup_point": {
          "external_id": "001",
          "name": "Toronto Store",
          "provider": {
            "name": "Shopify Demo",
            "logo_url": "https://cdn.shopify.com/s/files/1/0628/3830/9033/files/shopify_icon_146101.png?v=1706120545"
          },
          "address": {
            "address1": "620 King St W",
            "address2": null,
            "city": "Toronto",
            "country": "Canada",
            "country_code": "CA",
            "latitude": 43.644664618786685,
            "longitude": -79.40066267417106,
            "phone": null,
            "province": "ON",
            "province_code": null,
            "zip": "M5V 1M6"
          },
          "business_hours": [
            {
              "day": "MONDAY",
              "periods": [
                {
                  "opening_time": "09:00:00",
                  "closing_time": "21:00:00"
                }
              ]
            },
            {
              "day": "TUESDAY",
              "periods": [
                {
                  "opening_time": "09:00:00",
                  "closing_time": "21:00:00"
                }
              ]
            },
            {
              "day": "WEDNESDAY",
              "periods": [
                {
                  "opening_time": "09:00:00",
                  "closing_time": "21:00:00"
                }
              ]
            },
            {
              "day": "THURSDAY",
              "periods": [
                {
                  "opening_time": "09:00:00",
                  "closing_time": "21:00:00"
                }
              ]
            },
            {
              "day": "FRIDAY",
              "periods": [
                {
                  "opening_time": "09:00:00",
                  "closing_time": "21:00:00"
                }
              ]
            },
            {
              "day": "SATURDAY",
              "periods": [
                {
                  "opening_time": "10:00:00",
                  "closing_time": "18:00:00"
                }
              ]
            },
            {
              "day": "SUNDAY",
              "periods": []
            }
          ]
        }
      }
    }
  ]
}
```

## Usage

### Installing dependencies

1. Install the necessary dependencies by running the following command in your terminal:

```bash
yarn install
```

### Running tests

1. Execute the tests by running the following command in your terminal:

```bash
yarn test
```

### Deploying the function to the app

1. Navigate to the root directory of your app. Deploy the function by running the following command
in your terminal:

```bash
yarn deploy
```

### Using the function in a store

1. To activate the function, navigate to the specific location pickups points settings within the store admin.
Navigate to: `Settings > Shipping and delivery > Shipping to pickup points > (pick a location) > Pickup point rates > Edit rate`.
Here, select the function and click on 'Done', then 'Save'.

2. To use the function, initiate a checkout process with a product available from the configured location.
Choose 'Ship to Pickup Point' under the 'Delivery Method' section. Enter an address in Canada and click on 'Search'.
A list of pickup points generated using this function should now be visible.
