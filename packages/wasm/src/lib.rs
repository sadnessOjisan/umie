use core::exec;

use wasm_bindgen::{prelude::wasm_bindgen, Clamped};

#[wasm_bindgen]
pub fn exec_mosaic(buf: Clamped<Vec<u8>>, grain: u32, width: u32, height: u32) -> Vec<u8> {
    exec(buf.0, grain, width, height)
}
