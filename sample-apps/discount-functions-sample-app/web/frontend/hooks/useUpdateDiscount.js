import { useAppMutation } from "./";

export function useUpdateDiscount({ id }) {
  const mutation = useAppMutation({
    url: `/api/discount/${id}`,
    fetchOptions: {
      method: "PUT",
    },
    reactQueryOptions: {
      mutationKey: "updateDiscount",
    },
  });

  return mutation;
}
