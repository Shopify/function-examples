# Shopify App Node

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE.md)

This is a sample app to help developers bootstrap a Shopify app that provides discount functions.

It leverages the [Shopify API Library](https://github.com/Shopify/shopify-node-api) on the backend to create [an embedded app](https://shopify.dev/apps/tools/app-bridge/getting-started#embed-your-app-in-the-shopify-admin), and [Polaris](https://github.com/Shopify/polaris-react) and [App Bridge React](https://shopify.dev/tools/app-bridge/react-components) on the frontend.

It also provides [Shopify Functions](#) that allow merchants to set up discounts using the custom logic provided in this app.

## Requirements

- If you don’t have one, [create a Shopify partner account](https://partners.shopify.com/signup).
- If you don’t have one, [create a Development store](https://help.shopify.com/en/partners/dashboard/development-stores#create-a-development-store) where you can install and test your app.
- [Install Rust](https://www.rust-lang.org/tools/install)
  - On Windows, Rust requires the [Microsoft C++ Build Tools](https://docs.microsoft.com/en-us/windows/dev-environment/rust/setup). Be sure to select the _Desktop development with C++_ workload when installing them.
- Install [`cargo-wasi`](https://bytecodealliance.github.io/cargo-wasi/)
  - `cargo install cargo-wasi`
- On M1 Macs, you'll also need to install the Binaryen toolchain separately and set the `WASM_OPT` environment variable. ([related issue](https://github.com/bytecodealliance/cargo-wasi/issues/112))
  - `brew install binaryen`
  - Add `export WASM_OPT=/opt/homebrew/bin/wasm-opt` to your `.bashrc` or `.zshrc`

## Installation

1. Run `yarn deploy` from the app root. This will allow you to create a new app, if needed.
2. Run `yarn dev` to start the local dev server.
3. Follow the output instructions to install your app.

## Developer resources

- [Introduction to Shopify apps](https://shopify.dev/apps/getting-started)
  - [App authentication](https://shopify.dev/apps/auth)
- [Shopify CLI command reference](https://shopify.dev/apps/tools/cli/app)
- [Shopify API Library documentation](https://github.com/Shopify/shopify-node-api/tree/main/docs)

## License

This repository is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
