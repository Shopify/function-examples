import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import cookieParser from "cookie-parser";
import { Shopify } from "@shopify/shopify-api";

import applyAuthMiddleware from "./middleware/auth.js";
import verifyRequest from "./middleware/verify-request.js";
import { setupGDPRWebHooks } from "./gdpr.js";
import redirectToAuth from "./helpers/redirect-to-auth.js";
import { AppInstallations } from "./app_installations.js";
import { gidToId, idToGid } from "./helpers/gid.js";
import {matchOperationToFunctionId, matchFunctionIdToOperation} from "./helpers/match-operation-to-functionId.js"

const USE_ONLINE_TOKENS = false;

const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT, 10);

const DEV_INDEX_PATH = `${process.cwd()}/frontend/`;
const PROD_INDEX_PATH = `${process.cwd()}/frontend/dist/`;

const DB_PATH = `${process.cwd()}/database.sqlite`;

const METAFIELD = {
  namespace: "delivery-customizations-sample-app",
  key: "function-configuration",
};

Shopify.Context.initialize({
  API_KEY: process.env.SHOPIFY_API_KEY,
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
  SCOPES: process.env.SCOPES.split(","),
  HOST_NAME: process.env.HOST.replace(/https?:\/\//, ""),
  HOST_SCHEME: process.env.HOST.split("://")[0],
  API_VERSION: "unstable",
  IS_EMBEDDED_APP: true,
  // This should be replaced with your preferred storage strategy
  SESSION_STORAGE: new Shopify.Session.SQLiteSessionStorage(DB_PATH),
  CUSTOM_SHOP_DOMAINS: ['[a-zA-Z0-9-_\\.]+\\.spin\\.dev'],
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

  function normalizeCustomization({ id, metafield, ...customization }) {
    return Object.assign(
      {},
      customization,
      { id: gidToId(id) },
      metafield
    );
  }

  // GET DELIVERY CUSTOMIZATION
  app.get("/api/delivery-customization/:id", async (req, res) => {
    const gid = idToGid(req.params.id);

    const query = {
      data: {
        query: `
          query DeliveryCustomization($id: ID!) {
            deliveryCustomization(id: $id) {
              id
              enabled
              title
              metafield(namespace:"${METAFIELD.namespace}", key:"${METAFIELD.key}") {
                value
              }
            }
          }
        `,
        variables: {
          id: gid,
        },
      },
    };

    const reducer = ({ deliveryCustomization }) =>
      normalizeCustomization(deliveryCustomization);

    const { status, data } = await queryResponse(req, res, query, reducer);

    return res.status(status).send(data);
  });

  // GET DELIVERY CUSTOMIZATIONS
  app.get("/api/delivery-customizations", async (req, res) => {
    const query = {
      data: `{
        deliveryCustomizations(first: 50) {
          edges {
            node {
              id
              functionId
              title
              enabled
              metafield(namespace: "${METAFIELD.namespace}", key:"${METAFIELD.key}") {
                value
              }
            }
          }
        }
      }`,
    };

    const reducer = ({ deliveryCustomizations }) =>
    deliveryCustomizations.edges.map(({ node }) =>
        normalizeCustomization(node)
      );

    const { status, data } = await queryResponse(req, res, query, reducer);

    const deliveryCustomizationData = data.map((deliveryCustomization) => {
      return {
        ...deliveryCustomization,
        operation: matchFunctionIdToOperation(deliveryCustomization.functionId)
      }
    })

    return res.status(status).send(deliveryCustomizationData);
  });

  // CREATE DELIVERY CUSTOMIZATION
  app.post("/api/delivery-customization", async (req, res) => {
    const functionId = matchOperationToFunctionId(req.body.operation);
    const payload = req.body;

    let query = {
      data: {
        query: `
          mutation DeliveryCustomization($deliveryCustomization: DeliveryCustomizationInput!) {
            deliveryCustomizationCreate(deliveryCustomization: $deliveryCustomization) {
              userErrors {
                code
                message
                field
              }
              deliveryCustomization {
                functionId
                id
                title
              }
            }
          }
        `,
        variables: {
          deliveryCustomization: {
            functionId,
            title: `${payload.operation} delivery option`,
            enabled: true,
          },
        },
      },
    };

    let reducer = ({ deliveryCustomizationCreate }) =>
      deliveryCustomizationCreate;

    const {
      status: deliveryCustomizationStatus,
      data: deliveryCustomizationData,
    } = await queryResponse(req, res, query, reducer);


    if (deliveryCustomizationStatus !== 200 || deliveryCustomizationData?.userErrors.length > 0) {
      return res
        .status(deliveryCustomizationStatus)
        .send(deliveryCustomizationData);
    }

    // we need the id from the customization to create the metafield
    query = {
      data: {
        query: `
          mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
            metafieldsSet(metafields: $metafields) {
              metafields {
                value
              }
              userErrors {
                code
                message
              }
            }
          }
        `,
        variables: {
          metafields: [
            {
              ...METAFIELD,
              ownerId: deliveryCustomizationData.deliveryCustomization.id,
              type: "single_line_text_field",
              value: payload.deliveryOptionName
            },
          ],
        },
      },
    };

    reducer = ({ metafieldsSet }) => ({
        metafields: metafieldsSet?.metafields[0],
        userErrors: metafieldsSet?.userErrors
      });

    const { status, data: metafieldData } = await queryResponse(
      req,
      res,
      query,
      reducer
    );

    if (status !== 200) return res.status(status).send(metafieldData);

    if (metafieldData?.userErrors.length > 0) {
      const send = Object.assign(
        {},
        metafieldData
      )

      res.status(200).send(send);
    }

    const send = Object.assign(
      {},
      normalizeCustomization(deliveryCustomizationData.deliveryCustomization),
      metafieldData
    );

    return res.status(200).send(send);
  });

  // UPDATE DELIVERY CUSTOMIZATION
  app.put("/api/delivery-customization/:id", async (req, res) => {
    const gid = idToGid(req.params.id);

    const payload = req.body;
    const functionId = payload.functionId;

    // update metafield
    let query = {
      data: {
        query: `
          mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
            metafieldsSet(metafields: $metafields) {
              metafields {
                value
              }
              userErrors {
                code
                message
              }
            }
          }
        `,
        variables: {
          metafields: [
            {
              ...METAFIELD,
              ownerId: gid,
              type: "single_line_text_field",
              value: payload.deliveryOptionName,
            },
          ],
        },
      },
    };

    let reducer = ({ metafieldsSet }) => {
      return {
        metafields: metafieldsSet?.metafields[0],
        userErrors: metafieldsSet?.userErrors
      }
    };

    const { status: metafieldStatus, data: metafieldData } =
      await queryResponse(req, res, query, reducer);

    if (metafieldStatus !== 200 ){
      return res.status(metafieldStatus).send(metafieldData);
    }

    if (metafieldData?.userErrors.length > 0) {
      const send = Object.assign(
        {},
        metafieldData
      )

      res.status(200).send(send);
    }

    query = {
      data: {
        query: `
          mutation DeliveryCustomizationUpdate($id: ID!, $deliveryCustomization: DeliveryCustomizationInput!) {
            deliveryCustomizationUpdate(id: $id, deliveryCustomization: $deliveryCustomization) {
              deliveryCustomization {
                id
                title
                enabled
                metafield(namespace:"${METAFIELD.namespace}", key:"${METAFIELD.key}") {
                  value
                }
              }
            }
          }
        `,
        variables: {
          id: gid,
          deliveryCustomization: {
            functionId,
            title: `${matchFunctionIdToOperation(functionId)} delivery option`,
            enabled: payload.enabled,
          },
        },
      },
    };

    reducer = ({ deliveryCustomizationUpdate }) =>
      normalizeCustomization(deliveryCustomizationUpdate.deliveryCustomization);
    const { status, data } = await queryResponse(req, res, query, reducer);

    return res.status(status).send(data);
  });

  // DELETE DELVIERY CUSTOMIZATION
  app.delete("/api/delivery-customization/:id", async (req, res) => {
    let query = {
      data: {
        query: `
          query DeliveryCustomization($id: ID!) {
            deliveryCustomization(id: $id) {
              id
              metafield(namespace:"${METAFIELD.namespace}", key:"${METAFIELD.key}") {
                id
              }
            }
          }
        `,
        variables: {
          id: idToGid(req.params.id),
        },
      },
    };

    let reducer = ({ deliveryCustomization }) => deliveryCustomization;

    let { status: customizationStatus, data: customizationData } =
      await queryResponse(req, res, query, reducer);

    if (customizationStatus !== 200)
      return res.status(customizationStatus).send(customizationData);

    // delete customization and metafield
    const mid = customizationData.metafield?.id;

    if (mid) {
      query = {
        data: {
          query: `
            mutation MetafieldDelete($id: ID!) {
              metafieldDelete(input: { id: $id }) {
                deletedId
              }
            }
          `,
          variables: {
            id: mid,
          },
        },
      };

      const { status: metafieldStatus, data: metafieldData } =
        await queryResponse(req, res, query);

      if (metafieldStatus !== 200)
        return res.status(metafieldStatus).send(metafieldData);
    }

    query = {
      data: {
        query: `
          mutation DeliveryCustomizationDelete($id: ID!) {
            deliveryCustomizationDelete(id: $id) {
              deletedId
            }
          }
        `,
        variables: {
          id: customizationData.id,
        },
      },
    };

    let { status, data } = await queryResponse(req, res, query);

    if (status === 200) data = { message: "Deleted with success" };

    return res.status(status).send(data);
  });

  // All endpoints after this point will have access to a request.body
  // attribute, as a result of the express.json() middleware

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
