<template>
  <div class="waterfall">
    <div class="img-list" :style="{width:columnTotalWidth+'px',height:columnMaxHeight+'px'}">
      <div class="img-list-item" :ref="item.id" :id="item.id" v-for="item,idx in imageList" :style="{width:columnWidth+'px',left:item.left+'px',top:item.top+'px'}">
        <div class="inner">
          <div class="img">
            <img :src="item.url" alt="">
          </div>
          <div class="bottom" v-if="item.title || item.desc">
            <div class="title">{{item.title}}</div>
            <div class="desc">{{item.desc}}</div>
            <div style="height:10px;"></div>
            <span>{{idx}} | {{item.id}} | {{parseInt(item.img.width)}}/{{parseInt(item.img.height)}} | {{parseInt(item.width)}}/{{parseInt(item.height)}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'waterfall',
  data() {
    return {
      // 列数（由总宽度与每列宽度计算得出）
      columnCount: 0,
      // 列默认宽度
      columnDefaultWidth: 250,
      // 每列宽度（PC端等于列默认宽度，移动端等于屏幕宽度）
      columnWidth: 0,
      // 设置列与列之间的间距
      columnGap: 5,
      // 最大高度
      columnMaxHeight: 0,
      // 记录列高度数组
      columnHeightArr: [],
      // 所有图片
      imageList: [],

      loading: true,
    }
  },
  computed: {
    columnTotalWidth() {
      return this.columnCount * this.columnWidth
    },
  },
  methods: {
    async load(arr) {
      this.loading = true;
      for (let i = 0; i < arr.length; i++) {
        let {img: url, title, desc} = arr[i];
        let result = await asyncImg(url).catch(err => {
          console.log('err 加载图片错误：', url);
        });

        if (result) {
          let img = result;
          let imgItem = {
            id: parseInt(Math.random() * 100000000),
            url,
            img: img,
            width: this.columnWidth,
            top: 0,
            left: 0,
            title,
            desc,
            bottomHeight: 0,
            padding: 10,
          }

          this.imageList.push(imgItem);

          this.$nextTick(() => {
            if (title || desc) {
              let ele = this.$refs[imgItem.id][0];
              let bottomEle = ele.querySelectorAll('.bottom')[0];
              let {height} = bottomEle.getBoundingClientRect();
              imgItem.bottomHeight = height;
            }

            let w = this.columnWidth;
            let h = (w - 10) / (img.width / img.height);

            let minVal = Math.min(...this.columnHeightArr);
            let index = this.columnHeightArr.indexOf(minVal);

            let left = index * w;
            let top = minVal;

            imgItem.left = left;
            imgItem.top = top;
            imgItem.height = h;

            this.columnHeightArr[index] += (h + imgItem.bottomHeight + imgItem.padding);
            this.columnMaxHeight = Math.max(...this.columnHeightArr);
          })
        }
      }
      this.loading = false;
    },
    onResizeListener: function () {
      let {columnCount, columnWidth} = this.calculate();

      this.columnCount = columnCount;
      this.columnWidth = columnWidth;
      this.columnHeightArr = Array.apply(null, {length: this.columnCount}).map(() => 0);
      this.imageList.forEach(imgItem => {
        let img = imgItem.img;

        let w = this.columnWidth;
        let h = (w - this.columnGap * 2) / (img.width / img.height);

        let minVal = Math.min(...this.columnHeightArr);
        let index = this.columnHeightArr.indexOf(minVal);

        let left = index * w;
        let top = minVal;

        imgItem.left = left;
        imgItem.top = top;
        imgItem.height = h;

        this.columnHeightArr[index] += (h + imgItem.bottomHeight + imgItem.padding);
        this.columnMaxHeight = Math.max(...this.columnHeightArr);
      })
    },
    calculate() {
      let columnWidth = window.innerWidth < 500 ? (window.innerWidth - 20) : this.columnDefaultWidth;
      let columnCount = parseInt(window.innerWidth / columnWidth);

      columnCount = columnCount > 4
        ? 4
        : columnCount < 1
          ? 1
          : columnCount;

      return {
        columnCount,
        columnWidth
      };
    },
  },

  created() {
    window.addEventListener("resize", this.onResizeListener);

    let {columnCount, columnWidth} = this.calculate();
    this.columnCount = columnCount;
    this.columnWidth = columnWidth;
    this.columnHeightArr = Array.apply(null, {length: this.columnCount}).map(() => 0);
  }
}

function asyncImg(url) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.src = url;
    img.onload = () => {
      resolve(img);
    }
    img.onerror = (err) => {
      console.log(err);
      reject(null);
    }
  })
}
</script>

<style lang="scss" scoped>
.waterfall {
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

      .info {
        border-top: 1px solid #e8e8e8;
        background: #fbfbfb;
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
}
</style>
