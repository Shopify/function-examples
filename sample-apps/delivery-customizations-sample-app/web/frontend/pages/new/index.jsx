import {
  Page,
  Card,
  EmptyState,
  ResourceList,
  ResourceItem,
} from "@shopify/polaris";

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
              title: "Hide Shipping Method",
              functionId: "01GHM0JQQ8MWEJRXE081TK0FH0",
            },
            {
              title: "Rename Shipping Method",
              functionId: "01GHM0JSS7VNHFA65VZFTYVXAF",
            },
            {
              title: "Move Shipping Method",
              functionId: "01GHM0JVRQN906C45B7XJH75QQ",
            },
          ]}
          renderItem={(deliveryCustomization) => {
            const { title, functionId } = deliveryCustomization;

            return (
              <ResourceItem
                id={functionId}
                url={`/new/${functionId}`}
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
