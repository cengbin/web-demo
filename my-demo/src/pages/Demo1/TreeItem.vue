<template>
  <li :class="['tree-item',{'active':active,'no-child':noChild}]"
      @click="$parent.$emit('CLICK_TREE_ITEM',model)">
    <div class="h-line"></div>
    <div class="v-line"></div>
    <div class="wapper">
      <slot></slot>
      <div>{{model.name}}</div>
      <div>{{model.percent}}</div>
    </div>
  </li>
</template>

<script>
  export default {
    name: 'tree-item',
    props: {
      model: Object,
      active: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      noChild () {
        return !this.model.children || !(this.model.children && this.model.children.length)
      }
    }
  }
</script>

<style lang="stylus">
  .tree-item {
    position: relative;
    display: inline-block;
    padding: 20px 10px;
    text-align: center;

    .h-line {
      position: absolute;
      left: 0px;
      top: 0px;
      z-index: 0;
      width: 100%;
      height: 0;
      border-top: 1px solid #E5E5E5;
    }

    .v-line {
      position: absolute;
      left: 50%;
      top: 0px;
      z-index: 1;
      width: 0px;
      height: 50%;
      border-left: 1px solid #E5E5E5;
    }

    .wapper {
      cursor: pointer;
      position: relative;
      width: 96px;
      height: 48px;
      z-index: 9;
      background: white;
      border: 1px solid #E5E5E5;
      box-sizing: border-box;
      border-radius: 2px;
    }

    &:first-child {
      .h-line {
        width: 50%;
        left: 50%;
      }
    }

    &:last-child {
      margin-right: 0;
      .h-line {
        width: 50%;
      }
    }
  }

  .tree-item.active {
    .v-line {
      display: block;
      height: 100%;
      border-color: #3991FC;
    }

    .wapper {
      background: #3991FC;
      border: 1px solid #3991FC;
      color: white;
    }
  }

  .tree-item.no-child {
    .v-line {
      height: 50%;
    }
  }
</style>
