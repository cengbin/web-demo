<template>
  <div class="dag" style="width:1024px;height:768px;border:1px solid black;">
    <List :nodes="vertices"></List>
  </div>
</template>

<script>
  import List from './list.vue'
  import {graph, vertices} from './dag-state'

  export default {
    name: 'dag',
    components: {
      List
    },
    data() {
      return {
        graph,
        vertices
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
