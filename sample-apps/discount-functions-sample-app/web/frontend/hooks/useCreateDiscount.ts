import { gql } from 'graphql-request';
import { Discount } from '../types';

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

export function useCreateDiscount(): [
  (scriptUuid: string, discount: Discount<string>) => Promise<void>,
  { isLoading: boolean },
] {
  const [triggerMutation, { isLoading }] = useShopifyMutation({
    query: CREATE_MUTATION,
  }) as any;

  const createDiscount = async (
    scriptUuid: string,
    discount: Discount<string>,
  ): Promise<void> => {
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
