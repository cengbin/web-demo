<template>
  <ul class="tree-list">
    <li :class="['tree-list-item',{'tree-list-item-root':model.root}]"
        v-for="(element,idx) in model"
        :key="idx">

      <div class="tree-list-item-content">
        <span class="start-tag" v-html="element.name"></span>
      </div>

      <TreeList v-if="element.children && element.children.length" :model="element.children"></TreeList>
    </li>
  </ul>
</template>

<script>
  // import TreeListItem from './TreeListItem'

  export default {
    name: 'TreeList',
    props: {
      model: {
        type: Array,
        default () {
          return []
        }
      }
    },
    components: {
      // TreeListItem
    },
    computed: {
      hasChildren () {
        return this.model.children && this.model.children.length
      }
    },
    created () {
      // console.log('this.model:', this.model)
    }
  }
</script>

<style lang="stylus">
  ul.tree-list {
    list-style: none;
    padding-left: 15px;

    > li.tree-list-item {

      > div.tree-list-item-content {
        transition: background ease-in-out 0.3s;

        &:hover {
          background: #e8e7e3;
        }

        .start-tag {
          cursor: pointer;
        }
      }
    }

    &:first-child {
      padding-left: 0;
    }
  }
</style>
