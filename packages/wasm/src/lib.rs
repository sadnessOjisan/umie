use core::add;

use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
pub fn dummy_for_test_calling_wasm() -> usize {
    let actual = add(1, 2);
    actual
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = dummy_for_test_calling_wasm();
        assert_eq!(result, 3);
    }
}
