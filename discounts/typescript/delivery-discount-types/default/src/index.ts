import {DeliveryDiscountTypesAPI, Discounts} from '@shopify/scripts-discounts-apis';

type Payload = DeliveryDiscountTypesAPI.Payload;
type Output = DeliveryDiscountTypesAPI.Output;

export const main = ({input, configuration}: Payload): Output => {
  console.log('[Delivery Demo]', configuration);
  return {
    discounts: input.deliveryLines.map((line) =>
      DeliveryDiscountTypesAPI.discount({
        title: configuration.title || 'Free shipping',
        value: Discounts.percentage(100),
        lineIndex: line.index,
      }),
    ),
  };
};
