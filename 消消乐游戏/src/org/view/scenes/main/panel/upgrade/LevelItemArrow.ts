import Container = Phaser.GameObjects.Container
import Image = Phaser.GameObjects.Image
import Point = Phaser.Geom. Point
import Pha from "../../../../../util/Pha"

/**
 * 中心点在左中
 * */
export default class LevelItemArrow extends Container {

  public defaultPosition: Point = new Point(0, 0)
  public amPosition: Point = new Point(0, 0)

  private _arrowImg: Image
  private _active2 = false
  private _tlm = null

  constructor(scene, x = 0, y = 0) {
    super(scene, x, y)

    this._arrowImg = Pha.getImg({scene, t: "sp_arrow_gray.png"}).setOrigin(0, 0.5)
    this.add(this._arrowImg)
    let tlm = new window.TimelineMax({
      repeat: -1,
      onUpdate() {
        // console.log("arrow onupdate")
      }
    })
    tlm.to(this._arrowImg, 0.4, {x: 10, delay: 1, ease: window.Power0.easeNone})
    tlm.to(this._arrowImg, 0.4, {x: 0, ease: window.Power0.easeNone})
    tlm.to(this._arrowImg, 0.4, {x: 10, ease: window.Power0.easeNone})
    tlm.to(this._arrowImg, 0.4, {x: 0, ease: window.Power0.easeNone})
    tlm.pause()
    this._tlm = tlm

    /*let btn = new PhaserButton({scene, hotArea: true, w: 10, h: 10})
    this.add(btn)*/
  }

  public set active2(val: boolean) {
    this._active2 = val

    if (val) {
      this.play()
      this.setPosition(this.amPosition.x, this.amPosition.y)
    } else {
      this.pause()
      this.setPosition(this.defaultPosition.x, this.defaultPosition.y)
      this._arrowImg.x = this._arrowImg.y = 0
    }

    let key = val ? "sp_arrow_blue.png" : "sp_arrow_gray.png"
    this._arrowImg.setTexture(key)
  }

  public get active2() {
    return this._active2
  }

  public play() {
    if (this._tlm && this._arrowImg.visible) this._tlm.play()
  }

  public pause() {
    if (this._tlm) this._tlm.pause()
  }
}