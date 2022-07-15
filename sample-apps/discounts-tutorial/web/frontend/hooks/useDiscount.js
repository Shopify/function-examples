import { useState } from 'react';

const DEFAULT_DISCOUNT_CONFIGURATION = {
  value: 0,
  excludedVariantIds: [],
};

const DEFAULT_DISCOUNT = {
  title: '',
  code: '',
  method: '',
  startsAt: new Date(),
  endsAt: null,
  usageLimit: null,
  appliesOncePerCustomer: false,
  combinesWith: {},
  configuration: DEFAULT_DISCOUNT_CONFIGURATION,
  configurationId: null,
}

const GET_DISCOUNT_QUERY = gql`
  query GetDiscount($id: ID!) {
    discountNode(id: $id) {
      id
      configurationField: metafield(namespace: "discounts-tutorial", key: "volume-config") {
        id
        value
      }
      discount {
        __typename
        ... on DiscountAutomaticApp {
          title
          discountClass
          combinesWith {
            orderDiscounts
            productDiscounts
            shippingDiscounts
          }
          startsAt
          endsAt
        }
        ... on DiscountCodeApp {
          title
          discountClass
          combinesWith {
            orderDiscounts
            productDiscounts
            shippingDiscounts
          }
          startsAt
          endsAt
          usageLimit
          appliesOncePerCustomer
          codes(first: 1) {
            nodes {
              code
            }
          }
        }
      }
    }
  }
`;

export function useDiscount(id) {
  const [discount, setDiscount] = useState(DEFAULT_DISCOUNT);

  const { data: result, isLoading, isError } = useShopifyQuery({
    key: 'GetDiscount',
    query: GET_DISCOUNT_QUERY,
    variables: { id: idToGid('DiscountNode', id) },
  });

  const queriedDiscount = result?.data?.discountNode
  if (!isLoading && !isError && discount.id !== queriedDiscount.discount.id) {
    const {
      discount : {
        title,
        startsAt,
        endsAt,
        discountClass,
        combinesWith,
        usageLimit,
        appliesOncePerCustomer,
        codes,
        __typename
      },
      configurationField
    } = queriedDiscount;

    const method = __typename === 'DiscountAutomaticApp' ? DiscountMethod.Automatic : DiscountMethod.Code;

    setDiscount({
      id,
      title,
      startsAt,
      endsAt,
      discountClass,
      combinesWith,
      usageLimit,
      appliesOncePerCustomer,
      code: codes?.nodes[0]?.code,
      configuration: JSON.parse(configurationField?.value ?? '{}'),
      configurationId: configurationField?.id,
      method,
    });
  }

  return { discount, setDiscount, isLoading, isError };
}
