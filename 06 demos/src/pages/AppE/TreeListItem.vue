<template>
  <li :class="['tree-list-item',{'tree-list-item-root':model.root}]">
    <div :class="['tree-content']" ref="content">
      <span class="start-tag">&lt;{{model.name}}&gt;</span>
    </div>

    <TreeList v-if="model.children && model.children.length" :model="model.children"></TreeList>

    <span class="end-tag" v-if="hasChildren">&lt;/{{model.type}}&gt;</span>
  </li>
</template>

<script>
import TreeList from './TreeList'

export default {
  name: 'TreeListItem',
  components: {
    TreeList
  },
  props: {
    model: Object
  },
  data({model}) {
    // console.log('model:', model)
    return {}
  },
  computed: {
    isFolder: function () {
      return this.model.children && this.model.children.length
    },
    hasChildren() {
      return this.isFolder
    }
  },
  methods: {}
}
</script>

<style lang="stylus" scoped>
.tree-list-item {
  .tree-content {
    font-size: 14px;
    transition: background-color 0.5s;
    &:hover {
      background-color: #ccc;
    }
  }
}
</style>
