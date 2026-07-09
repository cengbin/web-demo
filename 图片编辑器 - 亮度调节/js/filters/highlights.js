/**
 * 高光滑镜
 * 调整图片亮部区域的亮度
 * @param {Uint8ClampedArray} data - 像素数据
 * @param {number} value - 高光值 (-100 ~ 100)
 */
export function highlights(data, value) {
    if (value === 0) return;

    const adjustment = value / 100;

    for (let i = 0; i < data.length; i += 4) {
        var r = data[i];
        var g = data[i + 1];
        var b = data[i + 2];

        // 计算亮度（加权平均）
        var luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

        // 只影响亮部区域（luminance > 0.5）
        if (luminance > 0.5) {
            // 亮度越高，影响越大
            var weight = (luminance - 0.5) * 2; // 0 ~ 1
            weight = weight * weight; // 非线性权重

            var factor = adjustment * weight * 100;

            data[i] = clamp(r + factor);
            data[i + 1] = clamp(g + factor);
            data[i + 2] = clamp(b + factor);
        }
    }
}

function clamp(value) {
    return Math.max(0, Math.min(255, Math.round(value)));
}
