import { gql } from 'graphql-request';
import { idToGid } from '../utilities/gid';

import { useShopifyMutation } from './useShopifyMutation';

const UPDATE_MUTATION = gql`
  mutation UpdateDiscount($id: ID!, $discount: DiscountAutomaticAppInput!) {
    discountAutomaticAppUpdate(id: $id, automaticAppDiscount: $discount) {
      userErrors {
        code
        message
        field
      }
    }
  }
`;

export function useUpdateDiscount() {
  const [triggerMutation, { isLoading }] = useShopifyMutation({
    query: UPDATE_MUTATION,
  });

  const updateDiscount = (id, discount) => {
    return triggerMutation({
      id: idToGid('DiscountAutomaticApp', id),
      discount,
    })
      .then((response) => {
        if (response.data.discountAutomaticAppUpdate.userErrors.length) {
          return Promise.reject(
            response.data.discountAutomaticAppUpdate.userErrors,
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
