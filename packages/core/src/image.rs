pub struct Image {
    pub width: u32,
    pub data: Vec<u8>,
}

type Rgba<'a> = (&'a u8, &'a u8, &'a u8, &'a u8);

// [r, g, b, a, r, g, b, a, r, g, b, a]

impl Image {
    /// y starts from 0
    pub fn getPixel(&self, x: u32, y: u32) -> Rgba {
        let base_point = x + self.width * y;
        let r = self.data.get(base_point as usize).unwrap();
        let g = self.data.get(1 + base_point as usize).unwrap();
        let b = self.data.get(2 + base_point as usize).unwrap();
        let a = self.data.get(3 + base_point as usize).unwrap();
        (r, g, b, a)
    }

    // pub fn putPixel(&self, x: u32, y: u32, rgba: Rgba) {
    //     let base_point = x + self.width * y;
    //     let a = &self.data.as_mut();
    //     &self.data[base_point as usize] = rgba.0;
    // }
}
