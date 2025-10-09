import { authenticate } from "../shopify.server.js";

export const action = async ({ request }) => {
  const { topic } = await authenticate.webhook(request);

  if (topic === "APP_SCOPES_UPDATE") {
    console.log("Received APP_SCOPES_UPDATE webhook. Update scopes.");
  }

  return new Response();
}; 