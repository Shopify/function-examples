import { useAppMutation } from "./useAppMutation";

export function useCreatePaymentCustomization() {
  const mutation = useAppMutation({
    url: "/api/payment-customizations",
    reactQueryOptions: {
      mutationKey: "createCustomization",
    },
  });

  return mutation;
}
