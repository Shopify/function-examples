build_wasm:
	cd rust_script && \
	cargo build --release --target "wasm32-wasi" && \
	cp target/wasm32-wasi/release/*.wasm ../build/index.wasm && \
	cd -