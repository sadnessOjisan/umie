use core::mosaic;

use wasm_bindgen::{prelude::wasm_bindgen, Clamped};

#[wasm_bindgen]
pub fn exec_mosaic(buf: Clamped<Vec<u8>>, width: u32, height: u32) -> Vec<u8> {
    mosaic(buf.0, width, height)
}
