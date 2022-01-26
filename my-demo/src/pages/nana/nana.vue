<template>
  <div class="nana">
    <div class="img-list" :style="{width:listWidth+'px',height:listHeight+'px'}">
      <div class="img-list-item" :ref="item.id" :id="item.id" v-for="item,idx in imgArr" :style="{width:width+'px',left:item.left+'px',top:item.top+'px'}">
        <div class="inner">
          <div class="img">
            <img :src="item.url" alt="">
          </div>
          <div class="bottom">
            <div class="title">{{item.title}}</div>
            <div class="desc">{{item.desc}}</div>
            <div style="height:10px;"></div>
            <span>{{idx}} | {{item.id}} | {{parseInt(item.img.width)}}/{{parseInt(item.img.height)}} | {{parseInt(item.width)}}/{{parseInt(item.height)}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="load-more" @click="onClickLoad">加载更多</div>
  </div>
</template>

<script>

export default {
  name: 'nana',
  components: {},
  data() {
    return {
      width: 250,
      heightArr: [0, 0, 0, 0],
      imgArr: [],
      listHeight: 0,

      //   column-count: 设置共有几列
      // column-width: 设置每列宽度，列数由总宽度与每列宽度计算得出
      // column-gap: 设置列与列之间的间距
    }
  },
  computed: {
    listWidth() {
      return this.columns * this.width
    },
    columns() {
      return this.heightArr.length;
    }
  },
  methods: {
    async load(arr) {
      for (let i = 0; i < arr.length; i++) {
        let {img: url, title, desc} = arr[i];
        let img = await asyncImg(url);

        let imgItem = {
          id: parseInt(Math.random() * 100000000),
          url,
          img: img,
          width: this.width,
          top: 0,
          left: 0,
          title,
          desc
        }

        this.imgArr.push(imgItem);

        this.$nextTick(() => {
          let ele = this.$refs[imgItem.id][0];
          // console.log(ele);
          // console.log(ele.querySelectorAll('.bottom'));
          let bottomEle = ele.querySelectorAll('.bottom')[0];
          let {height} = bottomEle.getBoundingClientRect();
          // console.log(imgItem.id, height);

          let padding = 10;
          let w = this.width;
          let h = (w - 10) / (img.width / img.height);
          //
          let minVal = Math.min(...this.heightArr);
          let index = this.heightArr.indexOf(minVal);

          let left = index * w;
          let top = minVal;

          imgItem.left = left;
          imgItem.top = top;
          imgItem.height = h;

          this.heightArr[index] += (h + height + padding);
          this.listHeight = Math.max(...this.heightArr);
        })
      }
      // console.log(arr);
    },
    onClickLoad() {
      this.load([
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
      ]);
    }
  },
  async mounted() {
    this.load([
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
        img: './static/imgs/3.jpg',
        title: 'xxoo',
        desc: 'xxoo',
      },
      {
        img: './static/imgs/4.jpg',
        title: 'xxoo',
        desc: 'xxoo',
      },
      {
        img: './static/imgs/5.png',
        title: 'xxoo',
        desc: 'xxoo',
      },
      {
        img: './static/imgs/6.png',
        title: 'xxoo',
        desc: 'xxoo',
      },
      {
        img: './static/imgs/7.jpg',
        title: 'xxoo',
        desc: 'xxoo',
      },
      {
        img: './static/imgs/8.png',
        title: 'xxoo',
        desc: 'xxoo',
      },
      {
        img: './static/imgs/9.jpg',
        title: 'xxoo',
        desc: 'xxoo',
      },
      {
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
      },
    ]);
  },
}


function asyncImg(url) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.src = url;
    img.onload = () => {
      resolve(img);
    }
    img.onerror = (err) => {
      reject(err);
    }
  })
}


</script>

<style lang="stylus" scoped>
.nana {
  .img-list {
    position: relative;
    margin: 0 auto;
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
      } /*@keyframes fadeIn {
          0% {
            opacity: 0
          }
          100% {
            opacity: 1
          }
        }*/

      .inner {
        border-radius: 10px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }
      .img {
        cursor pointer;
        overflow: hidden;
        &:hover {
          img {
            transform scale(1.05);
          }
        }
      }
      img {
        display: block;
        width: 100%;
        transition: all 0.5s ease;
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
  .load-more {
    cursor pointer;
    text-align center;
    color gray;
  }
  padding: 20px 0;
}

</style>
