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

// Endpoint for fetching a payment customization
app.get("/api/paymentCustomization/:id", async (req, res) => {
  const id = `gid://shopify/PaymentCustomization/${req.params.id}`;
  const graphqlClient = new shopify.api.clients.Graphql({
    session: res.locals.shopify.session,
  });

  try {
    const response = await graphqlClient.query({
      data: {
        query: `query PaymentCustomization($id: ID!) {
          paymentCustomization(id: $id) {
            id
            metafield(namespace: "payment-customization", key: "function-configuration") {
              value
            }
          }
        }`,
        variables: {
          id,
        },
      },
    });

    if (!response.body.data || !response.body.data.paymentCustomization) {
      res.status(404).send({ error: "Payment customization not found" });
    }

    const metafieldValue = response.body.data.paymentCustomization.metafield
      ? JSON.parse(response.body.data.paymentCustomization.metafield.value)
      : {};
    const { paymentMethodName, cartTotal } = metafieldValue;

    const paymentCustomization = {
      id,
      paymentMethod: paymentMethodName,
      cartTotal,
    };

    res.status(200).send(paymentCustomization);
  } catch (error) {
    console.error(`Failed to fetch payment customization ${id}`, error);
    res.status(500).send();
  }
});

app.put("/api/paymentCustomization/update", async (req, res) => {
  const payload = req.body;
  const graphqlClient = new shopify.api.clients.Graphql({
    session: res.locals.shopify.session,
  });

  try {
    // Create the payment customization for the provided function ID
    const updateResponse = await graphqlClient.query({
      data: {
        query: `mutation PaymentCustomizationUpdate($id: ID!, $input: PaymentCustomizationInput!) {
          paymentCustomizationUpdate(id: $id, paymentCustomization: $input) {
            paymentCustomization {
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
            title: `Hide ${payload.paymentMethod} if cart total is larger than ${payload.cartTotal}`,
            enabled: true,
          },
          id: payload.id,
        },
      },
    });
    let updateResult = updateResponse.body.data.paymentCustomizationUpdate;
    if (handleUserError(updateResult.userErrors, res)) {
      return;
    }

    // Populate the function configuration metafield for the payment customization
    const customizationId = updateResult.paymentCustomization.id;
    const metafieldResponse = await graphqlClient.query({
      data: {
        query: `mutation MetafieldsSet($customizationId: ID!, $configurationValue: String!) {
          metafieldsSet(metafields: [
            {
              ownerId: $customizationId
              namespace: "payment-customization"
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
            paymentMethodName: payload.paymentMethod,
            cartTotal: payload.cartTotal,
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

// Endpoint for the payment customization UI to invoke
app.post("/api/paymentCustomization/create", async (req, res) => {
  const payload = req.body;
  const graphqlClient = new shopify.api.clients.Graphql({
    session: res.locals.shopify.session,
  });

  try {
    // Create the payment customization for the provided function ID
    const createResponse = await graphqlClient.query({
      data: {
        query: `mutation PaymentCustomizationCreate($input: PaymentCustomizationInput!) {
          paymentCustomizationCreate(paymentCustomization: $input) {
            paymentCustomization {
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
            title: `Hide ${payload.paymentMethod} if cart total is larger than ${payload.cartTotal}`,
            enabled: true,
          },
        },
      },
    });
    let createResult = createResponse.body.data.paymentCustomizationCreate;
    if (handleUserError(createResult.userErrors, res)) {
      return;
    }

    // Populate the function configuration metafield for the payment customization
    const customizationId = createResult.paymentCustomization.id;
    const metafieldResponse = await graphqlClient.query({
      data: {
        query: `mutation MetafieldsSet($customizationId: ID!, $configurationValue: String!) {
          metafieldsSet(metafields: [
            {
              ownerId: $customizationId
              namespace: "payment-customization"
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
            paymentMethodName: payload.paymentMethod,
            cartTotal: payload.cartTotal,
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
