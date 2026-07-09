/**
 * 清晰度滤镜
 * 增强中频对比度，提升细节表现
 * 使用简单的锐化算法实现
 * @param {Uint8ClampedArray} data - 像素数据
 * @param {number} value - 清晰度值 (-100 ~ 100)
 * @param {number} width - 图片宽度
 * @param {number} height - 图片高度
 */
export function clarity(data, value, width, height) {
    if (value === 0) return;

    var adjustment = value / 100;
    var factor = adjustment * 0.5;

    // 创建原始数据的副本用于读取
    var original = new Uint8ClampedArray(data);

    // 简化的锐化卷积核
    for (var y = 1; y < height - 1; y++) {
        for (var x = 1; x < width - 1; x++) {
            var idx = (y * width + x) * 4;

            for (var c = 0; c < 3; c++) {
                var center = original[idx + c];
                var top = original[((y - 1) * width + x) * 4 + c];
                var bottom = original[((y + 1) * width + x) * 4 + c];
                var left = original[(y * width + (x - 1)) * 4 + c];
                var right = original[(y * width + (x + 1)) * 4 + c];

                // 计算与邻近像素的差异
                var avg = (top + bottom + left + right) / 4;
                var diff = center - avg;

                // 增强边缘
                data[idx + c] = clamp(center + diff * factor);
            }
        }
    }
}

function clamp(value) {
    return Math.max(0, Math.min(255, Math.round(value)));
}
