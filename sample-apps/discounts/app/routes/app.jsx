import React, { useState } from "react";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import { AppProvider as PolarisAppProvider } from "@shopify/polaris";
import { Provider as AppBridgeReactProvider } from "@shopify/app-bridge-react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css";
import { DiscountProvider } from "../components/providers/DiscountProvider";
import { authenticate } from "../shopify.server";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export async function loader({ request }) {
  await authenticate.admin(request);

  const url = new URL(request.url);

  return json({
    polarisTranslations: require(`@shopify/polaris/locales/en.json`),
    apiKey: process.env.SHOPIFY_API_KEY,
    host: url.searchParams.get("host"),
  });
}

export default function App() {
  const { apiKey, host, polarisTranslations } = useLoaderData();
  const [config] = useState({ host, apiKey });

  return (
    <>
      <script
        src="https://cdn.shopify.com/shopifycloud/app-bridge.js"
        data-api-key={apiKey}
      />
      <PolarisAppProvider i18n={polarisTranslations}>
        <AppBridgeReactProvider config={config}>
          <DiscountProvider>
            <Outlet />
          </DiscountProvider>
        </AppBridgeReactProvider>
      </PolarisAppProvider>
    </>
  );
}

// Shopify methods such as billing.require() need Remix to catch errors so headers are included in the response.
// We throw `useRouteError()` to retain Remix's default error behaviour after we've captured headers.
export function ErrorBoundary() {
  throw useRouteError();
}

export const headers = ({
  loaderHeaders,
  actionHeaders,
  errorHeaders,
  parentHeaders,
}) => {
  // Ensure all of the headers Shopify needs are set for embedded app requests
  return new Headers([
    ...(actionHeaders ? Array.from(actionHeaders.entries()) : []),
    ...(loaderHeaders ? Array.from(loaderHeaders.entries()) : []),
    ...(errorHeaders ? Array.from(errorHeaders.entries()) : []),
    ...(parentHeaders ? Array.from(parentHeaders.entries()) : []),
  ]);
};
