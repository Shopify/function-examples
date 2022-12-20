import { useAuthenticatedFetch } from "./useAuthenticatedFetch";
import { useMemo } from "react";
import { useMutation } from "react-query";
import { useCallback } from "react";

/**
 * A hook for querying your custom app data.
 * @desc A thin wrapper around useAuthenticatedFetch and react-query's useQuery.
 *
 * @param {Object} options - The options for your query. Accepts 3 keys:
 *
 * 1. url: The URL to query. E.g: /api/widgets/1`
 * 2. fetchInit: The init options for fetch.  See: https://developer.mozilla.org/en-US/docs/Web/API/fetch#parameters
 * 3. reactQueryOptions: The options for `useQuery`. See: https://react-query.tanstack.com/reference/useQuery
 *
 * @returns Return value of useQuery.  See: https://react-query.tanstack.com/reference/useQuery.
 */
export const useAppMutation = ({
  url,
  fetchOptions = {},
  reactQueryOptions = {},
}) => {
  const authenticatedFetch = useAuthenticatedFetch();

  const fetch = useCallback(
    async ({ payload, params }) => {
      const fetchUrl = params
        ? url.replace(/:(\w+)/g, (_, key) => params[key])
        : url;

      const response = await authenticatedFetch(fetchUrl, {
        method: "POST",
        ...fetchOptions,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        ...(payload ? { body: JSON.stringify(payload) } : {}),
      });

      return response.json();
    },
    [url, JSON.stringify(fetchOptions)]
  );

  return useMutation(fetch, {
    ...reactQueryOptions,
    refetchOnWindowFocus: false,
  });
};
