import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

if (
  process.env.npm_lifecycle_event === 'build' &&
  !process.env.CI &&
  !process.env.SHOPIFY_API_KEY
) {
  console.warn(
    '\nBuilding the frontend app without an API key. The frontend build will not run without an API key. Set the SHOPIFY_API_KEY environment variable when running the build command.\n',
  );
}

const proxyOptions = {
  target: `http://127.0.0.1:${process.env.BACKEND_PORT}`,
  changeOrigin: false,
  secure: true,
  ws: false,
};

const host = process.env.HOST
  ? process.env.HOST.replace(/https:\/\//, '')
  : 'localhost';

// HMR doesn't work on Firefox using localhost, so you can temporarily get that to work by setting the
// SHOPIFY_VITE_HMR_USE_POLLING env var when running this
let hmrConfig;

if (host === 'localhost') {
  hmrConfig = {
    protocol: 'ws',
    host: 'localhost',
    port: 64999,
    clientPort: 64999,
  };
} else {
  hmrConfig = {
    protocol: 'wss',
    host: host,
    port: process.env.FRONTEND_PORT,
    clientPort: 443,
  };
}
const root = new URL('.', import.meta.url).pathname;

// Function IDs are populated in ../../.env by the Shopify CLI after being deployed
const envDir =
  process.env.npm_lifecycle_event === 'dev'
    ? path.join(process.cwd(), '..', '..')
    : root;

// Note that this will expose all keys prefixed with `SHOPIFY_` to the frontend ap including SHOPIFY_API_SECRET
const envPrefix = ['VITE_', 'SHOPIFY_'];

export default defineConfig({
  root,
  plugins: [react()],
  envDir,
  envPrefix,
  resolve: {
    alias: {
      assets: path.resolve(root, './assets'),
      components: path.resolve(root, './components'),
      pages: path.resolve(root, './pages'),
      test: path.resolve(root, './test'),
    },
  },
  server: {
    hmr: hmrConfig,
    host: 'localhost',
    port: process.env.FRONTEND_PORT,
    proxy: {
      '^/(\\?.*)?$': proxyOptions,
      '^/api(/|(\\?.*)?$)': proxyOptions,
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
