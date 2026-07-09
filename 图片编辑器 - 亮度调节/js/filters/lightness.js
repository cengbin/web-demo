/**
 * 明度滤镜
 * 在 HSL 色彩空间中调整明度，更接近人眼感知的明暗变化
 * @param {Uint8ClampedArray} data - 像素数据
 * @param {number} value - 明度值 (-100 ~ 100)
 */

import { rgbToHsl, hslToRgb } from '../utils/color.js';

export function lightness(data, value) {
    if (value === 0) return;

    const adjustment = value / 100; // 映射到 -1 ~ 1

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // RGB 转 HSL
        const hsl = rgbToHsl(r, g, b);

        // 调整明度
        if (adjustment > 0) {
            // 变亮：向白色靠近
            hsl.l = hsl.l + (1 - hsl.l) * adjustment;
        } else {
            // 变暗：向黑色靠近
            hsl.l = hsl.l + hsl.l * adjustment;
        }

        // 限制在 0-1 范围内
        hsl.l = Math.max(0, Math.min(1, hsl.l));

        // HSL 转回 RGB
        const rgb = hslToRgb(hsl.h, hsl.s, hsl.l);

        data[i] = rgb.r;
        data[i + 1] = rgb.g;
        data[i + 2] = rgb.b;
    }
}
