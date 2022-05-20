import { gql } from 'graphql-request';
import { idToGid } from '../utilities/gid';
import { useShopifyMutation } from './useShopifyMutation';

const DELETE_MUTATION = gql`
  mutation DeleteDiscount($id: ID!) {
    discountAutomaticDelete(id: $id) {
      userErrors {
        code
        message
        field
      }
    }
  }
`;

export function useDeleteDiscount(): [
  (id: string) => Promise<void>,
  { isLoading: boolean },
] {
  const [triggerMutation, { isLoading }] = useShopifyMutation({
    query: DELETE_MUTATION,
  }) as any;

  const deleteDiscount = async (id: string): Promise<void> => {
    try {
      await triggerMutation({
        id: idToGid('DiscountAutomaticApp', id),
      });
    } catch (error) {
      console.error('Something went wrong while deleting the discount', error);
    }
  };

  return [deleteDiscount, { isLoading }];
}
