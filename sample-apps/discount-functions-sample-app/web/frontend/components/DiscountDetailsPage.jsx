import { useState } from 'react';
import {
  Page,
  Card,
  TextField,
  PageActions,
  Spinner,
  Stack,
  Layout,
  Banner,
} from '@shopify/polaris';

import { useDeleteDiscount } from '../hooks/useDeleteDiscount';
import { useDiscount } from '../hooks/useDiscount';
import { useRedirectToDiscounts } from '../hooks/useRedirectToDiscounts';
import { useSavedDiscount } from '../hooks/useSavedDiscount';
import { useUpdateDiscount } from '../hooks/useUpdateDiscount';

export default function DiscountDetailsPage({
  id,
  defaultConfiguration,
  renderConfigurationForm,
  serializeDiscount,
}) {
  const redirectToDiscounts = useRedirectToDiscounts();
  const [isMutationError, setIsMutationError] = useState(false);
  const { discount: savedDiscount, isLoading, isError } = useSavedDiscount(id);
  const {
    discount,
    isDirty,
    title,
    setTitle,
    configuration,
    setConfiguration,
  } = useDiscount({
    savedDiscount,
    defaultConfiguration,
  });

  const [updateDiscount, { isLoading: updateInProgress }] = useUpdateDiscount();
  const [deleteDiscount, { isLoading: deleteInProgress }] = useDeleteDiscount();
  const mutationInProgress = updateInProgress || deleteInProgress;

  const handleUpdateDiscount = async () => {
    setIsMutationError(false);
    try {
      await updateDiscount(id, serializeDiscount(discount));
    } catch {
      setIsMutationError(true);
      return;
    }
  };

  if (isLoading) {
    return (
      <Stack distribution="center">
        <Spinner size="large" />
      </Stack>
    );
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  const errorMarkup = isMutationError ? (
    <Layout.Section>
      <Banner
        status="critical"
        title="There was an error updating the discount."
      />
    </Layout.Section>
  ) : null;

  return (
    <Page title="Details" breadcrumbs={[{ onAction: redirectToDiscounts }]}>
      <Layout>
        {errorMarkup}
        <Layout.Section>
          <Card>
            <Card.Section>
              <TextField
                value={title}
                onChange={setTitle}
                label="Discount title"
                autoComplete="on"
              />
            </Card.Section>
            <Card.Section>
              {renderConfigurationForm(configuration, setConfiguration)}
            </Card.Section>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <PageActions
            primaryAction={{
              content: 'Save',
              onAction: handleUpdateDiscount,
              loading: mutationInProgress,
              disabled: !isDirty,
            }}
            secondaryActions={[
              {
                content: 'Delete',
                destructive: true,
                loading: mutationInProgress,
                onAction: async () => {
                  await deleteDiscount(id);
                  redirectToDiscounts();
                },
              },
            ]}
          />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
