import { useState, useEffect } from "react";
import {
  Banner,
  Button,
  Card,
  FormLayout,
  Layout,
  Page,
  TextField,
} from "@shopify/polaris";
import {
  Form,
  useActionData,
  useNavigation,
  useSubmit,
  useLoaderData,
} from "@remix-run/react";
import { json, redirect } from "@remix-run/node";

import { authenticate } from "../shopify.server";

// This is a server-side function that provides data to the component when rendering.
export const loader = async ({ params, request }) => {
  const { id } = params;

  // If the ID is `new`, then we are creating a new customization and there's no data to load.
  if (id === "new") {
    return {
      paymentMethodName: "",
      cartTotal: "0",
    };
  }

  const { admin } = await authenticate.admin(request);
  const response = await admin.graphql(
    `#graphql
      query getPaymentCustomization($id: ID!) {
        paymentCustomization(id: $id) {
          id
          metafield(namespace: "$app:payment-customization", key: "function-configuration") {
            value
          }
        }
      }`,
    {
      variables: {
        id: `gid://shopify/PaymentCustomization/${id}`,
      },
    }
  );

  const responseJson = await response.json();
  const metafield =
    responseJson.data.paymentCustomization?.metafield?.value &&
    JSON.parse(responseJson.data.paymentCustomization.metafield.value);

  return json({
    paymentMethodName: metafield?.paymentMethodName ?? "",
    cartTotal: metafield?.cartTotal ?? "0",
  });
};

// This is a server-side action that is invoked when the form is submitted.
// It makes an admin GraphQL request to create a payment customization.
export const action = async ({ params, request }) => {
  const { functionId, id } = params;
  const { admin } = await authenticate.admin(request);
  const formData = await request.formData();

  const paymentMethodName = formData.get("paymentMethodName");
  const cartTotal = parseFloat(formData.get("cartTotal"));

  const paymentCustomizationInput = {
    functionId,
    title: `Hide ${paymentMethodName} if cart total is larger than ${cartTotal}`,
    enabled: true,
    metafields: [
      {
        namespace: "$app:payment-customization",
        key: "function-configuration",
        type: "json",
        value: JSON.stringify({
          paymentMethodName,
          cartTotal,
        }),
      },
    ],
  };

  // If the ID is `new`, then we're creating a new customization. Otherwise, we will use the update mutation.
  if (id === "new") {
    const response = await admin.graphql(
      `#graphql
        mutation createPaymentCustomization($input: PaymentCustomizationInput!) {
          paymentCustomizationCreate(paymentCustomization: $input) {
            paymentCustomization {
              id
            }
            userErrors {
              message
            }
          }
        }`,
      {
        variables: {
          input: paymentCustomizationInput,
        },
      }
    );

    const responseJson = await response.json();
    const errors = responseJson.data.paymentCustomizationCreate?.userErrors;

    return json({ errors });
  } else {
    const response = await admin.graphql(
      `#graphql
        mutation updatePaymentCustomization($id: ID!, $input: PaymentCustomizationInput!) {
          paymentCustomizationUpdate(id: $id, paymentCustomization: $input) {
            paymentCustomization {
              id
            }
            userErrors {
              message
            }
          }
        }`,
      {
        variables: {
          id: `gid://shopify/PaymentCustomization/${id}`,
          input: paymentCustomizationInput,
        },
      }
    );

    const responseJson = await response.json();
    const errors = responseJson.data.paymentCustomizationUpdate?.userErrors;

    return json({ errors });
  }
};

// This is the client-side component that renders the form.
export default function PaymentCustomization() {
  const submit = useSubmit();
  const actionData = useActionData();
  const navigation = useNavigation();
  const loaderData = useLoaderData();
  const [paymentMethodName, setPaymentMethodName] = useState(
    loaderData.paymentMethodName
  );
  const [cartTotal, setCartTotal] = useState(loaderData.cartTotal);

  const isLoading = navigation.state === "submitting";

  const errorBanner = actionData?.errors.length ? (
    <Layout.Section>
      <Banner
        title="There was an error creating the customization."
        status="critical"
      >
        <ul>
          {actionData?.errors.map((error, index) => {
            return <li key={`${index}`}>{error.message}</li>;
          })}
        </ul>
      </Banner>
    </Layout.Section>
  ) : null;

  const handleSubmit = () => {
    submit({ paymentMethodName, cartTotal }, { method: "post" });
  };

  useEffect(() => {
    if (actionData?.errors.length === 0) {
      open("shopify:admin/settings/payments/customizations", "_top");
    }
  }, [actionData?.errors]);

  return (
    <Page
      title="Hide payment method"
      backAction={{
        content: "Payment customizations",
        onAction: () =>
          open("shopify:admin/settings/payments/customizations", "_top"),
      }}
      primaryAction={{
        content: "Save",
        loading: isLoading,
        onAction: handleSubmit,
      }}
    >
      <Layout>
        {errorBanner}
        <Layout.Section>
          <Card>
            <Form method="post">
              <FormLayout>
                <FormLayout.Group>
                  <TextField
                    name="paymentMethodName"
                    type="text"
                    label="Payment method"
                    value={paymentMethodName}
                    onChange={setPaymentMethodName}
                    disabled={isLoading}
                    autoComplete="on"
                    requiredIndicator
                  />
                  <TextField
                    name="cartTotal"
                    type="number"
                    label="Cart total"
                    value={cartTotal}
                    onChange={setCartTotal}
                    disabled={isLoading}
                    autoComplete="on"
                    requiredIndicator
                  />
                </FormLayout.Group>
              </FormLayout>
            </Form>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
