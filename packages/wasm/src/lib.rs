use core::mosaic;

use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
pub fn exec_mosaic(buf: Vec<u32>, width: u32, height: u32) -> Vec<u32> {
    mosaic(buf, width, height)
}
