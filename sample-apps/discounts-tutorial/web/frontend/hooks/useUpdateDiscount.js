import { DiscountMethod } from "@shopify/discount-app-components";
import { gql } from "graphql-request";

import { idToGid } from "../utilities/gid";

import { useShopifyMutation } from "./useShopifyMutation";

const UPDATE_AUTOMATIC_MUTATION = gql`
  mutation UpdateDiscount($id: ID!, $discount: DiscountAutomaticAppInput!) {
    discountUpdate: discountAutomaticAppUpdate(
      id: $id
      automaticAppDiscount: $discount
    ) {
      userErrors {
        code
        message
        field
      }
    }
  }
`;

const UPDATE_CODE_MUTATION = gql`
  mutation UpdateDiscount($id: ID!, $discount: DiscountCodeAppInput!) {
    discountUpdate: discountCodeAppUpdate(id: $id, codeAppDiscount: $discount) {
      userErrors {
        code
        message
        field
      }
    }
  }
`;

export function useUpdateDiscount(method) {
  const updateAutoDiscount = useShopifyMutation({
    query: UPDATE_AUTOMATIC_MUTATION,
  });

  const codeMutationProps = useShopifyMutation({
    query: UPDATE_CODE_MUTATION,
  });

  const [triggerMutation, { isError, isLoading }] =
    method === DiscountMethod.Automatic
      ? updateAutoDiscount
      : codeMutationProps;

  const resource =
    method === DiscountMethod.Automatic
      ? "DiscountAutomaticApp"
      : "DiscountCodeApp";

  const updateDiscount = async ({ id, discount }) => {
    try {
      const response = await triggerMutation({
        id: idToGid(resource, id),
        discount,
      });

      if (response.data.discountUpdate.userErrors.length)
        return Promise.reject(response.data.discountUpdate.userErrors);

      return response.data.discountUpdate;
    } catch (error) {
      console.error("Failed to update discount", error);
      return Promise.reject(error);
    }
  };

  return [updateDiscount, { isLoading, isError }];
}
