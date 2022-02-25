import {DeliveryDiscountTypesAPI, Discounts} from '@shopify/scripts-discounts-apis';

type Payload = DeliveryDiscountTypesAPI.Payload;
type Output = DeliveryDiscountTypesAPI.Output;

export const main = ({input, configuration}: Payload): Output => {
  console.log('[Delivery Demo]', configuration);
  const percentage = configuration.value ? parseFloat(configuration.value) : 100;
  const title = configuration.title ?? (percentage === 100 ? 'Free shipping' : `${percentage}% off`);
  return {
    discounts: input.deliveryLines.map((line) =>
      DeliveryDiscountTypesAPI.discount({
        title,
        value: Discounts.percentage(percentage),
        lineIndex: line.index,
      }),
    ),
  };
};
