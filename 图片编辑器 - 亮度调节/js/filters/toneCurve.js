/**
 * 色调曲线滤镜
 * 通过简单的 S 曲线或反 S 曲线调整色调
 * @param {Uint8ClampedArray} data - 像素数据
 * @param {number} value - 色调曲线值 (-100 ~ 100)
 */
export function toneCurve(data, value) {
    if (value === 0) return;

    var adjustment = value / 100;

    // 预计算查找表（256个值）
    var lut = new Uint8Array(256);

    for (var i = 0; i < 256; i++) {
        var x = i / 255; // 归一化到 0-1

        var y;
        if (adjustment > 0) {
            // S 曲线：增加对比度
            // 使用三次贝塞尔曲线近似
            y = x + adjustment * 0.3 * Math.sin(Math.PI * x);
        } else {
            // 反 S 曲线：降低对比度
            y = x + adjustment * 0.3 * Math.sin(Math.PI * x);
        }

        // 限制范围
        y = Math.max(0, Math.min(1, y));

        lut[i] = Math.round(y * 255);
    }

    // 应用查找表
    for (var j = 0; j < data.length; j += 4) {
        data[j] = lut[data[j]];
        data[j + 1] = lut[data[j + 1]];
        data[j + 2] = lut[data[j + 2]];
    }
}
