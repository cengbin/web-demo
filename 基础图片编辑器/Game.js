class Game extends PIXI.Application {

  constructor(config) {
    super(config)
    this.init()
  }

  init() {
    document.body.prepend(this.view)

    var loader = new PIXI.Loader()
    loader.add([
      './assets/building0.png',
      './assets/building1.png',
      './assets/building2.png',
      './assets/controller.json'
    ])
    loader.once('complete', this.onLoadComplete.bind(this))
    loader.load()
  }

  onLoadComplete() {
    let scene = new Scene()
    this.stage.addChild(scene)
  }
}

class Scene extends PIXI.Container {
  constructor() {
    super()
    this.init()
  }

  init() {
    this.addEle1()
    this.addEle2()
    this.addEle3()
  }

  addEle1() {
    let target = PIXI.Sprite.from('./assets/building2.png')

    let controller = new Controller({
      scene: this,
      target
    })
    this.addChild(controller)
    controller.x = 100
    controller.y = 100
  }

  addEle2() {
    let container = new PIXI.Container()

    let target2 = PIXI.Sprite.from('./assets/building2.png')
    container.addChild(target2)
    target2.x = 0
    target2.y = 0

    let target3 = PIXI.Sprite.from('./assets/building2.png')
    container.addChild(target3)
    target3.x = 200
    target3.y = 200

    let controller2 = new Controller({
      scene: this,
      target: container
    })
    this.addChild(controller2)
    controller2.x = 400
    controller2.y = 200
  }

  addEle3() {
    let container = new PIXI.Container()

    let target2 = PIXI.Sprite.from('./assets/building0.png')
    container.addChild(target2)
    target2.x = 0
    target2.y = 0

    let target3 = PIXI.Sprite.from('./assets/building1.png')
    container.addChild(target3)
    target3.x = 200
    target3.y = 0

    let target4 = PIXI.Sprite.from('./assets/building2.png')
    container.addChild(target4)
    target4.x = 200
    target4.y = 200

    let controller2 = new Controller({
      scene: this,
      target: container
    })
    this.addChild(controller2)
    controller2.x = 300
    controller2.y = 600
  }
}

class Controller extends PIXI.Container {

  static defaultConfig = {
    drag: true,
    zoom: true,
    rotate: true,
    transH: true,
    transV: true,
    close: true,
  }

  constructor(config) {
    super()

    this.$config = Object.assign({}, Controller.defaultConfig, config)

    this.target = new PIXI.Container()
    this.addChild(this.target)

    this.kuang = new PIXI.Graphics()
    this.kuang.interactive = true
    this.addChild(this.kuang)

    this.controlBox = new PIXI.Container()
    this.addChild(this.controlBox)

    this.translateBtn = new PIXI.Sprite.from('drag.png')
    this.translateBtn.anchor.set(0.5)
    this.translateBtn.alpha = 0.5
    this.controlBox.addChild(this.translateBtn)

    this.zoomBtn = new PIXI.Sprite.from('zoom.png')
    this.zoomBtn.anchor.set(0.5)
    this.zoomBtn.alpha = 0.5
    this.zoomBtn.interactive = true
    this.controlBox.addChild(this.zoomBtn)

    this.rotateBtn = new PIXI.Sprite.from('rotate.png')
    this.rotateBtn.anchor.set(0.5)
    this.rotateBtn.interactive = true
    this.controlBox.addChild(this.rotateBtn)

    this.scaleVBtn = new PIXI.Sprite.from('translate.png')
    this.scaleVBtn.anchor.set(0.5)
    this.scaleVBtn.interactive = true
    this.scaleVBtn.rotation = 90 * Math.PI / 180
    this.controlBox.addChild(this.scaleVBtn)

    this.scaleHBtn = new PIXI.Sprite.from('translate.png')
    this.scaleHBtn.anchor.set(0.5)
    this.scaleHBtn.interactive = true
    this.controlBox.addChild(this.scaleHBtn)

    this.kuang.on('pointerdown', this.onDragStart.bind(this))
      .on('pointermove', this.onDragMove.bind(this))
      .on('pointerup', this.onDragEnd.bind(this))
      .on('pointerupoutside', this.onDragEnd.bind(this))

    this.zoomBtn.on('pointerdown', this.onZoomStart.bind(this))
      .on('pointermove', this.onZoomMove.bind(this))
      .on('pointerup', this.onZoomEnd.bind(this))
      .on('pointerupoutside', this.onZoomEnd.bind(this))

    this.rotateBtn.on('pointerdown', this.onRotateStart.bind(this))
      .on('pointermove', this.onRotateMove.bind(this))
      .on('pointerup', this.onRotateEnd.bind(this))
      .on('pointerupoutside', this.onRotateEnd.bind(this))

    this.scaleVBtn.on('pointerdown', this.onTranslateVStart.bind(this))
      .on('pointermove', this.onTranslateVMove.bind(this))
      .on('pointerup', this.onTranslateVEnd.bind(this))
      .on('pointerupoutside', this.onTranslateVEnd.bind(this))

    this.scaleHBtn.on('pointerdown', this.onTranslateHStart.bind(this))
      .on('pointermove', this.onTranslateHMove.bind(this))
      .on('pointerup', this.onTranslateHEnd.bind(this))
      .on('pointerupoutside', this.onTranslateHEnd.bind(this))

    let center = new PIXI.Graphics()
    center.beginFill(0xffffff)
    center.lineStyle(2, 0xff0000)
    center.drawCircle(0, 0, 5)
    center.endFill()
    this.addChild(center)

    this.on('added', this.onAdded.bind(this))
  }

  onAdded() {
    let {target, drag, zoom, rotate, transH, transV,} = this.$config

    this.target.addChild(target)

    target.x = -target.width / 2
    target.y = -target.height / 2

    this.initWidth = target.width
    this.initHeight = target.height

    this.translateBtn.visible = drag
    this.zoomBtn.visible = zoom
    this.rotateBtn.visible = rotate
    this.scaleVBtn.visible = transV
    this.scaleHBtn.visible = transH

    this.showCtrl()

    this.resetKuang()
  }

  // 拖拽
  onDragStart(event) {
    event.stopPropagation()
    this.dragging = true
    this.hideCtrl()

    // this.x 是拖动对象相对于父级的x轴坐标
    // evt.clientX 是鼠标相对于浏览器可视区域的x坐标

    // 缩小地图后
    // 变化：地图容器的缩放比例
    // 不变：拖动对象坐标、鼠标坐标
    let evt = event.data.originalEvent
    this.offset = {x: this.x * this.zoom - evt.clientX, y: this.y * this.zoom - evt.clientY}
  }

  onDragMove(event) {
    if (this.dragging) {
      let evt = event.data.originalEvent
      // console.log()
      this.setX(evt.clientX + this.offset.x)
      this.setY(evt.clientY + this.offset.y)
      event.stopPropagation()
    }
  }

  onDragEnd(event) {
    this.dragging = false
    this.offset = null
    this.showCtrl()
    event.stopPropagation()
  }

  // 等比例缩放
  onZoomStart(event) {
    event.stopPropagation()
    this.zooming = true
    this.hideCtrl()
  }

  onZoomMove(event) {
    if (this.zooming) {
      let currentTarget = event.currentTarget
      let data = event.data
      // 当前 "鼠标点" 在 "指定displayObject" 的本地坐标
      let point = data.getLocalPosition(currentTarget.parent)

      let scaleX = -point.x / (this.initWidth / 2)
      let scaleY = -point.y / (this.initHeight / 2)

      this.target.scale.set(scaleX, scaleY)
      this.resetKuang()
      event.stopPropagation()
    }
  }

  onZoomEnd(event) {
    this.zooming = false
    this.showCtrl()
    event.stopPropagation()
  }

  // 旋转
  onRotateStart(event) {
    event.stopPropagation()
    this.rotating = true
    this.hideCtrl()
  }

  onRotateMove(event) {
    if (this.rotating) {
      let currentTarget = event.currentTarget
      let currentTargetRadian = Math.atan2(currentTarget.y, currentTarget.x)

      var data = event.data
      var p = data.getLocalPosition(this.parent)
      // Math.atan2(y,x) 返回从x轴到点 (x,y) 的角度
      var radian = Math.atan2((this.y - p.y), (this.x - p.x)) // 弧度

      radian -= currentTargetRadian
      radian -= 180 * (Math.PI / 180)

      this.rotation = radian

      event.stopPropagation()
    }
  }

  onRotateEnd(event) {
    event.stopPropagation()
    this.rotating = false
    this.showCtrl()
  }

  // 纵向缩放
  onTranslateVStart(event) {
    event.stopPropagation()
    this.scalingY = true
    this.hideCtrl()
  }

  onTranslateVMove(event) {
    if (this.scalingY) {
      let currentTarget = event.currentTarget
      let point = event.data.getLocalPosition(currentTarget.parent)
      let distance1 = point.y
      let distance2 = -this.initHeight / 2
      let scaleY = distance1 / distance2

      this.target.scale.y = scaleY
      this.resetKuang()
      event.stopPropagation()
    }
  }

  onTranslateVEnd(event) {
    event.stopPropagation()
    this.scalingY = false
    this.showCtrl()
  }

  // 横向缩放
  onTranslateHStart(event) {
    event.stopPropagation()
    this.scalingX = true
    this.hideCtrl()
  }

  onTranslateHMove(event) {
    if (this.scalingX) {
      let currentTarget = event.currentTarget
      let point = event.data.getLocalPosition(currentTarget.parent)
      let distance1 = point.x
      let distance2 = -this.initWidth / 2
      let scaleX = distance1 / distance2

      this.target.scale.x = scaleX
      this.resetKuang()
      event.stopPropagation()
    }
  }

  onTranslateHEnd(event) {
    event.stopPropagation()
    this.scalingX = false
    this.showCtrl()
  }

  hideCtrl() {
    this.controlBox.alpha = 0
  }

  showCtrl() {
    let {x, y, width, height} = this.getBoundingRect()
    // console.log(x, y, width, height)

    this.translateBtn.x = x + width / 2
    this.translateBtn.y = y + height / 2

    this.rotateBtn.x = x + width
    this.rotateBtn.y = y

    this.zoomBtn.x = x
    this.zoomBtn.y = y

    this.scaleVBtn.x = x + width / 2
    this.scaleVBtn.y = y

    this.scaleHBtn.x = x
    this.scaleHBtn.y = y + height / 2

    this.controlBox.alpha = 1
  }

  resetKuang() {
    let {x, y, width, height} = this.getBoundingRect()
    let kuang = this.kuang
    kuang.clear()
    kuang.lineStyle(kuangLineWidth, kuangLineColor, kuangLineAlpha)
    kuang.beginFill(kuangFillColor, kuangFillAlpha)
    kuang.drawRect(x, y, width, height)
  }

  getBoundingRect() {
    let {target} = this
    let x = -target.width / 2
    let y = -target.height / 2
    let width = target.width
    let height = target.height

    // console.log("getBoundingRect:", x, y, width, height)

    return {
      x,
      y,
      width,
      height
    }
  }

  setX(x) {
    x = x * (1 / this.zoom)

    this.x = x
  }

  setY(y) {
    y = y * (1 / this.zoom)

    this.y = y
  }

  get zoom() {
    return this.$config.scene.scale.x
  }
}