import { Page, Card, PageActions, TextField } from '@shopify/polaris';
import { gql } from 'graphql-request';

import { Details } from '..';
import { useRedirectToDiscounts } from '../../../../hooks/useRedirectToDiscounts';
import { useShopifyMutation } from '../../../../hooks/useShopifyMutation';
import useBundleDiscount from '../../hooks/useBundleDiscount';
import serializeBundleDiscount from '../../utilities/serializeBundleDiscount';
import { Configuration } from '../../types';

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

export default function CreatePage() {
  const redirectToDiscounts = useRedirectToDiscounts();
  const { discount, setDiscount } = useBundleDiscount();

  const [createBundleDiscount, { isLoading }] = useShopifyMutation({
    query: CREATE_MUTATION,
  }) as any;

  const handleSaveClick = async () => {
    try {
      createBundleDiscount({
        discount: {
          ...serializeBundleDiscount(discount),
          scriptUuid: process.env.BUNDLE_DISCOUNT_ID,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleTitleChange = (title: string) => {
    setDiscount({
      ...discount,
      title,
    });
  };

  const handleConfigurationChange = (configuration: Configuration) => {
    setDiscount({
      ...discount,
      configuration,
    });
  };

  return (
    <Page
      title="Create discount"
      breadcrumbs={[{ onAction: redirectToDiscounts }]}
    >
      <Card>
        <Card.Section>
          <TextField
            value={discount.title}
            onChange={handleTitleChange}
            label="Discount title"
            autoComplete="on"
          />
        </Card.Section>
        <Card.Section>
          <Details
            configuration={discount.configuration}
            onConfigurationChange={handleConfigurationChange}
          />
        </Card.Section>
      </Card>
      <PageActions
        primaryAction={{
          content: 'Save',
          onAction: handleSaveClick,
          loading: isLoading,
        }}
      />
    </Page>
  );
}
