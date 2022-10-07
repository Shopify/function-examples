import { useAppMutation } from "./useAppMutation";

export function useUpdatePaymentCustomization({ id }) {
  const mutation = useAppMutation({
    url: `/api/payment-customizations/${id}`,
    fetchOptions: {
      method: "PUT",
    },
    reactQueryOptions: {
      mutationKey: "createCustomization",
    },
  });

  return mutation;
}
