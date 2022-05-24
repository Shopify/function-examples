import { useMutation, MutationObserverResult } from 'react-query';
import { GraphQLClient } from 'graphql-request';

import { useAuthenticatedFetch } from './useAuthenticatedFetch.js';

export const useShopifyMutation = ({ query }) => {
  const authenticatedFetch = useAuthenticatedFetch();
  const graphQLClient = new GraphQLClient('/api/graphql', {
    fetch: authenticatedFetch,
  });

  const { mutateAsync, ...mutationProps } = useMutation(async (variables) =>
    graphQLClient.rawRequest(query, variables),
  );

  return [mutateAsync as Function, mutationProps as any];
};
