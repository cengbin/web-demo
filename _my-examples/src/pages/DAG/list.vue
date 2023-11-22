<template>
  <div class="list">
    <div v-for="node,idx in nodes" v-if="nodes && nodes.length">
      <ListItem :node="node"></ListItem>
    </div>
  </div>
</template>

<script>
  import ListItem from './list-item'

  export default {
    name: "list",
    components: {
      ListItem
    },
    props: ["nodes"]
  }
</script>

<style scoped>

</style>
