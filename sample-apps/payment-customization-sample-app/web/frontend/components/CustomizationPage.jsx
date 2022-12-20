import {
  Banner,
  Card,
  Form,
  FormLayout,
  Layout,
  Page,
  PageActions,
  TextField,
} from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";
import { useField, useForm } from "@shopify/react-form";

import { ErrorsBanner } from "./ErrorsBanner";

export default function CustomizationPage({
  title,
  subtitle,
  initialData,
  onSave,
}) {
  const app = useAppBridge();
  const redirect = Redirect.create(app);
  const {
    fields: { paymentMethod, cartSubtotal },
    submit,
    submitting,
    dirty,
    submitErrors,
  } = useForm({
    fields: {
      paymentMethod: useField({
        value: initialData.paymentMethod,
        validates: (value) => {
          if (!value || value.trim() === "") {
            return "Payment method is required";
          }
        },
      }),
      cartSubtotal: useField({
        value: initialData.cartSubtotal,
        validates: (value) => {
          if (!value || value.trim() === "") {
            return "Subtotal is required";
          }

          const number = Number(value);
          if (isNaN(number)) {
            return "Subtotal must be a number";
          }

          if (number <= 0) {
            return "Subtotal must be greater than 0";
          }
        },
      }),
    },
    onSubmit: onSave,
    makeCleanAfterSubmit: true,
  });

  const handleBackPress = () => {
    redirect.dispatch(Redirect.Action.ADMIN_PATH, {
      path: "/settings/payments/customizations",
    });
  };

  let errorMarkup;
  if (submitErrors.length > 0) {
    const title =
      submitErrors.length > 1
        ? "There were errors saving this customization"
        : "There was an error saving this customization";

    errorMarkup = (
      <Layout.Section>
        <ErrorsBanner title={title} status="critical" errors={submitErrors} />
      </Layout.Section>
    );
  }

  return (
    <Page
      title={title}
      subtitle={subtitle}
      breadcrumbs={[{ content: "Customizations", onAction: handleBackPress }]}
    >
      <Layout>
        {errorMarkup}
        <Layout.Section>
          <Card>
            <Card.Section>
              <Form onSubmit={submit}>
                <FormLayout>
                  <FormLayout.Group>
                    <TextField
                      type="text"
                      label="Payment method"
                      autoComplete="off"
                      value={paymentMethod.value}
                      onChange={paymentMethod.onChange}
                      disabled={submitting}
                      error={paymentMethod.error}
                      requiredIndicator
                    />
                    <TextField
                      type="number"
                      label="Subtotal"
                      autoComplete="off"
                      value={cartSubtotal.value}
                      onChange={cartSubtotal.onChange}
                      disabled={submitting}
                      error={cartSubtotal.error}
                      requiredIndicator
                    />
                  </FormLayout.Group>
                </FormLayout>
              </Form>
            </Card.Section>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <PageActions
            primaryAction={{
              content: "Save",
              onAction: submit,
              disabled: !dirty,
              loading: submitting,
            }}
          />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
