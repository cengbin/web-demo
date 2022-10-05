import Animate from "./Animate"

export default class AnimateRotate extends Animate {
  constructor(obj) {
    super(obj)

    let duration = 0.8

    let tlm = new window.TimelineMax({repeat: -1, ease: window.Power0.easeNone})
    tlm.to(this.obj.buildImg, duration, {rotation: Math.PI / 180 * -6, ease: window.Power0.easeNone})
    tlm.to(this.obj.buildImg, duration, {rotation: Math.PI / 180 * 0, ease: window.Power0.easeNone})
    tlm.to(this.obj.buildImg, duration, {rotation: Math.PI / 180 * 6, ease: window.Power0.easeNone})
    tlm.to(this.obj.buildImg, duration, {rotation: Math.PI / 180 * 0, ease: window.Power0.easeNone})
    this.tween = tlm
  }
}
