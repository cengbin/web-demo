import Container = Phaser.GameObjects.Container
import Image = Phaser.GameObjects.Image
import MainScene from "../MainScene"
import env from "../../../../util/env"
import IMap from "../../../../interface/IMap"
import Popup, {PopupContent} from "./Popup"

export enum JumpBuildingType {
  NEXT = "next",
  PREV = "prev"
}

/**
 *
 * @desc 先判断上一个还是下一个，然后再判断状态
 * */
export default class JumpBuilding extends Container {
  public scene: MainScene
  public view: Container
  public jumpBG: Image
  public statusImg: Image
  public statusImgTLM
  public jumpBarView: Container
  public jumpBarBg: Image
  public jumpBarLine: Image
  public jumpBarMask: Image
  public popup: Popup
  public diamondTileMap
  // 深度
  public depth: number = 0

  // 当前建造位数据
  private _data2: any
  private _mapData: IMap
  private _type: string
  // 0 未开启 1 开启中 2 已开启
  private _openStatus = 0

  constructor(scene, data, x = 0, y = 0) {
    super(scene, x, y)
    this.setData2(data)
    if (env === "dev") this._dev()
  }

  private setData2(data) {
    this._data2 = data

    let {initRow, initCol, rows, cols, type} = data
    this.depth = initRow + initCol + cols
    this._type = type
    this.setRowCol(initRow, initCol)
  }

  public init() {
    let scene = this.scene

    this.view = scene.add.container(24, 48)
    this.add(this.view)

    this.jumpBG = scene.add.image(0, 0, "").setOrigin(0.5, 203 / 236)
    this.view.add(this.jumpBG)

    let sprite = this.statusImg = scene.add.image(0, -203 - 12, "")
    this.view.add(this.statusImg)
    let tlm = this.statusImgTLM = new window.TimelineMax({repeat: -1, repeatDelay: 2})
    tlm.to(sprite, 0.3, {scaleX: 1.25, scaleY: 0.75})
    tlm.to(sprite, 0.1, {scaleX: 0.75, scaleY: 1.25})
    tlm.to(sprite, 0.1, {scaleX: 1.15, scaleY: 0.85})
    tlm.to(sprite, 0.15, {scaleX: 0.95, scaleY: 1.05})
    tlm.to(sprite, 0.1, {scaleX: 1.05, scaleY: 0.95})
    tlm.to(sprite, 0.25, {scaleX: 1, scaleY: 1})
    tlm.stop()

    this.jumpBarBg = scene.add.image(0, 0, "sp_jump_bar_bg.png").setOrigin(0, 0)
    this.jumpBarLine = scene.add.image(25, 141, "sp_jump_bar_line.png").setOrigin(0, 0)

    this.jumpBarView = scene.add.container(46, -155, [this.jumpBarBg, this.jumpBarLine])
    this.view.add(this.jumpBarView)

    this.jumpBarMask = scene.add.image(0, 0, "sp_jump_bar_mask.png")
      .setOrigin(0, 0)
      .setVisible(false)
    let mask = this.jumpBarMask.createBitmapMask()
    this.jumpBarLine.setMask(mask)
    this.moveUpdate()

    this.popup = new Popup(this.scene, 0, -247 - 5)
    this.view.add(this.popup)
    this.popup.setVisible(false)

    this.addEvent()
  }

  public setRowCol(row, col) {
    let {cols} = this._data2
    this.depth = row + col + cols

    let {x, y} = this.scene.staggeredTiledMap.nodeList[row][col]
    this.x = x
    this.y = y

    if (this._type === JumpBuildingType.PREV) {
      this.x = x
      this.y = y
    } else if (this._type === JumpBuildingType.NEXT) {
      this.x = x
      this.y = y

      if (this.scene.data.values.index === 0) this.x -= 10
    }
  }

  public addEvent() {
    this.setInteractive({
      hitArea: new Phaser.Geom.Rectangle(-140 / 2, -203 - 30 - 12, 140, 236 + 30 + 12),
      hitAreaCallback: Phaser.Geom.Rectangle.Contains,
      cursor: "pointer",
      useHandCursor: false
    })

    this.on("pointerup", (pointer) => {
      if (this._openStatus === 0) {
        this.popup.setContent(PopupContent.JingQingQiDai).show()
      } else if (this._openStatus === 1) {
        let {courseCount, unlockConditionCount} = this._mapData
        this.popup.setContent(PopupContent.HowUnlock, unlockConditionCount - courseCount).show()
      } else if (this._openStatus === 2) {
        this.scene.events.emit(MainScene.CLICK_JUMP, this.id)
      }
    }, this)
  }

  public moveUpdate() {
    this.jumpBarMask.setPosition(
      this.parentContainer.parentContainer.x + this.x + this.jumpBarView.x + 22 - 24 + 24,
      this.parentContainer.parentContainer.y + this.y + this.jumpBarView.y + 37 - 12 + 48
    )
  }

  public fill(mapData: IMap) {
    this._mapData = mapData

    if (!this._mapData) {
      this.openStatus = 0
    } else {
      let {unlock} = this._mapData

      this.openStatus = unlock
        ? 2
        : 1
    }

    return this
  }

  public getMapXY(row, col) {
    return this.scene.staggeredTiledMap.map2screen(row, col)
  }

  public set openStatus(val) {
    this._openStatus = val

    if (this.statusImgTLM) {
      this.statusImgTLM.stop()
    }

    switch (val) {
      case 0:
        this.jumpBarView.setVisible(true)
        this.jumpBG.setTexture("sp_jump_bg_lock.png")
        this.statusImg.setTexture("sp_jump_lock.png")
        break
      case 1:
        this.jumpBarView.setVisible(true)
        this.jumpBG.setTexture("sp_jump_bg_unlock.png")
        this.statusImg.setTexture("sp_jump_opening.png")

        let {courseCount, unlockConditionCount} = this._mapData
        let num = (courseCount / unlockConditionCount)
        this.jumpBarLine.y = 141 - (num * 106)
        break
      case 2:
        this.jumpBG.setTexture("sp_jump_bg_unlock.png")

        if (this._type === JumpBuildingType.PREV) {
          this.statusImg.setTexture("sp_jump_prev.png")
          this.jumpBarView.setVisible(false)
        } else if (this._type === JumpBuildingType.NEXT) {
          this.statusImg.setTexture("sp_jump_next.png")
          this.jumpBarView.setVisible(true)
        }

        this.jumpBarLine.y = 141 - 106

        this.statusImgTLM.restart()
        break
    }
  }

  public get openStatus() {
    return this._openStatus
  }

  private _dev() {
    // this.view.alpha = 0.5

    // this.diamondTileMap = new DiamondTiledMap(this._data2.rows, this._data2.cols, MainScene.TILE_WIDTH, MainScene.TILE_HEIGHT)
    //
    // var fdtMap = new DiamondTiledMapView(this.scene, this.diamondTileMap)
    // this.addAt(fdtMap, 0)
    // fdtMap.fill(0x52DDA3, 1)
  }

  public get id() {
    return this._mapData.id
  }
}
