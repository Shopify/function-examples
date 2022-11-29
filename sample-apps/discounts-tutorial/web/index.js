// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import cookieParser from "cookie-parser";
import { DeliveryMethod } from "@shopify/shopify-api";
import shopify from "./shopify.js";
import applyAuthMiddleware from "./middleware/auth.js";
import verifyRequest from "./middleware/verify-request.js";
import { setupGDPRWebHooks } from "./gdpr.js";
import productCreator from "./helpers/product-creator.js";
import redirectToAuth from "./helpers/redirect-to-auth.js";
import { AppInstallations } from "./app_installations.js";
import { sqliteSessionStorage } from "./sqlite-session-storage.js";

import metafields from "./frontend/metafields.js";

const USE_ONLINE_TOKENS = false;

const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT, 10);

// TODO: There should be provided by env vars
const DEV_INDEX_PATH = `${process.cwd()}/frontend/`;
const PROD_INDEX_PATH = `${process.cwd()}/frontend/dist/`;

await shopify.webhooks.addHandlers({
  APP_UNINSTALLED: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: "/api/webhooks",
    callback: async (_topic, shop, _body) => {
      await AppInstallations.delete(shop);
    },
  },
});

// This sets up the mandatory GDPR webhooks. You’ll need to fill in the endpoint
// in the “GDPR mandatory webhooks” section in the “App setup” tab, and customize
// the code when you store customer data.
//
// More details can be found on shopify.dev:
// https://shopify.dev/apps/webhooks/configuration/mandatory-webhooks
setupGDPRWebHooks("/api/webhooks");

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
const GET_DISCOUNT_QUERY = `
  query GetDiscount($id: ID!) {
    discountNode(id: $id) {
      id
      configurationField: metafield(
        namespace: "${metafields.namespace}"
        key: "${metafields.key}"
      ) {
        id
        value
      }
      discount {
        __typename
        ... on DiscountAutomaticApp {
          title
          discountClass
          combinesWith {
            orderDiscounts
            productDiscounts
            shippingDiscounts
          }
          startsAt
          endsAt
        }
        ... on DiscountCodeApp {
          title
          discountClass
          combinesWith {
            orderDiscounts
            productDiscounts
            shippingDiscounts
          }
          startsAt
          endsAt
          usageLimit
          appliesOncePerCustomer
          codes(first: 1) {
            nodes {
              code
            }
          }
        }
      }
    }
  }
`;

const UPDATE_AUTOMATIC_MUTATION = `
  mutation UpdateDiscount($id: ID!, $discount: DiscountAutomaticAppInput!) {
    discountUpdate: discountAutomaticAppUpdate(
      id: $id
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

const UPDATE_CODE_MUTATION = `
  mutation UpdateDiscount($id: ID!, $discount: DiscountCodeAppInput!) {
    discountUpdate: discountCodeAppUpdate(id: $id, codeAppDiscount: $discount) {
      userErrors {
        code
        message
        field
      }
    }
  }
`;

const DELETE_AUTOMATIC_MUTATION = `
  mutation DeleteDiscount($id: ID!) {
    discountDelete: discountAutomaticDelete(id: $id) {
      userErrors {
        code
        message
        field
      }
    }
  }
`;

const DELETE_CODE_MUTATION = `
  mutation DeleteDiscount($id: ID!) {
    discountDelete: discountCodeDelete(id: $id) {
      userErrors {
        code
        message
        field
      }
    }
  }
`;

// export for test use only
export async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === "production"
) {
  const app = express();

  app.set("use-online-tokens", USE_ONLINE_TOKENS);
  app.use(cookieParser(shopify.config.apiSecretKey));

  applyAuthMiddleware(app);

  app.post("/api/webhooks", express.text({ type: "*/*" }), async (req, res) => {
    try {
      await shopify.webhooks.process({
        rawBody: req.body,
        rawRequest: req,
        rawResponse: res,
      });
      console.log(`Webhook processed, returned status code 200`);
    } catch (error) {
      console.log(`Failed to process webhook: ${error.message}`);
      if (!res.headersSent) {
        res.status(500).send(error.message);
      }
    }
  });

  // All endpoints after this point will have access to a request.body
  // attribute, as a result of the express.json() middleware
  app.use(express.json());

  // All endpoints after this point will require an active session
  app.use("/api/*", verifyRequest(app));

  app.get("/api/products/count", async (req, res) => {
    const sessionId = await shopify.session.getCurrentId({
      rawRequest: req,
      rawResponse: res,
      isOnline: app.get("use-online-tokens"),
    });
    const session = await sqliteSessionStorage.loadSession(sessionId);

    const countData = await shopify.rest.Product.count({ session });
    res.status(200).send(countData);
  });

  app.get("/api/products/create", async (req, res) => {
    const sessionId = await shopify.session.getCurrentId({
      rawRequest: req,
      rawResponse: res,
      isOnline: app.get("use-online-tokens"),
    });
    const session = await sqliteSessionStorage.loadSession(sessionId);
    let status = 200;
    let error = null;

    try {
      await productCreator(session);
    } catch (e) {
      status = 500;
      error = e.message;
    }
    res.status(status).send({ success: status === 200, error });
  });

  const runDiscountMutation = async (req, res, mutation) => {
    const sessionId = await shopify.session.getCurrentId({
      rawRequest: req,
      rawResponse: res,
      isOnline: app.get("use-online-tokens"),
    });
    const session = await sqliteSessionStorage.loadSession(sessionId);

    const client = new shopify.clients.Graphql({ session });

    const data = await client.query({
      data: {
        query: mutation,
        variables: req.body,
      },
    });

    res.send(data.body);
  };

  app.post("/api/discounts/code", async (req, res) => {
    await runDiscountMutation(req, res, CREATE_CODE_MUTATION);
  });

  app.post("/api/discounts/automatic", async (req, res) => {
    await runDiscountMutation(req, res, CREATE_AUTOMATIC_MUTATION);
  });

  function idToGid(resource, id) {
    return `gid://shopify/${resource}/${id}`;
  }

  app.get("/api/discounts/:discountId", async (req, res) => {
    req.body = {
      id: idToGid("DiscountNode", req.params.discountId),
    };

    await runDiscountMutation(req, res, GET_DISCOUNT_QUERY);
  });

  app.post("/api/discounts/automatic/:discountId", async (req, res) => {
    req.body.id = idToGid("DiscountAutomaticApp", req.params.discountId);

    await runDiscountMutation(req, res, UPDATE_AUTOMATIC_MUTATION);
  });

  app.post("/api/discounts/code/:discountId", async (req, res) => {
    req.body.id = idToGid("DiscountCodeApp", req.params.discountId);

    await runDiscountMutation(req, res, UPDATE_CODE_MUTATION);
  });

  app.delete("/api/discounts/automatic/:discountId", async (req, res) => {
    req.body.id = idToGid("DiscountAutomaticApp", req.params.discountId);

    await runDiscountMutation(req, res, DELETE_AUTOMATIC_MUTATION);
  });

  app.delete("/api/discounts/code/:discountId", async (req, res) => {
    req.body.id = idToGid("DiscountCodeApp", req.params.discountId);

    await runDiscountMutation(req, res, DELETE_CODE_MUTATION);
  });

  app.use((req, res, next) => {
    const shop = shopify.utils.sanitizeShop(req.query.shop);
    if (shopify.config.isEmbeddedApp && shop) {
      res.setHeader(
        "Content-Security-Policy",
        `frame-ancestors https://${shop} https://admin.shopify.com;`
      );
    } else {
      res.setHeader("Content-Security-Policy", `frame-ancestors 'none';`);
    }
    next();
  });

  if (isProd) {
    const compression = await import("compression").then(
      ({ default: fn }) => fn
    );
    const serveStatic = await import("serve-static").then(
      ({ default: fn }) => fn
    );
    app.use(compression());
    app.use(serveStatic(PROD_INDEX_PATH));
  }

  app.use("/*", async (req, res, next) => {
    if (typeof req.query.shop !== "string") {
      res.status(500);
      return res.send("No shop provided");
    }

    const shop = shopify.utils.sanitizeShop(req.query.shop);
    const appInstalled = await AppInstallations.includes(shop);

    if (!appInstalled && !req.originalUrl.match(/^\/exitiframe/i)) {
      return redirectToAuth(req, res, app);
    }

    if (shopify.config.isEmbeddedApp && req.query.embedded !== "1") {
      const embeddedUrl = await shopify.auth.getEmbeddedAppUrl({
        rawRequest: req,
        rawResponse: res,
      });

      return res.redirect(embeddedUrl + req.path);
    }

    const htmlFile = join(
      isProd ? PROD_INDEX_PATH : DEV_INDEX_PATH,
      "index.html"
    );

    return res
      .status(200)
      .set("Content-Type", "text/html")
      .send(readFileSync(htmlFile));
  });

  return { app };
}

createServer().then(({ app }) => app.listen(PORT));
