import { useMemo } from 'react';
import { gql } from 'graphql-request';

import { Discount } from '../types';
import { idToGid } from '../utilities/gid';
import { useShopifyQuery } from './useShopifyQuery';

const QUERY = gql`
  query GetBundleDiscount($id: ID!) {
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

export function useSavedDiscount<Configuration>(id: string) {
  const { data, isLoading, isError } = useShopifyQuery({
    key: 'GetBundleDiscount',
    query: QUERY,
    variables: { id: idToGid('DiscountAutomaticApp', id) },
  });

  const discount: Discount<Configuration> | undefined = useMemo(() => {
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
