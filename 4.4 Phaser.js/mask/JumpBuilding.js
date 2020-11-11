class JumpBuilding extends Phaser.GameObjects.Container {
  jumpBarView
  jumpBarBg
  jumpBarLine
  jumpBarMask

  constructor(scene, x = 0, y = 0) {
    super(scene, x, y)

    this.jumpBG = scene.add.image(0, 0, "sp_jump_bg_lock.png").setOrigin(0.5, 203 / 236)
    this.add(this.jumpBG)

    this.jumpBarBg = scene.add.image(0, 0, "sp_jump_bar_bg.png").setOrigin(0, 0)
    this.jumpBarLine = scene.add.image(20, 106, "sp_jump_bar_line.png").setOrigin(0, 0)

    this.jumpBarView = scene.add.container(52, -155, [this.jumpBarBg, this.jumpBarLine])
    this.add(this.jumpBarView)


    let jumpBarMask = scene.add.image(
      this.x + 55 + 16,
      this.y - 155 + 37,
      "sp_jump_bar_mask.png"
    ).setOrigin(0, 0)
    this.add(jumpBarMask)
    let mask = jumpBarMask.createBitmapMask()
    console.log(mask.bitmapMask)
    this.jumpBarLine.setMask(mask)
    this.jumpBarMask = jumpBarMask
  }

  setx(val) {
    this.x = val

    this.jumpBarMask.x = this.x + 55 + 16
  }
}
