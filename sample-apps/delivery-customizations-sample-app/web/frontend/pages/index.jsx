import {
  Page,
  Card,
  TextStyle,
  EmptyState,
  IndexTable,
  useIndexResourceState,
  Link,
} from "@shopify/polaris";

import { PlusMinor } from "@shopify/polaris-icons";
import { useIsMutating } from "react-query";
import {
  useDeliveryCustomizations,
  useDeleteDeliveryCustomization,
} from "../hooks";

export default function HomePage() {
  const {
    data: deliveryCustomizations = [],
    isFetching,
    refetch,
  } = useDeliveryCustomizations();

  const { mutateAsync: deleteCustomization } = useDeleteDeliveryCustomization();

  const isMutating = useIsMutating(["deleteCustomization"]);

  const {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange,
    clearSelection,
  } = useIndexResourceState(deliveryCustomizations);

  const handleDeleteAction = async () => {
    if (isMutating) return;

    try {
      const mutations = selectedResources.map((id) =>
        deleteCustomization({ params: { id } })
      );
      await Promise.all(mutations);
      await refetch();
      clearSelection();
    } catch (error) {
      console.error(error);
    }
  };

  const rowMarkup = deliveryCustomizations.map(
    ({ id, enabled, title, value: deliveryOptionName, operation }, index) => {
      return (
        <IndexTable.Row
          id={id}
          key={id}
          selected={selectedResources.includes(id)}
          position={index}
        >
          <IndexTable.Cell>
            <Link dataPrimaryLink url={`/${operation}/${id}`}>
              <TextStyle variation="strong">{title}</TextStyle>
            </Link>
          </IndexTable.Cell>
          <IndexTable.Cell>{deliveryOptionName}</IndexTable.Cell>
          <IndexTable.Cell>{enabled && "Active"}</IndexTable.Cell>
        </IndexTable.Row>
      );
    }
  );

  const resourceName = {
    singular: "customization",
    plural: "customizations",
  };

  const selectedCount = allResourcesSelected ? "All" : selectedResources.length;
  const isLoading = isFetching || isMutating;

  const tableActions = [
    {
      content: "Delete customizations",
      onAction: handleDeleteAction,
    },
  ];

  const primaryAction = {
    content: "Create customization",
    icon: PlusMinor,
    url: "/new",
  };

  return (
    <Page title="Customizations" primaryAction={primaryAction}>
      <Card>
        <IndexTable
          resourceName={resourceName}
          itemCount={deliveryCustomizations.length}
          selectedItemsCount={selectedCount}
          onSelectionChange={handleSelectionChange}
          headings={[
            { title: "Title" },
            { title: "Delivery Option Name" },
            { title: "Enabled" },
          ]}
          promotedBulkActions={tableActions}
          loading={isLoading}
          emptyState={<EmptyTable action={primaryAction} />}
        >
          {rowMarkup}
        </IndexTable>
      </Card>
    </Page>
  );
}

function EmptyTable(props) {
  return (
    <EmptyState heading="Hello world! 🎉" {...props}>
      <p>
        Welcome to the <b>Delivery Customizations Sample App</b>! To get
        started, create a new customization.
      </p>
    </EmptyState>
  );
}
