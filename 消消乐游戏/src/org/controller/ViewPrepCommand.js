import Game from "../../Game"
import ApplicationMediator from "../view/ApplicationMediator"

export default class ViewPrepCommand extends SimpleCommand {
  constructor() {
    super()
  }

  public execute(note) {
    var game = note.getBody() as Game
    this.facade["registerMediator"](new ApplicationMediator(game))
  }
}