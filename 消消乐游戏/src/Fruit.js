import Map from './Map.js'

export default class Fruit extends PIXI.Container {

  constructor(node) {
    super()
    this.node = node

    var sprite = PIXI.Sprite.from(`./resources/images/star${node.value}.png`)
    this.addChild(sprite)
    sprite.anchor.set(0.5)

    let text = new PIXI.Text(``, {fontSize: 10, fill: 0xffffff,})
    this.addChild(text)
    text.anchor.set(0.5, 0.5)
    this.text = text

    this.buttonMode = true
    this.interactive = true

    setTimeout(() => {
      this.update()
    })
  }

  update() {
    let {row, col, value} = this.node
    let x = col * Map.GridWidth + Map.GridWidth / 2
    let y = row * Map.GridHeight + Map.GridHeight / 2

    // this.text.text = `(${row},${col}) ${value}`

    TweenMax.to(this, 0.3, {x, y, ease: "none"})
  }
}