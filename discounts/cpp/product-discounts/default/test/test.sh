
cd ..

WASI_SDK_PATH="/usr/local/wasi-sdk-16.0"

# wasi
${WASI_SDK_PATH}/bin/clang++ -Oz -fno-exceptions -std=c++17  src/function.cpp src/main.cpp -o build/main.wasm

cat test/input.example.json | tr '\n' ' ' | WASMTIME_BACKTRACE_DETAILS=1 wasmtime build/main.wasm