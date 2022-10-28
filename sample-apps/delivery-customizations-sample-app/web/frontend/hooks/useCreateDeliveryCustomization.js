import { useAppMutation } from "./";

export function useCreateDeliveryCustomization() {
  const mutation = useAppMutation({
    url: "/api/delivery-customization",
    reactQueryOptions: {
      mutationKey: "createCustomization",
    },
  });

  return mutation;
}
