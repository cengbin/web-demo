class Game extends PIXI.Application {

  constructor(config) {
    super(config)
  }

  start() {
    super.start()
    document.body.appendChild(this.view)

    for (let i = 0; i < 20; i++) {
      var graphics2 = new PIXI.Graphics()
      graphics2.lineStyle(2, 0xffd900, 1)
      graphics2.moveTo(0, 0)
      graphics2.lineTo(200, 0)
      graphics2.endFill()
      graphics2.y = i * 50
      this.stage.addChild(graphics2)

      var style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 16,
      })

      var txt = new PIXI.Text(`菜单${i}`)
      txt.x = 0
      txt.y = (i * 50) + 25
      txt.anchor.y = 0.5
      this.stage.addChild(txt)
    }

    var graphics = new PIXI.Graphics()
    graphics.beginFill(0xFF3300, 0.3)
    graphics.moveTo(A.x, A.y)
    graphics.lineTo(B.x, B.y)
    graphics.lineTo(C.x, C.y)
    graphics.closePath()
    graphics.endFill()
    graphics.interactive = true
    graphics.buttonMode = true
    this.stage.addChild(graphics)

    window.graphics = graphics

    var menutext = new PIXI.Text(`菜单`)
    menutext.x = 200
    menutext.y = 0
    this.stage.addChild(menutext)
    menutext.text = 'xxxx'
    window.menutext = menutext
  }
}