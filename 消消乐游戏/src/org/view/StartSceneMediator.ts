import Mediator = puremvc.Mediator;
import IMediator = puremvc.IMediator;
import INotification = puremvc.INotification;
import StartScene from "./scenes/start/StartScene"
import SceneCommand from "../controller/commands/SceneCommand"
import MainScene from "./scenes/main/MainScene"
import {SceneEvent} from "../../Game"
import UserProxy from "../model/UserProxy"
import GameCommand from "../controller/commands/GameCommand"
import {redirect, setMaskVisible} from "../util/lc"
import GameProxy from "../model/GameProxy"
import ChooseItem from "./scenes/start/ChooseItem"
import {default as track, EventType} from "../util/dot"

export default class StartSceneMediator extends Mediator implements IMediator {
  public static NAME: string = "start_scene_mediator"

  public static CLICK_ITEM: string = "click_item"

  public static CLICK_BACK: string = "click_back"

  constructor(viewComponent: any) {
    super(StartSceneMediator.NAME, viewComponent)
    // (在构造函数中注册场景事件，防止其他地方二次注册场景事件)
    // 场景系统破坏事件
    this.scene.events.on(Phaser.Scenes.Events.DESTROY, this.scene.destoryListener, this.scene)
    // 场景系统关闭事件()
    this.scene.events.on(Phaser.Scenes.Events.SHUTDOWN, this.scene.shutdownListener, this.scene)
    // 场景调用init方法完成
    this.scene.events.on(SceneEvent.INIT_COMPLETE, this.initComplete, this)
    // 点击地图缩略图事件
    this.scene.events.on(StartSceneMediator.CLICK_ITEM, evt => this.sendNotification(SceneCommand.TO_MAIN, {
      scene: this.scene,
      data: evt,
      current: StartScene.NAME
    }), this)
    // 首页点击返回按钮事件
    this.scene.events.on(StartSceneMediator.CLICK_BACK, this.clickBackListener, this)
  }

  private initComplete() {
    let userProxy: UserProxy = this.facade["retrieveProxy"](UserProxy.NAME) as UserProxy
    let gameProxy: GameProxy = this.facade["retrieveProxy"](GameProxy.NAME) as GameProxy
    let curItem = null
    let {mapList} = gameProxy.gameData
    mapList.forEach((ele, idx) => {
      let item: ChooseItem = this.scene["choose" + (idx + 1) + "Item"]
      item.setBuildingTexture("sp_map" + String(idx + 1) + "_unlock.png", "sp_map" + String(idx + 1) + "_lock.png")
      item.id = ele.id
      item.state2 = ele.unlock ? 1 : 2
      item.data2 = ele

      if (ele.currentVregion) {
        item.selected = true

        this.scene.title.setTitle(ele.name, ele.enName)
        curItem = item
      }
    })
    this.scene.choose3Item.state2 = 3
    this.scene.choose4Item.state2 = 3
    this.scene.choose5Item.state2 = 4

    if (userProxy.vunionGuide.seeComic === 1 && this.scene.data.values.autoEntry) {
      this.autoEntry(curItem)
    }

    let firstLockMap = mapList.find(ele => !ele.unlock)
    // console.log("firstLockMap:", firstLockMap)
    if (firstLockMap) {
      this.scene.studayProgress.cur = firstLockMap.courseCount
      this.scene.studayProgress.total = firstLockMap.unlockConditionCount
    } else {
      this.scene.studayProgress.visible = false
    }

    if (userProxy.vunionGuide.seeComic === 0) {
      setMaskVisible(true, "not-opacity-bg")
      this.scene.createStoryPanel()
      this.scene.storyPanel.entryBtn.on("pointerup", () => {
        track(EventType.pageClick, {
          "event_id": "base_cartoon_enter"
        })
        this.sendNotification(GameCommand.SEE_STORY_COMPLETE)
        this.autoEntry(curItem)
      }, this)
    }
  }

  private autoEntry(item) {
    this.scene.time.delayedCall(550, () => {
      item.onPointerDown(null)
    }, null, this)
  }

  private clickBackListener(data) {
    // console.log("StartSceneMediator clickBackListener:", this.scene.data)
    if (this.scene.data.values.returnScene && this.scene.data.values.returnScene === MainScene.NAME) {
      let curVmapItem: ChooseItem = this.scene.chooseItemArr.find(ele => ele.data2 && ele.data2.currentVregion)
      curVmapItem.onPointerDown(null)
    } else {
      redirect()
    }
  }

  public listNotificationInterests(): string[] {
    return [GameCommand.SEE_STORY_COMPLETE]
  }

  public handleNotification(notification: INotification): void {
    switch (notification.getName()) {
      case GameCommand.SEE_STORY_COMPLETE:
        this.scene.storyPanel.hide()
        break
    }
  }

  get scene(): StartScene {
    return (this.viewComponent as StartScene)
  }
}