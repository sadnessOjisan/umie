# umie

Wasm based, online mosaic tool.

## 🤘 how to use

### 🌍 For web

Go to https://umie.ojisan.dev/.

### 🏠 For local

Call workflow defined by cargo-make.

```sh
# install wasm pack
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

# install cargo-make
cargo install --force cargo-make

# run cargo-make workflow to show dev server
cargo make --makefile Makefile.toml run-web
```

## 🔧 For developer

### Develop

Rust

```
# build all
carbo build

# build only core
cargo build -p core

# run only cli
cargo run -p cli
```

Web

```
# start web server
cd website && npm run dev

# copy wasm

wasm-pack build --target web

cp -r packages/wasm/pkg website/src/pkg
```

### Analytics

https://analytics.google.com/analytics/web/?authuser=0&hl=ja#/p331397623/reports/dashboard?r=firebase-overview
