import Mediator = puremvc.Mediator;
import IMediator = puremvc.IMediator;
import InitLoading from "./scenes/loading/InitLoading"
import InterludeLoading from "./scenes/loading/InterludeLoading"
import GameCommand from "../controller/commands/GameCommand"
import SceneCommand from "../controller/commands/SceneCommand"
import GameProxy from "../model/GameProxy"
import {SceneEvent} from "../../Game"
import UserProxy from "../model/UserProxy"

export default class LoadingMediator extends Mediator implements IMediator {
  public static NAME: string = "loading_mediator"

  public static ASSETS_LOAD_COMPLETE: string = "assets_load_complete"

  public static NO_LOAD: string = "no_load"

  constructor(viewComponent: any) {
    super(LoadingMediator.NAME, viewComponent)

    this.addEvents()
  }

  public addEvents() {
    this.viewComponent.events.on(SceneEvent.INIT_COMPLETE, this.initComplete, this)
    this.viewComponent.events.on(LoadingMediator.ASSETS_LOAD_COMPLETE, this.loadCompleteListener, this)
    this.viewComponent.events.on(LoadingMediator.NO_LOAD, this.loadCompleteListener, this)
  }

  private initComplete() {
    let gameProxy = this.facade["retrieveProxy"](GameProxy.NAME) as GameProxy
    let userProxy = this.facade["retrieveProxy"](UserProxy.NAME) as UserProxy

    if (this.viewComponent instanceof InitLoading) {
      this.viewComponent.redirectData = gameProxy.gameData.redirect.all
      this.viewComponent.seeComic = (userProxy.vunionGuide.seeComic === 0)
    }
  }

  private loadCompleteListener() {
    if (this.viewComponent instanceof InitLoading) {
      this.viewComponent.loadComplete()
      this.sendNotification(GameCommand.INIT_LOAD_ASSETS_COMPLETE, this.viewComponent)
    } else if (this.viewComponent instanceof InterludeLoading) {
      this.sendNotification(SceneCommand.TO_MAIN, {
        scene: this.interludeLoading,
        data: {
          id: this.interludeLoading.data.values.id,
          firstTime: false
        },
        current: InterludeLoading.NAME
      })
    }
  }

  public setViewComponent(viewComponent) {
    super.setViewComponent(viewComponent)
    this.addEvents()
  }

  public get initLoading() {
    return this.viewComponent as InitLoading
  }

  public get interludeLoading() {
    return this.viewComponent as InterludeLoading
  }
}