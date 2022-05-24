import { Card, Page, PageActions, TextField } from '@shopify/polaris';

import { useCreateDiscount } from '../hooks/useCreateDiscount';
import { useDiscount } from '../hooks/useDiscount';
import { useRedirectToDiscounts } from '../hooks/useRedirectToDiscounts';

export default function DiscountCreatePage({
  defaultConfiguration,
  serializeDiscount,
  configurationsAreEqual,
  renderConfigurationForm,
}) {
  const redirectToDiscounts = useRedirectToDiscounts();
  const { discount, title, configuration, setTitle, setConfiguration } =
    useDiscount({
      defaultConfiguration,
      configurationsAreEqual,
    });

  const [createDiscount, { isLoading }] = useCreateDiscount();

  return (
    <Page
      title="Create discount"
      breadcrumbs={[{ onAction: redirectToDiscounts }]}
    >
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
      <PageActions
        primaryAction={{
          content: 'Save',
          onAction: async () => {
            await createDiscount(
              process.env.BUNDLE_DISCOUNT_ID,
              serializeDiscount(discount),
            );
            redirectToDiscounts();
          },
          loading: isLoading,
        }}
      />
    </Page>
  );
}
