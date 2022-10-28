import { Card, Page, Loading, Frame } from "@shopify/polaris";

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
        title="Hide Shipping Method Above Threshold"
        primaryAction={primaryActionProps}
        breadcrumbs={[{ content: "Customizations", url: "/" }]}
        {...props}
      >
        <Card title="Customization">
          <Card.Section>{children}</Card.Section>
        </Card>
      </Page>
    </Frame>
  );
}
