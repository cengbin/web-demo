import Container = Phaser.GameObjects.Container
import Image = Phaser.GameObjects.Image
import Text = Phaser.GameObjects.Text

export enum PopupContent {
  JingQingQiDai = "jqqd",
  GouJianZhong = "gjz",
  HowUnlock = "howunlock"
}

export default class Popup extends Container {

  public popupView: Container
  public popupImg: Image
  public contentText: Text

  private _tlm

  constructor(scene, x = 0, y = 0) {
    super(scene, x, y)

    this.popupImg = scene.add.image(0, 0, "start", "").setOrigin(0.5, 1)

    this.contentText = scene.add.text(-55, -47, "", {fontFamily: "Arial", fontSize: 18, color: "#6E6680"})

    this.popupView = scene.add.container(0, 0, [this.popupImg, this.contentText])
    this.add(this.popupView)
  }

  public setContent(status, data?) {
    this.popupImg.setTexture("start", "sp_popup_" + status + ".png")

    if (status === PopupContent.HowUnlock) {
      this.contentText.setText(data).setOrigin(0.5, 0.5)
    }
    return this
  }

  public show() {
    if (this._tlm) {
      this._tlm.kill()
      this._tlm = null
    }

    this.visible = true
    let popup = this.popupView
    let tlm = new window.TimelineMax({
      onComplete: () => {
        this.visible = false
      }
    })
    tlm.fromTo(popup, 1, {scaleX: 0, scaleY: 0, alpha: 0}, {scaleX: 1, scaleY: 1, alpha: 1, ease: window.Elastic.easeOut})
    tlm.to(popup, 1, {delay: 0.5, scaleX: 0, scaleY: 0, alpha: 0, ease: window.Elastic.easeIn})
    this._tlm = tlm
  }

  public hide() {
    this.visible = false
  }
}
