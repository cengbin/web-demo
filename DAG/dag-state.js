import graph from './dag-data.js'

class Node {
  constructor(vertex, index) {
    this.data = vertex
    this.index = index
    this.width = 160
    this.height = 70
    this.vgap = 30
    this.hgap = 40
    this.x = 0
    this.y = vertex.y
    this.children = []
    this.childrenHeight = 0
    this.familyHeight = 0
    // this.id = (data.data)

    this.parent = null

    this.inDegree = 0
    this.outDegree = 0

    this.depth = vertex.depth
  }

  set depth(val) {
    this.x = val * (this.width + this.vgap)
    // this.y = val * (this.height + this.vgap)

    this._depth = val
  }

  get depth() {
    return this._depth
  }
}

let nodes = []

for (let i = 0; i < graph.vertices.length; i++) {
  nodes.push(new Node(graph.vertices[i], i))
}

console.log(nodes)

export {
  graph,
  nodes,
}
