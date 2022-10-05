import StoryPanel from "./panel/StoryPanel"
import {SceneEvent} from "../../../../Game"
import ChooseItem from "./ChooseItem"
import StudayProgress from "./StudayProgress"
import Title from "./Title"

export default class StartScene extends Phaser.Scene {
  public static NAME: string = "start_scene"

  public bg
  public particles
  public layer1 = null
  public storyPanel: StoryPanel = null
  public title: Title
  public studayProgress: StudayProgress
  public choose1Item: ChooseItem
  public choose2Item: ChooseItem
  public choose3Item: ChooseItem
  public choose4Item: ChooseItem
  public choose5Item: ChooseItem
  public chooseItemArr: ChooseItem[]

  constructor() {
    super({key: StartScene.NAME})
  }

  public init(data) {
    // console.log("StartScene init:", data)
    this.data.values = data

    let relativeX = (Number(this.game.config.width) - 1024) / 2
    let centerX = Number(this.game.config.width) / 2
    let centerY = Number(this.game.config.height) / 2

    this.bg = this.add.image(centerX, centerY, "bg_default.jpg")

    let particles
    if (!data.autoEntry) {
      let angle = 0
      particles = this.particles = this.add.particles("point")
      particles.createEmitter({
        frame: ["shouye_guang1.png", "shouye_guang2.png", "shouye_guang3.png", "shouye_guang4.png"],
        x: {min: 0, max: 1000},
        y: {
          onEmit(particle, key, value) {
            let radiusY = Math.random() * 83 + 30
            return 769 + Math.sin(angle) * radiusY
          }
        },
        lifespan: {
          onEmit() {
            let lifespan = 2000 + Math.random() * 8000
            return lifespan
          }
        },
        // speedY: {min: 0, max: -150},
        speedY: {
          onEmit(particle, key, val) {
            // console.log('onEmit:',particle,key,val)
            return ((particle.life / 10000) * -30) - 10
          }
        },

        // scale:{start:0,end:1,ease:'Quad.easeOut'},
        scaleX: {
          ease: "Quad.easeOut",
          onUpdate(particle, key, val) {
            // console.log('onUpdate:',particle,key,val * (particle.life / 10000))
            return val * (particle.life / 10000)
          }
        },
        scaleY: {
          ease: "Quad.easeOut",
          onUpdate(particle, key, val) {
            // console.log('onUpdate:',particle,key,val * percent)
            return val * (particle.life / 10000)
          }
        },
        alpha: {start: Math.random() * 0.5 + 0.2, end: 0, ease: "Quad.easeIn"},
        quantity: 2,
        // blendMode: 'ADD',
        timeScale: 1,
        // maxParticles: 20,
        frequency: 500
      })
    }

    this.title = new Title(this, 512, 50)

    this.choose1Item = new ChooseItem(this, 512 - 240, 453, "1")

    this.choose2Item = new ChooseItem(this, 512, 453 + 120, "2")

    this.choose3Item = new ChooseItem(this, 512 + 240, 453, "3")

    this.choose4Item = new ChooseItem(this, 512, 453 - 120, "4")

    this.choose5Item = new ChooseItem(this, 512 + 240, 453 - 120 - 120, "5")
    this.chooseItemArr = [this.choose1Item, this.choose2Item, this.choose3Item, this.choose4Item, this.choose5Item]

    this.studayProgress = new StudayProgress(this, (1024 - 330) / 2, 768 - 21)

    let guideLine1 = this.add.image(this.choose1Item.x + 96, this.choose1Item.y + 75, "start", "sp_points.png").setAngle(26)
    let guideLine2 = this.add.image(this.choose2Item.x + 96 + 30, this.choose2Item.y - 75 + 30, "start", "sp_points.png").setAngle(-26)
    let guideLine3 = this.add.image(this.choose3Item.x - 96 - 30, this.choose3Item.y - 75 + 30, "start", "sp_points.png").setAngle(26)
    let guideLine4 = this.add.image(this.choose4Item.x + 96 + 30, this.choose4Item.y - 75 + 30, "start", "sp_points.png").setAngle(-26)

    this.layer1 = this.add.container(relativeX, 0, [this.title, this.choose5Item, guideLine4, this.choose4Item,
      guideLine3, this.choose3Item, guideLine2, this.choose1Item, guideLine1, this.choose2Item, this.studayProgress])

    this.events.on("transitionstart", this.sceneIn, this)
    this.events.on("transitionout", this.sceneOut, this)

    this.events.emit(SceneEvent.INIT_COMPLETE)
  }

  public sceneIn() {
    window.TweenMax.fromTo([this.bg, this.layer1], 0.5, {alpha: 0}, {alpha: 1, ease: window.Power0.easeNone})
  }

  public sceneOut() {
    if (this.particles) this.particles.visible = false
    window.TweenMax.to([this.bg, this.layer1], 0.5, {alpha: 0, ease: window.Power0.easeNone})
  }

  public createStoryPanel() {
    let storyPanel = new StoryPanel({scene: this, bg: {tap: false}})
    this.add.existing(storyPanel)
    this.storyPanel = storyPanel
  }

  public shutdownListener() {
    this.chooseItemArr.forEach(ele => {
      ele.destory()
    })
  }

  public destoryListener() {
    this.shutdownListener()
  }
}