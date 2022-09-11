# umie

mosaic

## 🤘 how to use

### 🌍 For web

Go to https://umie.ojisan.dev/.

### 🏠 For local

Call workflow defined by cargo-make.

```sh
# install wasm pack
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

# install cargo make
cargo install --force cargo-make

cargo make --makefile Makefile.toml run-web
```
