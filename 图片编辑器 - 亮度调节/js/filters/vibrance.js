/**
 * 自然饱和度滤镜
 * 智能调整饱和度，保护肤色，避免过饱和
 * @param {Uint8ClampedArray} data - 像素数据
 * @param {number} value - 自然饱和度值 (-100 ~ 100)
 */
export function vibrance(data, value) {
    if (value === 0) return;

    var adjustment = value / 100;

    for (var i = 0; i < data.length; i += 4) {
        var r = data[i];
        var g = data[i + 1];
        var b = data[i + 2];

        // 计算当前像素的饱和度
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        var saturation = max === 0 ? 0 : (max - min) / max;

        // 饱和度越低，调整越大；饱和度越高，调整越小
        var weight = 1 - saturation;
        weight = weight * weight; // 非线性权重

        // 肤色检测（简单判断：红色分量较高，蓝绿分量相对均衡）
        var skinWeight = 1;
        if (r > g && r > b && r > 100) {
            // 可能是肤色区域，减少调整
            var skinDiff = Math.abs(g - b) / r;
            if (skinDiff < 0.3) {
                skinWeight = 0.5; // 保护肤色
            }
        }

        var factor = adjustment * weight * skinWeight;

        // 计算灰度值
        var gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;

        // 调整饱和度
        data[i] = clamp(gray + (r - gray) * (1 + factor));
        data[i + 1] = clamp(gray + (g - gray) * (1 + factor));
        data[i + 2] = clamp(gray + (b - gray) * (1 + factor));
    }
}

function clamp(value) {
    return Math.max(0, Math.min(255, Math.round(value)));
}
