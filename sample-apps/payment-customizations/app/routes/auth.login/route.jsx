import { useState } from "react";
import { Form, useActionData, useLoaderData } from "react-router";
import { AppProvider } from "@shopify/shopify-app-react-router/react";

import { login } from "../../shopify.server.js";
import { loginErrorMessage } from "./error.server.js";

export const loader = async ({ request }) => {
  const errors = loginErrorMessage(await login(request));

  return { errors };
};

export const action = async ({ request }) => {
  const errors = loginErrorMessage(await login(request));

  return {
    errors,
  };
};

export default function Auth() {
  const loaderData = useLoaderData();
  const actionData = useActionData();
  const [shop, setShop] = useState("");
  const { errors } = actionData || loaderData;

  return (
    <AppProvider embedded={false}>
      <s-page>
        <Form method="post">
          <s-section heading="Log in">
            <s-text-field
              type="text"
              name="shop"
              label="Shop domain"
              helpText="example.myshopify.com"
              value={shop}
              onChange={setShop}
              autoComplete="on"
              error={errors.shop}
            ></s-text-field>
            <s-button submit>Log in</s-button>
          </s-section>
        </Form>
      </s-page>
    </AppProvider>
  );
} 