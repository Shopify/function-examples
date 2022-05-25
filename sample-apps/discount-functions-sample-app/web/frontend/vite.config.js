import { defineConfig } from 'vite';
import path from 'path';

// prettier-ignore
const INDEX_ROUTE = "^/(\\?.*)?$";
const API_ROUTE = '^/api/';

const root = new URL('.', import.meta.url).pathname;
export default defineConfig({
  root,
  define: {
    'process.env.SHOPIFY_API_KEY': JSON.stringify(process.env.SHOPIFY_API_KEY),
    // TODO: read these from env
    'process.env.ORDER_DISCOUNT_ID': JSON.stringify(
      '9e05f536-4c13-44da-9ff6-962e0807ef46',
    ),
    'process.env.PRODUCT_DISCOUNT_ID': JSON.stringify(
      'ac1ffd0f-959e-484d-9a4c-bf96e127331a',
    ),
    'process.env.SHIPPING_DISCOUNT_ID': JSON.stringify(
      '2319d4aa-b326-4cd5-a400-befbe79bc4fb',
    ),
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
  resolve: {
    alias: {
      assets: path.resolve(root, './assets'),
      components: path.resolve(root, './components'),
      pages: path.resolve(root, './pages'),
      test: path.resolve(root, './test'),
    },
  },
  server: {
    port: process.env.FRONTEND_PORT,
    middlewareMode: 'html',
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 64999,
      clientPort: 64999,
    },
    proxy: {
      [INDEX_ROUTE]: {
        target: `http://127.0.0.1:${process.env.BACKEND_PORT}`,
        changeOrigin: false,
        secure: true,
        ws: false,
      },
      [API_ROUTE]: {
        target: `http://127.0.0.1:${process.env.BACKEND_PORT}`,
        changeOrigin: false,
        secure: true,
        ws: false,
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.js',
    deps: {
      inline: ['@shopify/react-testing'],
    },
  },
});
