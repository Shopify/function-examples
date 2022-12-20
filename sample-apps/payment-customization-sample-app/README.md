# Shopify Functions - Payment Customization Sample App

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE.md)

This is a sample app to help developers bootstrap a Shopify app that provides payment customization.

This template leverages the [Shopify API Library](https://github.com/Shopify/shopify-node-api) on the backend to create [an embedded app](https://shopify.dev/apps/tools/app-bridge/getting-started#embed-your-app-in-the-shopify-admin), and [Polaris](https://github.com/Shopify/polaris-react) and [App Bridge React](https://shopify.dev/tools/app-bridge/react-components) on the frontend.

It also provides a [Shopify Function](https://shopify.dev/api/functions) that allow merchants to hide a payment method from their checkout if a cart's subtotal is above a configurable set amount.

## Requirements

- If you don’t have one, [create a Shopify partner account](https://partners.shopify.com/signup).
- If you don’t have one, [create a Development store](https://help.shopify.com/en/partners/dashboard/development-stores#create-a-development-store) where you can install and test your app.
- [Install Rust](https://www.rust-lang.org/tools/install)
  - On Windows, Rust requires the [Microsoft C++ Build Tools](https://docs.microsoft.com/en-us/windows/dev-environment/rust/setup). Be sure to select the _Desktop development with C++_ workload when installing them.
- Install [`cargo-wasi`](https://bytecodealliance.github.io/cargo-wasi/)
  - `cargo install cargo-wasi`

### Before you start

- Enable the **Bogus Gateway** payment method in your development store's admin.

When testing this sample app make sure you use the full name of the payment method, which is **(for testing) Bogus Gateway**.

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
