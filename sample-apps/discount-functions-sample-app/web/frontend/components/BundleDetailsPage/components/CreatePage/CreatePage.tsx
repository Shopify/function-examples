import { Page, Card, PageActions, TextField } from '@shopify/polaris';

import { Details } from '..';
import { useRedirectToDiscounts } from '../../../../hooks/useRedirectToDiscounts';
import { serializeBundleDiscount } from '../../utilities/serializeBundleDiscount';
import { configurationsAreEqual } from '../../utilities/configurationsAreEqual';
import { useDiscount } from '../../../../hooks/useDiscount';
import { DEFAULT_CONFIGURATION } from '../../consts';
import { useCreateDiscount } from '../../../../hooks/useCreateDiscount';

export default function CreatePage() {
  const redirectToDiscounts = useRedirectToDiscounts();
  const { discount, title, configuration, setTitle, setConfiguration } =
    useDiscount({
      defaultConfiguration: DEFAULT_CONFIGURATION,
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
          <Details
            configuration={configuration}
            onConfigurationChange={setConfiguration}
          />
        </Card.Section>
      </Card>
      <PageActions
        primaryAction={{
          content: 'Save',
          onAction: async () => {
            await createDiscount(
              process.env.BUNDLE_DISCOUNT_ID,
              serializeBundleDiscount(discount),
            );
            redirectToDiscounts();
          },
          loading: isLoading,
        }}
      />
    </Page>
  );
}
