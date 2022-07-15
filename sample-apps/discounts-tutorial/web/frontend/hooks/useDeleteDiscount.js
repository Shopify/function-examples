import { DiscountMethod } from '@shopify/discount-app-components';
import { gql } from 'graphql-request';

import { idToGid } from '../utilities/gid';

import { useShopifyMutation } from './useShopifyMutation';

const DELETE_AUTOMATIC_MUTATION = gql`
  mutation DeleteDiscount($id: ID!) {
    discountDelete: discountAutomaticDelete(id: $id) {
      userErrors {
        code
        message
        field
      }
    }
  }
`;

const DELETE_CODE_MUTATION = gql`
  mutation DeleteDiscount($id: ID!) {
    discountDelete: discountCodeDelete(id: $id) {
      userErrors {
        code
        message
        field
      }
    }
  }
`;

export function useDeleteDiscount(method) {
  const deleteAutoDiscount = useShopifyMutation({
    query: DELETE_AUTOMATIC_MUTATION,
  })

  const deleteCodeDiscount = useShopifyMutation({
    query: DELETE_CODE_MUTATION,
  })

  const [triggerMutation, { isError, isLoading }] = method === DiscountMethod.Automatic ? deleteAutoDiscount : deleteCodeDiscount

  const resource = method === DiscountMethod.Automatic ? 'DiscountAutomaticApp' : 'DiscountCodeApp';

  const deleteDiscount = async ({ id }) => {
    try {
      const response = await triggerMutation({
        id: idToGid(resource, id),
      });

      if (response.data.discountDelete.userErrors.length) {
        return Promise.reject(
          response.data.discountDelete.userErrors,
        );
      }
    } catch (error) {
      console.error('Something went wrong while deleting the discount', error);
      return Promise.reject(error);
    }
  };

  return [deleteDiscount, { isLoading, isError }];
}
