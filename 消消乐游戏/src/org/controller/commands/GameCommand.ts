import SimpleCommand = puremvc.SimpleCommand
import ICommand = puremvc.ICommand
import INotification = puremvc.INotification
import {getDiscriptionsByVpositionId} from "../../../api"
import ApplicationFacade from "../../ApplicationFacade"
import UserProxy from "../../model/UserProxy"
import GameProxy from "../../model/GameProxy"
import SceneCommand from "./SceneCommand"
import MainScene from "../../view/scenes/main/MainScene"
import MainSceneMediator from "../../view/MainSceneMediator"
import StartScene from "../../view/scenes/start/StartScene"
import StartSceneMediator from "../../view/StartSceneMediator"
import Message from "../../view/scenes/message/Message"
import DataLoading from "../../view/scenes/loading/DataLoading"
import InitLoading from "../../view/scenes/loading/InitLoading"
import InterludeLoading from "../../view/scenes/loading/InterludeLoading"
import LoadingMediator from "../../view/LoadingMediator"
import Guide from "../../view/scenes/guide/Guide"
import GuideMediator from "../../view/GuideMediator"
import {setActiveBG} from "../../util/lc"
import env from "../../util/env"

export default class GameCommand extends SimpleCommand implements ICommand {

  public static INIT_GAME_DATA = "init_game_data"

  public static INIT_LOAD_ASSETS_COMPLETE = "init_load_assets_complete"

  public static SEE_STORY_COMPLETE = "see_story_complete"

  public static LOAD_DESCRIBE: string = "load_describe"

  public constructor() {
    super()
  }

  public register(facade) {
    facade["registerCommand"](GameCommand.INIT_GAME_DATA, GameCommand)
    facade["registerCommand"](GameProxy.INIT_GAME_DATA_COMPLETE, GameCommand)

    facade["registerCommand"](GameCommand.INIT_LOAD_ASSETS_COMPLETE, GameCommand)

    facade["registerCommand"](GameCommand.SEE_STORY_COMPLETE, GameCommand)

    facade["registerCommand"](GameCommand.LOAD_DESCRIBE, GameCommand)
  }

  public execute(notification: INotification): void {
    if (env !== "pro") console.log("GameCommand notification:", notification)
    let gameProxy: GameProxy = this.facade["retrieveProxy"](GameProxy.NAME)
    let userProxy: UserProxy = this.facade["retrieveProxy"](UserProxy.NAME)

    let body = notification.getBody()
    let game = ApplicationFacade.game
    let scenePlugin = game.scene
    switch (notification.getName()) {
      case GameCommand.INIT_GAME_DATA:
        gameProxy.getInitData(userProxy.userData)
        break
      case GameProxy.INIT_GAME_DATA_COMPLETE:
        let initLoadingScene = scenePlugin.add(InitLoading.NAME, InitLoading, false)
        this.facade["registerMediator"](new LoadingMediator(initLoadingScene))

        let mapData = gameProxy.getMapData(gameProxy.currentSceneId)
        game.scene.start(InitLoading.NAME, mapData)
        setActiveBG("load", "s" + mapData.index)
        break
      case GameCommand.INIT_LOAD_ASSETS_COMPLETE:
        let {queryStrObj: {mute, p}, gameData: {guide: {first, second, third, fourth}}} = gameProxy
        if (!mute) {
          let bgm = game.sound.add("bg_music.mp3", {
            loop: true
          })
          bgm.play()

          window.addEventListener("hidden", () => bgm.pause())
          window.addEventListener("visible", () => bgm.play())
        }

        if (first || second || third || fourth) {
          let guideScene = scenePlugin.add(Guide.NAME, Guide, false)
          this.facade["registerMediator"](new GuideMediator(guideScene))
        }

        scenePlugin.add(Message.NAME, Message, false)
        scenePlugin.add(DataLoading.NAME, DataLoading, false)

        let interludeLoading = scenePlugin.add(InterludeLoading.NAME, InterludeLoading, false)
        let loadingMediator: LoadingMediator = this.facade["retrieveMediator"](LoadingMediator.NAME)
        loadingMediator.setViewComponent(interludeLoading)

        let startScene = scenePlugin.add(StartScene.NAME, StartScene, false)
        this.facade["registerMediator"](new StartSceneMediator(startScene))

        let gameScene = scenePlugin.add(MainScene.NAME, MainScene, false)
        this.facade["registerMediator"](new MainSceneMediator(gameScene))

        let commandName = ""
        let data = null
        switch (p) {
          case "1":
            commandName = SceneCommand.TO_START
            break
          case "2":
            commandName = SceneCommand.TO_MAIN
            data = {
              id: gameProxy.currentSceneId,
              firstTime: true
            }
            break
          default:
            commandName = SceneCommand.TO_START
            data = {
              returnScene: InitLoading.NAME,
              autoEntry: true
            }
            break
        }
        this.sendNotification(commandName, {
          scene: scenePlugin.keys[InitLoading.NAME],
          data
        })
        break
      case GameCommand.SEE_STORY_COMPLETE:
        userProxy.setVunionGuide("seeComic", 1)
        break
      case GameCommand.LOAD_DESCRIBE:
        getDiscriptionsByVpositionId({
          vpositionId: body.id
        }).then((res: { data: any, code: number, msg: string }) => {
          if (res && res.code === 200) {
            gameProxy.setBuildingDescription(body.id, res.data[0])

            let msm: MainSceneMediator = this.facade["retrieveMediator"](MainSceneMediator.NAME)
            msm.scene.detailDialog.fill(body).show()
          } else {
            ApplicationFacade.game.scene.start(Message.NAME, {text: res.msg})
          }
        })
        break
    }
  }
}