import Map from './Map.js'

export default class Game extends PIXI.Application {

  constructor(config) {
    super(config)

    document.body.appendChild(this.view)

    let map = new Map()
    this.stage.addChild(map)
  }
}