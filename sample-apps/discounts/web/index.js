// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";

import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import GDPRWebhookHandlers from "./gdpr.js";

import { GraphqlQueryError } from '@shopify/shopify-api';

const CREATE_CODE_MUTATION = `
mutation CreateCodeDiscount($discount: DiscountCodeAppInput!) {
  discountCreate: discountCodeAppCreate(codeAppDiscount: $discount) {
    userErrors {
      code
      message
      field
    }
  }
}
`;

const CREATE_AUTOMATIC_MUTATION = `
mutation CreateAutomaticDiscount($discount: DiscountAutomaticAppInput!) {
  discountCreate: discountAutomaticAppCreate(
    automaticAppDiscount: $discount
  ) {
    userErrors {
      code
      message
      field
    }
  }
}
`;

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
    const message = userErrors.map((error) => error.message).join(' ');
    res.status(500).send({ error: message });
    return true;
  }
  return false;
}

const runDiscountMutation = async (req, res, mutation) => {
  const payload = req.body;
  const graphqlClient = new shopify.api.clients.Graphql({
    session: res.locals.shopify.session
  });

  try {
    const data = await graphqlClient.query({
      data: {
        query: mutation,
        variables: { discount: req.body },
      },
    });

    res.send(data.body);
  } catch (error) {
    // Handle errors thrown by the graphql client
    if (!(error instanceof GraphqlQueryError)) {
      throw error;
    }
    return res.status(500).send({ error: error.response });
  }  
};

app.post("/api/discounts/code", async (req, res) => {
  await runDiscountMutation(req, res, CREATE_CODE_MUTATION);
});

app.post("/api/discounts/automatic", async (req, res) => {
  await runDiscountMutation(req, res, CREATE_AUTOMATIC_MUTATION);
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
