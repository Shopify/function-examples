import { authenticate } from "../shopify.server.js";
import { boundary } from "@shopify/shopify-app-react-router/server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return null;
};

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
}; 