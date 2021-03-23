<template>
  <ul class="element-list" v-if="model">
    <ElementItem v-for="(element,idx) in model.children" :model="element" :key="idx"></ElementItem>
  </ul>
</template>

<script>
  import ElementItem from './ElementItem'

  export default {
    name: 'elements-tree',
    props: {
      model: Object
    },
    data () {
      return {}
    },
    created () {
      console.log('elementsTree:', this.model)
    },
    components: {
      ElementItem
    }
  }
</script>

<style lang="stylus">
  ul.element-list {
    padding-left: 15px;
  }
</style>
