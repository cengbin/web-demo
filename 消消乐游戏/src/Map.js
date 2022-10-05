import MapNode from "./MapNode.js"

export default class Map extends PIXI.Container {

  static GridWidth = 55
  static GridHeight = 55

  constructor() {
    super()

    this.rows = 10
    this.cols = 5
    this.nodes = {}
    this.stack = []

    var data = [
      [1, 2, 3, 4, 5],
      [2, 3, 6, 8, 6],
      [1, 3, 6, 8, 7],
      [3, 3, 3, 3, 3],
      [1, 3, 6, 6, 9],
      [1, 2, 3, 4, 5],
      [1, 3, 6, 8, 6],
      [1, 3, 6, 8, 2],
      [3, 3, 3, 3, 8],
      [1, 3, 6, 7, 9],
    ]

    let bg = new PIXI.Graphics()
    this.addChild(bg)

    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.addNode(i, j, data[i][j])

        let startX = j * Map.GridWidth
        let startY = i * Map.GridHeight

        bg.beginFill(
          0x000000,
          i % 2 === 0
            ? j % 2 === 0 ? 0.6 : 0.4
            : j % 2 !== 0 ? 0.6 : 0.4
        )
        bg.moveTo(startX, startY)
        bg.lineTo(startX + Map.GridWidth, startY)
        bg.lineTo(startX + Map.GridWidth, startY + Map.GridHeight)
        bg.lineTo(startX, startY + Map.GridHeight)
        bg.closePath()
        bg.endFill()
      }
    }

    setTimeout(() => {
      this.check()
    }, 500)
  }

  check() {
    var result = [...this.horizontalCheck(), ...this.verticalCheck()].filter(ele => ele)
    // console.log(result)
    // console.log(this.nodes)

    if (result.length) {
      result.forEach(({row, col, ele}) => {
        this.nodes[`${row}_${col}`] = null
        TweenMax.to(ele.scale, 1, {x: 0, y: 0, ease: "power1.inOut"})
        TweenMax.to(ele, 1, {alpha: 0, ease: "none"})
      })

      setTimeout(() => {
        for (var j = 0; j < this.cols; j++) {
          var dropNodes = []
          for (var i = 0; i < this.rows; i++) {
            // console.log(this.nodes[`${i}_${j}`])
            var node = this.nodes[`${i}_${j}`]

            if (node === null) {

              let m = i
              while(m--) {
                var preNode = this.nodes[`${m}_${j}`]
                if (preNode) {
                  preNode.drop++
                  dropNodes.indexOf(preNode) === -1 && dropNodes.push(preNode)
                }
              }
            }
            // console.log(`i=${i}, j=${j}, node=${node ? node.value : null}`)
          }

          dropNodes.sort((a, b) => (b.row - a.row))
          // console.log(dropNodes)
          dropNodes.forEach((node) => {
            // console.log(`${node.row}行,${node.col}列,下落${node.drop}行`)

            this.nodes[`${node.row}_${node.col}`] = null

            this.nodes[`${node.row + node.drop}_${node.col}`] = node

            node.setRowCol(node.row + node.drop, node.col)
            node.drop = 0
          })
        }

        console.log(this.nodes)

        setTimeout(() => {
          this.check()
        }, 300)
      }, 1000)
    } else {
      let bo = false
      for (var j = 0; j < this.cols; j++) {
        for (var i = 0; i < this.rows; i++) {
          var node = this.nodes[`${i}_${j}`]
          if (node !== null) {
            let m = i
            while(m--) {
              console.log(`填充：${m}行${j}列`)
              this.addNode(m, j, parseInt(Math.random() * 10) + 1, j * Map.GridWidth + Map.GridWidth / 2, 0 - (i * Map.GridHeight) - (m * Map.GridHeight))
              // this.addNode(m, j, 1)
            }
            break
          } else {
            bo = true
          }
        }
        console.log('\n')
      }

      console.log("bo:", bo)
      if (bo) {
        setTimeout(() => {
          this.check()
        }, 300)
      }
    }
  }

  horizontalCheck() {
    var arr = []
    for (var i = 0; i < this.rows; i++) {
      var same = 1
      for (var j = 0; j < this.cols; j++) {
        var curVal = this.nodes[`${i}_${j}`] ? this.nodes[`${i}_${j}`].value : null
        var nextVal = this.nodes[`${i}_${j + 1}`] ? this.nodes[`${i}_${j + 1}`].value : null
        // console.log(`i=${i}, j=${j}, curVal=${curVal}, nextVal=${nextVal}`)

        if (curVal == null && nextVal === null)
          continue

        if (curVal === nextVal) {
          same++
        } else {
          if (same >= 3) {
            // console.log(`(${i},${j})`)
            var num = same
            var grid = ``
            while(num) {
              var row = i
              var col = j - (num - 1)
              // console.log(row, col, num)
              arr.push(this.nodes[`${row}_${col}`])

              grid += `(${row},${col})`

              num--
            }
            console.log(`横向：连续${same}个相同${grid},值为${curVal}`)
          }

          same = 1
        }
      }
    }
    return arr
  }

  verticalCheck() {
    var arr = []
    for (var j = 0; j < this.cols; j++) {
      var same = 1
      for (var i = 0; i < this.rows; i++) {
        var curVal = this.nodes[`${i}_${j}`] ? this.nodes[`${i}_${j}`].value : null
        var nextVal = this.nodes[`${i + 1}_${j}`] ? this.nodes[`${i + 1}_${j}`].value : null
        // console.log(`i=${i}, j=${j}, curVal=${curVal}, nextVal=${nextVal}`)

        if (curVal == null && nextVal === null)
          continue

        if (curVal === nextVal) {
          same++
        } else {
          if (same >= 3) {
            // console.log(`(${i},${j})`)
            var num = same
            var grid = ``
            while(num) {
              var row = i - (num - 1)
              var col = j
              // console.log(row, col, num)
              arr.push(this.nodes[`${row}_${col}`])

              grid += `(${row},${col})`

              num--
            }
            console.log(`纵向：连续${same}个相同${grid},值为${curVal}`)
          }

          same = 1
        }
      }
    }
    return arr
  }

  addNode(row, col, val, x = 0, y = 0) {
    var _this = this

    var node = new MapNode(row, col, val)
    this.nodes[`${row}_${col}`] = node

    var fruit = node.ele
    this.addChild(fruit)
    fruit.x = x
    fruit.y = y
    fruit.on('pointerdown', function () {
      // console.log(this)
      _this.stack.push(this.node)
      if (_this.stack.length >= 2) {
        console.log(_this.stack)
        let node1 = _this.stack[_this.stack.length - 2]
        let node2 = _this.stack[_this.stack.length - 1]

        let num1 = Math.abs(node1.row - node2.row)
        let num2 = Math.abs(node1.col - node2.col)
        // console.log(num1, num2)
        if (num1 <= 1 && num2 <= 1) {
          console.log(`(${node1.row},${node1.col}),(${node2.row},${node2.col})`)

          _this.swapNode(node1, node2)

          setTimeout(() => {
            _this.check()
          }, 500)
        }

        while(_this.stack.length) {
          _this.stack.shift()
        }
      }
    })
  }

  swapNode(node1, node2) {
    var tempNode = node1
    let tempRow = node1.row
    let tempCol = node1.col

    this.nodes[`${node1.row}_${node1.col}`] = node2
    this.nodes[`${node2.row}_${node2.col}`] = tempNode

    node1.setRowCol(node2.row, node2.col)
    node2.setRowCol(tempRow, tempCol)

    console.log(this.nodes)
  }
}