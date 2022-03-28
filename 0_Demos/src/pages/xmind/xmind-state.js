let tree = {
  "children": [
    {
      "children": [
        {
          "children": [],
          "id": "cd7d8c10-e65a-4d1b-b61e-e47d33368b29",
          "name": "2"
        },
        {
          "children": [
            {
              "children": [],
              "id": "8267aa96-3178-4607-9b20-8c3bb7176f5b",
              "name": "8"
            },
            {
              "children": [
                {
                  "children": [],
                  "id": "8267aa96-3178-4607-9b20-8c3bb7176f5b",
                  "name": "8"
                },
                {
                  "children": [],
                  "id": "31784607-3178-4607-9b20-8c3bb7176f5b",
                  "name": "8"
                },
              ],
              "id": "31784607-3178-4607-9b20-8c3bb7176f5b",
              "name": "8"
            },
          ],
          "id": "82c3cc1e-5efd-409c-a581-94d6915a8e68",
          "name": "1"
        },
        {
          "children": [
            {
              "children": [],
              "id": "46079b20",
              "name": "8"
            },
            {
              "children": [],
              "id": "8c3bb717",
              "name": "8"
            }
          ],
          "id": "409ca581",
          "name": "1"
        },
      ],
      "id": "2d151a6c-7752-4678-a4d5-849b5ae203de",
      "name": "6"
    },
    {
      "children": [
        {
          "children": [],
          "id": "f38b65df",
          "name": "8"
        },
        {
          "children": [],
          "id": "dff38b65",
          "name": "8"
        }
      ],
      "id": "c9a95fef-3d46-4f77-8817-ec7fa8d53f20",
      "name": "2"
    },
    {
      "children": [
        {
          "children": [],
          "id": "65f38bdf",
          "name": "8"
        },
      ],
      "id": "fec9a95f-3d46-4f77-8817-ec7fa8d53f20",
      "name": "2"
    }
  ],
  "id": "d5cdca73-83d4-4a37-a1a9-2833",
  "name": "1",
  "isRoot": true
}

class Node {
  constructor(data, parent, index) {
    this.data = data
    this.width = 150
    this.height = 70
    this.vgap = 20
    this.hgap = 40
    this.x = 0
    this.y = 0
    this.children = []
    this.childrenAreaHeight = 0
    // this.id = parseInt(Math.random() * 10000);
    this.id = data.id.slice(0, 4)


    this.parent = parent
    this.index = index
    if (parent) {
      this.depth = parent.depth + 1
      this.x = parent.x + parent.width + parent.hgap

      this.path = this.depth + '/' + parent.index + "." + this.index
    } else {
      this.depth = 0
      this.path = '0'
    }

    if (parent) {
      this.y = (parent.y - parent.childrenAreaHeight / 2) + ((this.height + this.vgap) * index) + (this.height / 2)
    }
  }
}

let nodeList = []
let rootNode = new Node(tree, null, 0)
rootNode.x = 0
rootNode.y = 400

function updateChildren(children, offset) {
  children.forEach(node => {
    // console.log('updateChildren:', node.depth, node.id, offset);
    node.y += offset

    if (node.children && node.children.length)
      updateChildren(node.children, offset)
  })
}

function updateBrothers(currentNode, addHeight) {
  if (currentNode.parent) {
    let children = currentNode.parent.children
    // 当前节点在children中的索引
    let index = currentNode.index

    // console.log('updateBrothers', currentNode.depth, currentNode.id, 'addHeight: ', addHeight);

    children.forEach((node, idx) => {
      if (index === idx) return

      let offsetY = 0
      // 在当前结点的上面就减
      if (idx < index) {
        offsetY = -addHeight

      } else {
        // 反之则加
        offsetY = addHeight
      }

      // console.log('updateBrothers:', node.depth, node.id, offsetY);

      // 移动兄弟节点
      node.y += offsetY

      // 兄弟节点移动了，还需要同步移动其所有子结点
      if (node.children && node.children.length)
        updateChildren(node.children, offsetY)
    })

    // 移动所有的上层结点 和 上层节点的子节点
    updateBrothers(currentNode.parent, addHeight)
  }
}

function BFS() {
  let queue = [rootNode]

  while(queue.length) {

    let node = queue.shift()

    nodeList.push(node)
    // console.log(node.data.id.slice(0, 8));

    let children = node.data.children
    if (children && children.length) {
      // 计算子节点的总高度
      node.childrenAreaHeight = (node.height + node.vgap) * children.length - node.vgap

      for (let i = 0; i < children.length; i++) {
        var child = new Node(children[i], node, i)
        node.children.push(child)

        queue.push(child)
      }

      // 判断子结点的高度是否大于自身高度
      // 如果大于自身高度，则调整前后兄弟结点的y
      // console.log(node.childrenAreaHeight > node.height);
      if (node.childrenAreaHeight > node.height) {
        updateBrothers(node, (node.childrenAreaHeight - node.height) / 2)
      }
    }
  }
}

BFS()

// console.log(rootNode);

export {
  nodeList,
  rootNode
}
