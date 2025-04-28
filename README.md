# Function Examples

This is the home of all the public examples of Shopify Functions. It's used by the CLI when running `yarn shopify app generate extension`. Feel free to look around! Do not edit these files directly.

## Local Development

### Expand Liquid Templates

If you wish to run the samples directly from this repository, you must first expand any `.liquid` templates with the following command.

```shell
yarn
yarn expand-liquid
# optionally provide the language flavor
yarn expand-liquid vanilla-js
yarn expand-liquid typescript
```

### Update API Versions and Function Schemas

To update API versions and function schemas automatically:

```shell
# Step 1: Link to a Shopify app to create shopify.app.toml with client_id
shopify app config link

# Step 2: Generate/update the extension directories list in shopify.app.toml
yarn generate-app

# Step 3: Run the comprehensive update command
yarn update-api-version
```

This process:
1. First, links to a Shopify app to create shopify.app.toml with the client ID
2. Then adds all extension directories to the same file (preserving the client_id)
3. Finally, runs a sequence of commands that:
   - Updates API versions across all extensions
   - Expands liquid templates
   - Updates function schemas

### Run Tests

```shell
# JavaScript
yarn test-js
# TypeScript
yarn test-ts
# Rust
cargo test
```

### Lint

```shell
# currently only applies to Rust
cargo fmt
cargo clippy -- -D warnings
```

### Update Dependencies

To check and update JavaScript dependencies in all package.json.liquid files:

```shell
yarn check-js-dependencies
```

To check and update Rust dependencies in all Cargo.toml and Cargo.toml.liquid files:

```shell
yarn check-rust-dependencies
```

These utilities will fetch the latest versions from npm and crates.io respectively and update your templates.
