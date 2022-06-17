## Dependencies

### Rust

[Install Rust](https://www.rust-lang.org/tools/install)

Ensure you have the Wasm build target installed with `rustup show`. You should see `wasm32-wasi` as
a build target. If not, install the build target via `rustup target add wasm32-wasi`.

### `wasm-opt`
Wasm-opt is part of binaryen. The easiest way to install binaryen on MacOS is `brew install binaryen` or you can download your OS-specific binary on the [release page](https://github.com/WebAssembly/binaryen/releases).

## Building the function

This builds the rust package to Wasm as `build/index.wasm` and strips it from its debug symbols.

```sh
make
```
