build_wasm:
	cd rust_script && \
	cargo build --release --target "wasm32-wasi" && \
	mkdir -p ../build && \
	cp target/wasm32-wasi/release/*.wasm ../build/index.wasm && \
	cd -