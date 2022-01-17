/*
 * This script is created by default when you run the `shopify script create`
 * command in Shopify CLI, and use the payment methods API. The script does
 * nothing and leaves payment methods unchanged.
 */

import {DeliveryDiscountTypesAPI} from '@shopify/scripts-discounts-apis';

type Payload = DeliveryDiscountTypesAPI.Payload;
type Output = DeliveryDiscountTypesAPI.Output;

export const main = ({input, configuration}: Payload): Output => {
  // Use console.log to print output from your script
  console.log('Hello, world!');
  return {discounts: []};
};
