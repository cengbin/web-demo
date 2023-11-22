<template>
  <div class="tree-list-view">
    <ul
      :class="['tree-list',{'tree-list-root':root,'tree-list-leaf':leaf,'only-one-child':(children && children.length===1)}]"
      v-if="children">
      <TreeItem v-if="children" v-for="(item,idx) in children"
                :key="idx"
                :model="item"
                :active="currentItem?item === currentItem:false">
        <!--{{item.name}}/{{currentItem.name}}-->
      </TreeItem>
    </ul>
    <span class="line"
          :style="{width:Math.abs(start-end)*boxWidth+'px',left:(Math.min(start,end)*boxWidth)+(boxWidth/2)+'px'}"
          v-if="Math.abs(start-end)>0"></span>
  </div>
</template>

<script>
  import TreeItem from './TreeItem'

  export default {
    name: 'tree-list',
    data () {
      return {
        boxWidth: 116
      }
    },
    props: {
      root: {
        type: Boolean,
        default: false
      },
      leaf: {
        type: Boolean,
        default: false
      },
      start: {
        type: Number,
        default: 0
      },
      end: {
        type: Number,
        default: 0
      },
      model: [Object, Array],
      currentItem: Object
    },
    computed: {
      children () {
        if (Array.isArray(this.model)) return this.model
        else return this.model.children || null
      }
    },
    created () {
    },
    components: {
      TreeItem
    }
  }
</script>

<style lang="stylus">
  .tree-list-view {
    position: relative;
    .line {
      display: inline-block;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 99;
      width: 0;
      height: 0;
      border-top: 1px solid #3991FC;
    }
  }

  .tree-list {
    padding: 0;
    margin: 0;
  }

  .tree-list-root {
    > li {
      .h-line {
        display: none;
        background-color: red;
      }
      .v-line {
        display: none;
        top: 50%;
        height: 50% !important;
      }
    }
  }

  .tree-list-leaf {
    > li {
      .v-line {
        height: 50% !important;
      }
    }
  }

  .only-one-child {
    > li {
      .h-line {
        display: none;
      }
    }
  }
</style>
