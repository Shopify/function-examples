import { useAppQuery } from "./useAppQuery";

export function usePaymentCustomization({ id }) {
  const result = useAppQuery({
    url: `/api/payment-customizations/${id}`,
  });

  return result;
}
