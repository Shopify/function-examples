import { Page, Card, ResourceList, ResourceItem } from "@shopify/polaris";

export default function HomePage() {
  return (
    <Page
      title="Create Customization"
      breadcrumbs={[{ content: "Customizations", url: "/" }]}
    >
      <Card>
        <ResourceList
          resourceName={{ singular: "customer", plural: "customers" }}
          items={[
            {
              title: "Hide Delivery Option",
              operation: "hide",
            },
            {
              title: "Rename Delivery Option",
              operation: "rename",
            },
            {
              title: "Reorder Delivery Option",
              operation: "reorder",
            },
          ]}
          renderItem={(deliveryCustomization) => {
            const { title, functionId, operation } = deliveryCustomization;

            return (
              <ResourceItem
                id={functionId}
                url={`/${operation}/new`}
                accessibilityLabel={`Create delivery customization ${title}`}
              >
                {title}
              </ResourceItem>
            );
          }}
        />
      </Card>
    </Page>
  );
}
