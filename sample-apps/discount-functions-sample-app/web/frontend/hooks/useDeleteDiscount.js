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

export function useDeleteDiscount(discountMethod) {
  const [triggerMutation, { isLoading }] = useShopifyMutation({
    query: discountMethod === DiscountMethod.Automatic ? DELETE_AUTOMATIC_MUTATION : DELETE_CODE_MUTATION,
  });

  const deleteDiscount = async (id) => {
    const resource = discountMethod === DiscountMethod.Automatic ? 'DiscountAutomaticApp' : 'DiscountCodeApp';
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

  return [deleteDiscount, { isLoading }];
}
