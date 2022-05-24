import { gql } from 'graphql-request';

import { useShopifyMutation } from './useShopifyMutation';

const CREATE_MUTATION = gql`
  mutation CreateBundleDiscount($discount: DiscountAutomaticAppInput!) {
    discountAutomaticAppCreate(automaticAppDiscount: $discount) {
      userErrors {
        code
        message
        field
      }
    }
  }
`;

export function useCreateDiscount() {
  const [triggerMutation, { isLoading }] = useShopifyMutation({
    query: CREATE_MUTATION,
  });

  const createDiscount = async (scriptUuid, discount) => {
    try {
      await triggerMutation({
        discount: {
          ...discount,
          scriptUuid,
        },
      });
    } catch (error) {
      console.error('Something went wrong while creating the discount', error);
    }
  };

  return [createDiscount, { isLoading }];
}
