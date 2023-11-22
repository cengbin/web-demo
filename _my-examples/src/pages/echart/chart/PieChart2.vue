<template>
  <div>
    <div class="pie-chart" :ref="'chartView'" style="width:500px;height:400px;"></div>
  </div>
</template>

<script>
  export default {
    name: 'app-a',
    mounted() {
      let chart = window.echarts.init(this.$refs.chartView)
      setTimeout(() => {
        let option = {
          series: [
            {
              type: 'pie',
              left: 'center',
              radius: ['50%', '80%'],
              label: {
                color: "#ffffff",
                // formatter: '{b} \n   ',
                // minMargin: 5,
                // edgeDistance: 10,
                // lineHeight: 15,
              },
              // labelLine: {
              //   // length: 15,
              //   // length2: 0,
              //   maxSurfaceAngle: 80,
              //   lineStyle: {
              //     color: "#ffffff"
              //   }
              // },
              // labelLayout(params) {
              //   const isLeft = params.labelRect.x < chart.getWidth() / 2
              //   const points = params.labelLinePoints
              //   // Update the end point.
              //   points[2][0] = isLeft
              //     ? params.labelRect.x - 5
              //     : params.labelRect.x + params.labelRect.width + 5
              //   return {
              //     labelLinePoints: points
              //   }
              // },
              data: [
                {
                  name: '60岁以上',
                  value: 70,
                  itemStyle: {
                    color: '#833dfa',
                  }
                },
                {
                  name: '50-60岁',
                  value: 68,
                  itemStyle: {
                    color: '#3CD495',
                  }
                },
                {
                  name: '40-50岁',
                  value: 48,
                  itemStyle: {
                    color: '#CE3B56',
                  }
                },
                {
                  name: '30-40岁',
                  value: 40,
                  itemStyle: {
                    color: '#ffd655',
                  }
                },
                {
                  name: '20-30岁',
                  value: 32,
                  itemStyle: {
                    color: '#0d91fb',
                  }
                },
                {
                  name: '20岁以下',
                  value: 27,
                  itemStyle: {
                    color: '#30c8dc',
                  }
                }
              ],
              animation: false,
            }
          ]
        }
        chart.setOption(option, true)
      }, 500)
    }
  }
</script>
<style lang="stylus" scoped>
  .pie-chart {
    display: inline-block;
    background-color: #090f33;
    .pie-chart-container {
      display: inline-block;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.2) 100%);
      border-radius: 32px 32px 32px 32px;
    }
  }
</style>
