import { useState } from "react";
import {
  Page,
  Layout,
  Card,
  OptionList,
  TextField,
  PageActions,
} from "@shopify/polaris";

import { useAuthenticatedFetch } from "../hooks";

const DISCOUNT_FUNCTIONS = [
  {
    label: "Product",
    value: "22920a5c-a73f-49a6-91dd-d31880b7f545",
  },
  {
    label: "Order",
    value: "1",
  },
  {
    label: "Shipping",
    value: "2",
  },
];

export default function NewPage() {
  const authenticatedFetch = useAuthenticatedFetch();
  const [discountType, setDiscountType] = useState(DISCOUNT_FUNCTIONS[0].value);
  const [functionOutput, setFunctionOutput] = useState("{}");

  const handleSave = () => {
    console.log("save", discountType, functionOutput);
  };

  return (
    <Page title="Create generic discount">
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Card.Section title="Discount type">
              <OptionList
                options={DISCOUNT_FUNCTIONS}
                selected={[discountType]}
                onChange={([type]) => setDiscountType(type)}
                allowMultiple={false}
              />
            </Card.Section>
            <Card.Section title="Function JSON Output">
              <TextField
                multiline={10}
                value={functionOutput}
                onChange={setFunctionOutput}
              />
            </Card.Section>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <PageActions
            primaryAction={{ content: "Save", onAction: handleSave }}
          />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
