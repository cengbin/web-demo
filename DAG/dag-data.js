// todo：求图中起点到终点有多少条路径，每个结点的"深度"是曾经访问过的最大的深度值。

// 顶点
class Vertex {
  constructor(data) {
    // 记录顶点信息
    this.data = data || null
    // 记录第一条边（或弧）
    this.firstArc = null
    // 深度
    // this.depth = 0

    // 层次
    this.layer = 0

    this.x = 0
    this.y = 0

    this.degreeIn = []
    this.degreeOut = []

    this.width = 150
    this.height = 70
    this.vgap = 20
    this.hgap = 40
  }
}

// 边（或弧）
class Arc {
  constructor(adjvex) {
    // 记录该边所指向的顶点的位置
    this.adjvex = adjvex
    // 记录下一条边（或弧）
    this.nextArc = null
    // 记录当前边的信息（比如权值）
    this.info = null
  }
}

// 图的邻接链表形式描述
class Graph {
  constructor(vexnum, arcnum) {

    // 记录同层结点
    this.map = new Map()

    // 顶点数
    this.vexnum = vexnum
    // 边数
    this.arcnum = arcnum
    // 头结点数组（每一个头结点是一个单链表）
    this.vertices = new Array(vexnum)

    for (let i = 0; i < this.vertices.length; i++) {
      this.vertices[i] = new Vertex()
    }
  }

  degree() {
    let vertices = this.vertices

    // 遍历所有的头结点
    for (let i = 0; i < vertices.length; i++) {
      let vertex = vertices[i]

      // 求"出度"（找以当前结点为弧头的结点）
      // 思路：遍历领接链表，有多少条边就有多少个以当前结点为弧头的结点
      let arc = vertex.firstArc
      while(arc) {
        vertex.degreeOut.push(vertices[arc.adjvex])
        arc = arc.nextArc
      }

      // 求"入度"（找以当前结点为弧尾的结点）
      // 思路：遍历图中所有顶点的边，如果顶点的边指向的顶点的位置是i，则vertices[j]是vertex的入度结点
      for (let j = 0; j < vertices.length; j++) {
        let arc = vertices[j].firstArc
        while(arc) {
          if (arc.adjvex === i) {
            vertex.degreeIn.push(vertices[j])
          }

          arc = arc.nextArc
        }
      }
    }
  }

  BFS() {
    let vertices = this.vertices
    let visited = []

    for (let i = 0; i < vertices.length; i++) {
      // 访问顶点
      let vertex = vertices[i]
      if (!visited[i]) {
        visited[i] = true
        console.log(vertex.data)
      }

      // 访问边连接的顶点
      let arc = vertex.firstArc
      while(arc) {
        if (!visited[arc.adjvex]) {
          vertex = vertices[arc.adjvex]
          visited[arc.adjvex] = true
          console.log(vertex.data)
        }

        arc = arc.nextArc
      }

      console.log('\n')
    }
  }

  DFS(callback) {
    let vertices = this.vertices
    let visited = []

    function dfs(vertex, index, depth) {
      callback && callback(vertex, index, depth)

      visited[index] = true
      vertex.depth = depth

      // console.log(vertex.data, depth)

      // 增加深度
      ++depth

      // 访问边连接的顶点
      let arc = vertex.firstArc
      while(arc) {
        vertex = vertices[arc.adjvex]

        // 当前结点有可能访问过，但是需要重新计算"最大深度"
        // vertex.depth = Math.max(vertex.depth, depth)

        // 没有访问过，就继续深度遍历
        if (!visited[arc.adjvex]) {
          dfs(vertex, arc.adjvex, depth)
        }

        arc = arc.nextArc
      }
    }

    dfs(vertices[0], 0, 0)
  }

  depth() {
    let vertices = this.vertices

    // 遍历所有的头结点
    for (let i = 0; i < vertices.length; i++) {
      let vertex = vertices[i]

      if (vertex.degreeIn.length) {
        let depth2 = 0
        vertex.degreeIn.forEach(ele => {
          depth2 = Math.max(ele.depth, depth2)
        })
        vertex.depth = (++depth2)
      }

      let arr = null
      if (this.map.has(vertex.depth)) {
        arr = this.map.get(vertex.depth)
      } else {
        arr = []
        this.map.set(vertex.depth, arr)
      }
      arr.push(vertex)

      /*console.log(
        `${i} ${vertex.data}`,
        `\n入度: ${vertex.degreeIn.length}`,
        `\n出度: ${vertex.degreeOut.length}`,
        `\n深度: ${vertex.depth}`,
        `\n `
      )*/
    }

    this.map.forEach((value, key, map) => {
      console.log(`${key} = `, value)
    })
  }

  setY() {
    console.log(' --- 广度优先遍历开始 ---')
    let vertices = this.vertices
    let visited = [true]
    let queue = [vertices[0]]

    while(queue.length) {
      let vertex = queue.shift()
      let index = vertices.indexOf(vertex)
      let depth = vertex.depth
      console.log(index, vertex.data, depth)

      let arr = this.map.get(depth)
      if (arr) {
        let idx = arr.indexOf(vertex)
        console.log('入度:', vertex.degreeIn.length, ' idx:', idx)

        let degreeIn = vertex.degreeIn
        if (degreeIn.length === 1) {
          let degreeInVertex = degreeIn[0]

          let idx2 = degreeInVertex.degreeOut.indexOf(vertex)
          console.log('idx2:', idx2)

          vertex.y = degreeInVertex.y + (idx * (vertex.height + vertex.vgap))

          // degreeInVertex.y
        } else {
          vertex.y = idx * (vertex.height + vertex.vgap)
        }
      }

      let arc = vertex.firstArc
      while(arc) {
        if (!visited[arc.adjvex]) {
          visited[arc.adjvex] = true
          queue.push(vertices[arc.adjvex])
        }

        arc = arc.nextArc
      }
    }

    console.log(' --- 广度优先遍历结束 ---')
  }

  setX() {
    let vertices = this.vertices
    let visited = []

    // todo 未完待做！！！
    console.log(' --- 深度优先遍历开始 ---')

    function dfs(vertex, vertexIndex) {
      visited[vertexIndex] = true
      console.log(vertex.data, vertexIndex)

      let children = vertex.degreeOut
      if (children && children.length) {
        vertex.childrenAreaHeight = (vertex.height + vertex.vgap) * children.length - vertex.vgap
      }

      let arc = vertex.firstArc
      while(arc) {
        if (!visited[arc.adjvex]) {
          // console.log(`边指向的顶点 ${arc.adjvex} 未访问过,继续深度遍历子结点`)
          dfs(vertices[arc.adjvex], arc.adjvex)
        } else {
          // console.log(`边指向的顶点 ${arc.adjvex} 访问过了`)
        }

        arc = arc.nextArc
      }

      console.log(
        `回溯结点：${vertex.data}`,
        `${vertexIndex}`
      )
    }

    dfs(vertices[0], 0)

    console.log(' --- 深度优先遍历结束 ---')


    // 计算Y坐标
    // 思路：


    function updateChildren(children, offset) {

    }

    function updateBrothers(currentNode, addHeight) {

    }
  }
}

let graph = new Graph(9, 13)
console.log(graph)

graph.vertices[0].data = '任务开始'

graph.vertices[1].data = '条件开始'
graph.vertices[2].data = '条件1结点'
graph.vertices[3].data = '条件2结点'
graph.vertices[4].data = '条件3结点'

graph.vertices[5].data = '审批结点'

graph.vertices[6].data = '并行开始'
graph.vertices[7].data = '任务1结点'
graph.vertices[8].data = '任务2结点'
// graph.vertices[9].data = '并行结束'

// graph.vertices[10].data = '条件结束'

// graph.vertices[11].data = '任务结束'


// 记录以顶点为弧尾的边
graph.vertices[0].firstArc = new Arc(1)

graph.vertices[1].firstArc = new Arc(2)
graph.vertices[1].firstArc.nextArc = new Arc(3)
graph.vertices[1].firstArc.nextArc.nextArc = new Arc(4)

graph.vertices[2].firstArc = new Arc(5)

graph.vertices[3].firstArc = new Arc(6)

// graph.vertices[4].firstArc = new Arc(10)

// graph.vertices[5].firstArc = new Arc(10)

graph.vertices[6].firstArc = new Arc(7)
graph.vertices[6].firstArc.nextArc = new Arc(8)

// graph.vertices[7].firstArc = new Arc(9)
// graph.vertices[8].firstArc = new Arc(9)

// graph.vertices[9].firstArc = new Arc(10)

// graph.vertices[10].firstArc = new Arc(11)

// graph.vertices[11].firstArc = null

graph.degree()

graph.DFS()

graph.depth()

graph.setY()

export default graph
