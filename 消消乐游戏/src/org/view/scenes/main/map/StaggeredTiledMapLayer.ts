import vi2e = require("../../../../../../vf2e.config.js")
import MapNodeView from "./MapNodeView"
import StaggeredTiledMap from "./StaggeredTiledMap"

export default class StaggeredTiledMapLayer extends Phaser.GameObjects.Container {

  public tiledMap: StaggeredTiledMap
  public bigMap = null

  private _waitLoadZone = []
  private _smallMapWidth = 600
  private _smallMapHeight = 300
  private _sliceRows = 3
  private _sliceCols = 4
  private _sliceWidth = 720
  private _sliceHeight = 480

  constructor(scene, tileMap) {
    super(scene)
    this.tiledMap = tileMap

    for (let r = 0; r < this._sliceRows; r++) {
      for (let c = 0; c < this._sliceCols; c++) {
        let key = "s" + String(scene.data.values.index + 1) + "_" + r + "_" + c + ".jpg"
        this._waitLoadZone.push([key, r, c])
      }
    }

    // console.log("格子地图宽高：%d * %d\n显示地图宽高：%d * %d\n马赛克地图宽高：%d * %d",
    //   this.tiledMap.mapWidth, this.tiledMap.mapHeight, this.tiledMap.showMapWidth, this.tiledMap.showMapHeight, this._smallMapWidth, this._smallMapHeight)
    let _sx = (this.tiledMap.showMapWidth / this._smallMapWidth)
    let _sy = (this.tiledMap.showMapHeight / this._smallMapHeight)
    let index = this.scene.data.values.index
    let smallMap = scene.add.image(0, 0, "s" + (index + 1) + "_min.jpg").setOrigin(0, 0)
    this.add(smallMap)
    smallMap.setScale(_sx, _sy)

    var bigMap = scene.add.renderTexture(0, 0, this.tiledMap.mapWidth, this.tiledMap.mapHeight)
    this.add(bigMap)
    this.bigMap = bigMap

    this.load()
  }

  private load() {
    // console.log("this._waitLoadZone.length:", this._waitLoadZone.length)
    if (this._waitLoadZone.length > 0) {
      let obj = this._waitLoadZone.shift()
      let key = obj[0]
      let row = obj[1]
      let col = obj[2]
      let val = "./static/assets/main/map/s" + String(this.scene.data.values.index + 1) + "/" + key

      // console.log(this.scene.textures.exists(key))
      if (this.scene.textures.exists(key)) {
        this.drawBGMap(key, row, col)
        this.load()
      } else {
        this.scene.load.image(key, val)
        this.scene.load.once("complete", () => {
          // console.log("complete")
          this.drawBGMap(key, row, col)
          this.load()
        })
        this.scene.load.baseURL = vi2e.cdn.publicPath
        this.scene.load.start()
      }
    }
  }

  private drawBGMap(key, row, col) {
    let x = (this._sliceWidth * col)
    let y = (this._sliceHeight * row)
    this.bigMap.draw(key, x, y)

    // console.log(key, row, col, x, y)
    // let bigmap = this.scene.add.image(x, y, key).setOrigin(0, 0)
    // this.addAt(bigmap, 1)
  }

  public showGridView(color = 0xf0f0f0, alpha = 0.1) {
    // for (var i = 0; i < this.tiledMap.nodeList.length; i++) {
    //   let arr = this.tiledMap.nodeList[i]
    //   for (var j = 0; j < arr.length; j++) {
    //     let node = arr[j]
    //     let rhombusView = new MapNodeView(this.scene, node, color, alpha)
    //     this.add(rhombusView)
    //     node.ele = rhombusView
    //   }
    // }
    let gridemap = this.scene.add.image(24, 12, "grid_map.png").setOrigin(0, 0)
    this.add(gridemap)
  }
}