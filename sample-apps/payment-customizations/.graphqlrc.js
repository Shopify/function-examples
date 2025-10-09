import fs from "fs";
import { LATEST_API_VERSION } from "@shopify/shopify-api";
import { shopifyApiProject, ApiType } from "@shopify/api-codegen-preset";

function getConfig() {
  const config = {
    projects: {
      default: shopifyApiProject({
        apiType: ApiType.Admin,
        apiVersion: LATEST_API_VERSION,
        documents: ["./app/**/*.{js,jsx}", "./app/.server/**/*.{js,jsx}"],
        outputDir: "./app/types",
      }),
    },
  };

  let extensions = [];
  try {
    extensions = fs.readdirSync("./extensions");
  } catch {
    // ignore if no extensions
  }

  for (const entry of extensions) {
    const extensionPath = `./extensions/${entry}`;
    const schema = `${extensionPath}/schema.graphql`;
    if (!fs.existsSync(schema)) {
      continue;
    }
    config.projects[entry] = {
      schema,
      documents: [`${extensionPath}/**/*.graphql`],
    };
  }

  return config;
}

const config = getConfig();

export default config; 