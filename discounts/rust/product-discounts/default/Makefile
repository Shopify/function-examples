build_wasm:
	mkdir -p build/ && \
	cargo build --release --target "wasm32-wasi" && \
	wasm-opt -O3 --strip-debug target/wasm32-wasi/release/*.wasm -o ./build/index.wasm
