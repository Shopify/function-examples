import { useState } from 'react';
import {
  Banner,
  Card,
  Layout,
  Page,
  PageActions,
} from '@shopify/polaris';
import {
  ActiveDatesCard,
  CombinationCard,
  DiscountMethod,
  MethodCard,
  UsageLimitsCard,
} from '@shopify/discount-app-components'

import { useCreateDiscount } from '../hooks/useCreateDiscount';
import { useDiscount } from '../hooks/useDiscount';
import { useRedirectToDiscounts } from '../hooks/useRedirectToDiscounts';
import { serializeDiscount } from '../utilities/serializeDiscount';

export default function DiscountCreatePage({
  functionId,
  discountClass,
  defaultConfiguration,
  renderConfigurationForm,
}) {
  const redirectToDiscounts = useRedirectToDiscounts();
  const [isError, setIsError] = useState(false);
  const {
    discount,
    title,
    setTitle,
    code,
    setCode,
    method,
    setMethod,
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
    defaultConfiguration,
  });

  const [createDiscount, { isLoading }] = useCreateDiscount(method);

  const handleCreateDiscount = async () => {
    setIsError(false);
    try {
      await createDiscount(functionId, serializeDiscount(discount));
    } catch {
      setIsError(true);
      return;
    }

    redirectToDiscounts();
  };

  const errorMarkup = isError ? (
    <Layout.Section>
      <Banner
        status="critical"
        title="There was an error creating the discount."
      />
    </Layout.Section>
  ) : null;

  return (
    <Page
      title="Create discount"
      breadcrumbs={[{ onAction: redirectToDiscounts }]}
    >
      <Layout>
        {errorMarkup}
        <Layout.Section>
          <MethodCard
            title="Create discount"
            discountClass={discountClass}
            discountTitle={{
              value: title,
              onChange: setTitle,
            }}
            discountCode={{
              value: code,
              onChange: setCode
            }}
            discountMethod={{
              value: method,
              onChange: setMethod
            }}
          />
          <Card>
            <Card.Section>
              {renderConfigurationForm(configuration, setConfiguration)}
            </Card.Section>
          </Card>
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
            discountClass={discountClass}
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
        <Layout.Section>
          <PageActions
            primaryAction={{
              content: 'Save',
              onAction: handleCreateDiscount,
              loading: isLoading,
            }}
          />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
