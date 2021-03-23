<template>
  <div id="app">
    <div class="appd">
      <div class="panel-left">
        <header>
          <h1>FE Doc</h1>
        </header>
        <nav>
          <ElementsTree :model="menuData"></ElementsTree>
        </nav>
      </div>
      <div class="panel-right">
        <iframe id="riframe" name="viewer" src="./static/markdown2html.html"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
  import ElementsTree from './ElementsTree.vue'

  import menuData from './menu'

  function DFS (arr, parent) {
    arr.forEach(ele => {
      ele['open'] = false
      ele['parent'] = parent

      if (ele.hasOwnProperty('children')) DFS(ele.children, ele)
    })
  }

  DFS(menuData.children, menuData)
  console.log(menuData)

  export default {
    name: 'App',
    data () {
      return {
        menuData
      }
    },
    components: {
      ElementsTree
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
<style lang="stylus">

  :root {
    color-scheme: light dark;

    --background-color: #fff;
    --secondary-background-color: #f7f7f7;

    --color-blue: #049EF4;
    --text-color: #444;
    --secondary-text-color: #9e9e9e;

    --font-size: 16px;
    --line-height: 26px;

    --border-style: 1px solid #E8E8E8;
    --header-height: 48px;
    --panel-width: 300px;
    --panel-padding: 16px;
    --icon-size: 20px;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html, body, #app, #app .appd {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;

    font-family: Menlo, Consolas, monospace;
    color: #444;
  }

  iframe {
    width: 100%;
    height: 100%;
    overflow: auto;
    border: 0px;
  }

  .appd {
    display: flex;
    flex-direction: row;

    .panel-left {
      flex: 0 0 var(--panel-width);
      width: var(--panel-width);
      border-right: var(--border-style);

      header {
        padding: 0 16px;
        font-size: 18px;
        height: var(--header-height);
        line-height: var(--header-height);
        color: var(--color-blue);
        border-bottom: var(--border-style);
        font-family: "Roboto Mono", monospace;
      }

      nav {
        overflow-y: auto;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
        padding: 0 var(--panel-padding) var(--panel-padding) 0;
      }
    }

    .panel-right {
      flex: 1 0 auto;
    }
  }
</style>
