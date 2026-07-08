/**
 * 图片编辑器核心类
 * 使用原生 Canvas 实现色彩调整
 */

import { brightness } from './filters/brightness.js';
import { contrast } from './filters/contrast.js';
import { saturation } from './filters/saturation.js';
import { hue } from './filters/hue.js';

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
        this.adjustments = {
            brightness: 0,
            contrast: 0,
            saturation: 0,
            hue: 0
        };
    }

    /**
     * 加载图片到 Canvas
     * @param {HTMLImageElement} img
     */
    loadImage(img) {
        this.imageWidth = img.width;
        this.imageHeight = img.height;

        // 设置 Canvas 尺寸
        this.canvas.width = img.width;
        this.canvas.height = img.height;

        // 绘制图片
        this.ctx.drawImage(img, 0, 0);

        // 保存原始像素数据
        this.originalImageData = this.ctx.getImageData(0, 0, img.width, img.height);
    }

    /**
     * 应用所有滤镜
     */
    applyFilters() {
        if (!this.originalImageData) return;

        // 从原始数据创建新的 ImageData
        const imageData = new ImageData(
            new Uint8ClampedArray(this.originalImageData.data),
            this.imageWidth,
            this.imageHeight
        );

        const data = imageData.data;

        // 按顺序应用滤镜
        brightness(data, this.adjustments.brightness);
        contrast(data, this.adjustments.contrast);
        saturation(data, this.adjustments.saturation);
        hue(data, this.adjustments.hue);

        // 写回 Canvas
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
     * 重置所有调整
     */
    reset() {
        this.adjustments = {
            brightness: 0,
            contrast: 0,
            saturation: 0,
            hue: 0
        };
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
        this.adjustments = {
            brightness: 0,
            contrast: 0,
            saturation: 0,
            hue: 0
        };
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
