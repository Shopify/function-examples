import { useAppMutation } from "./useAppMutation";

export function useUpdateDelivertyCustomization({ id }) {
  const mutation = useAppMutation({
    url: `/api/delivery-customization/${id}`,
    fetchOptions: {
      method: "PUT",
    },
    reactQueryOptions: {
      mutationKey: "createCustomization",
    },
  });

  return mutation;
}
