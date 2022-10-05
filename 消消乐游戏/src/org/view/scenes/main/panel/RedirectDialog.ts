import Container = Phaser.GameObjects.Container
import Text = Phaser.GameObjects.Text
import PhaserDialog from "../../../../../component/UI/PhaserDialog"
import PhaserButton from "../../../../../component/UI/PhaserButton"
import Pha from "../../../../util/Pha"
import {default as track, EventType} from "../../../../util/dot"
import ScrollView, {ScrollPolicy} from "../../../../../component/PhaserScrollView"

export default class RedirectDialog extends PhaserDialog {

  public titleImg
  public titleText: Text
  public descText: Text
  public redirectContainer: Container
  public scrollView: ScrollView

  constructor(config, x = 0, y = 0) {
    super(config, x, y)

    this.contentBG.visible = false
    let bg = this.scene.add.image(0, 0, "public", "sp_kuang_m.png").setOrigin(0, 0)
    this.contentView.addAt(bg, 0)

    let {w, h} = this.config
    this.titleImg = Pha.getImg({scene: config.scene, x: w / 2, y: -150, t: ""}).setOrigin(0.5, 0)
    this.contentView.add(this.titleImg)

    this.titleText = Pha.getText({scene: config.scene, x: w / 2, y: 94, t: "", s: {color: "#7A45E6", fontSize: 28}}).setOrigin(0.5, 0)
    this.contentView.add(this.titleText)

    this.descText = Pha.getText({scene: config.scene, x: 52 + 8, y: 133 + 8, t: "", s: {color: "#666666", fontSize: 22, wordWrap: {width: 496, useAdvancedWrap: true}}})
    this.contentView.add(this.descText)

    this.redirectContainer = new Container(config.scene, 0, 0)
    this.contentView.add(this.redirectContainer)

    let scrollView: ScrollView = new ScrollView(this.scene, {
      debug: false,
      content: this.redirectContainer,
      maskWidth: 500,
      maskHeight: 210,
      contentWidth: 500,
      contentHeight: 210,
      horizontalScrollPolicy: ScrollPolicy.OFF,
      verticalScrollPolicy: ScrollPolicy.ON,
    }, 52 + 8, 156 + 8)
    scrollView.vSlider.bg.visible = false
    this.contentView.add(scrollView)
    this.scrollView = scrollView
  }

  public setContent(data) {
    // console.log(data)
    let {type, num, list} = data

    this.titleText.text = (type === 1
      ? "获取星星"
      : type === 2
        ? "获取能量石"
        : type === 3
          ? "星星不足"
          : type === 4
            ? "能量石不足"
            : "type:" + type)

    if (type === 1 || type === 2) {
      this.descText.visible = false
      this.scrollView.y = 156 + 8
      this.titleImg.setTexture((type === 1 ? "sp_popups_stars" : "sp_popups_nls") + ".png")
    } else {
      this.descText.visible = true
      this.descText.text = "本次操作需要" + num + `个${type === 3 ? "星星" : "能量石"}，通过下面的途径可以获得${type === 3 ? "星星" : "能量石"}哦！`
      this.scrollView.y = 203 + 8
      this.titleImg.setTexture("sp_popups_warning.png")
    }

    this.redirectContainer.removeAll()
    list.forEach((ele, idx) => {
      let ct = new Container(this.scene, 0, idx * 80)
      this.redirectContainer.add(ct)

      if (ele.iconUrl && ele.iconUrl !== "null" && ele.iconUrl !== "www.baidu.com") {
        let img = this.scene.add.image(30, 30, "redirect" + ele.id)
        ct.add(img)
      }

      let txt = this.scene.add.text(68, 15, ele.title, {fontFamily: "Arial", color: "#666666", fontSize: 22})
      ct.add(txt)

      if (ele.redirectUrl) {
        let goBtn = new PhaserButton({scene: this.scene, hotArea: false, s: "normal", w: 120, h: 40, image: {t: "btn_go1.png"}}, 366, 10)
        goBtn.on("pointertap", () => {
          track(EventType.pageClick, {
            "event_id": ele.redirectUrl
          })

          setTimeout(() => {
            window.location.href = ele.redirectUrl
          }, 100)
        })
        ct.add(goBtn)
      }
    })

    this.scrollView.contentHeight = list.length * 80
    this.scrollView.setScrollTop(0)
    this.scrollView.setContentMask()
    return this
  }
}