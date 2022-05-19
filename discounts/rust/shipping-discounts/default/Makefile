build_wasm:
	mkdir -p build/ && \
	cargo build --release --target "wasm32-wasi" && \
	wasm-opt -Oz --strip-debug target/wasm32-wasi/release/*.wasm -o ./build/index.wasm
