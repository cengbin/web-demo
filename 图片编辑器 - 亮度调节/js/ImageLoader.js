/**
 * 图片加载器
 */
export class ImageLoader {
    /**
     * 从文件加载图片
     * @param {File} file
     * @returns {Promise<HTMLImageElement>}
     */
    static fromFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = e.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    /**
     * 从 URL 加载图片
     * @param {string} url
     * @returns {Promise<HTMLImageElement>}
     */
    static fromURL(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = url;
        });
    }

    /**
     * 创建示例图片
     * @returns {HTMLImageElement}
     */
    static createSample() {
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 600;
        const ctx = canvas.getContext('2d');

        // 渐变背景
        const gradient = ctx.createLinearGradient(0, 0, 800, 600);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 800, 600);

        // 装饰圆形
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(200, 200, 100, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.beginPath();
        ctx.arc(500, 350, 150, 0, Math.PI * 2);
        ctx.fill();

        // 文字
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('示例图片', 400, 300);
        ctx.font = '24px Arial';
        ctx.fillText('拖拽或点击上传您的图片', 400, 350);

        const img = new Image();
        img.src = canvas.toDataURL();
        return img;
    }
}
