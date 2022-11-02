import { useAppQuery } from "./";

export function useDiscount({ id }) {
  const result = useAppQuery({
    url: `/api/discount/${id}`,
  });

  return result;
}
