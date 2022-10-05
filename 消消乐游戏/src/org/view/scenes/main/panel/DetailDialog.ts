import PhaserDialog from "../../../../../component/UI/PhaserDialog"
import PhaserCarousel from "../../../../../component/PhaserCarousel"
import ScrollView, {ScrollPolicy} from "../../../../../component/PhaserScrollView"
import IBuildingLocation from "../../../../interface/IBuildingLocation"

export default class DetailDialog extends PhaserDialog {

  public titleText = null
  public buildingTitle = null
  public buildingDesc = null
  public buildingKnowledgeTitle = null
  public buildingKnowledgeIntroduce = null
  public carouseView: PhaserCarousel = null
  public scrollViewA: ScrollView = null
  public scrollViewB: ScrollView = null

  private _data2: IBuildingLocation

  constructor(config, x = 0, y = 0) {
    super(config, x, y)

    this.contentView.remove(this.contentBG)
    this.contentBG = this.scene.add.image(0, 0, "sp_popups_detail_bg.png").setOrigin(0, 0)
    this.contentView.addAt(this.contentBG, 0)

    this.titleText = this.scene.add.text(458, 50, "知识拓展", {fontFamily: "Arial", fontSize: 28, color: "#7A45E6"}).setOrigin(0.5, 0)
    this.contentView.add(this.titleText)

    let prevBtn = this.scene.add.image(-24, 60, "sp_arrow_right.png").setAngle(180).setInteractive()
    let nextBtn = this.scene.add.image(120 + 24, 60, "sp_arrow_right.png").setInteractive()
    let carouseView = new PhaserCarousel(this.scene, {
      debug: false,
      maskWidth: 120,
      maskHeight: 120,
      prevBtn,
      nextBtn,
      content: []
    }, 112, 148)
    this.contentView.add(carouseView)
    carouseView.setContentMask()
    this.carouseView = carouseView
    this.carouseView.on(PhaserCarousel.CAROUSEL_START, (index) => {
      this.buildingTitle.text = this.data2.vitemList[index].name
      this.buildingDesc.text = this.data2.vitemList[index].description
      this.scrollViewA.contentHeight = this.buildingDesc.height
      this.scrollViewA.setScrollTop(0)
    })

    this.buildingTitle = this.scene.add.text(308, 136, "标题", {fontFamily: "Arial", color: "#666666", fontSize: 22, fontStyle: "bold"})
    this.contentView.add(this.buildingTitle)

    this.buildingDesc = this.scene.add.text(0, 0, "描述", {fontFamily: "Arial", color: "#666666", fontSize: 22, wordWrap: {width: 548, useAdvancedWrap: true}})
    this.contentView.add(this.buildingDesc)

    let scrollViewA = new ScrollView(this.scene, {
      debug: false,
      content: this.buildingDesc,
      maskWidth: 548,
      maskHeight: 106,
      contentWidth: 548,
      contentHeight: this.buildingDesc.height,
      horizontalScrollPolicy: ScrollPolicy.OFF,
      verticalScrollPolicy: ScrollPolicy.ON,
    }, 308, 174)
    this.contentView.add(scrollViewA)
    scrollViewA.setContentMask()
    scrollViewA.setScrollTop(0)
    this.scrollViewA = scrollViewA

    this.buildingKnowledgeTitle = this.scene.add.text(60, 368, "中文：博物馆 英文：Museum", {fontFamily: "Arial", color: "#666666", fontSize: 22, fontStyle: "bold"})
    this.contentView.add(this.buildingKnowledgeTitle)

    this.buildingKnowledgeIntroduce = this.scene.add.text(0, 0, "", {fontFamily: "Arial", color: "#666666", fontSize: 22, wordWrap: {width: 796, useAdvancedWrap: true}})
    this.buildingKnowledgeIntroduce.setLineSpacing(8)

    let scrollViewB = new ScrollView(this.scene, {
      content: this.buildingKnowledgeIntroduce,
      maskWidth: 796,
      maskHeight: 110,
      contentWidth: 796,
      contentHeight: this.buildingKnowledgeIntroduce.height,
      horizontalScrollPolicy: ScrollPolicy.OFF,
      verticalScrollPolicy: ScrollPolicy.ON,
    }, 60, 404)
    this.contentView.add(scrollViewB)
    scrollViewB.setContentMask()
    scrollViewB.setScrollTop(0)
    this.scrollViewB = scrollViewB
  }

  public fill(data: IBuildingLocation) {
    // console.log(data)
    this._data2 = data
    let {name, enName, description, vitemList} = data

    if (vitemList.length > 0) {
      let index = 0
      this.buildingTitle.text = vitemList[index].name
      this.buildingDesc.text = vitemList[index].description

      let content = []
      data.vitemList.forEach((ele, idx) => {
        let buildingLevelData = ele.vitemExtList[0]
        let key = "icon" + buildingLevelData.id
        let img = this.scene.add.image((idx * 120) + 60, 0 + 60, key)
        let sx = 120 / img.width
        let sy = 120 / img.height
        img.setScale(sx, sy)
        content.push(img)
      })
      this.carouseView.setContent(content)
      this.carouseView.index = index
    }

    this.buildingKnowledgeTitle.text = "" + name + "   " + enName

    let txt = this.scene.add.text(0, 0, description, {fontFamily: "Arial", color: "#666666", fontSize: 22, wordWrap: {width: 796, useAdvancedWrap: true}})
    this.scrollViewB.setContent(txt)
    this.scrollViewB.setScrollTop(0)
    return this
  }

  public set data2(val) {
    this._data2 = val
  }

  public get data2() {
    return this._data2
  }
}