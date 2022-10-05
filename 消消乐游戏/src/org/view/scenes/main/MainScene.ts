import Container = Phaser.GameObjects.Container
import StaggeredTiledMapLayer from "./map/StaggeredTiledMapLayer"
import Element from "./display/Element"
import {ScrollView} from "./ScrollView"
import StaggeredTiledMap from "./map/StaggeredTiledMap"
import Button from "./Button"
import DetailDialog from "./panel/DetailDialog"
import RedirectDialog from "./panel/RedirectDialog"
import RuleDialog from "./panel/RuleDialog"
import {SceneEvent} from "../../../../Game"
import ExclusiveUpgrade from "./panel/upgrade/ExclusiveUpgrade"
import CoreUpgrade from "./panel/upgrade/CoreUpgrade"
import LockDialog from "./panel/LockDialog"
import OtherElement from "./display/OtherElement"
import AnimateRotate from "./building/animate/AnimateRotate"
import Hand from "./display/Hand"
import {default as track, EventType} from "../../../util/dot"
import Pha from "../../../util/Pha"
import MainSceneMediator from "../../MainSceneMediator"
import JumpBuilding, {JumpBuildingType} from "./building/JumpBuilding"
import IMap from "../../../interface/IMap"

export default class MainScene extends Phaser.Scene {
  public static NAME = "main_scene"
  public static CLICK_BACK = "click_back"
  public static CLICK_VMAP = "click_vmap"
  public static CLICK_SHENGJI = "click_shengji"
  public static CLICK_JIHUO = "click_jihuo"
  public static CLICK_SHIYONG = "click_shiyong"
  public static CLICK_TITLE = "click_title"
  public static CLICK_JUMP = "click_jump"

  public static TILE_WIDTH = 48
  public static TILE_HEIGHT = 24
  public static ROWS = 120
  public static COLS = 60

  // 第0层：可拖动场景层
  public dragLayer: Container = null
  public mapLayer: Container = null
  public eleLayer: Container = null
  public animateLayer: Container = null
  // 装饰层
  public decorationLayer: Container = null
  public staggeredTiledMapView: StaggeredTiledMapLayer
  public scrollView: ScrollView

  // 第1层: UI层
  public uiLayer = null
  public topuiLayer = null
  public starBtn = null
  public eggshellBtn = null
  // 获得能量石,星星/ 星星,能量石不足 介绍面板
  public redirectDialog: RedirectDialog = null
  // 规则介绍
  public ruleDialog = null
  // 核心建造位置升级
  public coreUpgrade: CoreUpgrade = null
  // 专属建造位置升级
  public exclusiveUpgrade: ExclusiveUpgrade = null
  // 知识拓展
  public detailDialog: DetailDialog = null
  // 未解锁提示
  public lockDialog: LockDialog = null
  // 提示点击手势
  public hand: Hand = null
  public prevSceneBtn: JumpBuilding
  public nextSceneBtn: JumpBuilding

  public staggeredTiledMap: StaggeredTiledMap = null
  public elementArr = []

  constructor() {
    super({key: MainScene.NAME})

    this.staggeredTiledMap = new StaggeredTiledMap(MainScene.ROWS, MainScene.COLS, MainScene.TILE_WIDTH, MainScene.TILE_HEIGHT)
    // console.log(this.staggeredTiledMap.mapWidth, this.staggeredTiledMap.mapHeight)
  }

  public init(data: IMap) {
    // console.log("MainScene init:", data)
    this.data.values = data

    this.elementArr = []

    this.dragLayer = this.add.container(0, 0).setVisible(false)
    this.mapLayer = this.add.container(0, 0)
    this.eleLayer = this.add.container(0, 0)
    this.animateLayer = this.add.container(0, 0)
    this.decorationLayer = this.add.container(0, 0)
    this.mapLayer.x = this.eleLayer.x = this.animateLayer.x = -MainScene.TILE_WIDTH / 2
    this.mapLayer.y = this.eleLayer.y = this.animateLayer.y = -MainScene.TILE_HEIGHT / 2
    this.dragLayer.add([this.mapLayer, this.eleLayer, this.animateLayer, this.decorationLayer])

    this.initMap()
    this.initUI()
    this.initEecoration()

    // 解决切场景闪屏问题
    this.time.delayedCall(5, () => {
      this.dragLayer.setVisible(true)
      this.uiLayer.setVisible(true)
      window.TweenMax.fromTo([this.dragLayer, this.uiLayer], 0.5, {alpha: 0}, {alpha: 1, ease: window.Power0.easeNone})
    }, null, this)

    this.scrollView = new ScrollView({
      content: this.mapLayer,
      wrapperWidth: this.game.config.width,
      wrapperHeight: this.game.config.height,
      scrollerWidth: this.staggeredTiledMap.mapWidth - MainScene.TILE_WIDTH / 2,
      scrollerHeight: this.staggeredTiledMap.mapHeight - MainScene.TILE_HEIGHT / 2,
    })

    this.events.emit(SceneEvent.INIT_COMPLETE)
  }

  public initMap() {
    this.staggeredTiledMapView = new StaggeredTiledMapLayer(this, this.staggeredTiledMap)
    this.mapLayer.add(this.staggeredTiledMapView)
    // this.staggeredTiledMapView.showGridView()
  }

  public initUI() {
    let relativeX = (Number(this.game.config.width) - 1024) / 2

    let navbarBG = Pha.getImg({scene: this, t: "sp_navbar_bg.png"}).setOrigin(0, 0)

    this.eggshellBtn = new Button(this, {
      w: 112,
      h: 48,
      color: {c: 0x000000, a: 0.2, r: 24},
      bg: {t: "icon_energy.png", x: -24},
      content: {t: "0", x: -4, s: {fontSize: 18}}
    }, 547 + 56, 44)
    this.eggshellBtn.on("pointerup", () => {
      track(EventType.pageClick, {"event_id": "region_starguide"})
      this.events.emit(MainSceneMediator.SHOW_REDIRECT_PANEL, 2)
    })
    this.eggshellBtn.content.setOrigin(0, 0.5)

    this.starBtn = new Button(this, {
      w: 112,
      h: 48,
      color: {c: 0x000000, a: 0.2, r: 24},
      bg: {t: "icon_star.png", x: -24},
      content: {t: "0", x: -4, s: {fontSize: 18}}
    }, 678 + 56, 44)
    this.starBtn.content.setOrigin(0, 0.5)
    this.starBtn.on("pointerup", () => {
      track(EventType.pageClick, {"event_id": "region_starguide"})
      this.events.emit(MainSceneMediator.SHOW_REDIRECT_PANEL, 1)
    })

    let jdzsBtn = new Button(this, {
      hotArea: false,
      w: 48,
      h: 64,
      bg: {t: "icon_jdzs.png", y: -8},
      content: {t: "基地装饰", y: 26, s: {fontSize: 14}}
    }, 821 + 24, 44)
    jdzsBtn.on("pointerup", () => {
      track(EventType.pageClick, {"event_id": "planetbuilder_starstore"})

      if (window["VK"]) window["VK"].push({path: "/assignment/starStore"})
    }, this)

    let tkylBtn = new Button(this, {
      hotArea: false,
      w: 48,
      h: 64,
      bg: {t: "icon_xqmap.png", y: -8},
      content: {t: "基地预览", y: 26, s: {fontSize: 14}}
    }, 889 + 24, 44)
    tkylBtn.on("pointerup", this.clickJDYLListener, this)

    let ruleIntroBtn = new Button(this, {
      w: 48,
      h: 64,
      bg: {t: "icon_rule.png", y: -8},
      content: {t: "秘籍", y: 26, s: {fontSize: 14}}
    }, 957 + 24, 44)
    ruleIntroBtn.on("pointerup", () => this.ruleDialog.show())

    let tlm = new window.TimelineMax({repeat: -1, repeatDelay: 3})
    tlm.to(this.eggshellBtn.bg, 0.1, {rotation: 5 * Math.PI / 180})
    tlm.to(this.eggshellBtn.bg, 0.1, {rotation: -10 * Math.PI / 180})
    tlm.to(this.eggshellBtn.bg, 0.1, {rotation: 10 * Math.PI / 180})
    tlm.to(this.eggshellBtn.bg, 0.3, {scaleX: 1.2, scaleY: 1.2}, "-=0.3")
    tlm.to(this.eggshellBtn.bg, 0.1, {rotation: 0})
    tlm.to(this.eggshellBtn.bg, 0.1, {scaleX: 1, scaleY: 1}, "-=0.1")

    tlm.to(this.starBtn.bg, 0.1, {rotation: 5 * Math.PI / 180}, "-=0.1")
    tlm.to(this.starBtn.bg, 0.1, {rotation: -10 * Math.PI / 180})
    tlm.to(this.starBtn.bg, 0.1, {rotation: 10 * Math.PI / 180})
    tlm.to(this.starBtn.bg, 0.3, {scaleX: 1.2, scaleY: 1.2}, "-=0.3")
    tlm.to(this.starBtn.bg, 0.1, {rotation: 0})
    tlm.to(this.starBtn.bg, 0.1, {scaleX: 1, scaleY: 1}, "-=0.1")

    this.topuiLayer = this.add.container(relativeX, 0, [navbarBG, this.eggshellBtn, this.starBtn, jdzsBtn, tkylBtn, ruleIntroBtn])
    this.uiLayer = this.add.container(0, 0, [this.topuiLayer]).setVisible(false)

    let prevSceneBtn = new JumpBuilding(this, {initRow: 0, initCol: 0, rows: 4, cols: 4, type: JumpBuildingType.PREV})
    this.eleLayer.add(prevSceneBtn)
    prevSceneBtn.init()
    this.prevSceneBtn = prevSceneBtn
    this.elementArr.push(prevSceneBtn)

    let nextSceneBtn = new JumpBuilding(this, {initRow: 0, initCol: 0, rows: 4, cols: 4, type: JumpBuildingType.NEXT})
    this.eleLayer.add(nextSceneBtn)
    nextSceneBtn.init()
    this.nextSceneBtn = nextSceneBtn
    this.elementArr.push(nextSceneBtn)

    this.redirectDialog = new RedirectDialog({scene: this, w: 616, h: 466, bg: {tap: false}})
    this.redirectDialog.closeBtn.on("pointerup", () => {
      this.redirectDialog.hide()
    })

    this.ruleDialog = new RuleDialog({scene: this, w: 900, h: 600, bg: {tap: false}})
    this.ruleDialog.closeBtn.on("pointerup", () => {
      this.ruleDialog.hide()
    })

    this.coreUpgrade = new CoreUpgrade(this, relativeX)

    this.exclusiveUpgrade = new ExclusiveUpgrade(this, relativeX)

    this.detailDialog = new DetailDialog({scene: this, w: 916, h: 596, bg: {tap: false}})
    this.detailDialog.closeBtn.on("pointerup", () => {
      this.detailDialog.hide()
    })

    this.lockDialog = new LockDialog({scene: this, w: 466, h: 376, bg: {tap: false}})
    this.lockDialog.closeBtn.on("pointerup", () => {
      this.lockDialog.hide()
    })
  }

  public initEecoration() {
    const points0 = [
      0, 454, 0,
      483, 177, 45,
      819, 87, 90,
      1084, 50, 135,
      1349, 35, 180,
      1579, 38, 45 - 180,
      2047, 69, 90 - 180,
      2481, 151, 135 - 180,
      2880, 322, 180 - 180,
    ]
    let feicuan = this.add.image(points0[0], points0[1], "feicuan").setScale(0.3, 0.3)
    this.decorationLayer.add(feicuan)
    linearMotion(feicuan, points0)

    const points2 = [
      2880, 1028, 0,
      2574, 1175, 45,
      2222, 1286, 90,
      1782, 1369, 135,
      1196, 1383, 180,
      984, 1345, 45 - 180,
      730, 1335, 90 - 180,
      415, 1216, 135 - 180,
      0, 687, 180 - 180,
    ]
    let chongwu = this.add.image(points2[0], points2[1], "chongwu").setScale(0.3, 0.3)
    this.decorationLayer.add(chongwu)
    linearMotion(chongwu, points2)

    function linearMotion(sp, points) {
      let tlm = new window.TimelineMax({repeat: -1})
      for (let i = 3; i < points.length; i += 3) {
        let x1 = points[i - 3]
        let y1 = points[i - 2]
        let angle1 = points[i - 1]

        let x2 = points[i]
        let y2 = points[i + 1]
        let angle2 = points[i + 2]

        const speed = 100
        let distance = Math.sqrt(Math.pow(Math.abs(x1 - x2), 2) + Math.pow(Math.abs(y1 - y2), 2))
        let duration = distance / speed

        tlm.fromTo(sp, duration, {x: x1, y: y1, angle: angle1}, {x: x2, y: y2, angle: angle2, ease: window.Power0.easeNone})
      }
      tlm.play(Math.random() * tlm.duration())
    }
  }

  public hideUpgradePannel() {
    if (this.uiLayer.exists(this.coreUpgrade)) {
      this.coreUpgrade.hide()
    }
    if (this.uiLayer.exists(this.exclusiveUpgrade)) {
      this.exclusiveUpgrade.hide()
    }
  }

  public clickJDYLListener(evt) {
    if (evt) {
      track(EventType.pageClick, {
        "event_id": "region_list_view"
      })
    }

    this.events.emit(MainScene.CLICK_VMAP, {
      scene: this,
      data: {
        returnScene: evt ? MainScene.NAME : null,
        autoEntry: false
      }
    })
  }

  public setStarsNumber(num) {
    this.starBtn.content.text = this.shortenNumber(num)
  }

  public setEggshellNumber(num) {
    this.eggshellBtn.content.text = this.shortenNumber(num)
  }

  public shortenNumber(num) {
    if (num < 10000) {
      num = num
    } else if (num < 100000000) {
      num = (Math.floor((num / 10000) * 10) / 10) + "w"
    } else {
      num = (Math.floor((num / 100000000) * 10) / 10) + "亿"
    }
    return num
  }

  public createEle(buildingList, leftStars = null) {
    // console.log(buildingList)
    if (!buildingList) return
    let {vpositionList} = buildingList
    for (var i = 0; i < vpositionList.length; i++) {
      let data = vpositionList[i]
      let ele = new Element(this, data)
      if (leftStars) ele.setUpgradeState(leftStars)

      let p = this.staggeredTiledMap.map2screen(data.initRow, data.initCol)
      ele.x = p.x
      ele.y = p.y

      this.eleLayer.add(ele)
      this.elementArr.push(ele)
      this.staggeredTiledMap.setMultipleNodeState(data.initRow, data.initCol, data.rows, data.cols, 1)
    }

    this.setElementDepth()
  }

  public createOthersEle() {
    let oEle1 = new OtherElement(this, {initRow: 64, initCol: 35, rows: 1, cols: 1})
    var amRotate2 = new AnimateRotate(oEle1)
    oEle1.setAnimate(amRotate2)
    this.elementArr.push(oEle1)
    this.eleLayer.add(oEle1)

    this.setElementDepth()
  }

  public setElementDepth() {
    this.elementArr.sort((a, b) => {
      return a.depth - b.depth
    })
    this.elementArr.forEach((ele, index) => {
      this.eleLayer.moveTo(ele, index)
    })
    /*this.eleLayer.sort("depth", (ele, index) => {
      console.log(ele, ele.depth)
    })*/
  }

  /**
   * 移动地图场景到坐标点
   * */
  public moveMapToXY(x: number, y: number, fun?: any, duration: number = 0.3) {
    let {mapWidth, mapHeight, tileWidth, tileHeight} = this.staggeredTiledMap
    let {width, height} = this.game.config

    let maxWidth = (Number(width) - mapWidth + tileWidth / 2)
    let maxHeight = (Number(height) - mapHeight + tileHeight / 2)
    // console.log('moveMapToXY:', x, y)

    if (x > 0) {
      x = 0
    } else if (x < maxWidth) {
      x = maxWidth
    }

    if (y > 0) {
      y = 0
    } else if (y < maxHeight) {
      y = maxHeight
    }
    if (duration === 0) {
      this.dragLayer.setPosition(x, y)
      if (fun) fun()
    } else {
      window["TweenMax"].to(this.dragLayer, duration, {
        x,
        y,
        ease: window["Power1"].easeInOut,
        onUpdate: () => {
          this.moveUpdate()
        },
        onComplete: fun
      })
    }
  }

  /**
   * 移动地图场景到格子坐标
   * */
  public moveMapToGrid(row, col, fun = null, duration: number = 0.3) {
    let node = this.staggeredTiledMap.nodeList[row][col]
    // console.log(row, col, node)
    let {width, height} = this.game.config
    let x = Number(width) / 2 - Number(node.x) + MainScene.TILE_WIDTH / 2
    let y = Number(height) / 2 - Number(node.y) + MainScene.TILE_HEIGHT / 2
    this.moveMapToXY(x, y, fun, duration)
  }

  /**
   * 移动地图场景到建筑对象
   * */
  public moveMapToEle(ele: Element | string, fun = null, duration = 0.3) {
    // console.log("moveMapToEle before:", ele)
    let bo: boolean = ele instanceof Element
    if (!bo) {
      ele = this.eleLayer.getByName(ele as string) as Element
    }
    ele = ele as Element
    let row = ele.curRow
    let col = ele.curCol
    let node = this.staggeredTiledMap.nodeList[row][col]
    let {width, height} = this.game.config
    let x = Number(width) / 2 - Number(node.x) - ele.centerX
    let y = Number(height) / 2 - Number(node.y) - ele.centerY + 50
    // console.log("moveMapToEle:", row, col, x, y)
    this.moveMapToXY(x, y, fun, duration)
  }

  public moveUpdate() {
    if (this.nextSceneBtn) this.nextSceneBtn.moveUpdate()
    if (this.prevSceneBtn) this.prevSceneBtn.moveUpdate()
  }

  /**
   * 创建序列帧动画
   * @param x
   * @param y
   * @name 创建动画名 {'upgrade'升级动画，'colorfy'换肤动画}
   * @width 物品的宽度 默认256
   * */
  public createFramesAnimation(x, y, name, width = 256) {
    this.sound.add("upgrade_success.mp3").play()
    let sp = this.add.sprite(x, y, "").play(name)
    let minWidth = 256
    let maxWidth = 256 * 2
    width = (width > maxWidth) ? maxWidth : (width < minWidth ? minWidth : width)
    let scale = width / minWidth
    sp.setScale(scale, scale)
    this.animateLayer.add(sp)
  }

  public getEleCenterXY(name): { x: number, y: number, width: number } {
    let ele: Element = this.eleLayer.getByName(name) as Element
    let x = ele.x + ele.centerX + MainScene.TILE_WIDTH / 2
    let y = ele.y + ele.centerY + MainScene.TILE_HEIGHT / 2
    let width = ele.buildImg.width
    return {x, y, width}
  }

  public showHand(row = 79 + 4, col = 25 + 1) {
    let node = this.staggeredTiledMap.nodeList[row][col]
    let {x, y} = node
    let hand: Hand = new Hand(this, x, y)
    this.animateLayer.add(hand)
    this.hand = hand
  }

  public hideHand() {
    if (this.hand && this.hand.parentContainer) this.hand.parentContainer.remove(this.hand)
  }

  public toogleTopuiLayer(bo: boolean) {
    this.topuiLayer.visible = bo
  }

  public shutdownListener() {
    // console.log("场景系统关闭事件。场景在场景系统关闭过程中由场景调度。")
    this.destory()
  }

  public destory() {
    window.TweenMax.killAll()

    this.staggeredTiledMapView.bigMap.destroy()

    this.prevSceneBtn.statusImgTLM.stop()
    this.nextSceneBtn.statusImgTLM.stop()

    this.elementArr.forEach(ele => {
      if (ele.destory) ele.destory()
    })
  }

  public get id() {
    return this.data.values.id
  }
}