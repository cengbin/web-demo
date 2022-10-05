import Container = Phaser.GameObjects.Container

export default class Button extends Container {
  public config
  public hotArea
  public color
  public bg
  public content

  constructor(scene, config: { hotArea?: boolean, s?: string, [any: string]: any }, x = 0, y = 0) {
    super(scene, x, y)

    let {hotArea, color, bg, content, interactive = true, buttonMode = true} = this.config = Object.assign({
      w: 100,
      h: 50,
      p: [10, 20],
      hotArea: false,
      interactive: true,
      buttonMode: true
    }, config)

    if (content) this.content = this.addText(content)

    if (hotArea) this.hotArea = this.addRect({c: 0xff0000, a: 0.3})

    if (color) this.color = this.addRect(color)

    if (bg) this.bg = this.addImage(bg)

    if (this.content) this.bringToTop(this.content)

    this.interactive = interactive

    this.buttonMode = buttonMode

    this.on("pointerdown", (pointer) => {
      window.TweenMax.to(this, 0.3, {scaleX: 1.1, scaleY: 1.1})
    }, this)

    this.on("pointerup", (pointer) => {
      this.scene.sound.play("common_click.mp3")
      window.TweenMax.to(this, 0.3, {scaleX: 1, scaleY: 1})
    }, this)
  }

  public addRect(config, index = this.list.length) {
    let {c: color = 0xffffff, a: alpha = 1, r: rounded, w = this.config.w, h = this.config.h, x = -this.config.w / 2, y = -this.config.h / 2} = config
    let graphics = this.scene.add.graphics({x, y}).fillStyle(color, alpha)
    if (rounded) graphics.fillRoundedRect(0, 0, w, h, rounded)
    else graphics.fillRect(0, 0, w, h)
    this.addAt(graphics, index)
    return graphics
  }

  public addImage(config, index = this.list.length) {
    let {x = 0, y = 0, t: texture, f: frame} = config
    let img = this.scene.add.image(x, y, texture, frame)
    this.addAt(img, index)
    return img
  }

  public addText(config, index = this.list.length) {
    let {x = 0, y = 0, t: text = "", s: style} = config
    style = Object.assign({fontFamily: "Arial", fontSize: 16, color: "#ffffff"}, style)
    let txt = this.scene.add.text(x, y, text, style).setOrigin(0.5, 0.5)

    if (this.config.s === "auto") {
      this.config.w = txt.width + (this.config.p[1] * 2)
      this.config.h = txt.height + (this.config.p[0] * 2)
      txt.setPosition(this.config.w / 2, this.config.h / 2)
    }

    this.addAt(txt, index)
    return txt
  }

  public set buttonMode(val) {
    if (val) {
      this.input.cursor = "pointer"
    } else {
      this.scene.input.manager["resetCursor"](this)
    }
  }

  public set interactive(val) {
    if (!val) {
      this.disableInteractive()
    } else {
      this.setInteractive({
        hitArea: new Phaser.Geom.Rectangle(-this.config.w / 2, -this.config.h / 2, this.config.w, this.config.h),
        hitAreaCallback: Phaser.Geom.Rectangle.Contains
      })
    }
  }
}