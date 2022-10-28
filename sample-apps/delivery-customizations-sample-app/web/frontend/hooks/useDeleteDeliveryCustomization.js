import { useAppMutation } from "./useAppMutation";

export function useDeleteDeliveryCustomization() {
  const mutation = useAppMutation({
    url: "/api/delivery-customization/:id",
    fetchOptions: {
      method: "DELETE",
    },
    reactQueryOptions: {
      mutationKey: "deleteCustomization",
    },
  });

  return mutation;
}
