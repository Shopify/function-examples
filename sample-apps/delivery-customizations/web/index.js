// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";

import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import GDPRWebhookHandlers from "./gdpr.js";
import { GraphqlQueryError } from "@shopify/shopify-api";

const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT, 10);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
);

// All endpoints after this point will require an active session
app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(express.json());

// Helper function for handling any user-facing errors in GraphQL responses
function handleUserError(userErrors, res) {
  if (userErrors && userErrors.length > 0) {
    const message = userErrors.map((error) => error.message).join(" ");
    res.status(500).send({ error: message });
    return true;
  }
  return false;
}

// Endpoint for fetching a delivery customization
app.get("/api/deliveryCustomization/:id", async (req, res) => {
  const id = `gid://shopify/DeliveryCustomization/${req.params.id}`;
  const graphqlClient = new shopify.api.clients.Graphql({
    session: res.locals.shopify.session,
  });

  try {
    const response = await graphqlClient.query({
      data: {
        query: `query DeliveryCustomization($id: ID!) {
          deliveryCustomization(id: $id) {
            id
            metafield(namespace: "delivery-customization", key: "function-configuration") {
              value
            }
          }
        }`,
        variables: {
          id,
        },
      },
    });

    if (!response.body.data || !response.body.data.deliveryCustomization) {
      res.status(404).send({ error: "Delivery customization not found" });
    }

    const metafieldValue = response.body.data.deliveryCustomization.metafield
      ? JSON.parse(response.body.data.deliveryCustomization.metafield.value)
      : {};
    const { stateProvinceCode, message } = metafieldValue;

    const deliveryCustomization = {
      id,
      stateProvinceCode,
      message,
    };

    res.status(200).send(deliveryCustomization);
  } catch (error) {
    console.error(`Failed to fetch delivery customization ${id}`, error);
    res.status(500).send();
  }
});

app.put("/api/deliveryCustomization/update", async (req, res) => {
  const payload = req.body;
  const graphqlClient = new shopify.api.clients.Graphql({
    session: res.locals.shopify.session,
  });

  try {
    // Create the delivery customization for the provided function ID
    const updateResponse = await graphqlClient.query({
      data: {
        query: `mutation DeliveryCustomizationUpdate($id: ID!, $input: DeliveryCustomizationInput!) {
          deliveryCustomizationUpdate(id: $id, deliveryCustomization: $input) {
            deliveryCustomization {
              id
            }
            userErrors {
              message
            }
          }
        }`,
        variables: {
          input: {
            functionId: payload.functionId,
            title: `Display message for ${payload.stateProvinceCode}`,
            enabled: true,
          },
          id: payload.id,
        },
      },
    });
    let updateResult = updateResponse.body.data.deliveryCustomizationUpdate;
    if (handleUserError(updateResult.userErrors, res)) {
      return;
    }

    // Populate the function configuration metafield for the delivery customization
    const customizationId = updateResult.deliveryCustomization.id;
    const metafieldResponse = await graphqlClient.query({
      data: {
        query: `mutation MetafieldsSet($customizationId: ID!, $configurationValue: String!) {
          metafieldsSet(metafields: [
            {
              ownerId: $customizationId
              namespace: "delivery-customization"
              key: "function-configuration"
              value: $configurationValue
              type: "json"
            }
          ]) {
            metafields {
              id
            }
            userErrors {
              message
            }
          }
        }`,
        variables: {
          customizationId,
          configurationValue: JSON.stringify({
            stateProvinceCode: payload.stateProvinceCode,
            message: payload.message,
          }),
        },
      },
    });
    let metafieldResult = metafieldResponse.body.data.metafieldsSet;
    if (handleUserError(metafieldResult, res)) {
      return;
    }
  } catch (error) {
    // Handle errors thrown by the graphql client
    if (!(error instanceof GraphqlQueryError)) {
      throw error;
    }
    return res.status(500).send({ error: error.response });
  }

  return res.status(200).send();
});

// Endpoint for the delivery customization UI to invoke
app.post("/api/deliveryCustomization/create", async (req, res) => {
  const payload = req.body;
  const graphqlClient = new shopify.api.clients.Graphql({
    session: res.locals.shopify.session,
  });

  try {
    // Create the delivery customization for the provided function ID
    const createResponse = await graphqlClient.query({
      data: {
        query: `mutation DeliveryCustomizationCreate($input: DeliveryCustomizationInput!) {
          deliveryCustomizationCreate(deliveryCustomization: $input) {
            deliveryCustomization {
              id
            }
            userErrors {
              message
            }
          }
        }`,
        variables: {
          input: {
            functionId: payload.functionId,
            title: `Display message for ${payload.stateProvinceCode}`,
            enabled: true,
          },
        },
      },
    });
    let createResult = createResponse.body.data.deliveryCustomizationCreate;
    if (handleUserError(createResult.userErrors, res)) {
      return;
    }

    // Populate the function configuration metafield for the delivery customization
    const customizationId = createResult.deliveryCustomization.id;
    const metafieldResponse = await graphqlClient.query({
      data: {
        query: `mutation MetafieldsSet($customizationId: ID!, $configurationValue: String!) {
          metafieldsSet(metafields: [
            {
              ownerId: $customizationId
              namespace: "delivery-customization"
              key: "function-configuration"
              value: $configurationValue
              type: "json"
            }
          ]) {
            metafields {
              id
            }
            userErrors {
              message
            }
          }
        }`,
        variables: {
          customizationId,
          configurationValue: JSON.stringify({
            stateProvinceCode: payload.stateProvinceCode,
            message: payload.message,
          }),
        },
      },
    });
    let metafieldResult = metafieldResponse.body.data.metafieldsSet;
    if (handleUserError(metafieldResult, res)) {
      return;
    }
  } catch (error) {
    // Handle errors thrown by the graphql client
    if (!(error instanceof GraphqlQueryError)) {
      throw error;
    }
    return res.status(500).send({ error: error.response });
  }

  return res.status(200).send();
});

app.get("/api/products/count", async (_req, res) => {
  const countData = await shopify.api.rest.Product.count({
    session: res.locals.shopify.session,
  });
  res.status(200).send(countData);
});

app.get("/api/products/create", async (_req, res) => {
  let status = 200;
  let error = null;

  try {
    await productCreator(res.locals.shopify.session);
  } catch (e) {
    console.log(`Failed to process products/create: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
});

app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT);
