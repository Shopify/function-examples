# Shopify App Node

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE.md)

This is a sample app to help developers bootstrap a Shopify app that provides discount functions.

It leverages the [Shopify API Library](https://github.com/Shopify/shopify-node-api) on the backend to create [an embedded app](https://shopify.dev/apps/tools/app-bridge/getting-started#embed-your-app-in-the-shopify-admin), and [Polaris](https://github.com/Shopify/polaris-react) and [App Bridge React](https://shopify.dev/tools/app-bridge/react-components) on the frontend.

It also provides [Shopify Functions](#) that allow merchants to set up discounts using the custom logic provided in this app.

## Requirements

- If you don’t have one, [create a Shopify partner account](https://partners.shopify.com/signup).
- If you don’t have one, [create a Development store](https://help.shopify.com/en/partners/dashboard/development-stores#create-a-development-store) where you can install and test your app.
- [Install Rust](https://www.rust-lang.org/tools/install) and `cargo-wasi`
  - `cargo install cargo-wasi`
- On M1 Macs, you'll also need to install the Binaryen toolchain separately and set the `WASM_OPT` environment variable. ([related issue](https://github.com/bytecodealliance/cargo-wasi/issues/112))
  - `brew install binaryen`
  - `export WASM_OPT=/opt/homebrew/bin/wasm-opt`

## Installation

1. `yarn deploy` from the app root. This will allow you to create a new app, if needed.
2. Rename the `.env.sample` file in `web/frontend` to `.env` and fill in the function UUIDs for each of your functions from the root `.env`
3. Run `yarn dev` to start the server

## Developer resources

- [Introduction to Shopify apps](https://shopify.dev/apps/getting-started)
  - [App authentication](https://shopify.dev/apps/auth)
- [Shopify CLI command reference](https://shopify.dev/apps/tools/cli/app)
- [Shopify API Library documentation](https://github.com/Shopify/shopify-node-api/tree/main/docs)

## License

This repository is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
