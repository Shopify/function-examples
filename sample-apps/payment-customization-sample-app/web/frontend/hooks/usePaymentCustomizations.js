import { useAppQuery } from "./useAppQuery";

export function usePaymentCustomizations() {
  const result = useAppQuery({
    url: "/api/payment-customizations",
  });

  return result;
}
