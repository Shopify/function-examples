import { useState, useCallback, useEffect } from 'react';
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
import { useUpdateDiscount } from '../../hooks/useUpdateDiscount';
import { useDeleteDiscount } from '../../hooks/useDeleteDiscount';
import { useRedirectToDiscounts } from '../../hooks/useRedirectToDiscounts';
import { serializeDiscount } from '../../utilities/serializeDiscount';


export default function VolumeDetails() {
  const { id } = useParams();
  const redirectToDiscounts = useRedirectToDiscounts();
  const { discount, setDiscount, isLoading, isError } = useDiscount(id);
  const [updateDiscount, { isLoading: updateInProgress }] = useUpdateDiscount(method);
  const [deleteDiscount, { isLoading: deleteInProgress }] = useDeleteDiscount(method);
  const [isMutationError, setIsMutationError] = useState(false);
  const [successActive, setSuccessActive] = useState(false);

  const toggleSuccessActive = () => setSuccessActive((successActive) => !successActive)

  const handleUpdateDiscount = async () => {
    setIsMutationError(false);

    try {
      await updateDiscount(id, serializeDiscount(discount));

      toggleSuccessActive();
    } catch {
      setIsMutationError(true);
    }
  };

  const handleDeleteDiscount = async () => {
    setIsMutationError(false);

    try {
      await deleteDiscount(id);

      redirectToDiscounts();
    } catch {
      setIsMutationError(true);
    }
  }

  const handleDiscountChange = (prop, value) => {
    setDiscount(cur => ({
      ...cur,
      [prop]: value,
    }));
  }

  const handleConfigurationChange = (prop, value) => {
    setDiscount(cur => ({
      ...cur,
      configuration: {
        ...cur.configuration,
        [prop]: parseFloat(value),
      }
    }));
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

  const isMutationInProgress = updateInProgress || deleteInProgress;

  const {
    title,
    code,
    method,
    configuration,
    usageLimit,
    appliesOncePerCustomer,
    combinesWith,
    startsAt,
    endsAt
  } = discount;

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
                onChange: (value) => handleDiscountChange('title', value),
              }}
              discountCode={{
                value: code,
                onChange: (value) => handleDiscountChange('code', value)
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
                    onChange={(value) => handleConfigurationChange('quantity', value)}
                    type="number"
                    min={0}
                  />
                  <TextField
                    label="Discount percentage"
                    value={configuration.percentage}
                    onChange={(value) => handleConfigurationChange('percentage', value)}
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
                  onChange: (value) => handleDiscountChange('usageLimit', parseInt(value)),
                }}
                oncePerCustomer={{
                  value: appliesOncePerCustomer,
                  onChange: (value) => handleDiscountChange('appliesOncePerCustomer', value),
                }}
              />
            )}

            <CombinationCard
              combinableDiscountTypes={{
                value: combinesWith,
                onChange: (value) => handleDiscountChange('combinesWith', value),
              }}
              discountClass={discount.discountClass}
              discountDescriptor={
                method === DiscountMethod.Automatic
                  ? title
                  : code
              }
            />
            <ActiveDatesCard
              startDate={{
                value: startsAt,
                onChange: (value) => handleDiscountChange('startsAt', value),
              }}
              endDate={{
                value: endsAt,
                onChange: (value) => handleDiscountChange('endsAt', value),
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
                loading: isMutationInProgress,
                disabled: !isDirty,
              }}
              secondaryActions={[
                {
                  content: 'Delete',
                  destructive: true,
                  loading: isMutationInProgress,
                  onAction: handleDeleteDiscount,
                },
              ]}
            />
          </Layout.Section>
        </Layout>
      </Frame>
    </Page>
  )
}
