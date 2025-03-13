# Shopify Function development with Rust

## Dependencies

- [Install Rust](https://www.rust-lang.org/tools/install)
  - On Windows, Rust requires the [Microsoft C++ Build Tools](https://docs.microsoft.com/en-us/windows/dev-environment/rust/setup). Be sure to select the _Desktop development with C++_ workload when installing them.

## Building the function

You can build this individual function using `cargo build`.

```shell
cargo build --target=wasm32-wasip1 --release
```

The Shopify CLI `build` command will also execute this, based on the configuration in `shopify.extension.toml`.
