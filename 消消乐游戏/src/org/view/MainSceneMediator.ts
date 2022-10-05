import Mediator = puremvc.Mediator;
import IMediator = puremvc.IMediator;
import INotification = puremvc.INotification;
import MainScene from "./scenes/main/MainScene"
import GameCommand from "../controller/commands/GameCommand"
import SceneCommand from "../controller/commands/SceneCommand"
import GameProxy from "../model/GameProxy"
import {SceneEvent} from "../../Game"
import ApplicationFacade from "../ApplicationFacade"
import IBuildingLocation, {BuildingLocationType} from "../interface/IBuildingLocation"
import Element from "./scenes/main/display/Element"
import UserProxy from "../model/UserProxy"
import DataLoading from "./scenes/loading/DataLoading"
import {default as track, EventType} from "../util/dot"
import env from "../util/env"
import {DialogType} from "./scenes/main/panel/LockDialog"
import BuildingCommand from "../controller/commands/BuildingCommand"
import {ChargeType} from "../interface/IBuildingLevel"
import GuideCommand from "../controller/commands/GuideCommand"

export default class MainSceneMediator extends Mediator implements IMediator {
  public static NAME: string = "game_scene_mediator"

  public static SHOW_REDIRECT_PANEL: string = "show_redirect_panel"

  public static SHOW_LOCK_PANEL: string = "show_lock_panel"

  public static SHOW_UPGRADE_PANEL: string = "show_upgrade_panel"

  public static HIDE_UPGRADE_PANEL: string = "hide_upgrade_panel"

  public static ELEMENT_PREVIEW: string = "element_preview"

  private _gameProxy: GameProxy = null

  private _userProxy: UserProxy = null

  constructor(viewComponent: any) {
    super(MainSceneMediator.NAME, viewComponent)
    this.scene.events.on(Phaser.Scenes.Events.DESTROY, this.scene.destory, this.scene)
    this.scene.events.on(Phaser.Scenes.Events.SHUTDOWN, this.scene.shutdownListener, this.scene)
    this.scene.events.on(SceneEvent.INIT_COMPLETE, this.initComplete, this)
    this.scene.events.on(MainScene.CLICK_BACK, this.scene.clickJDYLListener, this.scene)
    this.scene.events.on(MainScene.CLICK_VMAP, evt => this.sendNotification(SceneCommand.TO_START, evt), this)
    this.scene.events.on(MainScene.CLICK_TITLE, this.clickTitleListener, this)
    this.scene.events.on(MainScene.CLICK_JUMP, evt => this.sendNotification(SceneCommand.TO_LOADING, {
      scene: this.scene,
      data: evt
    }), this)

    this.scene.events.on(MainScene.CLICK_JIHUO, evt => this.sendNotification(BuildingCommand.ACTIVATION, evt), this)
    this.scene.events.on(MainScene.CLICK_SHENGJI, evt => this.sendNotification(BuildingCommand.UPGRADE, evt), this)
    this.scene.events.on(MainScene.CLICK_SHIYONG, evt => this.sendNotification(BuildingCommand.USE, evt), this)

    this.scene.events.on(MainSceneMediator.SHOW_REDIRECT_PANEL, this.showRedirectPanelListener, this)
    this.scene.events.on(MainSceneMediator.SHOW_LOCK_PANEL, this.showLockPanelListener, this)
    this.scene.events.on(MainSceneMediator.SHOW_UPGRADE_PANEL, this.showUpgradePanelListener, this)
    this.scene.events.on(MainSceneMediator.HIDE_UPGRADE_PANEL, this.hideUpgradePanelListener, this)
    this.scene.events.on(MainSceneMediator.ELEMENT_PREVIEW, this.elementPreviewListener, this)
  }

  public initComplete() {
    // console.log("MasinScene init complete.")
    track(EventType.pageView, {"event_id": "region_view"})

    this._gameProxy = this.facade["retrieveProxy"](GameProxy.NAME) as GameProxy
    this._userProxy = this.facade["retrieveProxy"](UserProxy.NAME) as UserProxy

    let curMapData = this.scene.data.values

    let {id, index, previousId, nextId} = curMapData

    let locationId
    let preCoord: { row: number, col: number }
    let nextCoord: { row: number, col: number }
    if (index === 0) {
      locationId = (env === "dev" || env === "stage") ? 24 : 1
      preCoord = {row: 0, col: 0}
      nextCoord = {row: 96, col: 56}
    } else if (index === 1) {
      locationId = (env === "dev" || env === "stage") ? 43 : 24
      preCoord = {row: 104, col: 2}
      nextCoord = {row: 98, col: 56}
    }

    this.scene.prevSceneBtn.setRowCol(preCoord.row, preCoord.col)
    this.scene.nextSceneBtn.setRowCol(nextCoord.row, nextCoord.col)

    let mapData = this._gameProxy.getMapData(previousId)
    if (this.scene.prevSceneBtn) this.scene.prevSceneBtn.fill(mapData).setVisible(Boolean(index))

    mapData = this._gameProxy.getMapData(nextId)
    if (this.scene.nextSceneBtn) this.scene.nextSceneBtn.fill(mapData)

    this.scene.setStarsNumber(this._gameProxy.gameData.leftStars)
    this.scene.setEggshellNumber(this._gameProxy.gameData.availableEggshell)

    this.scene.createEle(this.scene.data.values, this._gameProxy.gameData.leftStars)

    let bld = this._gameProxy.getBuildingLoationData(this.scene.id, locationId)
    if (bld) this.scene.moveMapToEle("building" + bld.id, null, 0)

    let {first, second} = this._gameProxy.gameData.guide
    if (first.val && first[1]) {
      this.scene.time.delayedCall(1000, () => {
        this.sendNotification(GuideCommand.STEP_1_1)
      }, null, this)
    } else if (second.val && second[1] && this._gameProxy.showSecondTips(id)) {
      this.scene.time.delayedCall(1000, () => {
        this.sendNotification(GuideCommand.STEP_2_1)
      }, null, this)
    }

    // if (env === "dev") this.scene.createOthersEle()
    // this.scene.moveMapToXY(0, 0, null, 0)
    // this.scene.moveMapToGrid(98, 56, null, 0)
    // this.scene.coreUpgrade.setContent(this._gameProxy.getBuildingLoationData(this.scene.id, locationId)).show()
    // this.scene.exclusiveUpgrade.setContent(bld, this._gameProxy.gameData.availableEggshell, this._gameProxy.gameData.leftStars).show()
    // this.scene.redirectDialog.setContent({
    //   type: 4,
    //   num: 2,
    //   list: this._gameProxy.gameData.redirect.eggshell
    // }).show()
    // this.scene.ruleDialog.show()
    // this.scene.detailDialog.fill(bld).show()
    // this.scene.lockDialog.setContent(DialogType.duihuanchenggong).show()
    // this.scene.lockDialog.setContent(DialogType.chongfuxiadan).show()
    // this.scene.lockDialog.setContent(DialogType.weijiesuo, {
    //   text: "当前建筑需要升级到LV.才能解锁哦",
    //   bld: null,
    // }).show()
  }

  public showRedirectPanelListener(type) {
    // console.log("showRedirectPanelListener:", type)
    let list = (type === 1 || type === 3
      ? this._gameProxy.gameData.redirect.star
      : type === 2 || type === 4
        ? this._gameProxy.gameData.redirect.eggshell
        : [])

    this.scene.redirectDialog.setContent({
      type,
      num: null,
      list
    }).show()
  }

  public showLockPanelListener(data: IBuildingLocation) {
    track(EventType.pageClick, {
      "event_id": "region_constructionlocation_lock"
    })

    let {id, unlockNeedCorePositionId, unlockNeedCoreItemLevel} = data

    let cbld: IBuildingLocation = this._gameProxy.getBuildingLoationData(this.scene.id, unlockNeedCorePositionId)
    if (cbld) {
      this.scene.lockDialog.setContent(DialogType.weijiesuo, {
        text: "当前建筑需要升级" + cbld.name + "到LV." + unlockNeedCoreItemLevel + "才能解锁哦",
        bld: cbld,
      }).show()
    } else {
      window._vlog.log("id:" + id + "showLockPanelListener: not found coreBuildingLocation")
    }
  }

  public showUpgradePanelListener(bld: IBuildingLocation) {
    // console.log(bld)
    track(EventType.pageClick, {
      "event_id": "region_constructionlocation_unlock"
    })

    this.scene.toogleTopuiLayer(false)

    this.scene.moveMapToEle("building" + bld.id)

    this.scene.hideHand()

    let {first, second, third, fourth} = this._gameProxy.gameData.guide
    if (bld.type === BuildingLocationType.CORE) {
      this.scene.coreUpgrade.setContent(bld).show()

      if (fourth.val) this.sendNotification(GuideCommand.STEP_4_1)
    } else if (bld.type === BuildingLocationType.COMMON) {
      this.scene.exclusiveUpgrade.setContent(bld, this._gameProxy.gameData.availableEggshell, this._gameProxy.gameData.leftStars).show()

      if (first.val) {
        if (!first["1"] && !first["2"] && first["3"]) this.sendNotification(SceneCommand.TO_GUIDE, {scene: this.scene, data: {step: GuideCommand.STEP_1_3}})
      } else {
        if (second.val) {
          // 当前点击的建造位上的建造物是否可升级
          let bo = false
          bld.vitemList.forEach((buildingMaterial) => {
            if (bld.type === BuildingLocationType.COMMON && buildingMaterial.hasSubOneUse && buildingMaterial.curLevel !== buildingMaterial.vitemExtList.length) {
              let nbld = buildingMaterial.vitemExtList.find(ele => ele.level === buildingMaterial.curLevel + 1)
              if (nbld && this._gameProxy.gameData.leftStars > nbld.costNumber) bo = true
            }
          })

          if (!second["1"] && second["2"] && bo) this.sendNotification(GuideCommand.STEP_2_2)
        } else if (third.val) {
          if (third["1"]) {
            let l = 0
            bld.vitemList.forEach(ele => {
              let res = ele.vitemExtList.some(ele2 => ele2.own)
              if (res) l++
            })
            // 说名此建造位只有一个建造物
            if (l === 1) {
              let hasBuilidngMaterial = bld.vitemList.find(ele => ele.hasSubOneUse)
              // 这个建造物没有到满级 出换肤提示
              if (hasBuilidngMaterial.curLevel >= 3 || hasBuilidngMaterial.curLevel === hasBuilidngMaterial.vitemExtList.length) {
                // 换肤引导
                this.sendNotification(GuideCommand.STEP_3_1)
              }
            }
          }
        }
      }
    }
  }

  public hideUpgradePanelListener(evt) {
    // console.log(evt)

    this.scene.toogleTopuiLayer(true)

    let {id} = evt
    let ele: Element = this.scene.eleLayer.getByName("building" + id) as Element
    ele.rest()
    ele.setUpgradeState(this._gameProxy.gameData.leftStars)
  }

  public elementPreviewListener(evt) {
    let [eleName, textureKey] = evt
    // console.log("elementPreviewListener:", eleName, textureKey)

    let ele: Element = this.scene.eleLayer.getByName(eleName) as Element
    if (ele) ele.previewTexture = textureKey
  }

  private clickTitleListener(data: IBuildingLocation) {
    this.scene.hideUpgradePannel()

    if (data.haveBuildingMaterialDesc) {
      this.scene.detailDialog.fill(data).show()
    } else {
      this.sendNotification(GameCommand.LOAD_DESCRIBE, data)
    }
  }

  public lockStar(chargeType, costNumber) {
    this.scene.hideUpgradePannel()

    let list = (chargeType === 1 || chargeType === 3
      ? this._gameProxy.gameData.redirect.star
      : chargeType === 2 || chargeType === 4
        ? this._gameProxy.gameData.redirect.eggshell
        : [])

    this.scene.redirectDialog.setContent({
      type: chargeType,
      num: costNumber,
      list
    }).show()
  }

  public listNotificationInterests(): string[] {
    return [GameProxy.UPGRADE_SUCCESS]
  }

  public hidePannel(eleName, amName) {
    this.scene.hideUpgradePannel()
    let {x, y, width} = this.scene.getEleCenterXY(eleName)
    this.scene.createFramesAnimation(x, y, amName, width)
  }

  public handleNotification(notification: INotification): void {
    if (env !== "pro") console.log("MainSceneMediator handleNotification:", notification)
    let body = notification.getBody()
    switch (notification.getName()) {
      case GameProxy.UPGRADE_SUCCESS:
        let {chargeType, leftStars, loadData, eleName, elseNames} = body

        if (chargeType === ChargeType.STAR) this.scene.setStarsNumber(leftStars)
        else if (chargeType === ChargeType.EGGSHELL) this.scene.setEggshellNumber(leftStars)

        if (elseNames && elseNames.length > 0) {
          elseNames.forEach(name => {
            let ele: Element = this.scene.eleLayer.getByName(name) as Element
            ele.rest()
          })
        }

        if (loadData) {
          ApplicationFacade.game.scene.start(DataLoading.NAME)

          let {key, url} = loadData
          this.scene.load.image(key, url)
          this.scene.load.once("complete", () => {
            // console.log("load complete")
            ApplicationFacade.game.scene.keys[DataLoading.NAME].hide()

            this.hidePannel(eleName, "upgrade")
            this.setEleUpgradeState(this._gameProxy.gameData.leftStars)
          })
          this.scene.load.start()
        } else {
          this.hidePannel(eleName, "upgrade")
          this.setEleUpgradeState(this._gameProxy.gameData.leftStars)
        }
        break
    }
  }

  private setEleUpgradeState(leftStars) {
    this.scene.elementArr.forEach((ele: Element) => {
      if (ele.setUpgradeState) ele.setUpgradeState(leftStars)
    })
  }

  get scene(): MainScene {
    return (this.viewComponent as MainScene)
  }
}