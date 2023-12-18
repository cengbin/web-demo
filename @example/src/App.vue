<template>
  <div id="app" :class="[$route.path === '/'?'bg':'']">
    <SidebarNavigation></SidebarNavigation>
    <router-view></router-view>
  </div>
</template>
<script>
  import SidebarNavigation from "./SidebarNavigation"

  export default {
    name: 'App',
    components: {
      SidebarNavigation
    },
  }
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    width: 100%;
    height: 100%;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;

    &.bg {
      background-image: url("./assets/images/background.png");
      background-position: center;
      background-size: cover;
    }
  }
</style>
