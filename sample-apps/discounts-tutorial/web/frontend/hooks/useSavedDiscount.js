import { useMemo } from 'react';
import { gql } from 'graphql-request';
import { DiscountMethod } from '@shopify/discount-app-components';

import { idToGid } from '../utilities/gid';
import { useShopifyQuery } from './useShopifyQuery';

const QUERY = gql`
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

export function useSavedDiscount(id) {
  const { data: result, isLoading, isError } = useShopifyQuery({
    key: 'GetDiscount',
    query: QUERY,
    variables: { id: idToGid('DiscountNode', id) },
  });

  const discount = useMemo(() => {
    if (!result) {
      return;
    }

    const {
      title,
      startsAt,
      endsAt,
      discountClass,
      combinesWith,
      usageLimit,
      appliesOncePerCustomer,
      codes,
      __typename
    } = result.data.discountNode.discount;
    const { configurationField } = result.data.discountNode;

    const method = __typename === 'DiscountAutomaticApp' ? DiscountMethod.Automatic : DiscountMethod.Code;

    return {
      title,
      startsAt,
      endsAt,
      discountClass,
      method,
      usageLimit,
      appliesOncePerCustomer,
      code: codes?.nodes[0]?.code,
      combinesWith,
      configuration: JSON.parse(configurationField?.value ?? '{}'),
      configurationId: configurationField?.id,
    };
  }, [result]);

  return { discount, isLoading, isError };
}