import SimpleCommand = puremvc.SimpleCommand
import ICommand = puremvc.ICommand
import INotification = puremvc.INotification
import MainScene from "../../view/scenes/main/MainScene"
import StartScene from "../../view/scenes/start/StartScene"
import {setActiveBG, setBackBtnVisible, setMaskVisible} from "../../util/lc"
import GameProxy from "../../model/GameProxy"
import InterludeLoading from "../../view/scenes/loading/InterludeLoading"
import {getVwordVregionDetail, postVwordSetCurrentRegion} from "../../../api"
import UserProxy from "../../model/UserProxy"
import IMap from "../../interface/IMap"
import Guide from "../../view/scenes/guide/Guide"
import env from "../../util/env"

export default class SceneCommand extends SimpleCommand implements ICommand {

  public static TO_START = "to_start"

  public static TO_MAIN = "to_main"

  public static TO_LOADING = "to_loading"

  public static TO_GUIDE = "to_guide"

  constructor() {
    super()
  }

  public register(facade) {
    facade["registerCommand"](SceneCommand.TO_START, SceneCommand)
    facade["registerCommand"](SceneCommand.TO_MAIN, SceneCommand)
    facade["registerCommand"](SceneCommand.TO_LOADING, SceneCommand)
    facade["registerCommand"](SceneCommand.TO_GUIDE, SceneCommand)
  }

  public execute(notification: INotification) {
    if (env !== "pro") console.log("SceneCommand notification:", notification)
    let gameProxy: GameProxy = this.facade["retrieveProxy"](GameProxy.NAME)
    let userProxy: UserProxy = this.facade["retrieveProxy"](UserProxy.NAME)
    let name = notification.getName()
    let body = notification.getBody()
    let {scene, data, current} = body
    switch (name) {
      case SceneCommand.TO_START:
        setActiveBG("start")
        this.toStartScene(scene, data)
        break
      case SceneCommand.TO_MAIN:
        let mapData = gameProxy.getMapData(data.id)
        if (mapData.currentVregion && mapData.vpositionList) {
          this.toMainScene(scene, current, mapData, data.firstTime)
        } else {
          this.sendNotification(SceneCommand.TO_LOADING, {
            scene,
            data: mapData
          })
        }
        break
      case SceneCommand.TO_LOADING:
        // console.log(typeof data)
        let mapData2: IMap = (typeof data === "number" ? gameProxy.getMapData(data) : data)
        if (!mapData2) return

        if (!mapData2.currentVregion) {
          postVwordSetCurrentRegion({
            studentId: userProxy.userData.studentId,
            vregionId: mapData2.id
          }).then((res: { data: any, code: number }) => {
            if (res && res.code === 200) {
              gameProxy.setCurrentVregion(mapData2.id)

              if (mapData2.vpositionList) {
                this.toLoadingScene(scene, mapData2)
              } else {
                getVwordVregionDetail({
                  studentId: userProxy.userData.studentId,
                  id: mapData2.id
                }).then((res: { data: any, code: number }) => {
                  if (res && res.code === 200) {
                    gameProxy.compileMapBuilding(res.data)
                    this.toLoadingScene(scene, mapData2)
                  }
                })
              }
            }
          })
        } else if (!mapData2.vpositionList) {
          getVwordVregionDetail({
            studentId: userProxy.userData.studentId,
            id: mapData2.id
          }).then((res: { data: any, code: number }) => {
            if (res && res.code === 200) {
              gameProxy.compileMapBuilding(res.data)
              this.toLoadingScene(scene, mapData2)
            }
          })
        } else {
          this.toLoadingScene(scene, mapData2)
        }
        break
      case SceneCommand.TO_GUIDE:
        scene.scene.launch(Guide.NAME, data)
        break
    }
  }

  private toMainScene(scene, current, data, firstTime) {
    setActiveBG("main", "s" + data.index)

    scene.scene.transition({
      target: MainScene.NAME,
      data,
    })
    scene.scene.bringToTop(current)
    if (firstTime) setBackBtnVisible(true)
  }

  private toStartScene(scene, data) {
    setActiveBG("start")

    scene.scene.transition({
      target: StartScene.NAME,
      data,
      duration: 500
    })
    scene.scene.bringToTop(StartScene.NAME)
  }

  private toLoadingScene(scene, data) {
    setActiveBG("load", "s" + data.index)
    scene.scene.transition({
      target: InterludeLoading.NAME,
      data,
      duration: 500
    })
  }
}