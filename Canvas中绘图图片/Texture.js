class Texture {

  constructor(image) {
    this._image = image

    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext("2d")

    this.canvas.width = this.textureWidth
    this.canvas.height = this.textureHeight

    this.ctx.drawImage(this._image, 0, 0, this.textureWidth, this.textureHeight)
  }

  /**
   * 释放纹理
   * */
  dispose() {

  }

  getPixel32() {

  }

  /**
   * 获取指定像素区域的颜色值
   * */
  getPixels(x, y, width, height) {
    let imgData = this.ctx.getImageData(x, x, width, height)

    let xyData = []
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        let _num = (i * width + j) * 4
        let _red = imgData.data[_num + 0]
        let _green = imgData.data[_num + 1]
        let _blue = imgData.data[_num + 2]
        let _alpha = imgData.data[_num + 3]
        if (_alpha > 0) xyData.push({x: j, y: i, r: _red, g: _green, b: _blue, a: _alpha})
      }
    }
    return xyData
  }

  /**
   *  裁剪指定区域并保存成图片
   * */
  saveToFile() {

  }

  /**
   * 转换成base64字符串，如果图片（或者包含的图片）跨域，则返回null
   * */
  toDataURL() {

  }

  get textureWidth() {
    return this._image.width
  }

  get textureHeight() {
    return this._image.height
  }
}