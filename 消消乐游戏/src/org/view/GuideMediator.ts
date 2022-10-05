import Mediator = puremvc.Mediator;
import IMediator = puremvc.IMediator;
import INotification = puremvc.INotification;
import Guide from "./scenes/guide/Guide"
import {SceneEvent} from "../../Game"
import env from "../util/env"

export default class GuideMediator extends Mediator implements IMediator {
  public static NAME: string = "guide_mediator"

  constructor(viewComponent: any) {
    super(GuideMediator.NAME, viewComponent)
    this.scene.events.on(SceneEvent.INIT_COMPLETE, this.initComplete, this)
  }

  private initComplete() {
    // console.log("GuideMediator initComplete:", this.scene.data.values)
    if (this.scene.data.values.step) {
      this.sendNotification(this.scene.data.values.step)
    }
  }

  public listNotificationInterests(): string[] {
    return []
  }

  public handleNotification(notification: INotification): void {
    if (env !== "pro") console.log("GuideMediator handleNotification:", notification)
  }

  get scene(): Guide {
    return (this.viewComponent as Guide)
  }
}