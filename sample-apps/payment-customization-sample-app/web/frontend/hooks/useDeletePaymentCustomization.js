import { useAppMutation } from "./useAppMutation";

export function useDeletePaymentCustomization() {
  const mutation = useAppMutation({
    url: "/api/payment-customizations/:id",
    fetchOptions: {
      method: "DELETE",
    },
    reactQueryOptions: {
      mutationKey: "deleteCustomization",
    },
  });

  return mutation;
}
