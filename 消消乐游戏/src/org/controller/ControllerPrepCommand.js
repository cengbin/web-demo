import GameCommand from "./commands/GameCommand"
import SceneCommand from "./commands/SceneCommand"
import BuildingCommand from "./commands/BuildingCommand"
import GuideCommand from "./commands/GuideCommand"

export default class ControllerPrepCommand extends SimpleCommand implements ICommand {
  constructor() {
    super()
  }

  public execute() {
    new GameCommand().register(this.facade)
    new SceneCommand().register(this.facade)
    new BuildingCommand().register(this.facade)
    new GuideCommand().register(this.facade)
  }
}