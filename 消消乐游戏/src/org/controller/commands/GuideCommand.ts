import SimpleCommand = puremvc.SimpleCommand
import ICommand = puremvc.ICommand
import INotification = puremvc.INotification
import GameProxy from "../../model/GameProxy"
import MainSceneMediator from "../../view/MainSceneMediator"
import GuideMediator from "../../view/GuideMediator"
import {getCompletedNoviceGuide, NoviceGuideType} from "../../../api"
import UserProxy from "../../model/UserProxy"
import env from "../../util/env"
import Guide from "../../view/scenes/guide/Guide"
import {SceneEvent} from "../../../Game"

export default class GuideCommand extends SimpleCommand implements ICommand {

  public static STEP_1_1: string = "step_1_1"

  public static STEP_1_3: string = "step_1_3"

  public static STEP_1_5: string = "step_1_5"

  public static STEP_1_6: string = "step_1_6"

  public static STEP_2_1: string = "step_2_1"

  public static STEP_2_2: string = "step_2_2"

  public static STEP_2_3: string = "step_2_3"

  public static STEP_3_1: string = "step_3_1"

  public static STEP_3_2: string = "step_3_2"

  public static STEP_4_1: string = "step_4_1"

  public constructor() {
    super()
  }

  public register(facade) {
    facade["registerCommand"](GuideCommand.STEP_1_1, GuideCommand)
    facade["registerCommand"](GuideCommand.STEP_1_3, GuideCommand)
    facade["registerCommand"](GuideCommand.STEP_1_5, GuideCommand)
    facade["registerCommand"](GuideCommand.STEP_1_6, GuideCommand)

    facade["registerCommand"](GuideCommand.STEP_2_1, GuideCommand)
    facade["registerCommand"](GuideCommand.STEP_2_2, GuideCommand)
    facade["registerCommand"](GuideCommand.STEP_2_3, GuideCommand)

    facade["registerCommand"](GuideCommand.STEP_3_1, GuideCommand)
    facade["registerCommand"](GuideCommand.STEP_3_2, GuideCommand)

    facade["registerCommand"](GuideCommand.STEP_4_1, GuideCommand)
  }

  public execute(notification: INotification): void {
    if (env !== "pro") console.log("GuideCommand notification:", notification)
    let guideMediator: GuideMediator = this.facade["retrieveMediator"](GuideMediator.NAME)
    let mainMediator: MainSceneMediator = this.facade["retrieveMediator"](MainSceneMediator.NAME)
    let gameProxy = this.facade["retrieveProxy"](GameProxy.NAME) as GameProxy
    let userProxy: UserProxy = this.facade["retrieveProxy"](UserProxy.NAME)
    let curMapData = gameProxy.getMapData(gameProxy.currentSceneId)
    let {first, second, third, fourth} = gameProxy.gameData.guide

    let body = notification.getBody()
    let name = notification.getName()
    switch (name) {
      case GuideCommand.STEP_1_1:
        mainMediator.scene.scene.launch(Guide.NAME)

        guideMediator.scene.events.once(SceneEvent.INIT_COMPLETE, () => {
          guideMediator.scene.pushTipsQueue([
            {
              txt: "欢迎你来到V City！\n通过你的努力学习就可以重建这个星球，快行动起来吧～",
              duration: 2000,
              callback: () => {
                if (!gameProxy.gameData.guide.first[1]) return

                gameProxy.setGuideStatus("first", "1", false)
                mainMediator.scene.moveMapToEle("building" + curMapData.jihuoGuideId)
                let bld = gameProxy.getBuildingLoationData(gameProxy.currentSceneId, curMapData.jihuoGuideId)
                if (bld) {
                  let {initRow, initCol, rows, cols} = bld
                  mainMediator.scene.showHand(initRow + Math.ceil(rows / 2), initCol + 1)
                }
              }
            },
            {
              txt: "首先，我们要在空位上建造对应的建筑。请点击建筑空位",
              duration: 2000,
              callback: () => {
                gameProxy.setGuideStatus("first", "2", false)
                guideMediator.scene.scene.stop()
              }
            }
          ]).startGuide()
        }, this)
        break
      case GuideCommand.STEP_1_3:
        guideMediator.scene.pushTipsQueue({
          txt: "每个建筑位可以修建多套建筑哦～\n每套皮肤皮肤下都有三个等级，让我们来激活这套皮肤吧～",
          duration: 2000,
          callback: () => {
            gameProxy.setGuideStatus("first", "3", false)
            gameProxy.setGuideStatus("first", "4", false)
            guideMediator.scene.scene.stop()
            mainMediator.scene.exclusiveUpgrade.showHand()
          }
        }).startGuide()
        break
      case GuideCommand.STEP_1_5:
        mainMediator.scene.scene.launch(Guide.NAME)

        guideMediator.scene.events.once(SceneEvent.INIT_COMPLETE, () => {
          guideMediator.scene.pushTipsQueue({
            txt: "小朋友有足够的星星才能自由建造V City，试试完成学习任务来收集\n更多星星，打造属于你的V基地吧～",
            duration: 2000,
            callback: () => {
              gameProxy.setGuideStatus("first", "5", false)
              gameProxy.setGuideStatus("first", "val", false)
              guideMediator.scene.scene.stop()
            }
          }).startGuide()
        }, this)
        break
      case GuideCommand.STEP_1_6:
        mainMediator.scene.scene.launch(Guide.NAME)

        guideMediator.scene.events.once(SceneEvent.INIT_COMPLETE, () => {
          guideMediator.scene.pushTipsQueue({
            txt: "恭喜你小朋友！你刚刚激活了一个建筑迈出了第一步。\n快去探索更多内容打造专属于你的V基地吧～",
            duration: 2000,
            callback: () => {
              gameProxy.setGuideStatus("first", "6", false)
              gameProxy.setGuideStatus("first", "val", false)
              guideMediator.scene.scene.stop()

              setTimeout(() => {
                if (second.val && second[1] && gameProxy.showSecondTips(curMapData.id)) this.sendNotification(GuideCommand.STEP_2_1)
              }, 50)
            }
          }).startGuide()
        }, this)
        break
      case GuideCommand.STEP_2_1:
        mainMediator.scene.scene.launch(Guide.NAME)

        mainMediator.scene.moveMapToEle("building" + curMapData.shengjiGuideId)

        guideMediator.scene.events.once(SceneEvent.INIT_COMPLETE, () => {
          let bld = gameProxy.getBuildingLoationData(gameProxy.currentSceneId, curMapData.shengjiGuideId)
          if (bld) {
            let {initRow, initCol, rows, cols} = bld
            mainMediator.scene.showHand(initRow + Math.ceil(rows / 2), initCol + 1)
          }

          guideMediator.scene.pushTipsQueue({
            txt: "快看，这个建筑可以升级了，快点击升级吧～",
            duration: 2000,
            callback: () => {
              gameProxy.setGuideStatus("second", "1", false)
              guideMediator.scene.scene.stop()
            }
          }).startGuide()
        }, this)
        break
      case GuideCommand.STEP_2_2:
        mainMediator.scene.exclusiveUpgrade.step22 = true
        mainMediator.scene.exclusiveUpgrade.showHand(875, 395)
        gameProxy.setGuideStatus("second", "2", false)
        break
      case GuideCommand.STEP_2_3:
        mainMediator.scene.scene.launch(Guide.NAME)

        guideMediator.scene.events.once(SceneEvent.INIT_COMPLETE, () => {
          guideMediator.scene.pushTipsQueue({
            txt: "太棒了！你已经学会了重建基地的技能。\n快去打造属于你的V基地吧～",
            duration: 2000,
            callback: () => {
              gameProxy.setGuideStatus("second", "3", false)
              gameProxy.setGuideStatus("second", "val", false)
              guideMediator.scene.scene.stop()
            }
          }).startGuide()
        }, this)
        break
      case GuideCommand.STEP_3_1:
        mainMediator.scene.exclusiveUpgrade.showPopup()
        mainMediator.scene.exclusiveUpgrade.step31 = true
        mainMediator.scene.exclusiveUpgrade.step31callbackFun = () => {
          getCompletedNoviceGuide({
            studentId: userProxy.userData.studentId,
            guide: NoviceGuideType.SKIN_CHANGE_GUIDE
          })
          this.sendNotification(GuideCommand.STEP_3_2)
        }
        gameProxy.setGuideStatus("third", "1", false)
        break
      case GuideCommand.STEP_3_2:
        gameProxy.setGuideStatus("third", "2", false)
        gameProxy.setGuideStatus("third", "val", false)
        break
      case GuideCommand.STEP_4_1:
        mainMediator.scene.scene.launch(Guide.NAME)

        guideMediator.scene.events.once(SceneEvent.INIT_COMPLETE, () => {
          guideMediator.scene.pushTipsQueue({
            txt: "这个是核心建筑。只有该建筑升级才能解锁更多的建筑位哦～",
            duration: 2000,
            callback: () => {
              getCompletedNoviceGuide({
                studentId: userProxy.userData.studentId,
                guide: NoviceGuideType.CORE_VITEM_GUIDE
              })
              gameProxy.setGuideStatus("fourth", "val", false)
              guideMediator.scene.scene.stop()
            }
          }).startGuide()
        }, this)
        break
    }
  }
}