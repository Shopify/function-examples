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

import { useAppQuery } from "../hooks";

export default function HomePage() {
  const {
    data = [],
    isLoading,
    error,
  } = useAppQuery({
    url: "/api/payment-customizations",
  });

  const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(data);

  const primaryAction = {
    content: "Create customization",
    icon: PlusMinor,
    url: "/new",
  }

  const resourceName = {
    singular: "customization",
    plural: "customizations",
  }

  const tableHeadings = [
    {title: 'Payment Method'},
    {title: 'Cart Subtotal'},
  ]

  const tableActions = [
    {
      content: 'Delete customizations',
      onAction: () => console.log('Todo: implement bulk delete'),
    },
  ]

  const selectedCount = allResourcesSelected ? 'All' : selectedResources.length

  return (
    <Page
      title="Customizations"
      primaryAction={primaryAction}
    >
      <Card>
        <IndexTable
          resourceName={resourceName}
          itemCount={data.length}
          headings={tableHeadings}
          promotedBulkActions={tableActions}
          loading={isLoading}
          emptyState={<EmptyTable action={primaryAction} />}
          selectedItemsCount={selectedCount}
          onSelectionChange={handleSelectionChange}
        >
          {
            data.map((customization, index) =>
              <TableRow
                {...customization}
                key={customization.id}
                selected={selectedResources.includes(customization.id)}
                index={index}
              />
            )
          }
        </IndexTable>
      </Card>
    </Page>
  );
}

function TableRow({ id, cartSubtotal, paymentMethod, selected, index }) {
  return (
    <IndexTable.Row
      id={id}
      selected={selected}
      position={index}
    >
      <IndexTable.Cell>
        <Link
          dataPrimaryLink
          url={`/${id}`}
        >
          <TextStyle variation="strong">{paymentMethod}</TextStyle>
        </Link>
      </IndexTable.Cell>
      <IndexTable.Cell>{cartSubtotal}</IndexTable.Cell>
    </IndexTable.Row>
  )
}

function EmptyTable(props) {
  return (
    <EmptyState
      heading="Hello world! 🎉"
      {...props}
    >
      <p>
        Welcome to the <b>Payment Customizations Functions Sample App</b>!
        To get started, create a new customization.
      </p>
    </EmptyState>
  )
}
