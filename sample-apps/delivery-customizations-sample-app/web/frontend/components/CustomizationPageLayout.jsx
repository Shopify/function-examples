import { Page, Loading, Frame, Layout } from "@shopify/polaris";

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

  return (
    <Frame>
      {loading && <Loading />}
      <Page
        title={title}
        primaryAction={primaryActionProps}
        breadcrumbs={[{ content: "Customizations", url: "/" }]}
        {...props}
      >
        <Layout>{children}</Layout>
      </Page>
    </Frame>
  );
}
