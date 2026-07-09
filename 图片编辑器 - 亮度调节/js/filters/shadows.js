/**
 * 阴影滤镜
 * 调整图片暗部区域的亮度
 * @param {Uint8ClampedArray} data - 像素数据
 * @param {number} value - 阴影值 (-100 ~ 100)
 */
export function shadows(data, value) {
    if (value === 0) return;

    var adjustment = value / 100;

    for (var i = 0; i < data.length; i += 4) {
        var r = data[i];
        var g = data[i + 1];
        var b = data[i + 2];

        // 计算亮度
        var luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

        // 只影响暗部区域（luminance < 0.5）
        if (luminance < 0.5) {
            // 亮度越低，影响越大
            var weight = (0.5 - luminance) * 2; // 0 ~ 1
            weight = weight * weight;

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
