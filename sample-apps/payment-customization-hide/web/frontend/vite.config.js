import { defineConfig } from "vite";
import { dirname } from "path";
import { fileURLToPath } from "url";
import https from "https";

if (
  process.env.npm_lifecycle_event === "build" &&
  !process.env.CI &&
  !process.env.SHOPIFY_API_KEY
) {
  console.warn(
    "\nBuilding the frontend app without an API key. The frontend build will not run without an API key. Set the SHOPIFY_API_KEY environment variable when running the build command.\n"
  );
}

const proxyOptions = {
  target: `http://127.0.0.1:${process.env.BACKEND_PORT}`,
  changeOrigin: false,
  secure: true,
  ws: false,
};

const host = process.env.HOST
  ? process.env.HOST.replace(/https:\/\//, "")
  : undefined;

// HMR doesn't work on Firefox using localhost, so you can temporarily get that to work by setting the
// SHOPIFY_VITE_HMR_USE_POLLING env var when running this
let hmrConfig;
if (process.env.SHOPIFY_VITE_HMR_USE_POLLING) {
  hmrConfig = {
    server: https.createServer(),
  };
} else if (process.env.SHOPIFY_VITE_HMR_USE_WSS) {
  hmrConfig = {
    protocol: host ? "wss" : "ws",
    host: host || "localhost",
    port: process.env.FRONTEND_PORT,
    clientPort: 443,
  };
} else {
  hmrConfig = {
    protocol: "ws",
    host: "localhost",
    port: 64999,
    clientPort: 64999,
  };
}

export default defineConfig({
  root: dirname(fileURLToPath(import.meta.url)),
  define: {
    "process.env.SHOPIFY_API_KEY": JSON.stringify(process.env.SHOPIFY_API_KEY),
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
  resolve: {
    preserveSymlinks: true,
  },
  server: {
    host: process.env.SHOPIFY_VITE_HMR_USE_WSS ? "0.0.0.0" : "localhost",
    port: process.env.FRONTEND_PORT,
    hmr: hmrConfig,
    proxy: {
      "^/(\\?.*)?$": proxyOptions,
      "^/api(/|(\\?.*)?$)": proxyOptions,
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./test/setup.js",
    deps: {
      inline: ["@shopify/react-testing"],
    },
  },
});
