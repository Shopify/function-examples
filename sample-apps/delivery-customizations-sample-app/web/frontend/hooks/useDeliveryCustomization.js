import { useAppQuery } from "./useAppQuery";

export function useDeliveryCustomization({ id }) {
  const result = useAppQuery({
    url: `/api/delivery-customization/${id}`,
  });

  return result;
}
