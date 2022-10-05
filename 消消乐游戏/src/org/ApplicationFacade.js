import StartupCommand from "./controller/StartupCommand.js"
import GameCommand from "./controller/commands/GameCommand.js"

export default class ApplicationFacade extends Facade {
  static STARTUP = "startup"

  static instance = null

  static game = null

  constructor(key) {
    super(key)
  }

  static getInstance(key) {
    if (null == key) return null

    if (Facade.instanceMap[key] == null) {
      Facade.instanceMap[key] = new ApplicationFacade(key)
    }

    return Facade.instanceMap[key]
  }

  initializeController() {
    super.initializeController()
    this.registerCommand(ApplicationFacade.STARTUP, StartupCommand)
  }

  initializeModel() {
    super.initializeModel()
  }

  startup(game) {
    ApplicationFacade.game = game
    this.sendNotification(ApplicationFacade.STARTUP, game)
    this.removeCommand(ApplicationFacade.STARTUP)
    this.sendNotification(GameCommand.INIT_GAME_DATA)
  }
}