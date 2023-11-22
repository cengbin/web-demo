<template>
  <div class="nana">
    <waterfall ref="waterfall"></waterfall>

    <div class="loadtips" @click="onClickLoad" v-if="!loading">load more</div>

    <div class="loading" v-if="loading">
      <span>L</span>
      <span>o</span>
      <span>a</span>
      <span>d</span>
      <span>i</span>
      <span>n</span>
      <span>g</span>
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </div>
  </div>
</template>

<script>
import waterfall from './waterfall';

export default {
  name: 'nana',
  components: {
    waterfall
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    /*loading() {
      return this.$refs['waterfall'] && this.$refs['waterfall'].loading;
    }*/
  },
  methods: {
    onClickLoad() {
      this.loading = true;
      this.$refs['waterfall'].load([
        {
          img: './static/imgs/cx06.jpg',
          title: 'xxoo',
          desc: 'xxoo',
        },
        {
          img: './static/imgs/cx07.jpg',
          title: 'xxoo',
          desc: 'xxoo',
        },
        {
          img: './static/imgs/cx08.jpg',
          title: 'xxoo',
          desc: 'xxoo',
        },
        {
          img: './static/imgs/oynn01.jpg',
          title: '通过上面的介绍',
          desc: '通过上面的介绍',
        },
        {
          img: './static/imgs/oynn02.jpg',
          title: '用一张花瓣网页的图片布局可以很清楚看出图片瀑布流的样子：',
          desc: '用一张花瓣网页的图片布局可以很清楚看出图片瀑布流的样子',
        },
        {
          img: './static/imgs/oynn03.jpg',
          title: 'xxoo',
          desc: 'xxoo',
        },
        {
          img: './static/imgs/oynn04.jpg',
          title: 'xxoo',
          desc: 'xxoo',
        },
        {
          img: './static/imgs/oynn05.jpg',
          title: 'xxoo',
          desc: 'xxoo',
        },
        {
          img: './static/imgs/oynn06.jpg',
          title: 'xxoo',
          desc: 'xxoo',
        },
        {
          img: './static/imgs/oynn07.jpg',
          title: 'xxoo',
          desc: 'xxoo',
        },
        {
          img: './static/imgs/oynn08.jpg',
          title: 'xxoo',
          desc: 'xxoo',
        },
      ]).then(() => {
        this.loading = false;
      });
    }
  },
  async mounted() {
    this.loading = true;
    this.$refs['waterfall'].load([
      {
        img: './static/imgs/1.jpg',
        title: '结合刚才说的Grid实现的瀑布流布局中，不设置行高(grid-template-rows)',
        desc: '在之前的例子中，我们分别指定了grid-template-columns和grid-template-rows用于定义几行几列，',
      },
      {
        img: './static/imgs/2.jpg',
        title: '用一张花瓣网页的图片布局可以很清楚看出图片瀑布流的样子：',
        desc: '用一张花瓣网页的图片布局可以很清楚看出图片瀑布流的样子',
      },
      {
        img: './static/imgs/',
      },
      {
        img: './static/imgs/4.jpg',
        title: 'xxoo',
        desc: 'xxoo',
      },
      {
        img: './static/imgs/5.png',
      },
      {
        img: './static/imgs/6.png',
      },
      {
        img: './static/imgs/7.jpg',
        title: 'xxoo',
        desc: 'xxoo',
      },
      {
        img: './static/imgs/8.png',
      },
      {
        img: './static/imgs/9.jpg',
        title: 'xxoo',
        desc: 'xxoo',
      },
      /*{
        img: './static/imgs/cx01.jpg',
        title: '通过上面的介绍',
        desc: '通过上面的介绍',
      },
      {
        img: './static/imgs/cx02.jpg',
        title: '用一张花瓣网页的图片布局可以很清楚看出图片瀑布流的样子：',
        desc: '用一张花瓣网页的图片布局可以很清楚看出图片瀑布流的样子',
      },
      {
        img: './static/imgs/cx03.jpg',
        title: 'xxoo',
        desc: 'xxoo',
      },
      {
        img: './static/imgs/cx04.jpg',
        title: 'xxoo',
        desc: 'xxoo',
      },
      {
        img: './static/imgs/cx05.jpg',
        title: 'xxoo',
        desc: 'xxoo',
      },*/
    ]).then(() => {
      this.loading = false;
    });
  }
}
</script>

<style lang="scss" scoped>
.nana {
  .img-list {
    position: relative;
    margin: 0 auto;
    padding: 20px 0;

    .img-list-item {
      position: absolute;
      /*border: 1px solid black;*/
      padding: 0 5px;

      div.inner {
        animation-iteration-count: 1;
        animation-duration: 1s;
        animation-name: bounceIn;
        animation-fill-mode: forwards;
      }

      @keyframes bounceIn {
        0%, 100%, 20%, 40%, 60%, 80% {
          transition-timing-function: cubic-bezier(0.215, .61, .355, 1)
        }
        0% {
          opacity: 0;
          transform: scale3d(1, 1, 1)
        }
        1% {
          opacity: 0;
          transform: scale3d(.3, .3, .3)
        }
        20% {
          transform: scale3d(1.1, 1.1, 1.1)
        }
        40% {
          transform: scale3d(.9, .9, .9)
        }
        60% {
          opacity: 1;
          transform: scale3d(1.03, 1.03, 1.03)
        }
        80% {
          transform: scale3d(.97, .97, .97)
        }
        100% {
          opacity: 1;
          transform: scale3d(1, 1, 1)
        }
      }

      .inner {
        border-radius: 10px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }
      .img {
        cursor: pointer;
        overflow: hidden;

        img {
          display: block;
          width: 100%;
          transition: all 0.5s ease;
        }

        &:hover {
          img {
            transform: scale(1.05);
          }
        }
      }

      span {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9;
        color: rgba(255, 0, 0, 0.3);
        font-size: 12px;
      }

      .title {
        /*text-align: center;*/
        font-size: 16px;
        color: #22252a;
        line-height: 1.2;
        padding: 10px 10px 0px;
      }
      .desc {
        padding: 10px;
        padding-top: 4px;
        padding-bottom: 0;
        line-height: 1.4;
        font-size: 13px;
        color: #8a98a8;
      }

      div.title,
      div.desc {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
  }
  .loadtips {
    cursor: pointer;
    text-align: center;
    color: gray;
  }
  .loading {
    text-align: center;

    span {
      color: rgb(255, 255, 255);
      font-size: 16px;
      animation-name: bounce_fountainTextG;
      animation-duration: 2.09s;
      animation-iteration-count: infinite;
      animation-direction: normal;
      transform: scale(.5);
    }

    @for $i from 1 through 10 {
      span:nth-child(#{$i}) {
        animation-delay: 0.75s + ($i*0.15);
      }
    }

    @keyframes bounce_fountainTextG {
      0% {
        transform: scale(1);
        color: rgb(255, 255, 255);
      }
      20% {
        transform: scale(1);
        color: rgb(0, 0, 0);
      }

      100% {
        transform: scale(.5);
        color: rgb(255, 255, 255);
      }
    }
  }
}
</style>
