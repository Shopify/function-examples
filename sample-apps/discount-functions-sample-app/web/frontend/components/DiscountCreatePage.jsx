import { useState } from "react";
import {
  Banner,
  Card,
  Layout,
  Page,
  PageActions,
  TextField,
} from "@shopify/polaris";

import {
  useCreateDiscount,
  useFormDiscount,
  useRedirectToDiscounts,
} from "../hooks";
import { serializeDiscount } from "../utilities/serializeDiscount";

export default function DiscountCreatePage({
  type,
  defaultConfiguration,
  renderConfigurationForm,
}) {
  const redirectToDiscounts = useRedirectToDiscounts();
  const [isError, setIsError] = useState(false);
  const { discount, title, configuration, setTitle, setConfiguration } =
    useFormDiscount({
      defaultConfiguration,
    });

  const { mutateAsync: createDiscount, isLoading } = useCreateDiscount();

  const handleCreateDiscount = async () => {
    setIsError(false);

    try {
      await createDiscount({
        payload: { discount: serializeDiscount(discount), type },
      });
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
              content: "Save",
              onAction: handleCreateDiscount,
              loading: isLoading,
            }}
          />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
