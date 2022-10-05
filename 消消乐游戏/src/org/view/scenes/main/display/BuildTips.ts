import Container = Phaser.GameObjects.Container
import Image = Phaser.GameObjects.Image

/**
 *中心点在正中间
 * */
export default class BuildTips extends Container {

  public baseImg: Image
  public lockImg: Image
  public lockView: Container
  private _tlm
  private _unlock: boolean

  constructor(scene, x = 0, y = 0) {
    super(scene, x, y)

    this.baseImg = scene.add.image(0, 0, "")
    this.lockImg = scene.add.image(0, 0, "sp_area" + scene.data.values.index + "_lock.png")
    this.lockView = scene.add.container(0, 0, [this.lockImg])

    this.add([this.baseImg, this.lockView])

    // let point = scene.add.graphics({}).fillStyle(0xff0000, 1).fillRect(0, 0, 10, 10)
    // this.add(point)
  }

  public set rows(val) {
    let index = this.scene.data.values.index
    if (index === 0) {
      this.baseImg.setTexture("sp_" + val + "x" + val + ".png")
      this.baseImg.setScale(1, 1)

      this.lockView.setPosition(0, 0)
    } else {
      this.baseImg.setTexture("sp_area1.png")
      this.baseImg.setScale(val / 5, val / 5)

      this.lockView.setPosition(0, -60)
    }
  }

  public set unlock(val) {
    this._unlock = val
    if (!val) {
      if (!this._tlm) {
        let tlm = new window.TimelineMax({repeat: -1, yoyo: true})
        let distance = 3 + Math.random() * 2
        let duration = 2 + Math.random() * 0.5
        tlm.to(this.lockImg, duration, {y: -distance, scaleX: 1.05, scaleY: 1.05, alpha: 1, ease: window.Sine.easeInOut})
        tlm.seek(Math.random() * duration)
        tlm.pause()
        this._tlm = tlm
      }
      this._tlm.play()
    } else {
      if (this._tlm) this._tlm.pause()
    }

    this.lockImg.visible = !val
  }

  public destory() {
    super.destroy()
    if (this._tlm) this._tlm.kill()
  }
}
