import { gql } from 'graphql-request';

import { useShopifyMutation } from './useShopifyMutation';

const CREATE_MUTATION = gql`
  mutation CreateDiscount($discount: DiscountAutomaticAppInput!) {
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
    return triggerMutation({
      discount: {
        ...discount,
        scriptUuid,
      },
    })
      .then((response) => {
        if (response.data.discountAutomaticAppCreate.userErrors.length) {
          return Promise.reject(
            response.data.discountAutomaticAppCreate.userErrors,
          );
        }

        return response;
      })
      .catch((error) => {
        console.error('Failed to create discount', error);
        return Promise.reject(error);
      });
  };

  return [createDiscount, { isLoading }];
}
