<template>
  <div class="list-item" :style="style">
    {{node.id}}->{{(node.parent && node.parent.id) || null}} {{node.depth}}
    <br/>
    {{node.x}} / {{node.y}}
    <br/>
    <!--{{node.depth}} / {{node.id}}-{{node.parent && node.parent.id || ''}} / {{node.index}}-->
    <!--depth:{{node.depth}} / {{node.path}}-->
    CH:{{node.childrenAreaHeight}}

    <div class="line" :style="{width:lineLength+'px',transform:rotate}"></div>

    <!--<BisselCurve :width="lineWidth" :height="lineHeight"></BisselCurve>-->
  </div>
</template>

<script>
  import {getAngle, getDistance} from "./mathematics"
  import BisselCurve from './bissel-curve'

  export default {
    name: "list-item",
    components: {
      BisselCurve
    },
    props: ["node"],
    computed: {
      style() {
        let {x, y} = this.node
        return {
          width: this.node.width + 'px',
          height: this.node.height + 'px',
          left: x + 'px',
          top: y + 'px',
        }
      },
      lineLength() {
        let {x, y, parent} = this.node

        if (parent) {
          let {x: x2, y: y2, width} = parent
          return getDistance(x, y, x2 + width, y2)
        }

        return 0
      },
      rotate() {
        let {x, y, parent} = this.node

        if (parent) {
          let {x: x2, y: y2, width} = parent
          return `rotate(${getAngle(x, y, x2 + width, y2)}deg)`
        }

        return `rotate(0deg)`
      },
      lineWidth() {
        let {x, y, parent} = this.node

        if (parent) {
          let {x: x2, y: y2, width} = parent
          return Math.abs(x - (x2 + width)) + 2
        }

        return 0
      },
      lineHeight() {
        let {x, y, parent} = this.node

        if (parent) {
          let {x: x2, y: y2} = parent
          return Math.abs(y - y2) + 2
        }

        return 0
      },
      d() {
        return `M 0,0 C 50,0 50,100 ${this.lineWidth - 2},${this.lineHeight - 2}`
      }
    }
  }
</script>

<style lang="scss" scoped>
  .list-item {
    position: absolute;
    left: 0;
    top: 0;
    /*background-color: #2196F3;*/
    background-color: rgba(33, 150, 243, 0.3);
    color: white;
    font-size: 12px;
    /*transform-origin: center center;*/
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 5px;

    .line {
      position: absolute;
      top: 35px;
      left: 0;
      height: 2px;
      background-color: #2196F3;
      transform-origin: top left;
    }

    svg {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
</style>
