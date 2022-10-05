import DiamondTiledMap from "../map/DiamondTiledMap"
import MainScene from "../MainScene"
import DiamondTiledMapView from "../map/DiamondTiledMapView"
import Container = Phaser.GameObjects.Container
import Image = Phaser.GameObjects.Image
import Sprite = Phaser.GameObjects.Sprite
import IBuildingLocation from "../../../../interface/IBuildingLocation"
import Pha from "../../../../util/Pha"

export default class OtherElement extends Container {
  // 场景引用
  public scene: MainScene
  // 建造物升级提示
  public upgradeTips: Sprite
  // 修建建造物提示
  public buildTips: Container
  // 建造物
  public buildImg: Image
  // 当前建造位数据
  public data2: IBuildingLocation
  // 当前建造位的行
  public curRow
  // 当前建造位的列
  public curCol
  // 深度
  public depth = 0
  // 45度格子地图
  public diamondTileMap: DiamondTiledMap

  private _onState = null
  private _startX
  private _startY

  // 当前等级
  private _level = 0
  // 当前纹理key
  private _texture = ""
  // 预览纹理key
  private _previewTexture = ""
  // 上
  private _p1
  // 右
  private _p2
  // 下
  private _p3
  // 左
  private _p4
  // 中心点x坐标
  private _centerX
  // 中心点y坐标
  private _centerY

  private _testText

  public animateBehavior = null

  constructor(scene, data) {
    super(scene)

    this.setData2(data)

    this.buildImg = Pha.getImg({scene, t: "taidengL3-1_1_1x1.png"}).setOrigin(0.5, 1)
    this.add(this.buildImg)
    this.addEvent()

    this.setPositionBottom()

    this._dev()
  }

  private setPositionCenter() {

  }

  private setPositionBottom() {
    this.buildImg.x = this._p3.x + this.diamondTileMap.tileWidth / 2
    this.buildImg.y = this._p3.y + this.diamondTileMap.tileHeight
  }

  private _dev() {
    var fdtMap = new DiamondTiledMapView(this.scene, this.diamondTileMap)
    this.addAt(fdtMap, 0)
    fdtMap.fill(0x52DDA3, 1)

    // this.buildImg.alpha = 0.3
    let bounds3 = this.buildImg.getBounds()
    let graphics = this.scene.add.graphics()
    graphics.lineStyle(1, 0x00ff00)
    graphics.strokeRectShape(bounds3)
    this.add(graphics)
  }

  public destory() {
    if (this.animateBehavior) this.animateBehavior.kill()
  }

  public setAnimate(am) {
    this.animateBehavior = am
  }

  private setData2(data: IBuildingLocation) {
    // console.log(data)
    this.data2 = data

    let {id, enName, initRow, initCol, rows, cols} = data
    this.curRow = initRow
    this.curCol = initCol
    this.depth = initRow + initCol + cols

    this.diamondTileMap = new DiamondTiledMap(rows, cols, MainScene.TILE_WIDTH, MainScene.TILE_HEIGHT)
    let {tileWidth, tileHeight} = this.diamondTileMap

    this._p1 = this.diamondTileMap.nodeList[0][0]
    this._p2 = this.diamondTileMap.nodeList[0][cols - 1]
    this._p3 = this.diamondTileMap.nodeList[rows - 1][cols - 1]
    this._p4 = this.diamondTileMap.nodeList[rows - 1][0]
    // console.log(this._p1, this._p2, this._p3, this._p4)

    // 有两点 A(x1, y1) B(x2, y2) 则它们的中点P的坐标为（(x1+x2)/2, (y1+y2)/2）
    let x1 = this._p1.x + tileWidth / 2
    let y1 = this._p1.y
    let x2 = this._p3.x + tileWidth / 2
    let y2 = this._p3.y + tileHeight
    let x = (x1 + x2) / 2
    let y = (y1 + y2) / 2
    this._centerX = x - this.diamondTileMap.tileWidth / 2
    this._centerY = y - this.diamondTileMap.tileHeight / 2

    let {x: x3, y: y3} = this.scene.staggeredTiledMap.nodeList[initRow][initCol]
    this.setPosition(x3, y3)
  }

  public get centerX() {
    return this._centerX
  }

  public get centerY() {
    return this._centerY
  }

  public addEvent() {
    this.buildImg.setInteractive({
      pixelPerfect: true,
      draggable: true,
      cursor: "pointer",
      useHandCursor: false
    })

    this.buildImg.on("dragstart", this.onDragStartListener, this)
    this.buildImg.on("drag", this.onDragListener, this)
    this.buildImg.on("dragend", this.onDragEndListener, this)
  }

  public toTop() {
    // this.parentContainer.moveTo(this, this.parentContainer.list.length - 1)
    this.parentContainer.bringToTop(this)
  }

  public getMapXY(row, col) {
    return this.scene.staggeredTiledMap.map2screen(row, col)
  }

  public getGrid(x, y) {
    return this.scene.staggeredTiledMap.screen2map(x, y)
  }

  private onDragStartListener(pointer: any, gameObject: any, dragX: any, dragY: any) {
    this.scene.staggeredTiledMap.setMultipleNodeState(this.curRow, this.curCol, this.data2.rows, this.data2.cols, 0)

    this._startX = this.x - this.buildImg.x
    this._startY = this.y - this.buildImg.y

    this.toTop()

    this._onState = "dragstart"
  }

  protected onDragListener(pointer, dragX, dragY): void {
    let distance = Phaser.Math.Distance.Between(this.buildImg.x, this.buildImg.y, dragX, dragY)
    // console.log('distance:', distance)
    if (distance >= 2) {
      if (this._onState !== "drag") {
        this.onDragFirstFrame()
      }

      this.x = this._startX + dragX
      this.y = this._startY + dragY
    }
  }

  protected onDragEndListener(pointer: any, gameObject: any, dragX: any, dragY: any): void {
    let distance = Phaser.Math.Distance.Between(this._startX + this.buildImg.x, this._startY + this.buildImg.y, this.x, this.y)
    // console.log(distance, this._onState)
    if (distance >= 2 && this._onState === "drag") {
      // console.log("drag end")
      let endX = this.x + this.scene.staggeredTiledMap.tileWidth / 2
      let endY = this.y + this.scene.staggeredTiledMap.tileHeight / 2
      let x
      let y

      let {row, column} = this.getGrid(endX, endY)
      if (this.scene.staggeredTiledMap.hitTest(row, column, this.data2.rows, this.data2.cols)) {
        this.scene.staggeredTiledMap.setMultipleNodeState(this.curRow, this.curCol, this.data2.rows, this.data2.cols, 0)
        this.curRow = row
        this.curCol = column
        // this.depth = (row + this.data2.rows)
        this.depth = row + column + this.data2.cols
        let nodeData = this.scene.staggeredTiledMap.nodeList[row][column]
        x = nodeData.x
        y = nodeData.y
      } else {
        let nodeData = this.scene.staggeredTiledMap.nodeList[this.curRow][this.curCol]
        x = nodeData.x
        y = nodeData.y
      }

      window["TweenMax"].to(this, 0.3, {x, y, ease: window["Power2"].easeOut})
      // console.log(this.curRow, this.curCol)
    } else if (this._onState === "dragstart") {
      this.upgradeTips.visible = false
      // console.log("click")
      let {x, y} = this.scene.staggeredTiledMap.nodeList[this.curRow][this.curCol]
      this.x = x
      this.y = y
      // this.emit("pointertap")
      // this.scene.events.emit(MainScene.CLICK_BUILDING, this)
    }

    this.scene.staggeredTiledMap.setMultipleNodeState(this.curRow, this.curCol, this.data2.rows, this.data2.cols, 1)

    this.scene.setElementDepth()

    this._onState = null
    console.log(this.curRow, this.curCol)
  }

  private onDragFirstFrame() {
    this._onState = "drag"
  }
}
