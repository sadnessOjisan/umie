pub mod image;

use image::Image;

pub fn mosaic(buf: Vec<u8>, width: u32, height: u32) -> Vec<u8> {
    let img = Image { width, data: buf };
    let block_size: u32 = 32;
    for h in (0..height).step_by(block_size as usize) {
        for w in (0..width).step_by(block_size as usize) {
            let mut r_sum: u32 = 0;
            let mut g_sum: u32 = 0;
            let mut b_sum: u32 = 0;
            let mut a_sum: u32 = 0;
            let mut safe_area_x = 0;
            let mut safe_area_y = 0;
            for y in 0..block_size as u32 {
                if height <= h + y as u32 {
                    break;
                }
                safe_area_y = y as u32 + 1;
                for x in 0..block_size as u32 {
                    if width <= w + x as u32 {
                        break;
                    }
                    r_sum += *img.getPixel(w + x, h + y).0 as u32;
                    g_sum += *img.getPixel(w + x, h + y).1 as u32;
                    b_sum += *img.getPixel(w + x, h + y).2 as u32;
                    a_sum += *img.getPixel(w + x, h + y).3 as u32;
                    safe_area_x = x + 1;
                }
            }

            // for y in 0..safe_area_y {
            //     for x in 0..safe_area_x {
            //         img.put_pixel(
            //             w + x,
            //             h + y,
            //             Rgba([
            //                 (r_sum / (block_size * block_size)) as u8,
            //                 (g_sum / (block_size * block_size)) as u8,
            //                 (b_sum / (block_size * block_size)) as u8,
            //                 (a_sum / (block_size * block_size)) as u8,
            //             ]),
            //         )
            //     }
            // }
        }
    }
    // img.as_raw().to_vec()
    // let _ = img.save("./umie/src/neww.jpeg");
    img.data
}
