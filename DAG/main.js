import {nodes} from './dag-state.js'

Vue.component("list-item", {
  template: `
    <div class="list-item" :style="style">
      {{node.data.data}} | {{node.depth}}
      <br/>
      {{node.x}} / {{node.y}}
      <br/>
      ChildrenHeight:{{node.childrenAreaHeight}}
      <br/>
      FamilyHeight:
    </div>
  `,
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
  }
})

var app = new Vue({
  el: "#app",
  data() {
    return {
      msg: "12333",
      nodes,
    }
  }
})