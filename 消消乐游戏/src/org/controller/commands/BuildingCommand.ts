import SimpleCommand = puremvc.SimpleCommand
import ICommand = puremvc.ICommand
import INotification = puremvc.INotification
import GameProxy from "../../model/GameProxy"
import UserProxy from "../../model/UserProxy"
import ApplicationFacade from "../../ApplicationFacade"
import Message from "../../view/scenes/message/Message"
import {getCompletedNoviceGuide, getGrantStatusDetail, NoviceGuideType, postVwordVitemUpgrade, postVwordVitemUse} from "../../../api"
import MainSceneMediator from "../../view/MainSceneMediator"
import IBuildingLevel, {ChargeType, GrantStatus} from "../../interface/IBuildingLevel"
import {DialogType} from "../../view/scenes/main/panel/LockDialog"
import GuideCommand from "./GuideCommand"
import env from "../../util/env"
import DataLoading from "../../view/scenes/loading/DataLoading"
import MainScene from "../../view/scenes/main/MainScene"

export default class BuildingCommand extends SimpleCommand implements ICommand {

  public static ACTIVATION = "activation"

  public static UPGRADE = "upgrade"

  public static USE = "use"

  public constructor() {
    super()
  }

  public register(facade) {
    facade["registerCommand"](BuildingCommand.ACTIVATION, BuildingCommand)
    facade["registerCommand"](BuildingCommand.UPGRADE, BuildingCommand)
    facade["registerCommand"](BuildingCommand.USE, BuildingCommand)
  }

  public execute(notification: INotification): void {
    if (env !== "pro") console.log("BuildingCommand notification:", notification)
    let mainMediator: MainSceneMediator = this.facade["retrieveMediator"](MainSceneMediator.NAME)
    let gameProxy: GameProxy = this.facade["retrieveProxy"](GameProxy.NAME)
    let userProxy: UserProxy = this.facade["retrieveProxy"](UserProxy.NAME)

    let body = notification.getBody()
    let name = notification.getName()
    switch (name) {
      case BuildingCommand.ACTIVATION:
      case BuildingCommand.UPGRADE:
        let {level, chargeType, costNumber, buildingLocationId}: IBuildingLevel = body
        if (chargeType === ChargeType.COURSE) {
          let buildingLocation = gameProxy.getBuildingLoationData(gameProxy.currentSceneId, buildingLocationId)
          let {courseCount} = buildingLocation
          if (courseCount < costNumber) {
            let cha = costNumber - courseCount
            ApplicationFacade.game.scene.start(Message.NAME, {text: "再完成" + cha + "节课程可以升级"})
          } else {
            this.buy(body)
          }
        } else if (chargeType === ChargeType.STAR || chargeType === ChargeType.EGGSHELL) {
          let {first, second} = gameProxy.gameData.guide
          // 点击激活按钮，即激活引导完成
          if (first.val) {
            if (!first["1"] && !first["2"] && !first["3"] && !first["4"]) {
              getCompletedNoviceGuide({
                studentId: userProxy.userData.studentId,
                guide: NoviceGuideType.ACTIVITY_GUIDE
              })
            }
          } else if (second.val) { // 点击升级按钮，即升级引导完成
            if (!second["1"] && !second["2"]) {
              getCompletedNoviceGuide({
                studentId: userProxy.userData.studentId,
                guide: NoviceGuideType.UPGRADE_GUIDE
              })
            }
          }

          let shenyu, num
          if (chargeType === ChargeType.STAR) {
            shenyu = gameProxy.gameData.leftStars
            num = 3
          } else if (chargeType === ChargeType.EGGSHELL) {
            shenyu = gameProxy.gameData.availableEggshell
            num = 4
          }

          if (shenyu < costNumber) {
            mainMediator.lockStar(num, costNumber)

            if (first.val && !first["1"] && !first["2"] && !first["3"] && !first["4"] && first["5"] && level === 1) this.sendNotification(GuideCommand.STEP_1_5)
          } else {
            this.buy(body)
          }
        }
        break
      case BuildingCommand.USE:
        this.use(body)
        break
    }
  }

  private buy(bld: IBuildingLevel) {
    let userProxy: UserProxy = (this.facade["retrieveProxy"](UserProxy.NAME) as UserProxy)
    let gameProxy: GameProxy = this.facade["retrieveProxy"](GameProxy.NAME)
    let msm: MainSceneMediator = this.facade["retrieveMediator"](MainSceneMediator.NAME)

    let {id, costNumber, buildingLocationId} = bld
    postVwordVitemUpgrade({
      studentId: userProxy.userData.studentId,
      vitemExtId: id
    }).then((res: { data: any, code: number, msg: string }) => {
      if (res && res.code === 200) {
        if (bld.chargeType === ChargeType.STAR || bld.chargeType === ChargeType.COURSE) {
          gameProxy.upgradeSuccess(bld)

          this.showtips(bld)
        } else if (bld.chargeType === ChargeType.EGGSHELL) {
          return getGrantStatusDetail({
            studentId: userProxy.userData.studentId
          }).then((res: { data: any, code: number, msg: string }) => {
            if (res && res.code === 200) {
              let eshopData: { status: string, smallAmount: number } = res.data
              let {status, smallAmount} = eshopData
              if (status === GrantStatus.GRANTED) {
                gameProxy.upgradeSuccess(bld)

                this.showtips(bld)
              } else if (status === GrantStatus.CANCEL_GRANT) {
                msm.scene.lockDialog.setContent(DialogType.fumuqueren).show()
              } else if (status === GrantStatus.SMALL_AMOUNT_GRANTED) {
                if (costNumber <= smallAmount) {
                  gameProxy.upgradeSuccess(bld)

                  this.showtips(bld)
                } else {
                  msm.scene.lockDialog.setContent(DialogType.fumuqueren).show()
                }
              }
            }
          })
        }
      } else if (res && res.code === 485) {
        msm.scene.lockDialog.setContent(DialogType.chongfuxiadan).show()
      } else {
        ApplicationFacade.game.scene.start(Message.NAME, {text: res.msg})
      }
    })

    /*ApplicationFacade.game.scene.start(DataLoading.NAME)
    let mainScene = ApplicationFacade.game.scene.getScene(MainScene.NAME)
    mainScene.time.delayedCall(1000, () => {
      ApplicationFacade.game.scene.keys[DataLoading.NAME].hide()

      gameProxy.upgradeSuccess(bld)

      this.showtips(bld)
    }, null, this)*/
  }

  private showtips(bld) {
    let gameProxy: GameProxy = this.facade["retrieveProxy"](GameProxy.NAME)
    let {first, second} = gameProxy.gameData.guide
    if (first.val) {
      if (!first["1"] && !first["2"] && !first["3"] && !first["4"] && first["6"] && bld.level === 1) this.sendNotification(GuideCommand.STEP_1_6)
    } else if (second.val) {
      if (!second["1"] && !second["2"] && second["3"] && bld.level !== 1) this.sendNotification(GuideCommand.STEP_2_3)
    }
  }

  private use(bld: IBuildingLevel) {
    let gameProxy: GameProxy = this.facade["retrieveProxy"](GameProxy.NAME)
    let userProxy: UserProxy = (this.facade["retrieveProxy"](UserProxy.NAME) as UserProxy)

    let {id, buildingLocationId, buildingMaterialId} = bld
    postVwordVitemUse({
      studentId: userProxy.userData.studentId,
      vitemExtId: id
    }).then((res: { data: object, code: number, msg: string }) => {
      if (res && res.code === 200) {
        gameProxy.setUseBuildingMaterial(buildingLocationId, buildingMaterialId, id)

        let msm: MainSceneMediator = this.facade["retrieveMediator"](MainSceneMediator.NAME)
        msm.hidePannel("building" + buildingLocationId, "colorfy")
      } else {
        ApplicationFacade.game.scene.start(Message.NAME, {text: res.msg})
      }
    })
  }
}