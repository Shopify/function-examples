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
