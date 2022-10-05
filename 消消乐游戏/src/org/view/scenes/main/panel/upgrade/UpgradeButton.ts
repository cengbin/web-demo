import Text = Phaser.GameObjects.Text
import Image = Phaser.GameObjects.Image
import Button from "../../Button"
import {ChargeType} from "../../../../../interface/IBuildingLevel"

export default class UpgradeButton extends Button {

  public iconImg: Image
  public numberTxt: Text

  constructor(scene, config, x = 0, y = 0) {
    super(scene, config, x, y)

    this.iconImg = scene.add.image(config.ix || 0, config.iy || 0, "")
    this.add(this.iconImg)

    this.numberTxt = scene.add.text(config.tx || 0, config.ty || 0, "", {fontFamily: "Arial", fontSize: 20}).setOrigin(0, 0.5)
    this.add(this.numberTxt)
  }

  public setContent(type: string, num: number) {
    this.iconImg.setTexture(type === ChargeType.STAR
      ? "icon_star.png"
      : type === ChargeType.EGGSHELL
        ? "icon_energy.png"
        : "")

    this.numberTxt.text = String(num)
  }
}
