import { useAppMutation } from "./";

export function useDeleteDiscount() {
  const mutation = useAppMutation({
    url: "/api/discount/:id",
    fetchOptions: {
      method: "DELETE",
    },
    reactQueryOptions: {
      mutationKey: "deleteDiscount",
    },
  });

  return mutation;
}
