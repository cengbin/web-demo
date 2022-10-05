import PhaserCarousel from "../../../../../component/PhaserCarousel"
import PhaserPanel from "../../../../../component/UI/PhaserPanel"
import Button from "../../main/Button"
import {setMaskVisible} from "../../../../util/lc"
import {default as track, EventType} from "../../../../util/dot"

export default class StoryPanel extends PhaserPanel {

  public entryBtn = null

  constructor(config, x = 0, y = 0) {
    super(config, x, y)

    this.setPanelBG(0x000000, 1)

    this.contentView.setPosition(-1024 / 2, -768 / 2)

    let w = 1024
    let h = 768
    let content = []
    for (var i = 0; i < 2; i++) {
      let storyImg1 = this.scene.add.image((i * w) + 72, 56, "s" + String(i + 1) + ".png").setOrigin(0, 0)
      content.push(storyImg1)
    }

    let prevBtn = this.scene.add.image(50.5, 343 + (83 / 2), "btn_arrow.png").setScale(-1, 1).setInteractive({cursor: "pointer", useHandCursor: true})
    let nextBtn = this.scene.add.image(973.5, 343 + (83 / 2), "btn_arrow.png").setInteractive({cursor: "pointer", useHandCursor: true})

    let carouseView = new PhaserCarousel(this.scene, {
      debug: false,
      index: 0,
      maskWidth: w,
      maskHeight: h,
      prevBtn,
      nextBtn,
      content,
    })
    this.contentView.add(carouseView)
    carouseView.setContentMask()
    carouseView.on(PhaserCarousel.CLICK_PREV, (index) => {
      track(EventType.pageClick, {
        "event_id": "base_cartoon_prev"
      })
    })
    carouseView.on(PhaserCarousel.CLICK_NEXT, (index) => {
      track(EventType.pageClick, {
        "event_id": "base_cartoon_next"
      })
    })
    carouseView.on(PhaserCarousel.CAROUSEL_START, (index) => {
      this.entryBtn.visible = (index === (content.length - 1))
    })

    let entryBtn = new Button(this.scene, {
      w: 160,
      h: 48,
      bg: {t: "public", f: "btn_bg_160*48_A.png"},
      content: {t: "进入基地", s: {fontSize: 24}}
    }, 432 + 160 / 2, 696 + 48 / 2)
    this.contentView.add(entryBtn)
    this.entryBtn = entryBtn
    entryBtn.visible = (carouseView.index === (content.length - 1))
    window.TweenMax.to(entryBtn, 1, {scaleX: 1.05, scaleY: 1.05, repeat: -1, yoyo: true})
  }

  public show() {
    setMaskVisible(true, "not-opacity-bg")
    if (this.scene.uiLayer) this.scene.uiLayer.add(this)
    window.TweenMax.fromTo(this.contentWrapper, 1, {alpha: 0}, {alpha: 1, ease: window.Power1.easeOut})
  }

  public hide() {
    let tw: any = window.TweenMax.getTweensOf(this.entryBtn)
    if (tw.length > 0) {
      tw[0].kill()
    }
    setMaskVisible(false, "not-opacity-bg")
    window.TweenMax.to(this, 0.5, {
      alpha: 0,
      ease: window.Power1.easeOut,
      onComplete: () => {
        if (this.scene.uiLayer) this.scene.uiLayer.remove(this)
      }
    })
  }
}