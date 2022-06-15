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
import { useRedirectToDiscounts } from '../hooks/useRedirectToDiscounts';
import { serializeDiscount } from '../utilities/serializeDiscount';
import ShippingDiscount from './function-configuration/ShippingDiscount';
import OrderDiscount from './function-configuration/OrderDiscount';

export default function ShippingDiscountCreatePage({
  functionId,
}) {
  const redirectToDiscounts = useRedirectToDiscounts();
	const [isError, setIsError] = useState(false);

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
      title="Create order discount"
      breadcrumbs={[{ onAction: redirectToDiscounts }]}
    >
      <Layout>
        {errorMarkup}
				<OrderDiscount />
        <Layout.Section>
          <PageActions
            primaryAction={{
              content: 'Save',
              onAction: () => true,
            }}
          />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
