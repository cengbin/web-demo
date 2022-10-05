import Container = Phaser.GameObjects.Container

export default class Hand extends Container {
  constructor(scene, x = 0, y = 0) {
    super(scene, x, y)

    let handSp = scene.add.sprite(0, 0).setOrigin(0.32, 0.32).play("hand")
    this.add(handSp)

    // let point = this.scene.add.graphics({}).fillStyle(0xff0000, 1).fillRect(0, 0, 10, 10)
    // this.add(point)
  }
}
