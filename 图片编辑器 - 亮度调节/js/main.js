import { ImageEditor } from './ImageEditor.js';
import { ImageLoader } from './ImageLoader.js';

// 默认调整参数
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
            adjustments: Object.assign({}, DEFAULT_ADJUSTMENTS),

            // 滑块配置
            sliderConfigs: [
                { key: 'brightness', label: '亮度', min: -100, max: 100, description: '定义：调整图片整体明暗\n效果：变亮 ↔ 变暗\n场景：修正过暗或过亮的照片' },
                { key: 'contrast', label: '对比度', min: -100, max: 100, description: '定义：调整明暗区域差异\n效果：更强 ↔ 更柔和\n场景：让画面更有层次感' },
                { key: 'saturation', label: '饱和度', min: -100, max: 100, description: '定义：调整色彩鲜艳程度\n效果：更鲜艳 ↔ 更灰暗\n场景：美食/风景更诱人' },
                { key: 'hue', label: '色相', min: -180, max: 180, description: '定义：旋转色相环改变颜色\n效果：偏暖 ↔ 偏冷\n场景：创意调色' },
                { key: 'lightness', label: '明度', min: -100, max: 100, description: '定义：在HSL空间调整明暗\n效果：变亮 ↔ 变暗\n场景：精细控制明暗' },
                { key: 'colorTemperature', label: '色温', min: -100, max: 100, description: '定义：调整冷暖色调\n效果：偏暖(红) ↔ 偏冷(蓝)\n场景：修正偏色照片' },
                { key: 'exposure', label: '曝光', min: -100, max: 100, description: '定义：模拟相机进光量\n效果：过曝 ↔ 欠曝\n场景：修正曝光不准的照片' },
                { key: 'highlights', label: '高光', min: -100, max: 100, description: '定义：只调整最亮部分\n效果：更亮 ↔ 压暗\n场景：修复过曝天空' },
                { key: 'shadows', label: '阴影', min: -100, max: 100, description: '定义：只调整最暗部分\n效果：提亮 ↔ 更暗\n场景：提亮暗部细节' },
                { key: 'vibrance', label: '自然饱和度', min: -100, max: 100, description: '定义：智能调整饱和度\n效果：更鲜艳(保护肤色)\n场景：人像/美食调色' },
                { key: 'clarity', label: '清晰度', min: -100, max: 100, description: '定义：增强中频对比度\n效果：更清晰 ↔ 更柔和\n场景：风景/建筑细节' },
                { key: 'toneCurve', label: '色调曲线', min: -100, max: 100, description: '定义：精细调整明暗层次\n效果：增强对比 ↔ 降低对比\n场景：专业调色' }
            ],

            // 预设
            presets: {
                original: { label: '原始', brightness: 0, contrast: 0, saturation: 0, hue: 0, lightness: 0, colorTemperature: 0, exposure: 0, highlights: 0, shadows: 0, vibrance: 0, clarity: 0, toneCurve: 0 },
                bright: { label: '明亮', brightness: 30, contrast: 10, saturation: 5, hue: 0, lightness: 0, colorTemperature: 0, exposure: 10, highlights: 10, shadows: 0, vibrance: 0, clarity: 0, toneCurve: 0 },
                dark: { label: '暗调', brightness: -30, contrast: 20, saturation: -10, hue: 0, lightness: 0, colorTemperature: 0, exposure: -10, highlights: 0, shadows: -20, vibrance: 0, clarity: 0, toneCurve: 0 },
                'high-contrast': { label: '高对比', brightness: 0, contrast: 50, saturation: 20, hue: 0, lightness: 0, colorTemperature: 0, exposure: 0, highlights: -10, shadows: -10, vibrance: 0, clarity: 20, toneCurve: 30 },
                grayscale: { label: '黑白', brightness: 0, contrast: 10, saturation: -100, hue: 0, lightness: 0, colorTemperature: 0, exposure: 0, highlights: 0, shadows: 0, vibrance: 0, clarity: 0, toneCurve: 0 },
                warm: { label: '暖色', brightness: 10, contrast: 5, saturation: 20, hue: 20, lightness: 0, colorTemperature: 30, exposure: 0, highlights: 0, shadows: 0, vibrance: 10, clarity: 0, toneCurve: 0 },
                cool: { label: '冷色', brightness: 0, contrast: 10, saturation: -10, hue: -20, lightness: 0, colorTemperature: -30, exposure: 0, highlights: 0, shadows: 0, vibrance: 0, clarity: 0, toneCurve: 0 },
                vintage: { label: '复古', brightness: -10, contrast: 20, saturation: -30, hue: 10, lightness: 0, colorTemperature: 20, exposure: -10, highlights: -10, shadows: 10, vibrance: -20, clarity: -10, toneCurve: -20 }
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
                    self.editor.setAdjustments(Object.assign({}, self.adjustments));
                    self.setStatus('示例图片已加载', true);
                };
            });
        },
        resetAdjustments: function () {
            this.adjustments = Object.assign({}, DEFAULT_ADJUSTMENTS);
            this.isPreview = false;
        },
        onSliderChange: function (key) {
            if (this.editor) {
                this.editor.setAdjustment(key, this.adjustments[key]);
            }
        },
        reset: function () {
            this.adjustments = Object.assign({}, DEFAULT_ADJUSTMENTS);
            this.editor.reset();
            this.setStatus('已重置调整', true);
        },
        clear: function () {
            this.editor.clear();
            this.adjustments = Object.assign({}, DEFAULT_ADJUSTMENTS);
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
            this.adjustments = Object.assign({}, preset);
            this.editor.applyFilters();
            this.setStatus('已应用预设: ' + preset.label, true);
        }
    }
});
