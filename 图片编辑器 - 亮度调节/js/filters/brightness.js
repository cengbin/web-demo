/**
 * 亮度滤镜
 * @param {Uint8ClampedArray} data - 像素数据
 * @param {number} value - 亮度值 (-100 ~ 100)
 */
export function brightness(data, value) {
    const adjustment = value * 2.55; // 将 -100~100 映射到 -255~255

    for (let i = 0; i < data.length; i += 4) {
        data[i] = clamp(data[i] + adjustment);         // R
        data[i + 1] = clamp(data[i + 1] + adjustment); // G
        data[i + 2] = clamp(data[i + 2] + adjustment); // B
    }
}

function clamp(value) {
    return Math.max(0, Math.min(255, Math.round(value)));
}
