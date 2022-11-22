import { useAppQuery } from "./useAppQuery";

export function useDeliveryCustomizations() {
  const result = useAppQuery({
    url: "/api/delivery-customizations",
  });

  console.log(result)

  return result;
}
