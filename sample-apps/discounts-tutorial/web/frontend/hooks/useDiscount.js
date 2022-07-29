import { useEffect, useState } from "react";
import { DiscountMethod } from "@shopify/discount-app-components";

import { useAuthenticatedFetch } from "./";

export function useDiscount(id) {
  const authenticatedFetch = useAuthenticatedFetch();
  const [discount, setDiscount] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    setIsLoading(true);
    setError(null);

    authenticatedFetch(`/api/discounts/${id}`)
      .then((response) => response.json())
      .then(({ errors, data }) => {
        if (isCancelled) return;

        const remoteErrors = errors || data?.discountNode?.userErrors;

        if (remoteErrors?.length > 0) {
          setError(errors);
          return;
        }

        const { discountNode } = data;

        if (!discountNode) {
          setError([{ message: "Discount not found" }]);
          return;
        }

        const {
          configurationField,
          discount: {
            __typename,
            appliesOncePerCustomer,
            codes,
            combinesWith,
            endsAt,
            startsAt,
            title,
            usageLimit,
          },
        } = discountNode;

        const method =
          __typename === "DiscountAutomaticApp"
            ? DiscountMethod.Automatic
            : DiscountMethod.Code;

        setDiscount({
          appliesOncePerCustomer,
          code: codes?.nodes[0]?.code,
          combinesWith,
          configuration: JSON.parse(configurationField?.value ?? "{}"),
          configurationId: configurationField?.id,
          endsAt,
          id,
          method,
          startsAt,
          title,
          usageLimit,
        });

        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [id]);

  return {
    discount,
    isLoading,
    error,
  };
}
