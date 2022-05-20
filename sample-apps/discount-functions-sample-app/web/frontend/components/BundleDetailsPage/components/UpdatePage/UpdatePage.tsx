import { useMemo } from 'react';
import { gql } from 'graphql-request';
import { Page, Card, TextField, PageActions, Spinner } from '@shopify/polaris';

import { useShopifyQuery } from '../../../../hooks/useShopifyQuery';
import { idToGid } from '../../../../utilities/gid';
import { BundleDiscount, Configuration } from '../../types';
import Details from '../Details';
import { useRedirectToDiscounts } from '../../../../hooks/useRedirectToDiscounts';
import styles from './UpdatePage.module.css';
import useBundleDiscount from '../../hooks/useBundleDiscount';
import { useShopifyMutation } from '../../../../hooks/useShopifyMutation';
import serializeBundleDiscount from '../../utilities/serializeBundleDiscount';

interface Props {
  id: string;
}

const GET_BUNDLE_DISCOUNT = gql`
  query GetBundleDiscount($id: ID!) {
    automaticDiscountNode(id: $id) {
      automaticDiscount {
        ... on DiscountAutomaticApp {
          title
          configuration
        }
      }
    }
  }
`;

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

export default function UpdatePage({ id }: Props) {
  const redirectToDiscounts = useRedirectToDiscounts();
  const { data, isLoading, error } = useShopifyQuery({
    key: 'GetBundleDiscount',
    query: GET_BUNDLE_DISCOUNT,
    variables: { id: idToGid('DiscountAutomaticApp', id) },
  });
  const [updateBundleDiscount, { isLoading: updateInProgress }] =
    useShopifyMutation({
      query: UPDATE_MUTATION,
    }) as any;

  const savedDiscount: BundleDiscount | undefined = useMemo(() => {
    if (!data) {
      return;
    }

    const { configuration: jsonConfiguration } =
      data.data.automaticDiscountNode.automaticDiscount;

    const configuration = JSON.parse(jsonConfiguration);

    return {
      title: data.data.automaticDiscountNode.automaticDiscount.title,
      configuration: {
        message: configuration.title,
        discountPercentage: Number(configuration.discountPercentage),
        minimumQuantity: Number(configuration.minimumQuantity),
        variantId: configuration.variantId,
      },
    };
  }, [data]);

  const { discount, setDiscount, isDirty } = useBundleDiscount(savedDiscount);

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

  const handleSaveClick = async () => {
    try {
      updateBundleDiscount({
        id: idToGid('DiscountAutomaticNode', id),
        discount: serializeBundleDiscount(discount),
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner size="large" />
      </div>
    );
  }

  if (error) {
    return <div>Something went wrong!</div>;
  }

  return (
    <Page title="Details" breadcrumbs={[{ onAction: redirectToDiscounts }]}>
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
          loading: updateInProgress,
          disabled: !isDirty,
        }}
      />
    </Page>
  );
}
