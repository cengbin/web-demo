import { ImageEditor } from './ImageEditor.js';
import { ImageLoader } from './ImageLoader.js';

new Vue({
    el: '#app',
    data: function () {
        return {
            // 状态
            hasImage: false,
            isPreview: false,
            status: { text: '就绪', active: true },
            imageInfo: { size: '', fileName: '' },

            // 调整参数
            adjustments: {
                brightness: 0,
                contrast: 0,
                saturation: 0,
                hue: 0,
                lightness: 0
            },

            // 滑块配置
            sliderConfigs: [
                { key: 'brightness', label: '亮度', min: -100, max: 100 },
                { key: 'contrast', label: '对比度', min: -100, max: 100 },
                { key: 'saturation', label: '饱和度', min: -100, max: 100 },
                { key: 'hue', label: '色相', min: -180, max: 180 },
                { key: 'lightness', label: '明度', min: -100, max: 100 }
            ],

            // 预设
            presets: {
                original: { label: '原始', brightness: 0, contrast: 0, saturation: 0, hue: 0, lightness: 0 },
                bright: { label: '明亮', brightness: 30, contrast: 10, saturation: 5, hue: 0, lightness: 0 },
                dark: { label: '暗调', brightness: -30, contrast: 20, saturation: -10, hue: 0, lightness: 0 },
                'high-contrast': { label: '高对比', brightness: 0, contrast: 50, saturation: 20, hue: 0, lightness: 0 },
                grayscale: { label: '黑白', brightness: 0, contrast: 0, saturation: -100, hue: 0, lightness: 0 },
                warm: { label: '暖色', brightness: 10, contrast: 5, saturation: 20, hue: 20, lightness: 0 },
                cool: { label: '冷色', brightness: 0, contrast: 10, saturation: -10, hue: -20, lightness: 0 },
                vintage: { label: '复古', brightness: -10, contrast: 20, saturation: -30, hue: 10, lightness: 0 }
            },

            // 编辑器实例
            editor: null
        };
    },
    computed: {
        previewText: function () {
            return this.isPreview ? '显示调整' : '预览对比';
        }
    },
    watch: {
        adjustments: {
            handler: function (val) {
                if (this.editor && this.hasImage) {
                    this.editor.setAdjustments(Object.assign({}, val));
                }
            },
            deep: true
        }
    },
    mounted: function () {
        this.editor = new ImageEditor(this.$refs.canvas);
    },
    methods: {
        setStatus: function (text, active) {
            this.status = { text: text, active: active };
        },
        formatValue: function (key) {
            var val = this.adjustments[key];
            if (key === 'hue') {
                return val + '°';
            }
            return val;
        },
        triggerUpload: function () {
            this.$refs.fileInput.click();
        },
        onFileChange: function (e) {
            var files = e.target.files;
            if (files.length > 0) {
                this.loadImageFile(files[0]);
            }
            // 重置 input 的 value，允许重复选择相同文件
            e.target.value = '';
        },
        onDragOver: function (e) {
            var container = e.currentTarget;
            container.style.boxShadow = '0 4px 12px rgba(24, 144, 255, 0.3)';
        },
        onDragLeave: function (e) {
            var container = e.currentTarget;
            container.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
        },
        onDrop: function (e) {
            var container = e.currentTarget;
            container.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';

            var files = e.dataTransfer.files;
            if (files.length > 0 && files[0].type.indexOf('image/') === 0) {
                this.loadImageFile(files[0]);
            }
        },
        loadImageFile: function (file) {
            var self = this;
            self.setStatus('加载中...', false);
            ImageLoader.fromFile(file).then(function (img) {
                self.editor.loadImage(img);
                self.imageInfo = {
                    size: img.width + ' × ' + img.height,
                    fileName: file.name
                };
                self.hasImage = true;
                // 应用当前调整参数
                self.editor.setAdjustments(Object.assign({}, self.adjustments));
                self.setStatus('图片已加载', true);
            }).catch(function (err) {
                self.setStatus('加载失败', false);
                console.error(err);
            });
        },
        loadSample: function () {
            var self = this;
            self.setStatus('加载示例图片...', false);
            ImageLoader.fromURL('https://picsum.photos/800/600').then(function (img) {
                self.editor.loadImage(img);
                self.imageInfo = {
                    size: img.width + ' × ' + img.height,
                    fileName: 'sample.jpg'
                };
                self.hasImage = true;
                // 应用当前调整参数
                self.editor.setAdjustments(Object.assign({}, self.adjustments));
                self.setStatus('示例图片已加载', true);
            }).catch(function () {
                var img = ImageLoader.createSample();
                img.onload = function () {
                    self.editor.loadImage(img);
                    self.imageInfo = {
                        size: img.width + ' × ' + img.height,
                        fileName: 'sample.png'
                    };
                    self.hasImage = true;
                    // 应用当前调整参数
                    self.editor.setAdjustments(Object.assign({}, self.adjustments));
                    self.setStatus('示例图片已加载', true);
                };
            });
        },
        resetAdjustments: function () {
            this.adjustments = {
                brightness: 0,
                contrast: 0,
                saturation: 0,
                hue: 0,
                lightness: 0
            };
            this.isPreview = false;
        },
        onSliderChange: function (key) {
            if (this.editor) {
                this.editor.setAdjustment(key, this.adjustments[key]);
            }
        },
        reset: function () {
            this.adjustments = {
                brightness: 0,
                contrast: 0,
                saturation: 0,
                hue: 0,
                lightness: 0
            };
            this.editor.reset();
            this.setStatus('已重置调整', true);
        },
        clear: function () {
            this.editor.clear();
            this.adjustments = {
                brightness: 0,
                contrast: 0,
                saturation: 0,
                hue: 0,
                lightness: 0
            };
            this.hasImage = false;
            this.isPreview = false;
            this.setStatus('图片已清除', true);
        },
        download: function () {
            if (!this.editor.hasImage()) return;
            var link = document.createElement('a');
            link.download = 'edited-image.png';
            link.href = this.editor.toDataURL();
            link.click();
            this.setStatus('图片已下载', true);
        },
        togglePreview: function () {
            if (!this.editor.hasImage()) return;
            if (this.isPreview) {
                this.editor.applyFilters();
                this.isPreview = false;
            } else {
                this.editor.showOriginal();
                this.isPreview = true;
            }
        },
        applyPreset: function (name) {
            var preset = this.presets[name];
            if (!preset) return;
            this.adjustments = {
                brightness: preset.brightness,
                contrast: preset.contrast,
                saturation: preset.saturation,
                hue: preset.hue,
                lightness: preset.lightness
            };
            this.editor.applyFilters();
            this.setStatus('已应用预设: ' + preset.label, true);
        }
    }
});
