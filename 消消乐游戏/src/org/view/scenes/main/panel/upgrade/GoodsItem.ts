import Container = Phaser.GameObjects.Container
import Image = Phaser.GameObjects.Image
import Text = Phaser.GameObjects.Text
import Pha from "../../../../../util/Pha"
import IBuildingMaterial from "../../../../../interface/IBuildingMaterial"
import IBuildingLevel from "../../../../../interface/IBuildingLevel"

export default class GoodsItem extends Container {
  private bgImg
  private selectImg: Image
  private selectTween
  private iconImg: Image
  private useingImg
  private noownImg
  private levelView: Container
  private nameText: Text

  // 是否使用中
  private _useing: boolean = false
  // 是否已拥有
  private _own: boolean = false
  // 当前等级
  private _level = 0
  // 物品名字
  private _gname = ""
  // 是否选中态
  private _select = false

  private _w
  private _h
  private _data2: IBuildingMaterial

  constructor(scene, data, x = 0, y = 0) {
    super(scene, x, y)

    this.scene = scene
    this.data2 = data
    this._w = 130
    this._h = 130

    this.bgImg = Pha.getRect({scene, c: 0x054B66, a: 0.7, r: 12, w: this._w, h: this._h, x: -this._w / 2, y: -this._h / 2})
    this.add(this.bgImg)

    this.iconImg = Pha.getImg({scene, t: ""}).setScale(0.5, 0.5)
    this.add(this.iconImg)

    this.selectImg = Pha.getImg({scene, y: 10, t: "sp_goods_selected.png"})
    this.add(this.selectImg)
    this.selectTween = window.TweenMax.to(this.selectImg, 1, {scaleX: 1.05, scaleY: 1.05, repeat: -1, yoyo: true})
    this.selectTween.pause()

    this.useingImg = Pha.getImg({scene, x: this._w / 2, y: -this._h / 2, t: "sp_goods_useing.png"}).setOrigin(1, 0)
    this.add(this.useingImg)

    this.nameText = this.scene.add.text(0, this._h / 2 + 8, "物品名字", {fontFamily: "Arial", fontSize: 16, color: "#ffffff"}).setOrigin(0.5, 0)
    this.add(this.nameText)

    this.noownImg = Pha.getImg({scene, y: this._h / 2, t: "sp_goods_none.png"}).setOrigin(0.5, 1)
    this.add(this.noownImg)

    let levelTxt = scene.add.text(0, 0, "LV.1", {fontFamily: "Arial", fontSize: 12, color: "#4DFFFF"}).setOrigin(0.5, 0.5)
    let levelBG = scene.add.image(0, 0, "sp_level_bg.png")
    this.levelView = scene.add.container(0, this._h / 2 - 8, [levelBG, levelTxt])
    this.add(this.levelView)

    this.useing = false
    this.own = false

    this.select = false
    this.addClickEvent(-this._w / 2, -this._h / 2, this._w, this._h)
  }

  public addClickEvent(x, y, w, h, buttonMode = true) {
    let param = Object.assign({
      hitArea: new Phaser.Geom.Rectangle(x, y, w, h),
      hitAreaCallback: Phaser.Geom.Rectangle.Contains
    }, buttonMode ? {
      cursor: "pointer",
      useHandCursor: false
    } : null)
    this.setInteractive(param)
  }

  public set level(val: number) {
    this._level = val

    let levelTxt: Text = this.levelView.getAt(1) as Text
    levelTxt.text = (val >= this._data2.vitemExtList.length ? "已满级" : "LV." + val)
  }

  public get level() {
    return this._level
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

  public set useing(val: boolean) {
    this._useing = val
    this.useingImg.visible = val
  }

  public get useing() {
    return this._useing
  }

  public set own(val: boolean) {
    this._own = val
    this.noownImg.visible = !val
    this.levelView.visible = val
  }

  public get own() {
    return this._own
  }

  public set data2(val) {
    this._data2 = val
    // console.log("data2:", val)
    if (val) {
      let {curLevel, name, hasSubOneUse, vitemExtList} = val
      this.own = (curLevel !== 0)
      this.level = curLevel
      this.gname = name
      this.useing = hasSubOneUse

      let itemData: IBuildingLevel = vitemExtList.find(ele => ele.level === (curLevel === 0 ? 1 : curLevel))
      let key = "icon" + itemData.id
      this.iconImg.setTexture(key)
    }
  }

  public get data2() {
    return this._data2
  }

  public set gname(val) {
    this._gname = val
    this.nameText.text = val
  }
}
