import DiamondTiledMap from "../map/DiamondTiledMap"
import MainScene from "../MainScene"
import DiamondTiledMapView from "../map/DiamondTiledMapView"
import Container = Phaser.GameObjects.Container
import Image = Phaser.GameObjects.Image
import Sprite = Phaser.GameObjects.Sprite
import IBuildingLocation, {BuildingLocationType} from "../../../../interface/IBuildingLocation"
import Pha from "../../../../util/Pha"
import IBuildingMaterial from "../../../../interface/IBuildingMaterial"
import env from "../../../../util/env"
import BuildTips from "./BuildTips"
import MainSceneMediator from "../../../MainSceneMediator"
import IBuildingLevel from "../../../../interface/IBuildingLevel"

export default class Element extends Container {
  // 场景引用
  public scene: MainScene
  // 建造物升级提示
  public upgradeTips: Sprite
  // 修建建造物提示
  public btips: BuildTips
  // 建造物
  public buildImg: Image
  // 当前建造位数据
  public _data2: IBuildingLocation
  // 当前建造位的行
  public curRow
  // 当前建造位的列
  public curCol
  // 深度
  public depth = 0
  // 45度格子地图
  public diamondTileMap: DiamondTiledMap

  public offset = null

  // 当前等级
  private _level = 0
  // 当前纹理key
  private _texture = ""
  // 预览纹理key
  private _previewTexture = ""
  // 上
  private _p1
  // 右
  private _p2
  // 下
  private _p3
  // 左
  private _p4
  // 中心点x坐标
  private _centerX
  // 中心点y坐标
  private _centerY

  private _testText

  private _buildImgTween = null

  constructor(scene, data) {
    super(scene)

    this.setData2(data)

    this.buildImg = Pha.getImg({scene, t: this.texture}).setScale(0.5, 0.5).setVisible(false)
    // 显示到占格的底部
    this.buildImg.setOrigin(0.5, 1)
    this.buildImg.x = this._p3.x + this.diamondTileMap.tileWidth / 2
    this.buildImg.y = this._p3.y + this.diamondTileMap.tileHeight
    this.add(this.buildImg)
    this.addEvent(this.buildImg)
    this.buildImg.on("pointerover", this.onOverListener, this)
    this.buildImg.on("pointerout", this.onOutListener, this)
    // this.buildImg.on("pointerdown", (pointer) => {
    //   window.TweenMax.to(this.buildImg, 0.3, {scaleX: 0.55, scaleY: 0.55})
    // }, this)
    //
    // this.buildImg.on("pointerup", (pointer) => {
    //   window.TweenMax.to(this.buildImg, 0.3, {scaleX: 0.5, scaleY: 0.5})
    // }, this)
    //
    // this.buildImg.on("pointerout", () => {
    //   window.TweenMax.to(this.buildImg, 0.3, {scaleX: 0.5, scaleY: 0.5})
    // }, this)

    this.btips = new BuildTips(scene, this.centerX + this.diamondTileMap.tileWidth / 2, this.centerY + this.diamondTileMap.tileHeight / 2)
    this.add(this.btips)
    this.btips.rows = this.data2.rows
    this.addEvent(this.btips.baseImg)

    this.upgradeTips = this.scene.add.sprite(0, 0, "").play("tips").setVisible(false).setInteractive()
    this.add(this.upgradeTips)
    this.upgradeTips.on("pointerup", () => {
      this.scene.events.emit(MainSceneMediator.SHOW_UPGRADE_PANEL, this.data2)
    })

    this.setEleState()

    if (env === "dev") this._dev()
  }

  private _dev() {
    // var fdtMap = new DiamondTiledMapView(this.scene, this.diamondTileMap)
    // this.addAt(fdtMap, 0)
    // fdtMap.fill(0x52DDA3, 1)
    //
    // this.buildImg.alpha = 0.3
    // let bounds3 = this.buildImg.getBounds()
    // let graphics = this.scene.add.graphics()
    // graphics.lineStyle(1, 0x00ff00)
    // graphics.strokeRectShape(bounds3)
    // this.add(graphics)

    this._testText = Pha.getText({
      scene: this.scene,
      t: this.data2.id + this.data2.name + "/" + this.data2.initRow + "/" + this.data2.initCol,
      x: 0,
      y: 0,
      s: {fontSize: 14, color: "#ff0000"}
    }).setOrigin(0.5, 0.5)
    this.add(this._testText)
    this._testText.alpha = 0.5
  }

  private setData2(data: IBuildingLocation) {
    // console.log(data)
    this._data2 = data

    let {id, initRow, initCol, rows, cols, vitemList} = data
    this.curRow = initRow
    this.curCol = initCol
    this.depth = initRow + initCol + cols
    this.name = "building" + id

    this.diamondTileMap = new DiamondTiledMap(rows, cols, MainScene.TILE_WIDTH, MainScene.TILE_HEIGHT)
    let {tileWidth, tileHeight} = this.diamondTileMap

    this._p1 = this.diamondTileMap.nodeList[0][0]
    this._p2 = this.diamondTileMap.nodeList[0][cols - 1]
    this._p3 = this.diamondTileMap.nodeList[rows - 1][cols - 1]
    this._p4 = this.diamondTileMap.nodeList[rows - 1][0]
    // console.log(this._p1, this._p2, this._p3, this._p4)

    // 有两点 A(x1, y1) B(x2, y2) 则它们的中点P的坐标为（(x1+x2)/2, (y1+y2)/2）
    let x1 = this._p1.x + tileWidth / 2
    let y1 = this._p1.y
    let x2 = this._p3.x + tileWidth / 2
    let y2 = this._p3.y + tileHeight
    let x = (x1 + x2) / 2
    let y = (y1 + y2) / 2
    this._centerX = x - this.diamondTileMap.tileWidth / 2
    this._centerY = y - this.diamondTileMap.tileHeight / 2
  }

  public addEvent(ele) {
    ele.setInteractive({
      pixelPerfect: true,
      cursor: "pointer",
      useHandCursor: false
    })
    ele.on("pointerdown", this.onPointerDownListener, this)
    ele.on("pointermove", this.onPointerMoveListener, this)
    ele.on("pointerup", this.onPointerUpListener, this)
    ele.on("pointerout", this.onPointerOutListener, this)
  }

  public onPointerDownListener(pointer, localX, localY, event) {
    // console.log("onPointerDownListener:", pointer.worldX, pointer.worldY)
    let tw: any = window.TweenMax.getTweensOf(this.scene.dragLayer)
    if (tw.length > 0) {
      tw[0].kill()
    }

    this.offset = {
      x: this.scene.dragLayer.x - pointer.worldX,
      y: this.scene.dragLayer.y - pointer.worldY,
      startWorldX: pointer.worldX,
      startWorldY: pointer.worldY
    }
  }

  public onPointerMoveListener(pointer, localX, localY, event) {
    if (this.offset) {
      let x = pointer.worldX + this.offset.x
      let y = pointer.worldY + this.offset.y
      this.scene.scrollView.setContentPosition(x, y)
    }
  }

  public onPointerUpListener(pointer, localX, localY, event) {
    this.buildImg.resetPipeline()
    // console.log("onPointerUpListener:", pointer.worldX, pointer.worldY)
    if (this.offset) {
      let x2 = pointer.worldX
      let y2 = pointer.worldY
      let distance = Phaser.Math.Distance.Between(this.offset.startWorldX, this.offset.startWorldY, x2, y2)
      // console.log(distance)
      if (distance <= 1) {
        window._vlog.log("click element id:" + this.data2.id + ",unlock:" + this.data2.unlock)
        this.scene.sound.play("common_click.mp3")
        if (this.data2.unlock) {
          this.upgradeTips.visible = false
          this.scene.events.emit(MainSceneMediator.SHOW_UPGRADE_PANEL, this.data2)
        } else {
          this.scene.events.emit(MainSceneMediator.SHOW_LOCK_PANEL, this.data2)
        }
      }
      this.offset = null
    }
  }

  public onPointerOutListener(pointer, localX, localY, event) {
    // console.log("onPointerOutListener:", pointer.worldX, pointer.worldY)
    if (this.offset) this.offset = null
  }

  protected onOverListener(): void {
    this.buildImg.setPipeline("outlineFilter")
  }

  protected onOutListener(): void {
    this.buildImg.resetPipeline()
  }

  private flash(bo: boolean) {
    if (!this._buildImgTween) this._buildImgTween = window.TweenMax.to(this.buildImg, 0.8, {alpha: 0.7, repeat: -1, yoyo: true, ease: window.Power0.easeNone})

    if (bo) {
      if (!this._buildImgTween.isActive()) this._buildImgTween.play()
    } else {
      this._buildImgTween.pause()
      this.buildImg.setAlpha(1)
    }
  }

  public rest() {
    this.setEleState()
    this.flash(false)
  }

  /**
   * 设置当前建造位的显示状态
   * */
  private setEleState() {
    this.buildImg.visible = this.btips.visible = false

    let {unlock} = this._data2
    let cbmd = this.curBuildingMaterialData
    let cbld = this.curBuildingLevelData
    // (已拥有并且在使用中)
    if (unlock && cbmd && cbld) {
      this.texture = "goods" + cbld.id
      this.buildImg.setVisible(true)
    } else {
      this.btips.unlock = unlock
      this.btips.visible = true
    }
  }

  /**
   * 设置建筑的升级显示状态
   * （对象自身并不知道自己是否应该显示升级，所以应该由外部调用）
   * */
  public setUpgradeState(leftStars) {
    let bo = false
    let {id, unlock, type, courseCount} = this._data2
    let cbmd = this.curBuildingMaterialData
    if (unlock && cbmd) {
      let {curLevel, vitemExtList} = cbmd
      // 没有升到满级
      if (curLevel < vitemExtList.length) {
        let {costNumber} = this.nextBuildingLevelData
        if (type === BuildingLocationType.CORE) {
          bo = (courseCount >= costNumber)
        } else if (type === BuildingLocationType.COMMON) {
          bo = (leftStars >= costNumber)
        }
      }
    }
    // console.log(id, Boolean(unlock && cbmd), leftStars, bo)
    // console.log("\n")
    this.upgradeTips.visible = bo
  }

  public destory() {
    // console.log("element destory")
    super.destroy()
    if (this.btips) this.btips.destory()
  }

  /**
   * 获取当前建造位 -> 当前建造物数据(已拥有并且在使用中)
   * */
  private get curBuildingMaterialData(): IBuildingMaterial {
    return this._data2.vitemList.find(ele => ele.hasSubOneUse)
  }

  /**
   * 获取当前建造物 -> 当前等级数据
   * */
  private get curBuildingLevelData(): IBuildingLevel {
    let cbmd = this.curBuildingMaterialData
    return cbmd ? this.getBuildingLevelData(cbmd.curLevel) : null
  }

  /**
   * 获取当前建造物 -> 下一个等级数据
   * */
  private get nextBuildingLevelData(): IBuildingLevel {
    let cbmd = this.curBuildingMaterialData
    return cbmd ? this.getBuildingLevelData(cbmd.curLevel + 1) : null
  }

  /**
   * 获取当前建造物 -> 等级数据
   * @param level 等级
   * */
  private getBuildingLevelData(level) {
    let cbmd = this.curBuildingMaterialData
    return cbmd ? cbmd.vitemExtList.find(ele => ele.level === level) : null
  }

  public set level(val) {
    this._level = val
  }

  public get level() {
    return this._level
  }

  public set texture(val) {
    this._texture = val
    // console.log("this.texture：",this.texture)
    if (this.buildImg) this.buildImg.setTexture(val)
    if (this.upgradeTips) this.upgradeTips.setPosition(this.buildImg.x, this.buildImg.y - (this.buildImg.height / 2) - 23)
  }

  public get texture() {
    return this._texture
  }

  public set previewTexture(val) {
    // console.log("set previewTexture：", val)
    this._previewTexture = val
    if (this.btips) this.btips.setVisible(false)
    if (this.buildImg) {
      this.buildImg.setTexture(val).setVisible(true)
      this.flash(true)
    }
  }

  public get centerX() {
    return this._centerX
  }

  public get centerY() {
    return this._centerY
  }

  public get data2() {
    return this._data2
  }
}
