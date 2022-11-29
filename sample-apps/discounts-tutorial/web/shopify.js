import { LogSeverity, LATEST_API_VERSION } from "@shopify/shopify-api";
import { shopifyApp } from "@shopify/shopify-app-express";
import { SQLiteSessionStorage } from "@shopify/shopify-app-session-storage-sqlite";
let { restResources } = await import(
  `@shopify/shopify-api/rest/admin/${LATEST_API_VERSION}`
);

const DB_PATH = `${process.cwd()}/database.sqlite`;

const shopify = shopifyApp({
  api: {
    restResources,
  },
  // This should be replaced with your preferred storage strategy
  sessionStorage: new SQLiteSessionStorage(DB_PATH),
});

export default shopify;
