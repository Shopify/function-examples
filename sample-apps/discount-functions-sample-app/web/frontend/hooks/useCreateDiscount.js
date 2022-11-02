import { useAppMutation } from "./";

export function useCreateDiscount() {
  const mutation = useAppMutation({
    url: "/api/discount",
    reactQueryOptions: {
      mutationKey: "createDiscount",
    },
  });

  return mutation;
}
