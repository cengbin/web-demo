import Container = Phaser.GameObjects.Container
import Image = Phaser.GameObjects.Image

/**
 * @desc 中心点在左上角
 * */
export default class StudayProgress extends Container {

  private _barBg: Image
  private _barLine
  private _barWidth = 330
  private _barTextLeft
  private _barTextRight
  private _barTextCenter
  private _txtContainer: Container

  private _cur = 0
  private _total = 0

  constructor(scene, x = 0, y = 0) {
    super(scene, x, y)

    this._barBg = scene.add.image(0, 0, "start", "sp_bar_mask.png").setOrigin(0, 0)
    this.add(this._barBg)

    this._barLine = scene.add.graphics().fillStyle("0x3DCCCC", 1).fillRect(0, 0, this._barWidth, 21)
    this.add(this._barLine)

    this._barTextLeft = scene.add.text(0, 0, "再完成", {fontFamily: "Arial", fontSize: 18, color: "#ffffff"}).setOrigin(0, 0.5)
    this._barTextCenter = scene.add.text(this._barTextLeft.width + 4, -2, "0", {fontFamily: "Arial", fontSize: 24, color: "#4DFFFF"}).setOrigin(0, 0.5)
    this._barTextRight = scene.add.text(0, 0, "节课程解锁下一个场景", {fontFamily: "Arial", fontSize: 18, color: "#ffffff"}).setOrigin(0, 0.5)

    this._txtContainer = new Container(scene, 0, -18, [this._barTextLeft, this._barTextCenter, this._barTextRight])
    this.add(this._txtContainer)

    this._barTextRight.x = (this._barTextCenter.x + this._barTextCenter.width)
    // console.log(this._txtContainer.getBounds(), this._barText.width)

    var bunny = scene.make.sprite({x, y, key: "start", frame: "sp_bar_mask.png", add: false}).setOrigin(0, 0)
    // this.add(bunny)

    this._barLine.mask = new Phaser.Display.Masks.BitmapMask(scene, bunny)
    this._barLine.x = -this._barWidth
  }

  public setProgress(cur = this._cur, total = this._total) {
    this._barTextCenter.text = this._total - this._cur
    this._barTextRight.x = (this._barTextCenter.x + this._barTextCenter.width + 4)
    this._txtContainer.x = (330 - (this._barTextRight.x + this._barTextRight.width)) / 2

    this._barLine.x = ((cur / total) * this._barWidth) - this._barWidth
  }

  public set cur(val) {
    this._cur = val
    this.setProgress()
  }

  public get cur() {
    return this._cur
  }

  public set total(val) {
    this._total = val
    this.setProgress()
  }

  public get total() {
    return this._total
  }
}