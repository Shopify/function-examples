export const STANDARD_CARGO_TEMPLATE = `[package]
name = "{{handle | replace: " ", "-" | downcase}}"
version = "1.0.0"
edition = "2021"

[dependencies]
serde = { version = "1.0.13", features = ["derive"] }
serde_json = "1.0"
shopify_function = "0.8.1"
graphql_client = "0.14.0"

[profile.release]
lto = true
opt-level = 'z'
strip = true
`;

export const STANDARD_MAIN_RS = `use std::process;
pub mod run;

fn main() {
    eprintln!("Please invoke a named export.");
    process::exit(1);
}
`;

export const STANDARD_SHOPIFY_EXTENSION_TEMPLATE = `api_version = "2025-01"

[[extensions]]
name = "t:name"
handle = "{{handle}}"
type = "function"
{% if uid %}uid = "{{ uid }}"{% endif %}

[extensions.ui.paths]
create = "/"
details = "/"
`;

export const STANDARD_LOCALE_TEMPLATE = `{
  "name": "{{name}}",
  "description": "{{name}}"
}`;

export const STANDARD_PACKAGE_JSON_TEMPLATE = `{
  "name": "{{handle}}",
  "version": "0.0.1",
  "license": "UNLICENSED",
  "scripts": {
    "shopify": "npm exec -- shopify",
    "typegen": "npm exec -- shopify app function typegen",
    "build": "npm exec -- shopify app function build",
    "preview": "npm exec -- shopify app function run",
    "test": "vitest"
  },
  "codegen": {
    "schema": "schema.graphql",
    "documents": "src/*.graphql",
    "generates": {
      "./generated/api.ts": {
        "plugins": [
          "typescript",
          "typescript-operations"
        ]
      }
    },
    "config": {
      "omitOperationSuffix": true
    }
  },
  "devDependencies": {
    "vitest": "^0.29.8"
  }
}`;

export const BUILD_CONFIGS = {
  rust: {
    command: 'cargo build --target=wasm32-wasip1 --release',
    path: 'target/wasm32-wasip1/release/{{handle | replace: "-", "_" | downcase}}.wasm',
    watch: '["src/**/*.rs"]'
  },
  javascript: {
    command: '',
    path: 'dist/function.wasm',
    watch: '["src/**/*"]'
  },
  wasm: {
    command: 'echo \'build the wasm\'',
    path: '',
    watch: '[]'
  }
}; 