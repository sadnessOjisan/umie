use core::exec;
use image::{io::Reader as ImageReader, RgbaImage};
use std::path::Path;

fn main() {
    let path = Path::new("./packages/cli/src/test.png");
    let img = ImageReader::open(path).unwrap().decode().unwrap();
    let width = img.width();
    let height = img.height();
    let vec = img.as_bytes().to_vec();
    let converted = exec(vec, width, height);
    let img = RgbaImage::from_vec(width, height, converted).unwrap();
    let _ = img.save("./packages/cli/src/result.png");
}
