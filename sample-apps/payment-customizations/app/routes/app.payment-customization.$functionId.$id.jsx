import { useState, useEffect } from "react";
import { Form, useActionData, useNavigation, useSubmit, useLoaderData } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";

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

  return {
    paymentMethodName: metafield?.paymentMethodName ?? "",
    cartTotal: metafield?.cartTotal ?? "0",
  };
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

    return { errors };
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

    return { errors };
  }
};

// Required for single fetch compatibility
export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
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
    <s-section>
      <s-banner
        title="There was an error creating the customization."
        status="critical"
      >
        <ul>
          {actionData?.errors.map((error, index) => {
            return <li key={`${index}`}>{error.message}</li>;
          })}
        </ul>
      </s-banner>
    </s-section>
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
    <s-page inlineSize="base">
      <ui-title-bar title="Hide payment method">
        <button onClick={() => open("shopify:admin/settings/payments/customizations", "_top")} slot="navigation">
          Payment customizations
        </button>
        <button onClick={handleSubmit} variant="primary" {...(isLoading && { loading: true })} slot="primary-action">Save</button>
      </ui-title-bar>
      {errorBanner}
      <s-section>
        <Form method="post" id="payment-form">
          <s-grid gridTemplateColumns="repeat(2, 1fr)" gap="large">
            <s-text-field
              name="paymentMethodName"
              type="text"
              label="Payment method"
              value={paymentMethodName}
              onInput={(e) => setPaymentMethodName(e.target.value)}
              disabled={isLoading}
              autoComplete="on"
              required
            />
            <s-number-field
              name="cartTotal"
              label="Cart total"
              value={cartTotal}
              onInput={(e) => setCartTotal(e.target.value)}
              disabled={isLoading}
              min="0"
              step="0.01"
              required
            />
          </s-grid>
        </Form>
      </s-section>
    </s-page>
  );
}
