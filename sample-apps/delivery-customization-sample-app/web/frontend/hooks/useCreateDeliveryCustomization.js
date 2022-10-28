import { useAppMutation } from "./useAppMutation";

export function useCreateDeliveryCustomization() {
  const mutation = useAppMutation({
    url: "/api/delivery-customization",
    reactQueryOptions: {
      mutationKey: "createCustomization",
    },
  });

  return mutation;
}
