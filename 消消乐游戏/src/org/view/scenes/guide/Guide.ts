import Container = Phaser.GameObjects.Container
import Text = Phaser.GameObjects.Text
import {SceneEvent} from "../../../../Game"

export default class Guide extends Phaser.Scene {
  public static NAME = "guide"

  public guideView: Container
  public tipsText: Text

  private _tipsQueue = []
  private _curTipsObj = null
  private _canNextTips = false

  constructor() {
    super({key: Guide.NAME})
  }

  public init(data) {
    this.data.values = data
    this.scene.bringToTop()
    this.render()
    this.events.emit(SceneEvent.INIT_COMPLETE)
  }

  public render() {
    let stageWidth = Number(this.game.config.width)
    let stageHeight = Number(this.game.config.height)

    var whiteBg = this.add.graphics()
    whiteBg.fillStyle(0xffffff, 0.0)
    whiteBg.fillRect(0, 0, stageWidth, stageHeight)
    whiteBg.setInteractive(new Phaser.Geom.Rectangle(0, 0, stageWidth, stageHeight), Phaser.Geom.Rectangle.Contains)
    whiteBg.on("pointerup", () => {
      if (this._curTipsObj && this._curTipsObj["callback"]) this._curTipsObj["callback"]()

      if (this._canNextTips) {
        let bo = this.startGuide()
        if (!bo) {
          // console.log("没有下一段引导文字")
        }
      }
    })

    let gbg = this.add.image(0, 0, "sp_guide_bg.png").setOrigin(0, 0)
    let gdino = this.add.image(54, -43, "sp_guide_dino.png").setOrigin(0, 0)
    window.TweenMax.fromTo(gdino, 0.6, {x: 35, alpha: 0}, {x: 54, alpha: 1})
    let gtxt = this.tipsText = this.add.text(250, 46, "", {fontFamily: "Arial", fontSize: 20}).setLineSpacing(10)
    let gview = this.guideView = this.add.container(24, 610, [gbg, gdino, gtxt])
  }

  public pushTipsQueue(obj) {
    if (Array.isArray(obj)) {
      this._tipsQueue = this._tipsQueue.concat(obj)
    } else {
      this._tipsQueue.push(obj)
    }
    return this
  }

  public startGuide() {
    let obj = this._curTipsObj = this._tipsQueue.shift()
    // console.log(obj)
    if (obj) {
      this._canNextTips = false
      let {txt, duration} = obj
      this.setTipsText(txt)
      this.time.delayedCall(duration, () => {
        this._canNextTips = true
      }, null, this)
      return true
    }
    return false
  }

  public setTipsText(text) {
    if (this.tipsText) this.tipsText.text = text
  }
}
