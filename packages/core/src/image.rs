pub struct Image {
    pub width: u32,
    pub data: Vec<u8>,
}

struct Rgba {
    r: u32,
    g: u32,
    b: u32,
    a: u32,
}

// [r, g, b, a, r, g, b, a, r, g, b, a]

impl Image {
    /// y starts from 0
    pub fn getPixel(&self, x: u32, y: u32) -> (&u8, &u8, &u8, &u8) {
        let base_point = x + self.width * y;
        let r = self.data.get(base_point as usize).unwrap();
        let g = self.data.get(1 + base_point as usize).unwrap();
        let b = self.data.get(2 + base_point as usize).unwrap();
        let a = self.data.get(3 + base_point as usize).unwrap();
        (r, g, b, a)
    }

    pub fn putPixel() {}
}
