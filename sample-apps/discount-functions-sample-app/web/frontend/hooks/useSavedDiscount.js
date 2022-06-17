import { useMemo } from 'react';
import { gql } from 'graphql-request';

import { idToGid } from '../utilities/gid';
import { useShopifyQuery } from './useShopifyQuery';
import metafields from '../metafields';

const QUERY = gql`
  query GetDiscount($id: ID!, $metafieldNamespace: String!, $metafieldKey: String!) {
    automaticDiscountNode(id: $id) {
      configurationField: metafield(namespace: $metafieldNamespace, key: $metafieldKey) {
        id
        value
      }
      automaticDiscount {
        ... on DiscountAutomaticApp {
          title
          startsAt
          endsAt
        }
      }
    }
  }
`;

export function useSavedDiscount(id) {
  const { data, isLoading, isError } = useShopifyQuery({
    key: 'GetDiscount',
    query: QUERY,
    variables: { 
      id: idToGid('DiscountAutomaticApp', id),
      metafieldNamespace: metafields.namepace,
      metafieldKey: metafields.functionConfiguration,
    },
  });

  const discount = useMemo(() => {
    if (!data) {
      return;
    }

    const {
      title,
      startsAt,
      endsAt,
    } = data.data.automaticDiscountNode.automaticDiscount;
    const {configurationField} = data.data.automaticDiscountNode;

    return {
      title,
      startsAt,
      endsAt,
      configuration: JSON.parse(configurationField?.value ?? '{}'),
      configurationId: configurationField?.id,
    };
  }, [data]);

  return { discount, isLoading, isError };
}
