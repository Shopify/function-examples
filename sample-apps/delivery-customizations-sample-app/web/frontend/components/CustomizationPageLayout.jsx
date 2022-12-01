import { Card, Page, Loading, Frame } from "@shopify/polaris";

export function CustomizationPageLayout({
  actionProps,
  loading,
  children,
  title,
  isEditing,
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

  const url = isEditing ? "/" : "/new";

  return (
    <Frame>
      {loading && <Loading />}

      <Page
        title={title}
        primaryAction={primaryActionProps}
        breadcrumbs={[{ content: "Customizations", url: url }]}
        {...props}
      >
        <Card title="Customization">
          <Card.Section>{children}</Card.Section>
        </Card>
      </Page>
    </Frame>
  );
}
