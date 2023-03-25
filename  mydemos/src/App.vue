<template>
  <div id="app">
    <ul v-if="menuVisible">
      <li v-for="(route,idx) in routes" :key="idx">
        <router-link :to="route.path">
          {{(route.meta && route.meta.title) || route.path}}
        </router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>
<script>
  // import routers
  export default {
    name: 'App',
    computed: {
      menuVisible() {
        return this.$route.path === '/'
      },
      routes() {
        return this.$router.options.routes
      }
    },
    created() {
      // console.log('$route:', this.$router)
      // console.log('$route:', this.$route)
    }
  }
</script>

<style>
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
  }
</style>
