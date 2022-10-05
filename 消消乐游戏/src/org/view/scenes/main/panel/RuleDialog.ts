import PhaserDialog from "../../../../../component/UI/PhaserDialog"
import {default as ScrollView, ScrollPolicy} from "../../../../../component/PhaserScrollView"
import Pha from "../../../../util/Pha"

export default class RuleDialog extends PhaserDialog {

  public scrollView: ScrollView

  constructor(config, x = 0, y = 0) {
    super(config, x, y)

    this.contentBG.visible = false
    let bg = Pha.getImg({scene: config.scene, t: "sp_popups_ruler_bg.png"}).setOrigin(0, 0)
    this.contentView.addAt(bg, 0)

    this.closeBtn.y = 38
    this.closeBtn.x = this.contentWidth - this.closeBtn.config.w - 38

    let ruleImg = this.scene.add.image(0, 0, "sp_ruler.jpg").setOrigin(0, 0)

    let scrollView: ScrollView = new ScrollView(this.scene, {
      content: ruleImg,
      maskWidth: 680,
      maskHeight: 520,
      contentWidth: 680,
      contentHeight: 3355,
      horizontalScrollPolicy: ScrollPolicy.OFF,
      verticalScrollPolicy: ScrollPolicy.ON,
    }, 110, 40)
    this.contentView.add(scrollView)
    scrollView.setContentMask()
    scrollView.setScrollTop(0)
    this.scrollView = scrollView

    scrollView.vSlider.bg.visible = false
    scrollView.vSlider.x = 50 + 680 + 6
    scrollView.vSlider.y = 85
    scrollView.vSlider.height = 435
    scrollView.vSlider.p = 520 / 3355
  }

  public show(...args) {
    super.show()
    this.scrollView.setScrollTop(0)
  }
}