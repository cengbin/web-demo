export default class Message extends Phaser.Scene {
  public static NAME = "message"

  private contentView

  constructor() {
    super({key: Message.NAME})
  }

  public init() {
    this.scene.bringToTop()
  }

  public create(data) {
    this.render(data)

    let {duration = 1500} = data
    this.time.delayedCall(duration, () => {
      this.scene.stop()
    }, [], this)
  }

  public render(data) {
    let stageWidth = Number(this.game.config.width)
    let stageHeight = Number(this.game.config.height)
    var whiteBg = this.add.graphics()
    whiteBg.fillStyle(0xffffff, 0.0)
    whiteBg.fillRect(0, 0, stageWidth, stageHeight)
    whiteBg.setInteractive(new Phaser.Geom.Rectangle(0, 0, stageWidth, stageHeight), Phaser.Geom.Rectangle.Contains)
    whiteBg.on("pointerup", () => {
      this.scene.stop()
    }, this)

    let contentView = this.add.container(0, 0)
    this.contentView = contentView

    let {text = "no text"} = data
    let tipsText = this.add.text(0, 0, text, {
      // let tipsText = this.add.text(0, 0, '每天上线获得5哥新物品,明天再来吧', {
      fontSize: "18px",
      fontFamily: "Arial",
      color: "#ffffff",
      align: "center",
      // backgroundColor: '#ff00ff',
      padding: 22,
      wordWrap: {width: 240, useAdvancedWrap: true}
    })

    let w = 280 + 8
    let h = tipsText.height
    // let h = 86 + 8
    let tipsBG = this.add.graphics()
    tipsBG.fillStyle(0xffffff, 0.1)
    tipsBG.fillRoundedRect(0, 0, w, h, 20)
    tipsBG.fillStyle(0x3D2966, 0.9)
    tipsBG.fillRoundedRect(4, 4, w - 8, h - 8, 20)
    tipsText.setPosition((w - tipsText.width) / 2, (h - tipsText.height) / 2)

    contentView.add([tipsBG, tipsText])
    contentView.setPosition((stageWidth - w) / 2, (stageHeight - h) / 2)
  }
}
