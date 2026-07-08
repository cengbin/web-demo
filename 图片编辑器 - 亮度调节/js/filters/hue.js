/**
 * 色相滤镜
 * @param {Uint8ClampedArray} data - 像素数据
 * @param {number} value - 色相偏移值 (-180 ~ 180)
 */

import { rgbToHsl, hslToRgb } from '../utils/color.js';

export function hue(data, value) {
    if (value === 0) return;

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // RGB 转 HSL
        const hsl = rgbToHsl(r, g, b);

        // 调整色相
        hsl.h = (hsl.h + value + 360) % 360;

        // HSL 转回 RGB
        const rgb = hslToRgb(hsl.h, hsl.s, hsl.l);

        data[i] = rgb.r;
        data[i + 1] = rgb.g;
        data[i + 2] = rgb.b;
    }
}
