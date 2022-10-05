import Container = Phaser.GameObjects.Container
import Image = Phaser.GameObjects.Image
import Text = Phaser.GameObjects.Text

export default class UpgradeTitle extends Container {

  public bg: Image
  public chineseText: Text
  public englishText: Text

  constructor(scene, option, x = 0, y = 0) {
    super(scene, x, y)

    this.bg = scene.add.image(-8, -3, "icon_book.png").setOrigin(1, 0.5)
    this.add(this.bg)

    let {ch, en} = option
    this.chineseText = scene.add.text(0, 0, ch, {fontFamily: "Arial", fontSize: 24, color: "#4DFFFF"}).setOrigin(0, 1)
    this.add(this.chineseText)

    this.englishText = scene.add.text(0, 0, en, {fontFamily: "Arial", fontSize: 24, color: "#4DFFFF"}).setOrigin(0, 0)
    this.add(this.englishText)

    // let point = this.scene.add.graphics({}).fillStyle(0xff0000, 1).fillRect(0, 0, 10, 10)
    // this.add(point)

    this.setInteractive({
      hitArea: new Phaser.Geom.Rectangle(-150, -40, 300, 80),
      hitAreaCallback: Phaser.Geom.Rectangle.Contains,
      cursor: "pointer",
      useHandCursor: false
    })
  }

  public setTitle(ch = "", en = "") {
    this.chineseText.text = ch
    this.englishText.text = en

    // this.maxWidth = Math.max(this.chineseText.width, this.englishText.width)
  }

  private set maxWidth(val) {
    this.bg.x = val / 2 + 12
  }
}