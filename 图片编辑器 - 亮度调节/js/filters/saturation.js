/**
 * 饱和度滤镜
 * @param {Uint8ClampedArray} data - 像素数据
 * @param {number} value - 饱和度值 (-100 ~ 100)
 */
export function saturation(data, value) {
    const s = 1 + value / 100; // 映射到 0~2

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // 使用加权平均计算灰度值
        const gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;

        data[i] = clamp(gray + (r - gray) * s);         // R
        data[i + 1] = clamp(gray + (g - gray) * s);     // G
        data[i + 2] = clamp(gray + (b - gray) * s);     // B
    }
}

function clamp(value) {
    return Math.max(0, Math.min(255, Math.round(value)));
}
