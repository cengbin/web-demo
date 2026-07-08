/**
 * 应用入口
 */

import { ImageEditor } from './ImageEditor.js';
import { ImageLoader } from './ImageLoader.js';

class App {
    constructor() {
        // 编辑器实例
        this.editor = null;

        // DOM 元素
        this.canvas = document.getElementById('pixiCanvas');
        this.canvasContainer = document.getElementById('canvasContainer');
        this.uploadOverlay = document.getElementById('uploadOverlay');
        this.fileInput = document.getElementById('fileInput');
        this.imageInfo = document.getElementById('imageInfo');
        this.imageSize = document.getElementById('imageSize');
        this.imageFileName = document.getElementById('imageFileName');
        this.statusDot = document.getElementById('statusDot');
        this.statusText = document.getElementById('statusText');

        // 按钮
        this.uploadBtn = document.getElementById('uploadBtn');
        this.loadSampleBtn = document.getElementById('loadSampleBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.previewBtn = document.getElementById('previewBtn');

        // 滑块
        this.sliders = {
            brightness: document.getElementById('brightnessSlider'),
            contrast: document.getElementById('contrastSlider'),
            saturation: document.getElementById('saturationSlider'),
            hue: document.getElementById('hueSlider')
        };

        this.fills = {
            brightness: document.getElementById('brightnessFill'),
            contrast: document.getElementById('contrastFill'),
            saturation: document.getElementById('saturationFill'),
            hue: document.getElementById('hueFill')
        };

        this.thumbs = {
            brightness: document.getElementById('brightnessThumb'),
            contrast: document.getElementById('contrastThumb'),
            saturation: document.getElementById('saturationThumb'),
            hue: document.getElementById('hueThumb')
        };

        this.values = {
            brightness: document.getElementById('brightnessValue'),
            contrast: document.getElementById('contrastValue'),
            saturation: document.getElementById('saturationValue'),
            hue: document.getElementById('hueValue')
        };

        // 预设
        this.presets = {
            original: { brightness: 0, contrast: 0, saturation: 0, hue: 0 },
            bright: { brightness: 30, contrast: 10, saturation: 5, hue: 0 },
            dark: { brightness: -30, contrast: 20, saturation: -10, hue: 0 },
            'high-contrast': { brightness: 0, contrast: 50, saturation: 20, hue: 0 },
            grayscale: { brightness: 0, contrast: 0, saturation: -100, hue: 0 },
            warm: { brightness: 10, contrast: 5, saturation: 20, hue: 20 },
            cool: { brightness: 0, contrast: 10, saturation: -10, hue: -20 },
            vintage: { brightness: -10, contrast: 20, saturation: -30, hue: 10 }
        };

        this.init();
    }

    init() {
        // 创建编辑器实例
        this.editor = new ImageEditor(this.canvas);

        this.bindEvents();
        this.updateStatus('就绪', true);
    }

    bindEvents() {
        // 上传
        this.uploadOverlay.addEventListener('click', () => this.fileInput.click());
        this.uploadBtn.addEventListener('click', () => this.fileInput.click());

        // 拖拽
        this.canvasContainer.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.canvasContainer.style.boxShadow = '0 4px 12px rgba(24, 144, 255, 0.3)';
        });

        this.canvasContainer.addEventListener('dragleave', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.canvasContainer.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
        });

        this.canvasContainer.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.canvasContainer.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';

            const files = e.dataTransfer.files;
            if (files.length > 0 && files[0].type.startsWith('image/')) {
                this.loadImageFile(files[0]);
            }
        });

        // 文件选择
        this.fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.loadImageFile(e.target.files[0]);
            }
        });

        // 滑块
        Object.keys(this.sliders).forEach(key => {
            this.sliders[key].addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                this.editor.setAdjustment(key, value);
                this.updateSliderUI(key, value);
            });
        });

        // 预设按钮
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.applyPreset(btn.dataset.preset);
            });
        });

        // 操作按钮
        this.loadSampleBtn.addEventListener('click', () => this.loadSample());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.clearBtn.addEventListener('click', () => this.clear());
        this.downloadBtn.addEventListener('click', () => this.download());
        this.previewBtn.addEventListener('click', () => this.togglePreview());
    }

    async loadImageFile(file) {
        this.updateStatus('加载中...', false);
        try {
            const img = await ImageLoader.fromFile(file);
            this.editor.loadImage(img);
            this.updateFileInfo(file.name, img.width, img.height);
            this.enableControls(true);
            this.uploadOverlay.classList.add('hidden');
            this.imageInfo.classList.remove('hidden');
            this.updateStatus('图片已加载', true);
        } catch (err) {
            this.updateStatus('加载失败', false);
            console.error(err);
        }
    }

    async loadSample() {
        this.updateStatus('加载示例图片...', false);
        try {
            const img = await ImageLoader.fromURL('https://picsum.photos/800/600');
            this.editor.loadImage(img);
            this.updateFileInfo('sample.jpg', img.width, img.height);
            this.enableControls(true);
            this.uploadOverlay.classList.add('hidden');
            this.imageInfo.classList.remove('hidden');
            this.updateStatus('示例图片已加载', true);
        } catch {
            // 如果网络加载失败，使用本地生成的示例
            const img = ImageLoader.createSample();
            img.onload = () => {
                this.editor.loadImage(img);
                this.updateFileInfo('sample.png', img.width, img.height);
                this.enableControls(true);
                this.uploadOverlay.classList.add('hidden');
                this.imageInfo.classList.remove('hidden');
                this.updateStatus('示例图片已加载', true);
            };
        }
    }

    reset() {
        this.editor.reset();

        // 重置所有滑块
        Object.keys(this.sliders).forEach(key => {
            this.sliders[key].value = 0;
            this.updateSliderUI(key, 0);
        });

        this.updateStatus('已重置调整', true);
    }

    clear() {
        this.editor.clear();

        // 重置滑块
        Object.keys(this.sliders).forEach(key => {
            this.sliders[key].value = 0;
            this.updateSliderUI(key, 0);
        });

        this.uploadOverlay.classList.remove('hidden');
        this.imageInfo.classList.add('hidden');
        this.enableControls(false);
        this.updateStatus('图片已清除', true);
    }

    download() {
        if (!this.editor.hasImage()) return;

        const link = document.createElement('a');
        link.download = 'edited-image.png';
        link.href = this.editor.toDataURL();
        link.click();

        this.updateStatus('图片已下载', true);
    }

    togglePreview() {
        if (!this.editor.hasImage()) return;

        if (this.previewBtn.textContent === '预览对比') {
            // 显示原图
            const originalData = new ImageData(
                new Uint8ClampedArray(this.editor.originalImageData.data),
                this.editor.imageWidth,
                this.editor.imageHeight
            );
            this.editor.ctx.putImageData(originalData, 0, 0);
            this.previewBtn.textContent = '显示调整';
        } else {
            // 显示调整后的图
            this.editor.applyFilters();
            this.previewBtn.textContent = '预览对比';
        }
    }

    applyPreset(presetName) {
        const preset = this.presets[presetName];
        if (!preset) return;

        Object.keys(preset).forEach(key => {
            this.editor.setAdjustment(key, preset[key]);
            this.sliders[key].value = preset[key];
            this.updateSliderUI(key, preset[key]);
        });

        this.updateStatus(`已应用预设: ${presetName}`, true);
    }

    updateFileInfo(fileName, width, height) {
        this.imageSize.textContent = `${width} × ${height}`;
        this.imageFileName.textContent = fileName;
    }

    enableControls(enabled) {
        this.downloadBtn.disabled = !enabled;
        this.resetBtn.disabled = !enabled;
        this.clearBtn.disabled = !enabled;
        this.previewBtn.disabled = !enabled;
    }

    updateSliderUI(key, value) {
        const slider = this.sliders[key];
        const fill = this.fills[key];
        const thumb = this.thumbs[key];
        const valueDisplay = this.values[key];

        const min = parseInt(slider.min);
        const max = parseInt(slider.max);
        const percent = ((value - min) / (max - min)) * 100;

        fill.style.width = `${percent}%`;
        thumb.style.left = `${percent}%`;

        if (key === 'hue') {
            valueDisplay.textContent = `${value}°`;
        } else {
            valueDisplay.textContent = value;
        }
    }

    updateStatus(text, isActive) {
        this.statusText.textContent = text;
        this.statusDot.className = isActive ? 'status-dot' : 'status-dot inactive';
    }
}

// 启动应用
window.addEventListener('DOMContentLoaded', () => {
    new App();
});
