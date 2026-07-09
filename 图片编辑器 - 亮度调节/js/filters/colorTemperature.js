/**
 * 色温滤镜
 * 调整图片的冷暖色调
 * @param {Uint8ClampedArray} data - 像素数据
 * @param {number} value - 色温值 (-100 ~ 100)，负值偏冷(蓝)，正值偏暖(红)
 */
export function colorTemperature(data, value) {
    if (value === 0) return;

    const adjustment = value * 1.5; // 增强效果

    for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];

        if (adjustment > 0) {
            // 暖色调：增加红色，减少蓝色
            r = r + adjustment;
            b = b - adjustment * 0.5;
        } else {
            // 冷色调：增加蓝色，减少红色
            r = r + adjustment * 0.5;
            b = b - adjustment;
        }

        data[i] = clamp(r);
        data[i + 1] = clamp(g);
        data[i + 2] = clamp(b);
    }
}

function clamp(value) {
    return Math.max(0, Math.min(255, Math.round(value)));
}
