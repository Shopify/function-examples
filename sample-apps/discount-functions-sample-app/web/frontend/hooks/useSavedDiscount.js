import { useMemo } from 'react';
import { gql } from 'graphql-request';

import { idToGid } from '../utilities/gid';
import { useShopifyQuery } from './useShopifyQuery';

const QUERY = gql`
  query GetDiscount($id: ID!) {
    automaticDiscountNode(id: $id) {
      automaticDiscount {
        ... on DiscountAutomaticApp {
          title
          configuration
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
    variables: { id: idToGid('DiscountAutomaticApp', id) },
  });

  const discount = useMemo(() => {
    if (!data) {
      return;
    }

    const {
      title,
      startsAt,
      endsAt,
      configuration: unparsedConfiguration,
    } = data.data.automaticDiscountNode.automaticDiscount;

    return {
      title,
      startsAt,
      endsAt,
      configuration: JSON.parse(unparsedConfiguration),
    };
  }, [data]);

  return { discount, isLoading, isError };
}
