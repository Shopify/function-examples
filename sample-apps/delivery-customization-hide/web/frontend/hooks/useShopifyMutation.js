import { useMutation } from "react-query";
import { GraphQLClient } from "graphql-request";

import { useAuthenticatedFetch } from "./useAuthenticatedFetch.js";

/**
 * A hook for mutating admin data.
 * @desc A thin wrapper around `useAuthenticatedFetch` and `react-query`.
 * It is configured to make mutations using the Shopify Admin GraphQL API.
 * See: https://react-query.tanstack.com/reference/useMutation
 *
 * @returns {Array} A tuple containing the mutation function and the mutation status.
 */
export const useShopifyMutation = ({ query }) => {
  const authenticatedFetch = useAuthenticatedFetch();
  const graphQLClient = new GraphQLClient("/api/graphql", {
    fetch: authenticatedFetch,
  });

  const { mutateAsync, ...mutationProps } = useMutation(async (variables) =>
    graphQLClient.rawRequest(query, variables)
  );

  return [mutateAsync, mutationProps];
};
