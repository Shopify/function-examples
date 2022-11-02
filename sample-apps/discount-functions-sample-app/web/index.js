import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import cookieParser from "cookie-parser";
import { Shopify, LATEST_API_VERSION } from "@shopify/shopify-api";
import dotenv from "dotenv";

import applyAuthMiddleware from "./middleware/auth.js";
import verifyRequest from "./middleware/verify-request.js";
import { setupGDPRWebHooks } from "./gdpr.js";
import redirectToAuth from "./helpers/redirect-to-auth.js";
import { BillingInterval } from "./helpers/ensure-billing.js";
import { AppInstallations } from "./app_installations.js";
import { idToGid } from "./helpers/gid.js";
import { METAFIELD } from "./helpers/metafield.js";

const USE_ONLINE_TOKENS = false;

const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT, 10);

// TODO: There should be provided by env vars
const DEV_INDEX_PATH = `${process.cwd()}/frontend/`;
const PROD_INDEX_PATH = `${process.cwd()}/frontend/dist/`;

const DB_PATH = `${process.cwd()}/database.sqlite`;

const {
  SHOPIFY_ORDER_DISCOUNT_ID,
  SHOPIFY_PRODUCT_DISCOUNT_ID,
  SHOPIFY_SHIPPING_DISCOUNT_ID,
} = dotenv.parse(readFileSync(join(process.cwd(), "../", ".env"), "utf8"));

Shopify.Context.initialize({
  API_KEY: process.env.SHOPIFY_API_KEY,
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
  SCOPES: process.env.SCOPES.split(","),
  HOST_NAME: process.env.HOST.replace(/https?:\/\//, ""),
  HOST_SCHEME: process.env.HOST.split("://")[0],
  API_VERSION: LATEST_API_VERSION,
  IS_EMBEDDED_APP: true,
  // This should be replaced with your preferred storage strategy
  // See note below regarding using CustomSessionStorage with this template.
  SESSION_STORAGE: new Shopify.Session.SQLiteSessionStorage(DB_PATH),
  ...(process.env.SHOP_CUSTOM_DOMAIN && {
    CUSTOM_SHOP_DOMAINS: [process.env.SHOP_CUSTOM_DOMAIN],
  }),
});

// NOTE: If you choose to implement your own storage strategy using
// Shopify.Session.CustomSessionStorage, you MUST implement the optional
// findSessionsByShopCallback and deleteSessionsCallback methods.  These are
// required for the app_installations.js component in this template to
// work properly.

Shopify.Webhooks.Registry.addHandler("APP_UNINSTALLED", {
  path: "/api/webhooks",
  webhookHandler: async (_topic, shop, _body) => {
    await AppInstallations.delete(shop);
  },
});

// The transactions with Shopify will always be marked as test transactions, unless NODE_ENV is production.
// See the ensureBilling helper to learn more about billing in this template.
const BILLING_SETTINGS = {
  required: false,
  // This is an example configuration that would do a one-time charge for $5 (only USD is currently supported)
  // chargeName: "My Shopify One-Time Charge",
  // amount: 5.0,
  // currencyCode: "USD",
  // interval: BillingInterval.OneTime,
};

// This sets up the mandatory GDPR webhooks. You’ll need to fill in the endpoint
// in the “GDPR mandatory webhooks” section in the “App setup” tab, and customize
// the code when you store customer data.
//
// More details can be found on shopify.dev:
// https://shopify.dev/apps/webhooks/configuration/mandatory-webhooks
setupGDPRWebHooks("/api/webhooks");

// export for test use only
export async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === "production",
  billingSettings = BILLING_SETTINGS
) {
  const app = express();

  app.set("use-online-tokens", USE_ONLINE_TOKENS);
  app.use(cookieParser(Shopify.Context.API_SECRET_KEY));

  applyAuthMiddleware(app, {
    billing: billingSettings,
  });

  // Do not call app.use(express.json()) before processing webhooks with
  // Shopify.Webhooks.Registry.process().
  // See https://github.com/Shopify/shopify-api-node/blob/main/docs/usage/webhooks.md#note-regarding-use-of-body-parsers
  // for more details.
  app.post("/api/webhooks", async (req, res) => {
    try {
      await Shopify.Webhooks.Registry.process(req, res);
      console.log(`Webhook processed, returned status code 200`);
    } catch (e) {
      console.log(`Failed to process webhook: ${e.message}`);
      if (!res.headersSent) {
        res.status(500).send(e.message);
      }
    }
  });

  // All endpoints after this point will require an active session
  app.use(express.json());

  app.use(
    "/api/*",
    verifyRequest(app, {
      billing: billingSettings,
    })
  );

  function getSession(req, res) {
    return Shopify.Utils.loadCurrentSession(
      req,
      res,
      app.get("use-online-tokens")
    );
  }

  async function getClient(req, res) {
    const session = await getSession(req, res);

    return new Shopify.Clients.Graphql(session.shop, session.accessToken);
  }

  async function executeQuery(req, res, query) {
    const client = await getClient(req, res);

    const result = await client.query(query);

    return result.body.data;
  }

  async function queryResponse(req, res, query, reducer) {
    if (!req || !res || !query)
      throw new Error("queryResponse: missing required argument");

    try {
      const result = await executeQuery(req, res, query);

      const data = reducer ? reducer(result) : result;

      return { status: 200, data };
    } catch (err) {
      const data =
        err instanceof Shopify.Errors.GraphqlQueryError
          ? err.response
          : err.message;

      return { status: 500, data: { error: data } };
    }
  }

  function normalizeDiscount(discount) {
    if (!discount) return;

    const { configurationField, automaticDiscount } = discount;
    const { title, startsAt, endsAt } = automaticDiscount;

    return {
      title,
      startsAt,
      endsAt,
      configuration: JSON.parse(configurationField?.value ?? "{}"),
      configurationId: configurationField?.id,
    };
  }

  app.get("/api/product-variant/:id", async (req, res) => {
    const query = {
      data: {
        query: `
          query Variant($id: ID!) {
            productVariant(id: $id) {
              displayName
              product {
                id
              }
            }
          }
        `,
        variables: {
          id: idToGid(req.params.id, "ProductVariant"),
        },
      },
    };

    const reducer = ({ productVariant }) => productVariant;

    const { status, data } = await queryResponse(req, res, query, reducer);

    return res.status(status).send(data);
  });

  app.get("/api/discount/:id", async (req, res) => {
    const gid = idToGid(req.params.id, "DiscountAutomaticApp");

    const query = {
      data: {
        query: `
          query GetDiscount($id: ID!) {
            automaticDiscountNode(id: $id) {
              configurationField: metafield(
                namespace: "${METAFIELD.namespace}"
                key: "${METAFIELD.key}"
              ) {
                id
                value
              }
              automaticDiscount {
                ... on DiscountAutomaticApp {
                  title
                  startsAt
                  endsAt
                }
              }
            }
          }
        `,
        variables: {
          id: gid,
        },
      },
    };

    const reducer = ({ automaticDiscountNode }) =>
      normalizeDiscount(automaticDiscountNode);

    const { status, data } = await queryResponse(req, res, query, reducer);

    return res.status(status).send(data);
  });

  app.put("/api/discount/:id", async (req, res) => {
    const payload = req.body;
    const gid = idToGid(req.params.id);

    let query = {
      data: {
        query: `
          mutation UpdateDiscount($id: ID!, $discount: DiscountAutomaticAppInput!) {
            discountAutomaticAppUpdate(id: $id, automaticAppDiscount: $discount) {
              userErrors {
                code
                message
                field
              }
            }
          }
        `,
        variables: {
          id: gid,
          discount: payload,
        },
      },
    };

    const reducer = ({ discountAutomaticAppUpdate }) =>
      discountAutomaticAppUpdate;

    const { status, data } = await queryResponse(req, res, query, reducer);

    return res.status(status).send(data);
  });

  app.delete("/api/discount/:id", async (req, res) => {
    let query = {
      data: {
        query: `
          mutation DeleteDiscount($id: ID!) {
            discountAutomaticDelete(id: $id) {
              userErrors {
                code
                message
                field
              }
            }
          }
        `,
        variables: {
          id: idToGid(req.params.id),
        },
      },
    };

    const reducer = ({ discountAutomaticDelete }) => discountAutomaticDelete;

    let { status, data } = await queryResponse(req, res, query, reducer);

    if (status === 200) data = { message: "Deleted with success" };

    return res.status(status).send(data);
  });

  app.post("/api/discount", async (req, res) => {
    const { discount, type } = req.body;
    const TYPE_MAP = {
      ORDER_DISCOUNT: SHOPIFY_ORDER_DISCOUNT_ID,
      PRODUCT_DISCOUNT: SHOPIFY_PRODUCT_DISCOUNT_ID,
      SHIPPING_DISCOUNT: SHOPIFY_SHIPPING_DISCOUNT_ID,
    };
    const functionId = TYPE_MAP[type];

    let query = {
      data: {
        query: `
          mutation CreateDiscount($discount: DiscountAutomaticAppInput!) {
            discountAutomaticAppCreate(automaticAppDiscount: $discount) {
              userErrors {
                code
                message
                field
              }
            }
          }
          `,
        variables: {
          discount: {
            ...discount,
            functionId: functionId,
          },
        },
      },
    };

    let reducer = ({ discountAutomaticAppCreate }) =>
      discountAutomaticAppCreate;

    const { status, data } = await queryResponse(req, res, query, reducer);

    return res.status(status).send(data);
  });

  app.use((req, res, next) => {
    const shop = Shopify.Utils.sanitizeShop(req.query.shop);
    if (Shopify.Context.IS_EMBEDDED_APP && shop) {
      res.setHeader(
        "Content-Security-Policy",
        `frame-ancestors https://${encodeURIComponent(
          shop
        )} https://admin.shopify.com;`
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
    app.use(serveStatic(PROD_INDEX_PATH, { index: false }));
  }

  app.use("/*", async (req, res, next) => {
    if (typeof req.query.shop !== "string") {
      res.status(500);
      return res.send("No shop provided");
    }

    const shop = Shopify.Utils.sanitizeShop(req.query.shop);
    const appInstalled = await AppInstallations.includes(shop);

    if (!appInstalled && !req.originalUrl.match(/^\/exitiframe/i)) {
      return redirectToAuth(req, res, app);
    }

    if (Shopify.Context.IS_EMBEDDED_APP && req.query.embedded !== "1") {
      const embeddedUrl = Shopify.Utils.getEmbeddedAppUrl(req);

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
