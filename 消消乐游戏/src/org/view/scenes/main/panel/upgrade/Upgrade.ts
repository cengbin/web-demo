import Container = Phaser.GameObjects.Container
import Pha from "../../../../../../org/util/Pha"
import MainScene from "../../MainScene"
import UpgradeTitle from "./UpgradeTitle"
import Button from "../../Button"
import {setMaskVisible} from "../../../../../util/lc"
import IBuildingLocation from "../../../../../interface/IBuildingLocation"
import MainSceneMediator from "../../../../MainSceneMediator"
import LevelItem from "./LevelItem"

export default class Upgrade extends Container {
  public scene: MainScene
  public title: UpgradeTitle
  public bg
  public closeBtn
  public levelItemArr: LevelItem[]
  public levelView: Container
  public bookTween

  protected _data2: IBuildingLocation
  protected _leftStars: number
  protected _availableEggshell: number

  constructor(scene, x = 0, y = 0) {
    super(scene, x, y)
    this.bg = Pha.getImg({scene, t: "sp_bgmask.png"}).setOrigin(0, 0).setInteractive()
    this.add(this.bg)
    this.bg.on("pointerup", () => {
      this.hide()
    })

    this.closeBtn = new Button(scene, {w: 28, h: 28, bg: {t: "public", f: "btn_close_white.png"}}, 976 + 28 / 2, 20 + 28 / 2)
    this.add(this.closeBtn)
    this.closeBtn.on("pointerup", () => this.hide())

    this.title = new UpgradeTitle(scene, {ch: "博物馆", en: "Museum"}, 512, 60 + 26)
    this.add(this.title)
    this.title.on("pointerup", this.clickTitle, this)
    this.bookTween = window.TweenMax.to(this.title.bg, 1, {scaleX: 1.05, scaleY: 1.05, repeat: -1, yoyo: true})
    this.bookTween.pause()
  }

  protected clickTitle() {
    this.scene.events.emit(MainScene.CLICK_TITLE, this._data2)
  }

  protected setLevelItemActive(levelItem) {
    this.levelItemArr.forEach(ele => {
      ele.select = (ele === levelItem)

      if (ele.select && ele.bottom.state2 === 2) {
        ele.bottom.pause()
      } else {
        ele.bottom.play()
      }
    })
  }

  public setContent(data: IBuildingLocation) {
    // console.log("Upgrade setContent:", data)
    this._data2 = data

    let {name, enName} = data
    this.title.setTitle(name, enName)
  }

  public show() {
    setMaskVisible(true)
    this.scene.uiLayer.add(this)

    this.bookTween.play()
    window.TweenMax.fromTo(this, 0.3, {alpha: 0}, {alpha: 1, ease: window.Power1.easeOut})
    window.TweenMax.fromTo(this.title, 0.5, {y: -50, alpha: 0}, {y: 60 + 26, alpha: 1, ease: window.Power1.easeOut})
  }

  public hide() {
    this.scene.events.emit(MainSceneMediator.HIDE_UPGRADE_PANEL, this._data2)

    this.levelItemArr.forEach(ele => {
      ele.select = false
      ele.arrow.active2 = false
    })

    setMaskVisible(false)

    this.bookTween.pause()
    window.TweenMax.to(this, 0.3, {alpha: 0, ease: window.Power1.easeOut, onComplete: () => this.scene.uiLayer.remove(this)})
    window.TweenMax.to(this.title, 0.3, {y: -50, alpha: 0, ease: window.Power1.easeOut})
  }
}