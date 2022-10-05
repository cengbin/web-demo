import Container = Phaser.GameObjects.Container
import Image = Phaser.GameObjects.Image
import Pha from "../../../../../util/Pha"
import LevelItemArrow from "./LevelItemArrow"
import IBuildingLevel from "../../../../../interface/IBuildingLevel"
import LevelItemBottom from "./LevelItemBottom"

/**
 * 中心点在对角线交叉点
 * */
export default class LevelItem extends Container {

  public arrow: LevelItemArrow
  public bottom: LevelItemBottom
  public iconImg: Image
  public levelImg: Image
  public selectImg: Image
  public selectTween

  // 是否选中
  private _select = false
  // 显示等级
  private _level = 1
  // 是否是用户当前等级
  private _curLevelActive = false
  // 是否是用户下一个等级
  private _nextLevelActive = false
  private _data2: IBuildingLevel
  private _w = 104
  private _h = 114

  constructor(scene, data, x = 0, y = 0) {
    super(scene, x, y)

    this._data2 = data

    this.bottom = new LevelItemBottom(scene)
    this.add(this.bottom)

    this.iconImg = Pha.getImg({scene, t: ""}).setScale(0.38, 0.38)
    this.add(this.iconImg)

    this.selectImg = Pha.getImg({scene, t: "sp_level_selected.png"}).setVisible(false)
    this.add(this.selectImg)
    this.selectTween = window.TweenMax.to(this.selectImg, 1, {scaleX: 1.05, scaleY: 1.05, repeat: -1, yoyo: true})
    this.selectTween.pause()

    this.levelImg = Pha.getImg({scene, t: "", y: this._h / 2}).setOrigin(0.5, 1)
    this.add(this.levelImg)

    this.arrow = new LevelItemArrow(scene, 60, 0)
    this.add(this.arrow)

    this.addEvent(-this._w / 2, -this._h / 2, this._w, this._h)

    /*let btn = new PhaserButton({scene, hotArea: true, w: 10, h: 10})
    this.add(btn)*/
  }

  public addEvent(x, y, w, h, buttonMode = true) {
    let param = Object.assign({
      hitArea: new Phaser.Geom.Rectangle(x, y, w, h),
      hitAreaCallback: Phaser.Geom.Rectangle.Contains
    }, buttonMode ? {
      cursor: "pointer",
      useHandCursor: false
    } : null)
    this.setInteractive(param)

    this.on("pointerup", (pointer, event) => {
      if (this._select) return
      if (this._nextLevelActive || this._curLevelActive) this.emit("preview")
    }, this)
  }

  public rest(curLevel, curCostNumber = null, nextCostNumber = null) {
    // console.log("LevelItem rest:", curLevel, curCostNumber, nextCostNumber)
    let {own, level, costNumber} = this._data2
    this.select = (own && level === curLevel)
    this.curLevelActive = (own && level === curLevel)
    this.nextLevelActive = (level === (curLevel + 1))

    let bo = (this._curLevelActive || this._nextLevelActive)
    let name = `sp_level_${bo ? "unlock_" : "lock_"}${this._level}.png`
    this.levelImg.setTexture(name)
    this.iconImg.alpha = bo ? 1 : 0.7

    if (curCostNumber !== null && nextCostNumber !== null) this.arrow.active2 = (this._curLevelActive && curCostNumber >= nextCostNumber)

    this.bottom.state2 = this._curLevelActive
      ? 1
      : (this._nextLevelActive
        ? (curCostNumber >= costNumber) ? 2 : 4
        : 3)
  }

  public set data2(val: IBuildingLevel) {
    // console.log(val)
    this._data2 = val
    this._level = val.level

    this.iconImg.setTexture("icon" + val.id)
  }

  public get data2() {
    return this._data2
  }

  public set select(val: boolean) {
    this._select = val
    this.selectImg.visible = val
    this.selectImg.setScale(1, 1)
    val ? this.selectTween.play() : this.selectTween.pause()
  }

  public get select() {
    return this._select
  }

  public set curLevelActive(val) {
    this._curLevelActive = val
  }

  public get curLevelActive() {
    return this._curLevelActive
  }

  private set nextLevelActive(val) {
    this._nextLevelActive = val
  }
}
