/**
 * 对比度滤镜
 * @param {Uint8ClampedArray} data - 像素数据
 * @param {number} value - 对比度值 (-100 ~ 100)
 */
export function contrast(data, value) {
    const factor = (259 * (value + 255)) / (255 * (259 - value));

    for (let i = 0; i < data.length; i += 4) {
        data[i] = clamp(factor * (data[i] - 128) + 128);         // R
        data[i + 1] = clamp(factor * (data[i + 1] - 128) + 128); // G
        data[i + 2] = clamp(factor * (data[i + 2] - 128) + 128); // B
    }
}

function clamp(value) {
    return Math.max(0, Math.min(255, Math.round(value)));
}
