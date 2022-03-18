let graph = {
  vertex: [
    {id: 'v1'},
    {id: 'v2'},
    {id: 'v3'},
    {id: 'v4'},
    {id: 'v5'},
    {id: 'v6'},
    {id: 'v7'},
    {id: 'v8'},
  ],
  edge: [
    // 0  1  2  3  4  5  6  7
    [0, 1, 1, 0, 0, 0, 0, 0], // 0
    [0, 0, 0, 1, 1, 0, 0, 0], // 1
    [0, 0, 0, 0, 0, 1, 1, 0], // 2
    [0, 0, 0, 0, 0, 0, 0, 1], // 3
    [0, 0, 0, 0, 0, 0, 0, 1], // 4
    [0, 0, 0, 0, 0, 0, 0, 0], // 5
    [0, 0, 0, 0, 0, 0, 0, 0], // 6
    [0, 0, 0, 0, 0, 0, 0, 0], // 7
  ]
}

class Node {
  constructor(data, index) {
    this.data = data
    this.index = index
    this.width = 160
    this.height = 70
    this.vgap = 30
    this.hgap = 40
    this.x = 0
    this.y = 0
    this.children = []
    this.childrenHeight = 0
    this.familyHeight = 0
    this.id = (data.id && data.id.slice(0, 4))

    this.parent = null

    this.inDegree = 0
    this.outDegree = 0

    this._depth = 0
  }

  set depth(val) {
    this.x = val * (this.width + this.vgap)

    this._depth = val
  }

  get depth() {
    return this._depth
  }
}

for (let i = 0; i < graph.vertex.length; i++) {
  graph.vertex[i] = new Node(graph.vertex[i], i)
}

var rootNode = graph.vertex[0]
rootNode.x = 0
rootNode.y = 0

let visited = []

// DFS深度优先遍历思想：一条道走到黑，直到走不通了，就退回到上一步再走。
function DFS(node, parent) {
  visited[node.index] = true
  node.parent = parent

  let edge = graph.edge[node.index]

  // 求结点深度
  node.depth = parent ? parent.depth + 1 : 0

  // console.log(node.data.id, node.depth)

  let lastNode = null
  for (let j = 0; j < edge.length; j++) {
    // 计算节点出度
    if (edge[j]) {
      node.outDegree++
      lastNode = graph.vertex[j]
    }

    if (edge[j] && !visited[j]) {

      let subNode = graph.vertex[j]

      DFS(subNode, node)

      // subNode.familyHeight = subNode.outDegree * (subNode.height + subNode.vgap)
      //
      // subNode.y = lastNode.y + subNode.familyHeight
    }
  }

  // 当前节点的出度节点都遍历完成后，根据更新后的familyPosition，重新计算当前节点的自身position
  node.familyHeight = node.outDegree * (node.height + node.vgap)

  console.log(`回溯路径遍历结点:${node.data.id}`, `出度:${node.outDegree}`, `familyHeight:${node.familyHeight}`)

  let react = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  }


  let y = node.familyHeight / 2

  node.y = y
}

DFS(graph.vertex[0], null)


// BFS
/*function BFS(graph, idx) {
  let visited = []
  let nodes = []
  let node

  visited[idx] = true
  nodes.push(graph.vertex[idx])

  while(node = nodes.shift()) {
    console.log(node.data.id)
    console.log(JSON.stringify(visited))

    let edge = graph.edge[node.index]
    for (let j = 0; j < edge.length; j++) {
      if (edge[j] && !visited[j]) {
        visited[j] = true

        let subNode = graph.vertex[j]

        subNode.x = node.x + node.width + node.vgap
        // subNode.y = node.y + node.height + node.hgap;

        nodes.push(subNode)


      }
    }
  }
}*/

// BFS(graph, 0)

export {
  graph,
}
