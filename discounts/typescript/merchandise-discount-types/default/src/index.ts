import {MerchandiseDiscountTypesAPI, Discounts} from '@shopify/scripts-discounts-apis';

type Payload = MerchandiseDiscountTypesAPI.Payload;
type Output = MerchandiseDiscountTypesAPI.Output;

export const main = ({input, configuration}: Payload): Output => {
  const percentage = configuration.value ? parseFloat(configuration.value) : 100;
  return {
    discounts: [
      MerchandiseDiscountTypesAPI.discountForEachLine({
        title: `${percentage}% off`,
        value: Discounts.percentage(percentage),
        allocations: input.merchandiseLines.map(({index: lineIndex}) => ({lineIndex})),
      }),
    ],
  };
};
