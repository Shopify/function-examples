import {
  Page,
  ResourceList,
  TextStyle,
  ResourceItem,
  EmptyState,
} from "@shopify/polaris";
import { PlusMinor } from "@shopify/polaris-icons";

import { useAppQuery } from "../hooks";

export default function HomePage() {
  const {
    data = [],
    isLoading,
    error,
  } = useAppQuery({
    url: "/api/payment-customizations",
  });

  console.log({ data, isLoading, error });

  return (
    <Page
      title="Customizations"
      primaryAction={{
        content: "Create customization",
        icon: PlusMinor,
        url: "/new",
      }}
    >
      <ResourceList
        resourceName={{
          singular: "customization",
          plural: "customizations",
        }}
        items={data}
        renderItem={renderItem}
        loading={isLoading}
        emptyState={
          <EmptyState
            heading="Hello world! 🎉"
            action={{ content: "Create customization", url: "/new" }}
          >
            <p>
              Welcome to the <b>Payment Customizations Functions Sample App</b>!
              To get started, create a new customization.
            </p>
          </EmptyState>
        }
        // selectedItems={selectedItems}
        // onSelectionChange={setSelectedItems}
        // promotedBulkActions={promotedBulkActions}
        // bulkActions={bulkActions}
      />
    </Page>
  );
}

function renderItem(item) {
  const { id, url, name, location } = item;

  return (
    <ResourceItem
      id={id}
      url={url}
      accessibilityLabel={`View details for ${name}`}
    >
      <h3>
        <TextStyle variation="strong">{name}</TextStyle>
      </h3>
      <div>{location}</div>
    </ResourceItem>
  );
}
