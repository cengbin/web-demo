<template>
  <div class="appc">
    <div class="f1-1">
      <a>文件</a>
      <a>编辑</a>
      <a>下载</a>
    </div>
    <div class="f1-2">
      <div class="f2-1">
        <ElementsTree></ElementsTree>
      </div>
      <div class="f2-2"></div>
      <div class="f2-3"></div>
    </div>
  </div>
</template>

<script>
  import ElementsTree from '../Demo2/ElementsTree.vue'

  export default {
    name: 'app-c',
    components: {
      ElementsTree
    }
  }
</script>

<style src="./appc.styl" lang="stylus"></style>
