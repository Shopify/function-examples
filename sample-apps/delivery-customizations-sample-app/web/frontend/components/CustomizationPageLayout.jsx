import {
  Card,
  Page,
  Loading,
  Frame,
  Banner,
  List,
  Layout,
} from "@shopify/polaris";

export function CustomizationPageLayout({
  actionProps,
  loading,
  children,
  title,
  isEditing,
  userErrors,
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

  const bannerMarkup = userErrors ? (
    <Layout.Section>
      <Banner
        title="There are errors with creating the customization:"
        status="warning"
      >
        <List>
          {userErrors.map((error) => (
            <List.Item key={error.code}>{error.message}</List.Item>
          ))}
        </List>
      </Banner>
    </Layout.Section>
  ) : null;

  return (
    <Frame>
      {loading && <Loading />}
      <Page
        title={title}
        primaryAction={primaryActionProps}
        breadcrumbs={[{ content: "Customizations", url: url }]}
        userErrors={userErrors}
        {...props}
      >
        <Layout>
          {bannerMarkup}
          <Layout.Section>
            <Card title="Customization">
              <Card.Section>{children}</Card.Section>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </Frame>
  );
}
