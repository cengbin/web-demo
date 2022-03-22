<template>
  <div class="list-item" :style="style">
    {{node.data.data}} | {{node.depth}}
    <br/>
    {{node.x}} / {{node.y}}
    <br/>
    ChildrenHeight:{{node.childrenAreaHeight}}
    <br/>
    FamilyHeight:
  </div>
</template>

<script>
  export default {
    name: "list-item",
    components: {},
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
  }
</script>

<style lang="scss" scoped>
  .list-item {
    position: absolute;
    left: 0;
    top: 0;
    background-color: #2196F3;
    color: white;
    font-size: 12px;
    /*transform-origin: center center;*/
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 5px;
  }
</style>
