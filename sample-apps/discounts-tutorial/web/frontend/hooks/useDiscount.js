import { useState } from "react";
import { gql } from "graphql-request";
import { DiscountMethod } from "@shopify/discount-app-components";

import { idToGid } from "../utilities/gid";

import { useShopifyQuery } from "./useShopifyQuery";

const GET_DISCOUNT_QUERY = gql`
  query GetDiscount($id: ID!) {
    discountNode(id: $id) {
      id
      configurationField: metafield(
        namespace: "discount-type-tutorial"
        key: "volume-config"
      ) {
        id
        value
      }
      discount {
        __typename
        ... on DiscountAutomaticApp {
          title
          discountClass
          combinesWith {
            orderDiscounts
            productDiscounts
            shippingDiscounts
          }
          startsAt
          endsAt
        }
        ... on DiscountCodeApp {
          title
          discountClass
          combinesWith {
            orderDiscounts
            productDiscounts
            shippingDiscounts
          }
          startsAt
          endsAt
          usageLimit
          appliesOncePerCustomer
          codes(first: 1) {
            nodes {
              code
            }
          }
        }
      }
    }
  }
`;

export function useDiscount(id) {
  const { data: result, ...queryProps } = useShopifyQuery({
    key: "GetDiscount",
    query: GET_DISCOUNT_QUERY,
    variables: { id: idToGid("DiscountNode", id) },
  });

  let discount = {
    title: "",
    code: "",
    method: "",
    startsAt: new Date(),
    endsAt: null,
    usageLimit: null,
    appliesOncePerCustomer: false,
    combinesWith: {},
    configuration: {
      quantity: 1,
      percentage: 0,
    },
    configurationId: null,
  };

  const queriedDiscount = result?.data?.discountNode;

  console.log({ queriedDiscount });

  if (queriedDiscount) {
    const {
      configurationField,
      discount: {
        __typename,
        appliesOncePerCustomer,
        codes,
        combinesWith,
        discountClass,
        endsAt,
        startsAt,
        title,
        usageLimit,
      },
    } = queriedDiscount;

    const method =
      __typename === "DiscountAutomaticApp"
        ? DiscountMethod.Automatic
        : DiscountMethod.Code;

    discount = {
      appliesOncePerCustomer,
      code: codes?.nodes[0]?.code,
      combinesWith,
      configuration: JSON.parse(configurationField?.value ?? "{}"),
      configurationId: configurationField?.id,
      discountClass,
      endsAt,
      id,
      method,
      startsAt,
      title,
      usageLimit,
    };
  }

  return { discount, ...queryProps };
}
