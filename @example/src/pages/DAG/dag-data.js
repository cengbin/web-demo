// todo：求图中起点到终点有多少条路径，每个结点的"深度"是曾经访问过的最大的深度值。

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

// 图的邻接矩阵形式描述
class Graph {
  constructor(vexnum, arcnum) {
    // 图的当前顶点数
    this.vexnum = vexnum
    // 图的当前边数
    this.arcnum = arcnum

    // 顶点表 一维数组
    this.vexs = new Array(vexnum)
    // 领接矩阵 二维数组
    this.arcs = new Array(vexnum)

    for (let i = 0; i < vexnum; i++) {
      this.vexs[i] = {
        data: (i + 1),
        depth: null,
        familyHeight: 0,
      };

      this.arcs[i] = new Array(vexnum)
      for (let j = 0; j < vexnum; j++) {
        this.arcs[i][j] = 0;
      }
    }
  }

  // 获取顶点的下标
  locateVex(val) {
    for (let i = 0; i < this.vexs.length; i++) {
      if (this.vexs[i].data === val)
        return i;
    }
    return -1;
  }

  /**
   * 添加边
   * @param v1 顶点v1
   * @param v2 顶点v2
   * @param 权值，默认1
   * */
  input(v1, v2, w = 1) {
    // 确定v1和v2在图中的位置
    let i = this.locateVex(v1);
    let j = this.locateVex(v2);
    this.arcs[i][j] = w; // 边<v1,v2>的权值置为w
  }

  DFS(idx = 0) {
    let visited = [];
    let dfs = (idx, depth, arcIndex) => {
      // console.log(this.vexs[idx]);

      let vex = this.vexs[idx];
      vex.depth = depth;
      vex.x = (vex.depth * (160 + 10));
      console.log(`开始idx=${idx}, data=${vex.data}`)

      visited[idx] = true;

      let arcs = this.arcs[idx];
      let arcIdx = 0;
      for (let i = 0; i < arcs.length; i++) {
        if (arcs[i] !== 0 && !visited[i]) {
          console.log({idx, i})
          dfs(i, depth + 1, arcIdx++);
        }
      }

      vex.familyHeight = (arcIdx * (70 + 10))

      vex.y = (arcIndex * (70 + 10))
      console.log(`回溯idx=${idx}, arcIndex=${arcIndex}`)
    }
    dfs(idx, 0, 0);
  }
}

let graph = new Graph(11, 11)

graph.input(1, 2)
graph.input(1, 10)
graph.input(1, 11)

graph.input(2, 3)
graph.input(2, 9)

graph.input(3, 4)
graph.input(3, 6)

graph.input(4, 5)

graph.input(7, 8)

graph.input(9, 8)

graph.input(10, 7)

graph.DFS()

// graph.depth()
//
// graph.setY()

console.log(graph)
console.table(graph.vexs)
console.log(graph.arcs)

export default graph
