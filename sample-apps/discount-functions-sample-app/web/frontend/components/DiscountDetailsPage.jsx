import { useState, useCallback } from 'react';
import {
  Page,
  Card,
  TextField,
  PageActions,
  Spinner,
  Stack,
  Layout,
  Frame,
  Banner,
  Toast,
} from '@shopify/polaris';
import {
  ActiveDatesCard,
  CombinationCard,
  DiscountClass,
  DiscountMethod,
  MethodCard,
  DiscountStatus,
  RequirementType,
  SummaryCard,
  UsageLimitsCard,
  onBreadcrumbAction,
} from '@shopify/discount-app-components'

import { useDeleteDiscount } from '../hooks/useDeleteDiscount';
import { useDiscount } from '../hooks/useDiscount';
import { useRedirectToDiscounts } from '../hooks/useRedirectToDiscounts';
import { useSavedDiscount } from '../hooks/useSavedDiscount';
import { useUpdateDiscount } from '../hooks/useUpdateDiscount';
import { serializeDiscount } from '../utilities/serializeDiscount';

export default function DiscountDetailsPage({
  id,
  defaultConfiguration,
  renderConfigurationForm,
}) {
  const redirectToDiscounts = useRedirectToDiscounts();
  const [isMutationError, setIsMutationError] = useState(false);
  const { discount: savedDiscount, isLoading, isError } = useSavedDiscount(id);
  const {
    discount,
    isDirty,
    method,
    title,
    setTitle,
    code,
    setCode,
    configuration,
    setConfiguration,
  } = useDiscount({
    savedDiscount,
    defaultConfiguration,
  });

  const [updateDiscount, { isLoading: updateInProgress }] = useUpdateDiscount(method);
  const [deleteDiscount, { isLoading: deleteInProgress }] = useDeleteDiscount(method);
  const mutationInProgress = updateInProgress || deleteInProgress;

  const [successActive, setSuccessActive] = useState(false);
  const toggleSuccessActive = useCallback(() => setSuccessActive((successActive) => !successActive), []);

  const handleUpdateDiscount = async () => {
    setIsMutationError(false);
    try {
      await updateDiscount(id, serializeDiscount(discount));
      toggleSuccessActive();
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

  const successMarkup = successActive ? (
    <Toast content="Discount saved" onDismiss={toggleSuccessActive} />
  ) : null;

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
      <Frame>
        <Layout>
          {successMarkup}
          {errorMarkup}
          <Layout.Section>
            <MethodCard
              title="Update discount"
              discountClass={savedDiscount.discountClass}
              discountTitle={{
                value: title,
                onChange: setTitle,
              }}
              discountCode={{
                value: code,
                onChange: setCode
              }}
              discountMethod={{
                value: method
              }}
              discountMethodHidden={true}
            />
            <Card>
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
      </Frame>
    </Page>
  );
}
