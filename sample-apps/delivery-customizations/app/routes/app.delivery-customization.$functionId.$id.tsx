import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import {
  useActionData,
  useNavigation,
  useSubmit,
  useLoaderData,
} from "react-router";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router";
import { authenticate } from "../shopify.server";

interface LoaderData {
  headers: { "Content-Type": string };
  body: string;
}

interface ActionData {
  errors: Array<{ message: string }>;
}

interface DeliveryCustomizationData {
  stateProvinceCode: string;
  message: string;
}

export const loader = async ({ params, request }: LoaderFunctionArgs): Promise<LoaderData> => {
  const { id } = params;
  const { admin } = await authenticate.admin(request);

  if (id !== "new") {
    const gid = `gid://shopify/DeliveryCustomization/${id}`;

    const response = await admin.graphql(
      `#graphql
        query getDeliveryCustomization($id: ID!) {
          deliveryCustomization(id: $id) {
            id
            title
            enabled
            metafield(namespace: "$app:delivery-customization", key: "function-configuration") {
              id
              value
            }
          }
        }`,
      {
        variables: {
          id: gid,
        },
      }
    );

    const responseJson = await response.json();
    const deliveryCustomization = responseJson.data.deliveryCustomization;
    const metafieldValue = JSON.parse(deliveryCustomization.metafield.value);

    return {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        stateProvinceCode: metafieldValue.stateProvinceCode,
        message: metafieldValue.message,
      }),
    };
  }

  return {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      stateProvinceCode: "",
      message: "",
    }),
  };
};

export const action = async ({ params, request }: ActionFunctionArgs): Promise<ActionData> => {
  const { functionId, id } = params;
  const { admin } = await authenticate.admin(request);
  const formData = await request.formData();

  const stateProvinceCode = formData.get("stateProvinceCode") as string;
  const message = formData.get("message") as string;

  const deliveryCustomizationInput = {
    functionId,
    title: `Change ${stateProvinceCode} delivery message`,
    enabled: true,
    metafields: [
      {
        namespace: "$app:delivery-customization",
        key: "function-configuration",
        type: "json",
        value: JSON.stringify({
          stateProvinceCode,
          message,
        }),
      },
    ],
  };

  if (id !== "new") {
    const response = await admin.graphql(
      `#graphql
        mutation updateDeliveryCustomization($id: ID!, $input: DeliveryCustomizationInput!) {
          deliveryCustomizationUpdate(id: $id, deliveryCustomization: $input) {
            deliveryCustomization {
              id
            }
            userErrors {
              message
            }
          }
        }`,
      {
        variables: {
          id: `gid://shopify/DeliveryCustomization/${id}`,
          input: deliveryCustomizationInput,
        },
      }
    );

    const responseJson = await response.json();
    const errors = responseJson.data.deliveryCustomizationUpdate?.userErrors;

    return { errors };
  } else {
    const response = await admin.graphql(
      `#graphql
        mutation createDeliveryCustomization($input: DeliveryCustomizationInput!) {
          deliveryCustomizationCreate(deliveryCustomization: $input) {
            deliveryCustomization {
              id
            }
            userErrors {
              message
            }
          }
        }`,
      {
        variables: {
          input: deliveryCustomizationInput,
        },
      }
    );

    const responseJson = await response.json();
    const errors = responseJson.data.deliveryCustomizationCreate?.userErrors;

    return { errors };
  }
};

export default function DeliveryCustomization() {
  const submit = useSubmit();
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const loaderData = useLoaderData<LoaderData>();

  const parsedLoaderData: DeliveryCustomizationData = loaderData?.body 
    ? JSON.parse(loaderData.body) 
    : { stateProvinceCode: "", message: "" };
  
  const [stateProvinceCode, setStateProvinceCode] = useState(parsedLoaderData.stateProvinceCode);
  const [message, setMessage] = useState(parsedLoaderData.message);

  useEffect(() => {
    if (loaderData?.body) {
      const parsedData: DeliveryCustomizationData = JSON.parse(loaderData.body);
      setStateProvinceCode(parsedData.stateProvinceCode || "");
      setMessage(parsedData.message || "");
    }
  }, [loaderData]);

  const isLoading = navigation.state === "submitting";

  useEffect(() => {
    if (actionData?.errors.length === 0) {
      open('shopify:admin/settings/shipping/customizations', '_top')
    }
  }, [actionData?.errors]);

  const errorBanner = actionData?.errors.length ? (
    <s-banner tone="critical" heading="There was an error creating the customization.">
      <ul>
        {actionData?.errors.map((error, index) => (
          <li key={index}>{error.message}</li>
        ))}
      </ul>
    </s-banner>
  ) : null;

const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  submit({ stateProvinceCode, message }, { method: "post" });
};

const handleReset = () => {
  setStateProvinceCode(parsedLoaderData.stateProvinceCode);
  setMessage(parsedLoaderData.message);
};

return (
  <form data-save-bar onSubmit={handleSubmit} onReset={handleReset}>
    <s-page>
      <ui-title-bar title="Change delivery message">
        <button variant="breadcrumb" href="shopify:admin/settings/shipping/customizations">
          Delivery customizations
        </button>
      </ui-title-bar>

      {errorBanner}

      <s-section>
        <s-grid gap="base">
          <s-text-field
            name="stateProvinceCode"
            type="text"
            label="State/Province code"
            value={stateProvinceCode}
            required
            disabled={isLoading}
            onInput={(e: any) => setStateProvinceCode((e.target as HTMLInputElement).value)}
          ></s-text-field>

          <s-text-field
            name="message"
            type="text"
            label="Message"
            value={message}
            required
            disabled={isLoading}
            onInput={(e: any) => setMessage((e.target as HTMLInputElement).value)}
          ></s-text-field>
        </s-grid>
      </s-section>
    </s-page>
  </form>
);
}