import { Layout, Page, Loading, Frame } from "@shopify/polaris";

export function CustomizationPageLayout({
  actionProps,
  loading,
  children,
  ...props
}) {
  const defaultActionProps = {
    content: "Save",
    disabled: true,
  };

  const primaryActionProps = {
    ...defaultActionProps,
    ...actionProps,
  };

  return (
    <Frame>
      {loading && <Loading />}

      <Page
        title="Hide Payment Method"
        subtitle="Hide a payment method from the checkout page based on the subtotal of the cart."
        primaryAction={primaryActionProps}
        breadcrumbs={[{ content: "Customizations", url: "/" }]}
        {...props}
      >
        <Layout>{children}</Layout>
      </Page>
    </Frame>
  );
}
