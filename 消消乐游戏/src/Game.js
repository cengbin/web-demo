// import Map from "./Map.js"
import ApplicationFacade from "./org/ApplicationFacade.js"

export default class Game extends PIXI.Application {

  constructor(config) {
    super(config)

    document.body.appendChild(this.view)

    // let map = new Map()
    // this.stage.addChild(map)

    // let app = ApplicationFacade.getInstance(Game.NAME) as ApplicationFacade
    // app.startup(this)
  }
}