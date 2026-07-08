class ImageEditor {
    constructor() {
        this.app = null;
        this.sprite = null;
        this.colorMatrixFilter = null;
        this.currentImage = null;
        this.adjustments = {
            brightness: 0,
            contrast: 0,
            saturation: 0,
            hue: 0
        };

        this.canvas = document.getElementById('pixiCanvas');
        this.canvasContainer = document.getElementById('canvasContainer');
        this.uploadOverlay = document.getElementById('uploadOverlay');
        this.fileInput = document.getElementById('fileInput');
        this.imageInfo = document.getElementById('imageInfo');
        this.imageSize = document.getElementById('imageSize');
        this.imageFileName = document.getElementById('imageFileName');
        this.statusDot = document.getElementById('statusDot');
        this.statusText = document.getElementById('statusText');

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

        this.uploadBtn = document.getElementById('uploadBtn');
        this.loadSampleBtn = document.getElementById('loadSampleBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.previewBtn = document.getElementById('previewBtn');

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
        this.initPixiApp();
        this.bindEvents();
        this.updateStatus('就绪', true);
    }

    initPixiApp() {
        this.app = new PIXI.Application({
            view: this.canvas,
            width: 800,
            height: 600,
            backgroundColor: 0xfafafa,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true
        });

        this.colorMatrixFilter = new PIXI.filters.ColorMatrixFilter();
        this.app.stage.filters = [this.colorMatrixFilter];
    }

    bindEvents() {
        this.uploadOverlay.addEventListener('click', () => this.fileInput.click());
        this.uploadBtn.addEventListener('click', () => this.fileInput.click());

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
                this.loadImage(files[0]);
            }
        });

        this.fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.loadImage(e.target.files[0]);
            }
        });

        Object.keys(this.sliders).forEach(key => {
            this.sliders[key].addEventListener('input', (e) => {
                this.adjustments[key] = parseInt(e.target.value);
                this.updateSliderUI(key);
                this.applyFilters();
            });
        });

        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.applyPreset(btn.dataset.preset);
            });
        });

        this.loadSampleBtn.addEventListener('click', () => this.loadSampleImage());
        this.resetBtn.addEventListener('click', () => this.resetAdjustments());
        this.clearBtn.addEventListener('click', () => this.clearImage());
        this.downloadBtn.addEventListener('click', () => this.downloadImage());
        this.previewBtn.addEventListener('click', () => this.togglePreview());
    }

    loadImage(file) {
        this.updateStatus('加载中...', false);
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                this.currentImage = img;
                this.displayImage(img);
                this.updateFileInfo(file.name, img.width, img.height);
                this.enableControls(true);
                this.updateStatus('图片已加载', true);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    loadSampleImage() {
        this.updateStatus('加载示例图片...', false);
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            this.currentImage = img;
            this.displayImage(img);
            this.updateFileInfo('sample.jpg', img.width, img.height);
            this.enableControls(true);
            this.updateStatus('示例图片已加载', true);
        };
        img.onerror = () => this.createSampleImage();
        img.src = 'https://picsum.photos/800/600';
    }

    createSampleImage() {
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 600;
        const ctx = canvas.getContext('2d');

        const gradient = ctx.createLinearGradient(0, 0, 800, 600);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 800, 600);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(200, 200, 100, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.beginPath();
        ctx.arc(500, 350, 150, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('示例图片', 400, 300);
        ctx.font = '24px Arial';
        ctx.fillText('拖拽或点击上传您的图片', 400, 350);

        const img = new Image();
        img.onload = () => {
            this.currentImage = img;
            this.displayImage(img);
            this.updateFileInfo('sample.png', img.width, img.height);
            this.enableControls(true);
            this.updateStatus('示例图片已加载', true);
        };
        img.src = canvas.toDataURL();
    }

    displayImage(img) {
        if (this.sprite) {
            this.app.stage.removeChild(this.sprite);
            this.sprite.destroy();
        }

        const canvasWidth = this.app.screen.width;
        const canvasHeight = this.app.screen.height;
        const scale = Math.min(canvasWidth / img.width, canvasHeight / img.height);

        const texture = PIXI.Texture.from(img);
        this.sprite = new PIXI.Sprite(texture);

        this.sprite.anchor.set(0.5);
        this.sprite.x = canvasWidth / 2;
        this.sprite.y = canvasHeight / 2;
        this.sprite.scale.set(scale);

        this.app.stage.addChild(this.sprite);

        this.uploadOverlay.classList.add('hidden');
        this.imageInfo.classList.remove('hidden');

        this.applyFilters();
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

    updateSliderUI(key) {
        const slider = this.sliders[key];
        const fill = this.fills[key];
        const thumb = this.thumbs[key];
        const value = this.values[key];

        const min = parseInt(slider.min);
        const max = parseInt(slider.max);
        const val = parseInt(slider.value);

        const percent = ((val - min) / (max - min)) * 100;

        fill.style.width = `${percent}%`;
        thumb.style.left = `${percent}%`;

        if (key === 'hue') {
            value.textContent = `${val}°`;
        } else {
            value.textContent = val;
        }
    }

    applyFilters() {
        if (!this.sprite) return;

        this.colorMatrixFilter.reset();

        const brightness = this.adjustments.brightness / 100;
        this.colorMatrixFilter.brightness(1 + brightness, false);

        const contrast = this.adjustments.contrast / 100;
        this.colorMatrixFilter.contrast(contrast, false);

        const saturation = this.adjustments.saturation / 100;
        this.colorMatrixFilter.saturate(saturation, false);

        const hue = this.adjustments.hue;
        this.colorMatrixFilter.hue(hue, false);
    }

    applyPreset(presetName) {
        const preset = this.presets[presetName];
        if (!preset) return;

        Object.keys(preset).forEach(key => {
            this.adjustments[key] = preset[key];
            this.sliders[key].value = preset[key];
            this.updateSliderUI(key);
        });

        this.applyFilters();
        this.updateStatus(`已应用预设: ${presetName}`, true);
    }

    resetAdjustments() {
        Object.keys(this.adjustments).forEach(key => {
            this.adjustments[key] = 0;
            this.sliders[key].value = 0;
            this.updateSliderUI(key);
        });

        this.applyFilters();
        this.updateStatus('已重置调整', true);
    }

    clearImage() {
        if (this.sprite) {
            this.app.stage.removeChild(this.sprite);
            this.sprite.destroy();
            this.sprite = null;
        }

        this.currentImage = null;
        this.uploadOverlay.classList.remove('hidden');
        this.imageInfo.classList.add('hidden');
        this.enableControls(false);
        this.resetAdjustments();
        this.updateStatus('图片已清除', true);
    }

    downloadImage() {
        if (!this.sprite) return;

        const canvas = this.app.renderer.extract.canvas(this.app.stage);

        const link = document.createElement('a');
        link.download = 'edited-image.png';
        link.href = canvas.toDataURL('image/png');
        link.click();

        this.updateStatus('图片已下载', true);
    }

    togglePreview() {
        if (!this.sprite) return;

        const currentFilters = this.app.stage.filters;
        if (currentFilters && currentFilters.length > 0) {
            this.app.stage.filters = [];
            this.previewBtn.textContent = '显示调整';
        } else {
            this.app.stage.filters = [this.colorMatrixFilter];
            this.previewBtn.textContent = '预览对比';
        }
    }

    updateStatus(text, isActive) {
        this.statusText.textContent = text;
        this.statusDot.className = isActive ? 'status-dot' : 'status-dot inactive';
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const editor = new ImageEditor();
});
