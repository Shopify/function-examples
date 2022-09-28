import { Card, Page, Text, PageActions } from "@shopify/polaris";

export function CustomizationPageLayout({ actionProps, children, ...props }) {
  const defaultActionProps = {
    content: "Save",
    disabled: true,
  };

  const primaryActionProps = {
    ...defaultActionProps,
    ...actionProps,
  };

  return (
    <Page
      title="Hide Payment Method"
      subtitle="Hide a payment method from the checkout page based on the subtotal of the cart."
      primaryAction={primaryActionProps}
      breadcrumbs={[{ content: "Customizations", url: "/" }]}
      {...props}
    >
      <Card title="Customization">
        <Card.Section>{children}</Card.Section>
      </Card>

      <PageActions primaryAction={primaryActionProps} />
    </Page>
  );
}
