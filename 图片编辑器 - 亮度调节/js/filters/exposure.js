/**
 * 曝光滤镜
 * 模拟相机曝光调整，影响整体亮度范围
 * @param {Uint8ClampedArray} data - 像素数据
 * @param {number} value - 曝光值 (-100 ~ 100)
 */
export function exposure(data, value) {
    if (value === 0) return;

    // 使用 2 的幂次来模拟曝光调整
    const factor = Math.pow(2, value / 100);

    for (let i = 0; i < data.length; i += 4) {
        data[i] = clamp(data[i] * factor);
        data[i + 1] = clamp(data[i + 1] * factor);
        data[i + 2] = clamp(data[i + 2] * factor);
    }
}

function clamp(value) {
    return Math.max(0, Math.min(255, Math.round(value)));
}
