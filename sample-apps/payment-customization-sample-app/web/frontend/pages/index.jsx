import {
  Page,
  Card,
  TextStyle,
  EmptyState,
  IndexTable,
  useIndexResourceState,
  Link,
} from "@shopify/polaris";
import { useIsMutating } from "react-query";

import {
  usePaymentCustomizations,
  useDeletePaymentCustomization,
} from "../hooks";

export default function HomePage() {
  const { data = [], isFetching, refetch } = usePaymentCustomizations();

  const { mutateAsync: deleteCustomization } = useDeletePaymentCustomization();

  const isMutating = useIsMutating(["deleteCustomization"]);

  const {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange,
    clearSelection,
  } = useIndexResourceState(data);

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

  const resourceName = {
    singular: "customization",
    plural: "customizations",
  };

  const tableHeadings = [
    { title: "ID" },
    { title: "Payment Method" },
    { title: "Cart Subtotal" },
  ];

  const tableActions = [
    {
      content: "Delete customizations",
      onAction: handleDeleteAction,
    },
  ];

  const selectedCount = allResourcesSelected ? "All" : selectedResources.length;
  const isLoading = isFetching || isMutating;

  return (
    <Page title="Customizations">
      <Card>
        <IndexTable
          resourceName={resourceName}
          itemCount={data.length}
          headings={tableHeadings}
          promotedBulkActions={tableActions}
          loading={isLoading}
          emptyState={<EmptyTable />}
          selectedItemsCount={selectedCount}
          onSelectionChange={handleSelectionChange}
        >
          {data.map((customization, index) => (
            <TableRow
              {...customization}
              key={customization.id}
              selected={selectedResources.includes(customization.id)}
              index={index}
            />
          ))}
        </IndexTable>
      </Card>
    </Page>
  );
}

function TableRow({
  title,
  functionId,
  id,
  cartSubtotal,
  paymentMethod,
  selected,
  index,
}) {
  return (
    <IndexTable.Row id={id} selected={selected} position={index}>
      <IndexTable.Cell>
        <Link dataPrimaryLink url={`/${title}/${functionId}/${id}`}>
          <TextStyle variation="strong">{id}</TextStyle>
        </Link>
      </IndexTable.Cell>
      <IndexTable.Cell>{paymentMethod}</IndexTable.Cell>
      <IndexTable.Cell>{cartSubtotal}</IndexTable.Cell>
    </IndexTable.Row>
  );
}

function EmptyTable(props) {
  return (
    <EmptyState heading="Hello world! 🎉" {...props}>
      <p>
        Welcome to the <b>Payment Customizations Functions Sample App</b>! To
        get started, create a new customization.
      </p>
    </EmptyState>
  );
}
