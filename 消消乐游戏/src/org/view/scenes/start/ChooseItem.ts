import Container = Phaser.GameObjects.Container
import Image = Phaser.GameObjects.Image
import Rectangle = Phaser.Geom.Rectangle
import StartSceneMediator from "../../../view/StartSceneMediator"
import {default as track, EventType} from "../../../util/dot"
import Popup, {PopupContent} from "../main/building/Popup"

export default class ChooseItem extends Container {

  public currentImg: Image
  public smallmapImg: Image
  public maplockImg: Image
  public popup: Popup

  private _state2
  private _w = 221
  private _h = 256
  private _id = null
  private _tlm = null

  private _unLockTexture
  private _lockTexture
  private _tween
  private _selected = false
  private _data2 = null

  constructor(scene, x = 0, y = 0, name = "") {
    super(scene, x, y)

    this.currentImg = scene.add.image(0, 0, "start", "sp_map_selected.png").setOrigin(0.5, 146 / 262).setVisible(false)
    this.add(this.currentImg)

    this.smallmapImg = scene.add.image(0, 0, "").setOrigin(0.5, 154 / 260)
    this.add(this.smallmapImg)

    this.maplockImg = scene.add.image(0, 0, "start", "sp_map_lock.png").setVisible(false)
    this.add(this.maplockImg)

    this.popup = new Popup(this.scene, 0, -100)
    this.add(this.popup)
    this.popup.setVisible(false)

    let tlm = new window.TimelineMax({repeat: -1, yoyo: true})
    let distance = 5 + Math.random() * 2
    let duration = 2 + Math.random() * 0.5
    tlm.to(this, duration, {y: this.y - distance, ease: window.Sine.easeInOut})
    tlm.seek(Math.random() * duration)
    this._tween = tlm

    this.name = name
    this.state2 = 4
    this.addEvents()
  }

  private addEvents(): void {
    this.setInteractive({
      hitArea: new Rectangle(-this._w / 2, -this._h / 2, this._w, this._h),
      hitAreaCallback: Phaser.Geom.Rectangle.Contains,
      cursor: "pointer",
      useHandCursor: false
    })
    this.on("pointerup", this.onPointerDown, this)
  }

  public onPointerDown(point) {
    window._vlog.log("click vmap, id:" + this._id + " " + Boolean(point))

    if (point) {
      this.scene.sound.play("common_click.mp3")
      track(EventType.pageClick, {
        "event_id": this.name === "2" ? "region_list_second" : "region_list_other",
        "id": this._id
      })
    }

    if (this._state2 === 4 || this._state2 === 3) {
      this.popup.setContent(PopupContent.GouJianZhong).show()
    } else if (this._state2 === 2) {
      let {courseCount, unlockConditionCount} = this._data2
      this.popup.setContent(PopupContent.HowUnlock, unlockConditionCount - courseCount).show()
    } else if (this._state2 === 1) {
      this.scene.events.emit(StartSceneMediator.CLICK_ITEM, {
        id: this._id,
        firstTime: point ? false : true
      })
    }
  }

  public set state2(val: number) {
    if (this._state2 === 4) {
      this.alpha = 1
    }

    this._state2 = val

    let key = ""
    switch (val) {
      case 1: // 已解锁（缩略图）
        key = this._unLockTexture
        this.smallmapImg.setTexture(key)
        break
      case 2: // 未解锁
        key = this._lockTexture
        this.smallmapImg.setTexture(key)
        this.maplockImg.setVisible(true)
        break
      case 4: // 当前区域建造中,50%透明提示建筑
        this.alpha = 0.5
      case 3: // 当前区域建造中
        this.smallmapImg.setTexture("start", "sp_map_unknown.png")
        break
    }
  }

  public setBuildingTexture(unlock, lock) {
    this._unLockTexture = unlock
    this._lockTexture = lock
  }

  public destory() {
    super.destroy()
    if (this._tween) this._tween.kill()
    if (this._tlm) this._tlm.kill()
  }

  public set id(val) {
    this._id = val
  }

  public set selected(val) {
    this._selected = val
    this.currentImg.visible = val
  }

  public set data2(val) {
    this._data2 = val
  }

  public get data2() {
    return this._data2
  }
}