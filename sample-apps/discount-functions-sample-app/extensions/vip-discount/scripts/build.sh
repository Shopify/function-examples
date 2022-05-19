# This should be run from the extension root directory

mkdir -p build
cargo build --release --target "wasm32-wasi"
cp target/wasm32-wasi/release/*.wasm build/unopt.wasm
$WASM_OPT -O4 --strip-debug -o build/index.wasm build/unopt.wasm
