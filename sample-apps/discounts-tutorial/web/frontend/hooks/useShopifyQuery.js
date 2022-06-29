import { useQuery } from "react-query";
import { GraphQLClient } from "graphql-request";

import { useAuthenticatedFetch } from "./useAuthenticatedFetch.js";

/**
 * A hook for querying admin data.
 * @desc A thin wrapper around `useAuthenticatedFetch` and `react-query`.
 * It is configured to make queries using the Shopify Admin GraphQL API.
 * See: https://react-query.tanstack.com/reference/useQuery
 *
 * @returns {Array} An array containing the query data, loading state, and error state.
 */
export const useShopifyQuery = ({ key, query, variables }) => {
  const authenticatedFetch = useAuthenticatedFetch();
  const graphQLClient = new GraphQLClient("/api/graphql", {
    fetch: authenticatedFetch,
  });

  return useQuery(key, async () => graphQLClient.rawRequest(query, variables));
};
