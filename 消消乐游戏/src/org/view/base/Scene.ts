import Scene = Phaser.Scene
import Container = Phaser.GameObjects.Container

export default class Scene extends Phaser.Scene {

  constructor(config) {
    super(config)
  }

  addImage(texture: string, frame: string = null, x: number = 0, y: number = 0) {
    return this.add.image(x, y, texture, frame)
  }
}