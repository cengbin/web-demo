import vi2e = require("../../../../../vf2e.config.js")
import LoadingMediator from "../../LoadingMediator"

export default class InterludeLoading extends Phaser.Scene {
  public static NAME = "interlude_loading"

  public layer1
  public barLine

  // 记录没有进行加载
  private _noload: boolean = true
  private _transitionComplete: boolean = false
  private _loadComplete: boolean = false

  constructor() {
    super({key: InterludeLoading.NAME})
  }

  public init(data) {
    // console.log("InterludeLoading init:", data)
    this.data.values = data

    this._noload = true
    this._transitionComplete = false
    this._loadComplete = false
  }

  public preload() {
    let {index} = this.data.values
    index += 1
    this.load.image("s" + index + "_panorama.jpg", vi2e.cdn.publicPath + "static/assets/main/map/s" + index + "/s" + index + "_panorama.jpg")
  }

  public create() {
    this.render()

    this.events.on("transitionstart", this.sceneIn, this)
    this.events.on("transitionout", this.sceneOut, this)
    this.events.on("transitioncomplete", () => {
      // console.log("transitioncomplete")
      this._transitionComplete = true
      if (this._loadComplete) {
        setTimeout(() => {
          this.events.emit(LoadingMediator.ASSETS_LOAD_COMPLETE)
        }, 10)
      }
    })

    this.load.image("s" + (this.data.values.index + 1) + "_min.jpg", vi2e.cdn.publicPath + "static/assets/main/map/s" + (this.data.values.index + 1) + "/s" + (this.data.values.index + 1) + "_min.jpg")
    let {vpositionList} = this.data.values
    if (vpositionList) {
      vpositionList.forEach((buildingLocation) => {
        buildingLocation.vitemList.forEach((buildingMaterial) => {
          let {vitemExtList, hasSubOneUse, curLevel} = buildingMaterial
          vitemExtList.forEach((buildingLevel) => {
            let {id, imageUrl, iconUrl, inUse, own, level} = buildingLevel

            let goodsKey = ""
            if (curLevel === level || (curLevel + 1) === level) {
              goodsKey = "goods" + id

              // if (this.data.values.id === 26) console.log(goodsKey, this.textures.exists(goodsKey))

              if (!this.textures.exists(goodsKey)) {
                this.load.image(goodsKey, imageUrl)
                if (this._noload) this._noload = false
              }
            }

            let iconKey = "icon" + id

            // if (this.data.values.id === 26) console.log(iconKey, this.textures.exists(iconKey))
            if (!this.textures.exists(iconKey)) {
              this.load.image(iconKey, iconUrl)
              if (this._noload) this._noload = false
            }
          })
        })
      })
    }

    // console.log("this._noload:", this._noload)
    if (this._noload) {
      let data = {num: 0}
      this.tweens.add({
        targets: data,
        num: 1,
        onUpdate: () => {
          this.onLoadProgressListener(data.num)
        },
        onComplete: () => {
          this.events.emit(LoadingMediator.NO_LOAD)
        }
      })
    } else {
      this.load.on("progress", this.onLoadProgressListener, this)
      this.load.once("complete", () => {
        // console.log("load complete")
        this._loadComplete = true
        if (this._transitionComplete) {
          setTimeout(() => {
            this.events.emit(LoadingMediator.ASSETS_LOAD_COMPLETE)
          }, 10)
        }
      })
      this.load.start()
    }
  }

  private render() {
    let {index} = this.data.values
    index += 1
    let {width, height} = this.game.config

    let bg = this.add.image(0, 0, "s" + index + "_panorama.jpg").setPosition(Number(width) / 2, Number(height) / 2)

    let barBG = this.add.image(0, 0, "barBG").setOrigin(0, 0)

    let barLine = this.add.image(-306, 6, "sp_bar_line.png").setOrigin(0, 0)
    this.barLine = barLine

    let copywriters = ["完成能量站任务可以获得大量星星", "建筑不但可以升级还能切换外观哦", "上课可以解锁更多建筑", "V基地很有趣但不要忘了学习", "V基地遍布宇宙努力去探索更多场景吧"]
    let barTipsTxt = this.add.text(320 / 2, 52, copywriters[Math.floor(Math.random() * copywriters.length)], {fontFamily: "Arial", fontSize: 18, color: "#ffffff"}).setOrigin(0.5, 0)

    let barView = this.add.container((Number(this.game.config.width) / 2) - 160, 638, [barBG, barLine, barTipsTxt])

    this.layer1 = this.add.container(0, 0, [bg, barView])

    let mask = this.make.graphics({})
      .fillStyle(0xffffff)
      .beginPath()
      .fillRoundedRect(barView.x + 7, barView.y + barLine.y, 306, 24, 12)
      .createGeometryMask()
    barLine.setMask(mask)
  }

  public sceneIn() {
    window.TweenMax.fromTo(this.layer1, 0.5, {alpha: 0}, {alpha: 1, ease: window.Power0.easeNone})
  }

  public sceneOut() {
    window.TweenMax.to(this.layer1, 0.5, {alpha: 0, ease: window.Power0.easeNone})
  }

  private onLoadProgressListener(val) {
    // console.log("onLoadProgressListener:", val)
    if (this.barLine) {
      this.barLine.x = -388 + (388 * val) + 6
    }
  }
}
