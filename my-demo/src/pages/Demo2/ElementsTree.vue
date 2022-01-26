<template>
  <div>
    <ul class="element-list">
      <ElementItem :model="rootElement"></ElementItem>
    </ul>
  </div>
</template>

<script>
import ElementItem from './ElementItem'

let rootElement = {
  name: 'html',
  root: true,
  open: true,
  parent: null,
  children: [
    {
      name: 'head',
      children: [
        {
          name: 'meta'
        }, {
          name: 'title'
        }, {
          name: 'style'
        }
      ]
    },
    {
      name: 'body',
      children: [
        {
          name: 'div'
        }, {
          name: 'p'
        }, {
          name: 'span'
        }
      ]
    }
  ]
}

function DFS(arr, parent) {
  arr.forEach(ele => {
    ele['open'] = true
    ele['parent'] = parent

    if (ele.hasOwnProperty('children')) DFS(ele.children, ele)
  })
}

DFS(rootElement.children, rootElement)
console.log(rootElement)

export default {
  name: 'elements-tree',
  data() {
    return {
      rootElement
    }
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
