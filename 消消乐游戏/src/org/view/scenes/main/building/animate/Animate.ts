import IAnimateBehavior from "../../../../../interface/IAnimateBehavior"

export default class Animate implements IAnimateBehavior {

  public obj
  public tween

  constructor(obj) {
    this.obj = obj
    this.tween = null
  }

  public play() {
    this.tween.play()
  }

  public stop() {
  }

  public pause() {
    this.tween.pause()
  }

  public kill() {
    // console.log('kill:', this.obj)
    this.tween.kill()
  }
}
