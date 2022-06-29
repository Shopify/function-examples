import { DiscountMethod } from '@shopify/discount-app-components';
import { gql } from 'graphql-request';
import { idToGid } from '../utilities/gid';

import { useShopifyMutation } from './useShopifyMutation';

const UPDATE_AUTOMATIC_MUTATION = gql`
  mutation UpdateDiscount(
    $id: ID!
    $discount: DiscountAutomaticAppInput!
  ) {
    discountUpdate: discountAutomaticAppUpdate(id: $id, automaticAppDiscount: $discount) {
      userErrors {
        code
        message
        field
      }
    }
  }
`;

const UPDATE_CODE_MUTATION = gql`
  mutation UpdateDiscount(
    $id: ID!
    $discount: DiscountCodeAppInput!
  ) {
    discountUpdate: discountCodeAppUpdate(id: $id, codeAppDiscount: $discount) {
      userErrors {
        code
        message
        field
      }
    }
  }
`;

export function useUpdateDiscount(discountMethod) {
  const [triggerMutation, { isLoading }] = useShopifyMutation({
    query: discountMethod === DiscountMethod.Automatic ? UPDATE_AUTOMATIC_MUTATION : UPDATE_CODE_MUTATION,
  });

  const updateDiscount = (id, discount) => {
    const resource = discountMethod === DiscountMethod.Automatic ? 'DiscountAutomaticApp' : 'DiscountCodeApp';
    return triggerMutation({
      id: idToGid(resource, id),
      discount,
    })
      .then((response) => {
        if (response.data.discountUpdate.userErrors.length) {
          return Promise.reject(
            response.data.discountUpdate.userErrors,
          );
        }

        return response;
      })
      .catch((error) => {
        console.error('Failed to update discount', error);
        return Promise.reject(error);
      });
  };

  return [updateDiscount, { isLoading }];
}