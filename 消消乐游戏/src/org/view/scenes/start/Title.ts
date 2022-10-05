import Container = Phaser.GameObjects.Container
import Image = Phaser.GameObjects.Image
import Text = Phaser.GameObjects.Text

export default class Title extends Container {

  public bg: Image
  public chineseText: Text
  public englishText: Text

  constructor(scene, x = 0, y = 0) {
    super(scene, x, y)

    this.bg = scene.add.image(0, 0, "start", "sp_tittle_bg.png").setInteractive()
    this.add(this.bg)

    this.chineseText = scene.add.text(0, 0, "", {fontFamily: "Arial", fontSize: 28}).setOrigin(0.5, 1)
    this.add(this.chineseText)

    this.englishText = scene.add.text(0, 0, "", {fontFamily: "Arial", fontSize: 20}).setOrigin(0.5, 0)
    this.add(this.englishText)
  }

  public setTitle(ch = "", en = "") {
    this.chineseText.text = ch
    this.englishText.text = en
  }
}