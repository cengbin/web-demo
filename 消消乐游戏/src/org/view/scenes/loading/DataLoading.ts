export default class DataLoading extends Phaser.Scene {
  public static NAME: string = "data_loading"

  public loadingView = null

  private _tween = null

  constructor() {
    super({key: DataLoading.NAME})
  }

  public init() {
    this.scene.bringToTop()
    this.render()
  }

  public render() {
    if (this._tween) this._tween.kill()

    let txt = this.add.text(0, 0, "加载中...", {fontFamily: "Arial", fontSize: 14, color: "#B396FF"})
    txt.x = (1024 - txt.width) / 2
    txt.y = (768 - txt.height) / 2

    this.loadingView = this.add.container(0, 0, [txt])
      .setInteractive({
        hitArea: new Phaser.Geom.Rectangle(0, 0, Number(this.game.config.width), Number(this.game.config.height)),
        hitAreaCallback: Phaser.Geom.Rectangle.Contains
      })

    window.TweenMax.fromTo(this.loadingView, 0.6, {alpha: 0}, {alpha: 1, ease: window["Power0"].easeNone})
  }

  public hide() {
    if (this.loadingView) {
      this._tween = window.TweenMax.to(this.loadingView, 0.3, {
        alpha: 0,
        onComplete: () => {
          this._tween = null
          this.scene.stop()
        }
      })
    }
  }
}
