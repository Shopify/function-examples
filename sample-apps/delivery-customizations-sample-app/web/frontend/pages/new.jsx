import { Page, Card, ResourceList, ResourceItem } from "@shopify/polaris";

export default function NewCustomizationPage() {
  return (
    <Page
      title="Create Customization"
      breadcrumbs={[{ content: "Customizations", url: "/" }]}
    >
      <Card>
        <ResourceList
          resourceName={{
            singular: "customization template",
            plural: "customization templates",
          }}
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
          renderItem={({ title, functionId, operation }) => {
            return (
              <ResourceItem
                id={functionId}
                url={`/${operation}/new`}
                accessibilityLabel={`Create ${operation} delivery customization template`}
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
