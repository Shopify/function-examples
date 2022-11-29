import "@shopify/shopify-api/adapters/node";
import { shopifyApi, LATEST_API_VERSION } from "@shopify/shopify-api";
let { restResources } = await import(
  `@shopify/shopify-api/rest/admin/${LATEST_API_VERSION}`
);

const apiConfig = {
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  scopes: process.env.SCOPES.split(","),
  hostName: process.env.HOST.replace(/https?:\/\//, ""),
  hostScheme: process.env.HOST.split("://")[0],
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: true,
  ...(process.env.SHOP_CUSTOM_DOMAIN && {
    customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN],
  }),
  userAgentPrefix: `Discounts Tutorial App Template`,
  billing: undefined,
  restResources,
};

const shopify = shopifyApi(apiConfig);
export default shopify;
