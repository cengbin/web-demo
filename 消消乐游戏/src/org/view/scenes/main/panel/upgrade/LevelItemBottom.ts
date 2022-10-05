import Container = Phaser.GameObjects.Container
import Image = Phaser.GameObjects.Image
import Pha from "../../../../../util/Pha"
import PhaserButton from "../../../../../../component/UI/PhaserButton"

/**
 * 中心点在对角线交叉点
 * */
export default class LevelItemBottom extends Container {

  private _bgImg: Image
  private _lightImg: Image
  private _tm = null
  private _state2 = null

  constructor(scene, x = 0, y = 0) {
    super(scene, x, y)

    this._bgImg = Pha.getImg({scene, t: "sp_level_bg_default.png"})
    this.add(this._bgImg)

    this._lightImg = Pha.getImg({scene, t: "sp_level_bg_highlight.png"}).setVisible(false)
    this.add(this._lightImg)

    this._tm = window.TweenMax.to(this._lightImg, 0.5, {alpha: 0.3, repeat: -1, yoyo: true, ease: window.Power0.easeNone})
    this.pause()

    let btn = new PhaserButton({scene, hotArea: true, w: 10, h: 10})
    this.add(btn)
  }

  public play() {
    if (this._tm && this._state2 === 2) {
      this._tm.play()
    }
  }

  public pause() {
    if (this._tm) {
      this._tm.pause()
      this._lightImg.alpha = 1
    }
  }

  public set state2(val) {
    // console.log("state2:", val)
    this._state2 = val
    this._lightImg.visible = false
    this.pause()

    switch (val) {
      case 1: // 当前等级
        this._bgImg.setTexture("sp_level_bg_default.png")
        break
      case 2: // 下一个等级,星星足够买
        this._bgImg.setTexture("sp_level_bg_default.png")
        this._lightImg.visible = true
        this.play()
        break
      case 3: // 非当前等级，非下一个等级
        this._bgImg.setTexture("sp_level_bg_notclick.png")
        break
      case 4: // 下一个等级, 星星不够买
        this._bgImg.setTexture("sp_level_bg_default.png")
        this._lightImg.visible = true
        break
    }
  }

  public get state2() {
    return this._state2
  }
}