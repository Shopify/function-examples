import { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { CurrencyCode } from '@shopify/react-i18n'
import { useAppBridge } from '@shopify/app-bridge-react'

import {
  ActiveDatesCard,
  CombinationCard,
  DiscountMethod,
  MethodCard,
  DiscountStatus,
  RequirementType,
  SummaryCard,
  UsageLimitsCard,
} from '@shopify/discount-app-components'

import {
  Page,
  Card,
  PageActions,
  Spinner,
  Stack,
  Layout,
  Frame,
  Banner,
  TextField,
  Toast,
} from '@shopify/polaris';

import { useDiscount } from '../../hooks/useDiscount';
import { useSavedDiscount } from '../../hooks/useSavedDiscount';
import { useUpdateDiscount } from '../../hooks/useUpdateDiscount';
import { useDeleteDiscount } from '../../hooks/useDeleteDiscount';
import { useRedirectToDiscounts } from '../../hooks/useRedirectToDiscounts';
import { serializeDiscount } from '../../utilities/serializeDiscount';

const DEFAULT_CONFIGURATION = {
  value: 0,
  excludedVariantIds: [],
};

export default function VolumeDetails() {
  const { id } = useParams();
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
    usageLimit,
    setUsageLimit,
    appliesOncePerCustomer,
    setAppliesOncePerCustomer,
    combinesWith,
    setCombinesWith,
    startsAt,
    setStartsAt,
    endsAt,
    setEndsAt,
    configuration,
    setConfiguration,
  } = useDiscount({
    savedDiscount,
    DEFAULT_CONFIGURATION,
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

  const handleQuantityChange = (value) => {
    setConfiguration({
      ...configuration,
      quantity: parseFloat(value),
    });
  };
  
  const handlePercentageChange = (value) => {
    setConfiguration({
      ...configuration,
      percentage: parseFloat(value),
    });
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
    <Page title="Volume discount details" breadcrumbs={[{ onAction: redirectToDiscounts }]}>
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
            {configuration && (
              <Card title="Volume">
                <Card.Section>
                  <Stack>
                  <TextField
                    label="Minimum quantity"
                    value={configuration.quantity}
                    onChange={handleQuantityChange}
                    type="number"
                    min={0}
                  />
                  <TextField
                    label="Discount percentage"
                    value={configuration.percentage}
                    onChange={handlePercentageChange}
                    type="number"
                    min={0}
                    max={100}
                    suffix="%"
                  />
                  </Stack>
                </Card.Section>
              </Card>
            )}
            {method === DiscountMethod.Code && (
              <UsageLimitsCard
                totalUsageLimit={{
                  value: usageLimit,
                  onChange: (value) => setUsageLimit(parseInt(value)),
                }}
                oncePerCustomer={{
                  value: appliesOncePerCustomer,
                  onChange: setAppliesOncePerCustomer,
                }}
              />
            )}
            <CombinationCard
              combinableDiscountTypes={{
                value: combinesWith,
                onChange: setCombinesWith,
              }}
              discountClass={savedDiscount.discountClass}
              discountDescriptor={
                method === DiscountMethod.Automatic
                  ? title
                  : code
              }
            />
            <ActiveDatesCard
              startDate={{
                value: startsAt,
                onChange: setStartsAt,
              }}
              endDate={{
                value: endsAt,
                onChange: setEndsAt,
              }}
              timezoneAbbreviation="EST"
            />
          </Layout.Section>
          {method && (
            <Layout.Section secondary>
              <SummaryCard
                header={{
                  discountMethod: method,
                  discountDescriptor:
                    method === DiscountMethod.Automatic
                      ? title
                      : code,
                  appDiscountType: 'Volume',
                  isEditing: false,
                }}
                performance={{
                  status: DiscountStatus.Scheduled,
                  usageCount: 0,
                }}
                minimumRequirements={{
                  requirementType: RequirementType.None,
                  subtotal: '0',
                  quantity: '0',
                  currencyCode: CurrencyCode.Cad
                }}
                usageLimits={{
                  oncePerCustomer: appliesOncePerCustomer,
                  totalUsageLimit: usageLimit ?? 0
                }}
                activeDates={{
                  startDate: startsAt,
                  endDate: endsAt
                }}
              />
            </Layout.Section>
          )}
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
  )
}