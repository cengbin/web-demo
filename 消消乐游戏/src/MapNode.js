import Fruit from "./Fruit.js"

export default class MapNode {
  constructor(row, col, val) {
    this.row = row
    this.col = col
    this.value = val

    this.drop = 0

    this.ele = new Fruit(this)
  }

  setRowCol(row, col, update = true) {
    // console.log(row, col)
    this.row = row
    this.col = col

    update && this.ele.update()
  }
}