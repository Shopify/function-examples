import { DiscountMethod } from '@shopify/discount-app-components';
import { gql } from 'graphql-request';
import { useShopifyMutation } from './useShopifyMutation';

const CREATE_AUTOMATIC_MUTATION = gql`
  mutation CreateAutomaticDiscount($discount: DiscountAutomaticAppInput!) {
    discountCreate: discountAutomaticAppCreate(automaticAppDiscount: $discount) {
      userErrors {
        code
        message
        field
      }
    }
  }
`

const CREATE_CODE_MUTATION = gql`
  mutation CreateCodeDiscount($discount: DiscountCodeAppInput!) {
    discountCreate: discountCodeAppCreate(codeAppDiscount: $discount) {
      userErrors {
        code
        message
        field
      }
    }
  }
`

export function useCreateDiscount(discountMethod) {
  const [triggerMutation, { isLoading }] = useShopifyMutation({
    query: discountMethod === DiscountMethod.Automatic ? CREATE_AUTOMATIC_MUTATION : CREATE_CODE_MUTATION,
  });

  const createDiscount = async (functionId, discount) => {
    return triggerMutation({
      discount: {
        ...discount,
        functionId,
      },
    })
      .then((response) => {
        if (response.data.discountCreate.userErrors.length) {
          return Promise.reject(
            response.data.discountCreate.userErrors,
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
