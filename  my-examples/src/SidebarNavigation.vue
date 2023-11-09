<template>
  <div class="sidebar-navigation" :class="{close:isClose}">

    <i class='bx bx-menu' v-if="isClose" @click="onClickMenu"></i>

    <i class='bx bx-x' v-if="!isClose" @click="onClickClose"></i>

    <div class="content" v-if="!isClose">
      <div class="user">
        <img src="./assets/images/picture.jpg" alt="" class="user-img">
        <div>
          <h2 class="text">Weibin Ceng</h2>
          <p class="text">596659597@qq.com</p>
        </div>
        <a href="https://github.com/cengbin" target="_blank">
          <img src="./assets/images/github_icon.svg" alt="" width="20">
        </a>
      </div>

      <ul class="menu-list">
        <li class="menu-list-item" v-for="(route,idx) in routes" :key="idx" @click="onClickNav(route)">
          <img :src="route.meta.icon || DefaultIcon" alt="">
          <p class="text">{{(route.meta && route.meta.title) || route.path}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import DefaultIcon from './assets/images/members.png'

  export default {
    name: "sidebar-menu",
    data() {
      return {
        DefaultIcon,
        isClose: true,
        isFold: false,
      }
    },
    computed: {
      routes() {
        return this.$router.options.routes
      }
    },
    methods: {
      onClickMenu() {
        this.isClose = false
      },
      onClickClose() {
        this.isClose = true
        this.isFold = false
      },
      onClickToggle() {
        this.isFold = !this.isFold
      },
      onClickNav(route) {
        this.isClose = true
        this.$router.push(route.path)
      }
    }
  }
</script>

<style lang="scss">
  :root {
    /* ===== Colors ===== */
    --body-color: #E4E9F7;
    --sidebar-color: #FFF;
    --primary-color: #695CFE;
    --primary-color-light: #F6F5FF;
    --toggle-color: #DDD;
    --text-color: #707070;

    /* ====== Transition ====== */
    --tran-03: all 0.2s ease;
    --tran-03: all 0.3s ease;
    --tran-04: all 0.3s ease;
    --tran-05: all 0.3s ease;
  }

  .sidebar-navigation {
    position: fixed;
    top: 5vh;
    right: 30px;

    /*display: flex;*/
    /*flex-direction: column;*/
    /*justify-content: space-between;*/

    width: 250px;
    height: 90vh;

    padding: 30px 15px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    backdrop-filter: blur(5px);

    transition: var(--tran-05);
    z-index: 100;

    .bx {
      color: black;
      font-size: 20px;
    }

    .text,
    .icon {
      transition: var(--tran-03);
    }

    &.close {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 50px;
      height: 50px;
      padding: 0;
      box-sizing: border-box;
    }

    .bx-menu {
      color: var(--sidebar-color);
    }

    .bx-x {
      position: absolute;
      top: -12px;
      right: -12px;
      height: 25px;
      width: 25px;
      background-color: var(--primary-color);
      color: var(--sidebar-color);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      cursor: pointer;
    }

    .user {
      display: flex;
      align-items: center;
      justify-content: space-between;
      /*justify-content: flex-start;*/
      width: 100%;
      font-size: 12px;
      padding: 10px;
      border-radius: 8px;
      marign: 0 auto;

      background-color: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(5px);

      overflow: hidden;

      h2 {
        font-size: 15px;
        font-weight: 600;
        white-space: nowrap;
      }

      .user-img {
        width: 40px;
        border-radius: 50%;
        margin: 0 5px;
      }
    }

    ul {
      list-style: none;
      padding: 0 15px;

      &.menu-list {
        flex: 1 0 0;
      }

      li {
        margin: 10px 0;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        cursor: pointer;
        overflow: hidden;

        border-radius: 6px;
        transition: var(--tran-03);

        &:hover {
          background-color: rgba(255, 255, 255, .2);

          .icon,
          .text {
            /*color: var(--sidebar-color);*/
          }
        }

        img {
          width: 30px;
          margin-right: 10px;
        }

        a {
          white-space: nowrap;
          color: #000;
          text-decoration: none;
        }
      }
    }
  }
</style>
