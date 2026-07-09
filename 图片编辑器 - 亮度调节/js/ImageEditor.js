/**
 * 图片编辑器核心类
 * 使用原生 Canvas 实现色彩调整
 */

import { brightness } from './filters/brightness.js';
import { contrast } from './filters/contrast.js';
import { saturation } from './filters/saturation.js';
import { hue } from './filters/hue.js';
import { lightness } from './filters/lightness.js';
import { colorTemperature } from './filters/colorTemperature.js';
import { exposure } from './filters/exposure.js';
import { highlights } from './filters/highlights.js';
import { shadows } from './filters/shadows.js';
import { vibrance } from './filters/vibrance.js';
import { clarity } from './filters/clarity.js';
import { toneCurve } from './filters/toneCurve.js';

// 所有调整参数的默认值
var DEFAULT_ADJUSTMENTS = {
    brightness: 0,
    contrast: 0,
    saturation: 0,
    hue: 0,
    lightness: 0,
    colorTemperature: 0,
    exposure: 0,
    highlights: 0,
    shadows: 0,
    vibrance: 0,
    clarity: 0,
    toneCurve: 0
};

export class ImageEditor {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        // 原始图片数据（用于重置）
        this.originalImageData = null;

        // 当前图片尺寸
        this.imageWidth = 0;
        this.imageHeight = 0;

        // 调整参数
        this.adjustments = Object.assign({}, DEFAULT_ADJUSTMENTS);
    }

    /**
     * 加载图片到 Canvas
     * @param {HTMLImageElement} img
     */
    loadImage(img) {
        this.imageWidth = img.width;
        this.imageHeight = img.height;

        this.canvas.width = img.width;
        this.canvas.height = img.height;

        this.ctx.drawImage(img, 0, 0);

        this.originalImageData = this.ctx.getImageData(0, 0, img.width, img.height);
    }

    /**
     * 应用所有滤镜
     */
    applyFilters() {
        if (!this.originalImageData) return;

        var imageData = new ImageData(
            new Uint8ClampedArray(this.originalImageData.data),
            this.imageWidth,
            this.imageHeight
        );

        var data = imageData.data;

        // 按顺序应用滤镜
        exposure(data, this.adjustments.exposure);
        brightness(data, this.adjustments.brightness);
        contrast(data, this.adjustments.contrast);
        highlights(data, this.adjustments.highlights);
        shadows(data, this.adjustments.shadows);
        lightness(data, this.adjustments.lightness);
        saturation(data, this.adjustments.saturation);
        vibrance(data, this.adjustments.vibrance);
        hue(data, this.adjustments.hue);
        colorTemperature(data, this.adjustments.colorTemperature);
        toneCurve(data, this.adjustments.toneCurve);
        clarity(data, this.adjustments.clarity, this.imageWidth, this.imageHeight);

        this.ctx.putImageData(imageData, 0, 0);
    }

    /**
     * 设置调整参数
     * @param {string} key - 参数名
     * @param {number} value - 参数值
     */
    setAdjustment(key, value) {
        this.adjustments[key] = value;
        this.applyFilters();
    }

    /**
     * 批量设置调整参数
     * @param {object} adjustments - 参数对象
     */
    setAdjustments(adjustments) {
        Object.assign(this.adjustments, adjustments);
        this.applyFilters();
    }

    /**
     * 显示原图
     */
    showOriginal() {
        if (!this.originalImageData) return;
        this.ctx.putImageData(this.originalImageData, 0, 0);
    }

    /**
     * 重置所有调整
     */
    reset() {
        this.adjustments = Object.assign({}, DEFAULT_ADJUSTMENTS);
        this.applyFilters();
    }

    /**
     * 清除画布
     */
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.originalImageData = null;
        this.imageWidth = 0;
        this.imageHeight = 0;
        this.adjustments = Object.assign({}, DEFAULT_ADJUSTMENTS);
    }

    /**
     * 导出为 PNG
     * @returns {string} Data URL
     */
    toDataURL() {
        return this.canvas.toDataURL('image/png');
    }

    /**
     * 是否已加载图片
     * @returns {boolean}
     */
    hasImage() {
        return this.originalImageData !== null;
    }
}
