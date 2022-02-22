<template>
  <div class="xmind">
    <BisselCurve :width="100" :height="100"></BisselCurve>

    <ListItem v-for="node,idx in nodeList" :node="node" :key="idx"></ListItem>
  </div>
</template>

<script>
  import {
    nodeList,
    rootNode
  } from './xmind-state'
  import ListItem from './list-item'
  import BisselCurve from './bissel-curve'

  export default {
    name: 'xmind',
    components: {
      ListItem,
      BisselCurve
    },
    data() {
      return {
        nodeList,
        rootNode
      }
    },
    computed: {},
    methods: {},
    mounted() {}
  }
</script>

<style lang="scss" scoped>
  .xmind {

  }
</style>
