import { gql } from 'graphql-request';
import { idToGid } from '../utilities/gid';

import { useShopifyMutation } from './useShopifyMutation';

const UPDATE_MUTATION = gql`
  mutation UpdateBundleDiscount(
    $id: ID!
    $discount: DiscountAutomaticAppInput!
  ) {
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

  const updateDiscount = async (id, discount) => {
    try {
      await triggerMutation({
        id: idToGid('DiscountAutomaticApp', id),
        discount,
      });
    } catch (error) {
      console.error('Something went wrong while updating the discount', error);
    }
  };

  return [updateDiscount, { isLoading }];
}
