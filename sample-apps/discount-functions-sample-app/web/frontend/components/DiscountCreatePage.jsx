import { useState } from 'react';
import {
  Banner,
  Card,
  Layout,
  Page,
  PageActions,
  TextField,
} from '@shopify/polaris';

import { useCreateDiscount } from '../hooks/useCreateDiscount';
import { useDiscount } from '../hooks/useDiscount';
import { useRedirectToDiscounts } from '../hooks/useRedirectToDiscounts';
import { serializeDiscount } from '../utilities/serializeDiscount';

export default function DiscountCreatePage({
  scriptUuid,
  defaultConfiguration,
  renderConfigurationForm,
  discountClass,
}) {
  const redirectToDiscounts = useRedirectToDiscounts();
  const [isError, setIsError] = useState(false);
  const { discount, title, configuration, setTitle, setConfiguration } =
    useDiscount({
      defaultConfiguration,
      discountClass,
    });

  const [createDiscount, { isLoading }] = useCreateDiscount();

  const handleCreateDiscount = async () => {
    setIsError(false);
    try {
      await createDiscount(scriptUuid, serializeDiscount(discount));
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
              onAction: handleCreateDiscount,
              loading: isLoading,
            }}
          />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
