import Container = Phaser.GameObjects.Container
import Text = Phaser.GameObjects.Text
import Image = Phaser.GameObjects.Image
import IBuildingMaterial from "../../../../../interface/IBuildingMaterial"
import IBuildingLocation from "../../../../../interface/IBuildingLocation"
import IBuildingLevel, {ChargeType} from "../../../../../interface/IBuildingLevel"
import MainScene from "../../MainScene"
import MainSceneMediator from "../../../../MainSceneMediator"
import Upgrade from "./Upgrade"
import LevelItem from "./LevelItem"
import Pha from "../../../../../util/Pha"
import {default as track, EventType} from "../../../../../util/dot"
import Button from "../../Button"

export default class CoreUpgrade extends Upgrade {

  private _shengjiBtn
  private _yimanjiTxt: Image
  private _bottomTxt: Text
  private _bottomView: Container

  constructor(scene, x = 0, y = 0) {
    super(scene, x, y)

    this.levelItemArr = []
    for (let i = 0; i < 5; i++) {
      let levelItem: LevelItem = new LevelItem(scene, null, (104 + 44) * i, 568)
      this.add(levelItem)
      levelItem.on("preview", () => {
        this.setLevelItemActive(levelItem)

        let key = "goods" + levelItem.data2.id
        this.scene.events.emit(MainSceneMediator.ELEMENT_PREVIEW, ["building" + this._data2.id, key])

        this.btnState = BtnState.SHENGJI
      })
      levelItem.x += 164 + (104 / 2)
      levelItem.arrow.defaultPosition.setTo(60, 0)
      levelItem.arrow.amPosition.setTo(55, 0)
      levelItem.arrow.visible = (i !== 4)
      this.levelItemArr.push(levelItem)
    }

    this.levelView = new Container(scene, 0, 0, this.levelItemArr)
    this.add(this.levelView)

    this._shengjiBtn = new Button(scene, {
      w: 160,
      h: 48,
      bg: {t: "public", f: "btn_bg_160*48_A.png"},
      content: {t: "升级", s: {fontSize: 24}},
    }, 432 + 160 / 2, 660 + 48 / 2)
    this._shengjiBtn.on("pointerup", this.clickShengjiListener, this)

    this._yimanjiTxt = Pha.getImg({scene, t: "txt_yimaji.png", x: 512, y: 668}).setOrigin(0.5, 0).setVisible(false)

    this._bottomTxt = Pha.getText({scene, t: "", x: 512, y: 716, s: {fontSize: 14}}).setOrigin(0.5, 0)

    this._bottomView = new Container(scene, 0, 0, [this._shengjiBtn, this._yimanjiTxt, this._bottomTxt])
    this.add(this._bottomView)
  }

  private clickShengjiListener() {
    track(EventType.pageClick, {
      "event_id": "region_constructionlocation_core_levelup"
    })

    let {vitemExtList, curLevel} = this._data2.vitemList[0]
    let cbld: IBuildingLevel = vitemExtList.find(ele => ele.level === (curLevel + 1))
    this.scene.events.emit(MainScene.CLICK_SHENGJI, cbld)
  }

  public setContent(buildingLocationData: IBuildingLocation) {
    super.setContent(buildingLocationData)

    let buildingMaterialData: IBuildingMaterial = buildingLocationData.vitemList[0]
    if (buildingMaterialData) {
      this.setLevelItemState(buildingMaterialData)
    }

    return this
  }

  private setLevelItemState(buildingMaterialData: IBuildingMaterial) {
    // console.log("setLevelItemState:", buildingMaterial)
    let {enName, id, courseCount} = this._data2
    let {vitemExtList, curLevel} = buildingMaterialData
    let cbld: IBuildingLevel = vitemExtList.find(ele => ele.level === (curLevel === 0 ? 1 : curLevel))
    let key = "goods" + cbld.id

    this.scene.events.emit(MainSceneMediator.ELEMENT_PREVIEW, ["building" + id, key])

    this.btnState = (curLevel >= vitemExtList.length ? BtnState.YIMANJI : BtnState.SHENGJI)

    this.levelItemArr.forEach((ele, idx) => {
      let bld: IBuildingLevel = vitemExtList[idx]
      if (bld) {
        ele.data2 = bld

        let nbld = vitemExtList.find(ele => ele.level === bld.level + 1)
        ele.rest(curLevel, bld.chargeType === ChargeType.COURSE ? courseCount : null, nbld ? nbld.costNumber : null)
      }
      ele.visible = Boolean(bld)

      if (cbld === bld) this.setLevelItemActive(ele)
    })
  }

  public show() {
    super.show()
    window.TweenMax.staggerFromTo(this.levelItemArr, 1, {scaleX: 0, scaleY: 0}, {scaleX: 1, scaleY: 1, ease: window.Elastic.easeOut}, 0.1)
    window.TweenMax.fromTo(this._bottomView, 0.5, {alpha: 0}, {alpha: 1, delay: 0.3, ease: window.Power0.easeNone})
  }

  public hide() {
    super.hide()
    // window.TweenMax.to(this._bottomView, 0.3, {y: 100, alpha: 0, ease: window.Power1.easeOut})
  }

  private set btnState(val) {
    this._shengjiBtn.visible = this._yimanjiTxt.visible = false

    switch (val) {
      case BtnState.YIMANJI:
        this._yimanjiTxt.visible = true
        this._bottomTxt.text = "当前建筑已升至最高等级！加油建造基地内的其余建筑吧"
        break
      case BtnState.SHENGJI:
        this._shengjiBtn.visible = true

        let buildingMaterial: IBuildingMaterial = this._data2.vitemList[0]
        let {vitemExtList, curLevel} = buildingMaterial
        let nextLevelData: IBuildingLevel = vitemExtList.find(ele => ele.level === curLevel + 1)
        let cha = nextLevelData.costNumber - this._data2.courseCount
        this._bottomTxt.text = cha > 0 ? "再完成" + cha + "节课程可以升级" : ""
        break
    }
  }
}

enum BtnState {
  YIMANJI,
  SHENGJI
}