<template>
  <div class="pie-chart">
    <div class="pie-chart" :ref="'chartView'" style="width:500px;height:400px;"></div>
  </div>
</template>

<script>
  export default {
    name: 'app-a',
    mounted() {
      let option = {
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            label: {
              // position: 'outer',
              // alignTo: 'edge',
              color: "#ffffff",
              padding: [0, 0, 0, 0],
              // formatter: '{b}：{c}',
            },
            labelLine: {
              // length: 10,
              // length2: 30,
              // showAbove:true,
              lineStyle: {
                color: "#ffffff"
              }
            },
            data: [
              {
                name: '50岁以上',
                value: 70
              }, {
                name: 'Strawberries',
                value: 68
              }, {
                name: 'Bananas',
                value: 48
              }, {
                name: 'Oranges',
                value: 40
              }, {
                name: 'Pears',
                value: 32
              }, {
                name: 'Pineapples',
                value: 27
              }, {
                name: 'Grapes',
                value: 18
              }
            ],
            animation: false,
          }
        ]
      }

      let chart = window.echarts.init(this.$refs.chartView, 'light')
      chart.setOption(option, true)
    }
  }
</script>
<style lang="stylus" scoped>
  .pie-chart {
    display: inline-block;
    padding: 16px;
    background-color: #090f33;
    .pie-chart-container {
      display: inline-block;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.2) 100%);
      border-radius: 32px 32px 32px 32px;
    }
  }
</style>
