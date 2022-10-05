import Parse = Phaser.GameObjects.RetroFont.Parse;
import vi2e = require("../../../../../vf2e.config.js")
import LoadingMediator from "../../LoadingMediator"
import GameProxy from "../../../model/GameProxy"
// import {default as resource} from "./res.json"
import {default as resource} from "./res"
import {SceneEvent} from "../../../../Game"

export default class InitLoading extends Phaser.Scene {
  public static NAME = "init_loading"

  public loadingView
  public barLine

  public redirectData
  public seeComic

  constructor() {
    let idx = (GameProxy.currentSceneIndex + 1)
    super({
      key: InitLoading.NAME,
      // @ts-ignore
      pack: {
        files: [
          {
            type: "image",
            key: "s" + idx + "_panorama.jpg",
            url: vi2e.cdn.publicPath + "static/assets/main/map/s" + idx + "/s" + idx + "_panorama.jpg"
          },
          {type: "image", key: "sp_bar_line.png", url: vi2e.cdn.publicPath + "static/assets/public/sp_bar_line.png"}
        ]
      }
    })
  }

  public init(data) {
    this.data.values = data

    this.load.on("progress", this.onLoadProgressListener, this)

    this.events.on("transitionout", () => {
      window.TweenMax.to(this.loadingView, 0.3, {alpha: 0, ease: window.Power1.easeOut})
    })

    this.render()

    this.events.emit(SceneEvent.INIT_COMPLETE)
  }

  private preload() {
    this.load.baseURL = vi2e.cdn.publicPath
    // @ts-ignore
    this.load.pack("pack1", resource)
    this.load.atlas("point", "static/assets/start/point.png", "static/assets/start/point.json")
    this.load.atlas("tips", "static/assets/main/tips.png", "static/assets/main/tips.json")
    this.load.atlas("upgrade", "static/assets/main/upgrade.png", "static/assets/main/upgrade.json")
    this.load.atlas("colorfy", "static/assets/main/colorfy.png", "static/assets/main/colorfy.json")
    this.load.atlas("hand", "static/assets/main/hand.png", "static/assets/main/hand.json")
    this.load.glsl("outline", "./static/assets/shader/outline.frag")

    this.load.atlas("public", "static/assets/public/public.png", "./static/assets/public/public.json")
    this.load.atlas("start", "static/assets/start/start.png", "./static/assets/start/start.json")

    if (this.redirectData) {
      this.redirectData.forEach((ele: RedirectStruct) => {
        if (ele.iconUrl && ele.iconUrl !== "null" && ele.iconUrl !== "www.baidu.com") {
          this.load.image("redirect" + ele.id, ele.iconUrl)
        } else {
          // console.log(ele.iconUrl)
        }
      })
    }

    if (this.seeComic) {
      this.load.image("btn_arrow.png", "static/assets/start/story/btn_arrow.png")
      this.load.image("s1.png", "static/assets/start/story/s1.png")
      this.load.image("s2.png", "static/assets/start/story/s2.png")
    }

    let idx = (this.data.values.index + 1)
    this.load.image("s" + idx + "_min.jpg", "static/assets/main/map/s" + idx + "/s" + idx + "_min.jpg")

    if (this.data.values && this.data.values.vpositionList) {
      this.data.values.vpositionList.forEach((buildingLocation) => {
        // console.log(buildingLocation.id, buildingLocation.name)
        buildingLocation.vitemList.forEach((buildingMaterial) => {
          let {vitemExtList, hasSubOneUse, curLevel} = buildingMaterial
          vitemExtList.forEach((buildingLevel) => {
            let {id, imageUrl, iconUrl, inUse, own, level} = buildingLevel

            if (!imageUrl || imageUrl === "https://www.vipkid.com.cn/") {
              console.log("imageUrl:", buildingLocation.id, buildingLocation.name, buildingMaterial.id, buildingMaterial.name, id, imageUrl)
              imageUrl = "https://img.vipkidstatic.com/bin/error_img"
            }
            if (!iconUrl || iconUrl === "https://www.vipkid.com.cn/") {
              console.log("iconUrl:", buildingLocation.id, buildingLocation.name, buildingMaterial.id, buildingMaterial.name, id, iconUrl)
              iconUrl = "https://img.vipkidstatic.com/bin/error_img"
            }

            let goodsKey = ""
            if (curLevel === level || (curLevel + 1) === level) {
              goodsKey = "goods" + id
              this.load.image(goodsKey, imageUrl)
              // console.log(buildingLocation.name, buildingMaterial.name, goodsKey, imageUrl)
            }

            let iconKey = "icon" + id
            this.load.image(iconKey, iconUrl)
            // console.log(iconKey, iconUrl)
          })
          // console.log("\n")
        })
      })
    }
  }

  public create() {
    this.events.emit(LoadingMediator.ASSETS_LOAD_COMPLETE)
  }

  private render() {
    let {index} = this.data.values
    index += 1
    let {width, height} = this.game.config

    this.add.image(0, 0, "s" + index + "_panorama.jpg").setPosition(Number(width) / 2, Number(height) / 2)

    this.add.graphics()
      .fillStyle(0xFFFFFF, 0.9)
      .fillRoundedRect(0, 0, 320, 36, 18)
      .generateTexture("barBG", 320, 36).setVisible(false)
    let barBG = this.add.image(0, 0, "barBG").setOrigin(0, 0)

    let barLine = this.add.image(-306, 6, "sp_bar_line.png").setOrigin(0, 0)
    this.barLine = barLine

    let copywriters = ["完成能量站任务可以获得大量星星", "建筑不但可以升级还能切换外观哦", "上课可以解锁更多建筑", "V基地很有趣但不要忘了学习", "V基地遍布宇宙努力去探索更多场景吧"]
    let barTipsTxt = this.add.text(320 / 2, 52, copywriters[Math.floor(Math.random() * copywriters.length)], {fontFamily: "Arial", fontSize: 18, color: "#ffffff"}).setOrigin(0.5, 0)

    let barView = this.add.container((Number(this.game.config.width) / 2) - 160, 638, [barBG, barLine, barTipsTxt])

    this.loadingView = this.add.container(0, 0, [barView])

    let mask = this.make.graphics({})
      .fillStyle(0xffffff)
      .beginPath()
      .fillRoundedRect(barView.x + 7, barView.y + barLine.y, 306, 24, 12)
      .createGeometryMask()
    barLine.setMask(mask)
  }

  public loadComplete() {
    // this.cache.bitmapFont.add("knighthawks", Parse(this, {
    //   image: "sp_number.png",
    //   "offset.x": 0,
    //   "offset.y": 0,
    //   width: 32,
    //   height: 48,
    //   chars: "0123456789x",
    //   charsPerRow: 11,
    //   "spacing.x": 0,
    //   "spacing.y": 0,
    //   lineSpacing: 0
    // }))

    this.anims.create({
      defaultTextureKey: null,
      key: "colorfy",
      frames: this.anims.generateFrameNames("colorfy", {
        prefix: "Colorfy",
        suffix: ".png",
        start: 1,
        end: 8,
        zeroPad: 2
      }),
      frameRate: 12,
      repeat: 0,
      showOnStart: true,
      hideOnComplete: true
    })

    this.anims.create({
      defaultTextureKey: null,
      key: "upgrade",
      frames: this.anims.generateFrameNames("upgrade", {
        prefix: "upgrade",
        suffix: ".png",
        start: 1,
        end: 8,
        zeroPad: 2
      }),
      frameRate: 12,
      repeat: 0,
      showOnStart: true,
      hideOnComplete: true
    })

    this.anims.create({
      defaultTextureKey: null,
      key: "tips",
      frames: this.anims.generateFrameNames("tips", {
        prefix: "tips",
        suffix: ".png",
        start: 1,
        end: 2,
        zeroPad: 2
      }),
      frameRate: 4,
      repeat: -1,
      showOnStart: true,
      hideOnComplete: true
    })

    this.anims.create({
      defaultTextureKey: null,
      key: "hand",
      frames: this.anims.generateFrameNames("hand", {
        prefix: "hand",
        suffix: ".png",
        start: 1,
        end: 2,
        zeroPad: 2
      }),
      frameRate: 2,
      repeat: -1
    })

    /*var grayfilterShaer = this.cache.shader.get("grayfilter")
    var plasmaPipeline = new Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline({
      game: this.game,
      renderer: this.game.renderer,
      fragShader: grayfilterShaer.fragmentSrc
    })
    this.game.renderer["addPipeline"]("grayfilter", plasmaPipeline)*/

    var baseShaer = this.cache.shader.get("outline")
    var plasmaPipeline = new Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline({
      game: this.game,
      renderer: this.game.renderer,
      fragShader: baseShaer.fragmentSrc
    })
    this.game.renderer["addPipeline"]("outlineFilter", plasmaPipeline)

    this.sound.add("bg_music.mp3")
    this.sound.add("buy_succes.mp3")
    this.sound.add("common_click.mp3")
    this.sound.add("upgrade_success.mp3")
  }

  private onLoadProgressListener(val) {
    // console.log("onLoadProgressListener:", val)
    if (this.barLine) {
      this.barLine.x = -306 + (306 * val) + 7
    }
  }
}
