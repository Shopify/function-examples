import { useAppMutation } from "./useAppMutation";

export function useUpdateDeliveryCustomization({ id }) {
  const mutation = useAppMutation({
    url: `/api/delivery-customization/${id}`,
    fetchOptions: {
      method: "PUT",
    },
    reactQueryOptions: {
      mutationKey: "updateCustomization",
    },
  });

  return mutation;
}
