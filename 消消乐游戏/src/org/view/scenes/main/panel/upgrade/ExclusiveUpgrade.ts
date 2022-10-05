import Container = Phaser.GameObjects.Container
import Text = Phaser.GameObjects.Text
import Image = Phaser.GameObjects.Image
import IBuildingMaterial from "../../../../../interface/IBuildingMaterial"
import IBuildingLevel, {ChargeType} from "../../../../../interface/IBuildingLevel"
import IBuildingLocation from "../../../../../interface/IBuildingLocation"
import MainScene from "../../MainScene"
import MainSceneMediator from "../../../../MainSceneMediator"
import Upgrade from "./Upgrade"
import GoodsItem from "./GoodsItem"
import LevelItem from "./LevelItem"
import {default as track, EventType} from "../../../../../util/dot"
import UpgradeButton from "./UpgradeButton"
import Button from "../../Button"
import Hand from "../../display/Hand"

export default class ExclusiveUpgrade extends Upgrade {
  public scene: MainScene
  public hand: Hand
  public jihuoBtn
  public shiyongwaiguanBtn
  public shengjishiyongBtn
  public shiyongzhongTxt: Text
  public bottomView: Container
  public goodsView: Container
  public step22 = false
  public step23 = false
  public step31 = false
  public step31callbackFun = null
  public step32 = false
  public starBtn
  public nlsBtn

  private _curLeftItem: GoodsItem
  private _goodsItemArr: GoodsItem[]

  private _popoImg: Image
  private _guidetlm

  constructor(scene, x = 0, y = 0) {
    super(scene, x, y)

    this._goodsItemArr = []
    for (let i = 0; i < 3; i++) {
      let goodsItem = new GoodsItem(scene, null, 74 + 65, (118 + 65) + (183 * i))
      goodsItem.on("pointerup", () => {
        track(EventType.pageClick, {
          "event_id": "region_constructionlocation_normal_nowlevel"
        })

        if (goodsItem !== this._curLeftItem) {
          if (this.step22 || this.step23) {
            this.hideHand()
          }

          if (this.step32) {
            this.step32 = false
            this.hideHand()
          } else if (this.step31) {
            if (this.step31callbackFun) {
              this.step31callbackFun()
              this.step31callbackFun = null
            }

            this.step31 = false
            this.hidePopup()

            this.step32 = true
            this.showHand()
          }
        }

        this.setLeftItemActive(goodsItem)
      })
      this._goodsItemArr.push(goodsItem)
    }
    this.goodsView = new Container(scene, 0, 0, this._goodsItemArr)
    this.add(this.goodsView)

    this.levelItemArr = []
    for (let j = 0; j < 3; j++) {
      let levelItem = new LevelItem(scene, null)
      if (j === 0) {
        levelItem.setPosition(720 + 52, 463 + 57)
        levelItem.arrow.setPosition(32, -57).angle = -60
        levelItem.arrow.defaultPosition.setTo(32, -57)
        levelItem.arrow.amPosition.setTo(25, -50)
      } else if (j === 1) {
        levelItem.setPosition(788 + 52, 324 + 57)
        levelItem.arrow.setPosition(-32, -53).angle = 240
        levelItem.arrow.defaultPosition.setTo(-32, -53)
        levelItem.arrow.amPosition.setTo(-21, -50)
      } else if (j === 2) {
        levelItem.setPosition(720 + 52, 191 + 57)
        levelItem.arrow.visible = false
      }
      this.levelItemArr.push(levelItem)

      levelItem.on("preview", () => {
        track(EventType.pageClick, {
          "event_id": "region_constructionlocation_normal_nextlevel"
        })

        this.setLevelItemActive(levelItem)

        let key = "goods" + levelItem.data2.id
        this.scene.events.emit(MainSceneMediator.ELEMENT_PREVIEW, ["building" + this._data2.id, key])

        let curBuildingMaterial: IBuildingMaterial = this._curLeftItem.data2
        let {curLevel, hasSubOneUse} = curBuildingMaterial

        let {costNumber, level, chargeType} = levelItem.data2
        if (level > curLevel) {
          this.btnState = BtnState.SHENGJI
        } else {
          if (hasSubOneUse) {
            this.btnState = BtnState.SHIYONGZHONG
          } else {
            this.btnState = BtnState.SHIYONGWAIGUAN
          }
        }

        this.shengjishiyongBtn.setContent(chargeType, costNumber)

        if (this.step23) {
          this.step23 = false
          this.hideHand()
        } else if (this.step22) {
          this.step22 = false
          this.hideHand()

          if (!this.step23) {
            this.step23 = true
            this.showHand()
          }
        }
      })
    }
    this.levelView = new Container(scene, 0, 0, this.levelItemArr)
    this.add(this.levelView)

    this.shiyongzhongTxt = scene.add.text(512, 684, "使用中", {fontFamily: "Arial", fontSize: 24}).setOrigin(0.5, 0.5).setVisible(false)

    this.nlsBtn = new Button(scene, {
      interactive: false,
      buttonMode: false,
      w: 112,
      h: 48,
      color: {c: 0x000000, a: 0.2, r: 24},
      bg: {t: "icon_energy.png", x: -24},
      content: {t: "0", x: -4, s: {fontSize: 18}}
    }, 682, 44)
    this.nlsBtn.content.setOrigin(0, 0.5)
    this.add(this.nlsBtn)

    this.starBtn = new Button(scene, {
      interactive: false,
      buttonMode: false,
      w: 112,
      h: 48,
      color: {c: 0x000000, a: 0.2, r: 24},
      bg: {t: "icon_star.png", x: 32 - 112 / 2},
      content: {t: "0", x: 52 - 112 / 2, s: {fontSize: 18}}
    }, 758 + 112 / 2, 20 + 48 / 2)
    this.starBtn.content.setOrigin(0, 0.5)
    this.add(this.starBtn)

    this.jihuoBtn = new UpgradeButton(scene, {
      w: 230,
      h: 48,
      bg: {t: "public", f: "btn_bg_230*48.png"},
      content: {t: "激活", x: -10, s: {fontSize: 24}},
      ix: 122 - 230 / 2,
      tx: 136 - 230 / 2
    }, Number(this.scene.game.config.width) / 2, 660 + 48 / 2)
    this.jihuoBtn.content.setOrigin(1, 0.5)
    this.jihuoBtn.iconImg.setScale(0.75, 0.75)
    this.jihuoBtn.on("pointerup", this.clickJihuoListener, this)

    this.shengjishiyongBtn = new UpgradeButton(scene, {
      w: 230,
      h: 48,
      bg: {t: "public", f: "btn_bg_230*48.png"},
      content: {t: "升级使用", x: 14, s: {fontSize: 24}},
      ix: 31,
      tx: 45,
    }, Number(this.scene.game.config.width) / 2, 660 + 48 / 2)
    this.shengjishiyongBtn.content.setOrigin(1, 0.5)
    this.shengjishiyongBtn.iconImg.setScale(0.75, 0.75)
    this.shengjishiyongBtn.on("pointerup", this.clickShengjiListener, this)

    this.shiyongwaiguanBtn = new Button(scene, {
      w: 160,
      h: 48,
      bg: {t: "public", f: "btn_bg_160*48_B.png"},
      content: {t: "使用外观", s: {fontSize: 24}}
    }, Number(this.scene.game.config.width) / 2, 660 + 48 / 2)
    this.shiyongwaiguanBtn.on("pointerup", this.clickShiyongListener, this)

    this.bottomView = new Container(scene, 0, 0, [this.jihuoBtn, this.shiyongwaiguanBtn, this.shengjishiyongBtn, this.shiyongzhongTxt])
    this.add(this.bottomView)
  }

  public setContent(data: IBuildingLocation, availableEggshell?, leftStars?) {
    super.setContent(data)

    this.leftStars = leftStars
    this.availableEggshell = availableEggshell

    this.setLeftItemState(this._data2)
    return this
  }

  private setLeftItemState(data: IBuildingLocation) {
    let {vitemList} = data

    let activeIndex = 0
    this._goodsItemArr.forEach((ele, idx) => {
      let bmd: IBuildingMaterial = vitemList[idx]
      if (bmd) {
        if (bmd.hasSubOneUse) activeIndex = idx
        ele.data2 = bmd
      }
      ele.visible = Boolean(bmd)
    })

    if (vitemList.length > 0) this.setLeftItemActive(this._goodsItemArr[activeIndex])
  }

  private setLeftItemActive(gameObject) {
    // console.log("setLeftItemActive:", gameObject)
    if (gameObject === this._curLeftItem) return
    this._curLeftItem = gameObject
    this._goodsItemArr.forEach((ele) => {
      ele.select = (ele === gameObject)
    })

    this.setLevelItemState(this._curLeftItem.data2 as IBuildingMaterial)
  }

  private setLevelItemState(buildingMaterialData: IBuildingMaterial) {
    // console.log("setLevelItemState:", buildingMaterialData)
    let {vitemExtList, curLevel, hasSubOneUse} = buildingMaterialData
    let cbld: IBuildingLevel = vitemExtList.find(ele => ele.level === (curLevel === 0 ? 1 : curLevel))
    let key = "goods" + cbld.id

    this.scene.events.emit(MainSceneMediator.ELEMENT_PREVIEW, ["building" + this._data2.id, key])

    if (hasSubOneUse) {
      this.btnState = BtnState.SHIYONGZHONG
    } else if (curLevel !== 0) {
      this.btnState = BtnState.SHIYONGWAIGUAN
    } else {
      this.btnState = BtnState.JIHUO
      this.jihuoBtn.setContent(cbld.chargeType, cbld.costNumber)
    }

    this.levelItemArr.forEach((ele, idx) => {
      let bld = vitemExtList[idx]
      if (bld) {
        ele.data2 = bld

        let nbld = vitemExtList.find(ele => ele.level === bld.level + 1)
        // console.log(bld.chargeType, this._leftStars, nbld)
        ele.rest(curLevel, bld.chargeType === ChargeType.STAR ? this._leftStars : null, nbld ? nbld.costNumber : null)
      }
      ele.visible = Boolean(bld)

      if (cbld === bld) this.setLevelItemActive(ele)
    })
  }

  private clickJihuoListener() {
    track(EventType.pageClick, {
      "event_id": "region_constructionlocation_normal_activation"
    })

    let {vitemExtList, curLevel} = this._curLeftItem.data2
    let cbld: IBuildingLevel = vitemExtList.find(ele => ele.level === (curLevel === 0 ? 1 : curLevel))
    this.scene.events.emit(MainScene.CLICK_JIHUO, cbld)
  }

  private clickShengjiListener() {
    track(EventType.pageClick, {
      "event_id": "region_constructionlocation_normal_levelup"
    })

    let {vitemExtList, curLevel} = this._curLeftItem.data2
    let cbld: IBuildingLevel = vitemExtList.find(ele => ele.level === (curLevel + 1))
    this.scene.events.emit(MainScene.CLICK_SHENGJI, cbld)
  }

  private clickShiyongListener() {
    track(EventType.pageClick, {
      "event_id": "region_constructionlocation_normal_use"
    })

    let {vitemExtList, curLevel} = this._curLeftItem.data2
    let cbld: IBuildingLevel = vitemExtList.find(ele => ele.level === (curLevel === 0 ? 1 : curLevel))
    this.scene.events.emit(MainScene.CLICK_SHIYONG, cbld)
  }

  public show() {
    super.show()
    window.TweenMax.fromTo(this.goodsView, 0.5, {x: -100, alpha: 0}, {x: 0, alpha: 1, ease: window.Power1.easeOut})
    window.TweenMax.fromTo(this.levelView, 0.5, {x: 100, alpha: 0}, {x: 0, alpha: 1, ease: window.Power1.easeOut})
    window.TweenMax.fromTo(this.bottomView, 0.5, {y: 100, alpha: 0}, {y: 0, alpha: 1, ease: window.Power1.easeOut})
  }

  public hide() {
    super.hide()
    this._curLeftItem = null

    window.TweenMax.to(this.goodsView, 0.3, {x: -100, alpha: 0, ease: window.Power1.easeOut})
    window.TweenMax.to(this.levelView, 0.3, {x: 100, alpha: 0, ease: window.Power1.easeOut})
    window.TweenMax.to(this.bottomView, 0.3, {y: 100, alpha: 0, ease: window.Power1.easeOut})

    if (this._guidetlm) {
      window.TweenMax.to(this._popoImg, 0.5, {alpha: 0, ease: window.Power2.easeOut})
      this._guidetlm.kill()
      this._guidetlm = null
    }

    this.hideHand()
    this.hidePopup()
  }

  public showHand(x = Number(this.scene.game.config.width) / 2 + 92, y = 684) {
    if (!this.hand) {
      this.hand = new Hand(this.scene, x, y)
    }
    if (this.step22) {
      let curLevelItem = this.levelItemArr.find(ele => ele.curLevelActive)
      if (curLevelItem) {
        if (curLevelItem.data2.level === 1) {
          x = 788 + 52 + 20
          y = 324 + 57 + 20
        } else if (curLevelItem.data2.level === 2) {
          x = 720 + 52 + 20
          y = 191 + 57 + 20
        }
      }
    } else if (this.step23) {
      x = Number(this.scene.game.config.width) / 2 + 92
      y = 684
    }
    this.hand.setPosition(x, y)
    this.add(this.hand)
  }

  public hideHand() {
    if (this.hand && this.hand.parentContainer) this.hand.parentContainer.remove(this.hand)
  }

  public showPopup() {
    let x, y
    let data = this._curLeftItem.data2
    if (data.sortCode === 1) {
      x = 196
      y = 337
    } else if (data.sortCode === 2) {
      x = 196
      // y = 520
      y = 154
    } else if (data.sortCode === 3) {
      x = 196
      y = 337
    }
    this._popoImg = this.scene.add.image(x, y, "sp_popo_guide.png").setOrigin(0, 0)
    this.add(this._popoImg)

    let tlm = new window.TimelineMax({
      delay: 0.1,
      repeat: -1,
      onComplete: () => {
        window.TweenMax.to(this._popoImg, 0.5, {alpha: 0, ease: window.Power2.easeOut})
        this._guidetlm = null
      }
    })
    tlm.to(this._popoImg, 0.3, {x: 196 + 15, delay: 1, ease: window.Power0.easeNone})
    tlm.to(this._popoImg, 1, {x: 196, ease: window.Elastic.easeOut})
    this._guidetlm = tlm
  }

  public hidePopup() {
    if (this._guidetlm) this._guidetlm.kill()

    if (this._popoImg && this._popoImg.parentContainer) {
      window.TweenMax.to(this._popoImg, 0.5, {alpha: 0})
    }
  }

  private set btnState(val) {
    this.jihuoBtn.visible = this.shiyongwaiguanBtn.visible = this.shiyongzhongTxt.visible = this.shengjishiyongBtn.visible = false

    switch (val) {
      case BtnState.SHIYONGZHONG:
        this.shiyongzhongTxt.visible = true
        break
      case BtnState.SHIYONGWAIGUAN:
        this.shiyongwaiguanBtn.visible = true
        break
      case BtnState.JIHUO:
        this.jihuoBtn.visible = true
        break
      case BtnState.SHENGJI:
        this.shengjishiyongBtn.visible = true
        break
    }
  }

  private set leftStars(val) {
    this._leftStars = val
    this.starBtn.content.text = this.shortenNumber(val)
  }

  private set availableEggshell(val) {
    this._availableEggshell = val
    this.nlsBtn.content.text = this.shortenNumber(val)
  }

  private shortenNumber(num) {
    if (num < 10000) {
      num = num
    } else if (num < 100000000) {
      num = (Math.floor((num / 10000) * 10) / 10) + "w"
    } else {
      num = (Math.floor((num / 100000000) * 10) / 10) + "亿"
    }
    return num
  }
}

enum BtnState {
  SHIYONGZHONG,
  SHIYONGWAIGUAN,
  JIHUO,
  SHENGJI
}