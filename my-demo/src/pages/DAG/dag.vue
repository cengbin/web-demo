<template>
  <div class="dag" style="width:1024px;height:768px;border:1px solid black;">
    <div class="ele" v-for="ele,idx in eles" :key="idx" :style="{left:ele.x+'px',top:ele.y+'px'}">
      <span class="top"></span>
      <span class="bottom"></span>
      <span class="center"></span>

      <div class="content">
        {{ele.value}} / {{ele.index}}
      </div>
    </div>
  </div>
</template>

<script>
import FlowItem from './flow-item'

let stageWidth = 1024;
let stageHeight = 768;
let eleWidth = 100;
let eleHeight = 50;
let padding = 10;
let margin = 20;

let G = {
  V: [
    {val: 'a'},
    {val: 'b'},
    {val: 'c'},
    {val: 'd'},
    {val: 'e'},
    {val: 'f'},
    {val: 'g'},
    {val: 'h'}
  ],
  E: [
    // a  b  c  d  e  f  g  h
    [0, 1, 1, 0, 0, 0, 0, 0], // a 横向数组表示以a为弧尾的边
    [0, 0, 0, 1, 0, 0, 0, 0], // b
    [0, 0, 0, 0, 1, 1, 0, 0], // c
    [0, 0, 0, 0, 0, 0, 0, 1], // d
    [0, 0, 0, 0, 0, 0, 1, 0], // e
    [0, 0, 0, 0, 0, 0, 1, 0], // f
    [0, 0, 0, 0, 0, 0, 0, 1], // g
    [0, 0, 0, 0, 0, 0, 0, 0], // h
    // a  b  c  d  e  f  g  h
  ]
}
let visited = [];

function dfs(i) {
  let vertex = G.V[i];
  let edge = G.E[i];
  // 出度
  let out = 0;
  let outArr = [];
  edge.forEach((ele, idx) => {
    if (ele) {
      out++;
      outArr.push(G.V[idx]);
    }
  });

  // 入度
  let input = 0;
  let inputArr = [];
  G.E.forEach((ele, idx) => {
    if (ele[i]) {
      input++;
      inputArr.push(G.V[idx]);
    }
  });

  vertex.input = input;
  vertex.inputArr = inputArr;
  vertex.out = out;
  vertex.outArr = outArr;

  // console.log(vertex);

  for (let j = 0; j < edge.length; j++) {
    if (edge[j] && !visited[j]) {
      visited[j] = true;
      dfs(j);
    }
  }
}

let i = 0;
visited[i] = true;
dfs(i);

// 全局去重，优先保留下方的节点
let map = [
  ['a'],
  ['b'],
  ['f', 'e', 'd'],
  ['g', 'c'],
  ['h']
]

let eles = [];

/*G.V.forEach(ele => {
  let item = {
    value: ele.val,
    x: 0,
    y: 0
  }

  eles.push(item);
})*/

for (let i = 0; i < map.length; i++) {
  let colLength = map[i].length;
  for (let j = 0; j < colLength; j++) {
    let val = map[i][j]
    val = (typeof val === 'string' ? val : val.v);

    let _width = (eleWidth + margin);


    let _x = ((stageWidth - (colLength * _width)) / 2) + (j * _width);
    // let _x = (j * _width);
    let _y = i * (eleHeight + margin);

    // if (i === 0 && j === 0) {
    //   _x = 300;
    //   _y = 0;
    // } else {
    //   // console.log('val:', val);
    //   let item = G.V.find(ele => ele.val === val);
    //   console.log(item);
    //
    //   console.log(item.inputArr)
    // }


    let item = {
      value: val,
      index: eles.length,
      x: _x,
      y: _y,
    }

    eles.push(item);
  }
}

export default {
  name: 'dag',
  components: {
    FlowItem,
  },
  data() {
    return {
      map,
      eles
    }
  },
  computed: {},
  methods: {},
  mounted() {},
}
</script>

<style lang="stylus" scoped>
.dag {
  position: relative;
  .ele {
    position: absolute;
    display: inline-block;
    width: 100px;
    height: 50px;

    text-align: center;
    color: white;
    font-size: 10px;

    .top,
    .bottom,
    .center {
      position: absolute;
      left: 0px;
      display: inline-block;
      width: 100px;
      height: 2px;
      background-color: gray;
    }

    .top {
      top: -10px;
    }

    .bottom {
      top: 60px;
    }

    .center {
      left: 50px;
      top: -10px;
      width: 2px;
      height: 70px;
    }

    .content {
      position: relative;
      height: 50px;
      z-index: 99;
      background-color: #2196f3;
      border: 1px solid lightblue;
      border-radius: 10px;
    }
  }
}

</style>
