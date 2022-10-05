import PhaserDialog from "../../../../../component/UI/PhaserDialog"
import PhaserButton from "../../../../../component/UI/PhaserButton"
import {default as track, EventType} from "../../../../util/dot"
import MainSceneMediator from "../../../MainSceneMediator"

export enum DialogType {
  fumuqueren,
  chongfuxiadan,
  weijiesuo
}

export default class LockDialog extends PhaserDialog {

  private titleImg
  private smallTitleText
  private contentText
  private footerBtn

  private _data

  constructor(config, x = 0, y = 0) {
    super(config, x, y)

    this.contentBG.visible = false
    let bg = this.scene.add.image(0, 0, "public", "sp_kuang_s.png").setOrigin(0, 0)
    this.contentView.addAt(bg, 0)

    let {w, h} = this.config
    this.titleImg = this.scene.add.image(w / 2, -150, "sp_popups_warning.png").setOrigin(0.5, 0)
    this.contentView.add(this.titleImg)

    this.smallTitleText = this.scene.add.text(w / 2, 156, "", {fontSize: 22, fontFamily: "Arial", color: "#3DCCCC"}).setOrigin(0.5, 0.5)
    this.contentView.add(this.smallTitleText)

    this.contentText = this.scene.add.text(40, 155, "", {fontSize: 22, fontFamily: "Arial", color: "#666666", align: "center", wordWrap: {width: 386, useAdvancedWrap: true}})
    this.contentView.add(this.contentText)

    this.footerBtn = new PhaserButton({
      scene: this.scene,
      s: "normal",
      w: 160,
      h: 48,
      image: {t: "public", f: "btn_bg_160*48_A.png"},
      text: {t: "", s: {fontSize: 24}}
    }, 153, 280)
    this.contentView.add(this.footerBtn)
    this.footerBtn.on("pointertap", () => {
      track(EventType.pageClick, {
        "event_id": "region_constructionlocation_core_link"
      })

      this.hide()

      if (this._data) {
        this.scene.events.emit(MainSceneMediator.SHOW_UPGRADE_PANEL, this._data.bld)
      }
    })
  }

  public setContent(type, data?) {
    this._data = data
    if (type === DialogType.weijiesuo) {
      let {text, id} = data
      this.titleImg.setTexture("sp_popups_warning.png")
      this.smallTitleText.text = ""
      this.contentText.text = text
      this.contentText.y = 155
      this.footerBtn.contentText.setText("前往")
    } else if (type === DialogType.fumuqueren) {
      this.titleImg.setTexture("sp_dino_laugh.png")
      this.smallTitleText.text = "兑换成功！"
      this.contentText.text = "记得让爸爸妈妈在手机上确认订单哦，这样礼物才会送到你手上呢～"
      this.contentText.y = 175
      this.footerBtn.contentText.setText("知道了")
    } else if (type === DialogType.chongfuxiadan) {
      this.titleImg.setTexture("sp_dino_cry.png")
      this.smallTitleText.text = ""
      this.contentText.text = "已经下过订单了，不可重复下单哦～ 快去让爸爸妈妈在手机上确认吧！"
      this.contentText.y = 155
      this.footerBtn.contentText.setText("知道了")
    }
    return this
  }
}