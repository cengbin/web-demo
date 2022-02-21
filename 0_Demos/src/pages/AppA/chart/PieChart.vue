<template>
  <div :ref="'chartView'" style="width:500px;height:400px;"></div>
</template>

<script>
  export default {
    name: 'app-a',
    mounted () {
      let option = {
        title: {
          text: '饼图',
          top: 20
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
          // formatter: function (item) {
          //   console.log(item)
          //   return item.name
          // }
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 10,
          top: 'middle',
          // top: 20,
          // align: 'right',
          // bottom: 20,
          itemWidth: 8,
          itemHeight: 8,
          data: ['Apples', 'Strawberries', 'Bananas', 'Oranges', 'Pears', 'Pineapples', 'Grapes']
        },
        series: [
          {
            name: 'pie chart1',
            type: 'pie',
            radius: '50%',
            // center: ['100%', '50%'],
            data: [
              {
                name: 'Apples',
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
            label: {
              position: 'outer',
              alignTo: 'none',
              bleedMargin: 5
            },
            left: 0,
            top: 0
          }
        ]
      }

      let chart = window.echarts.init(this.$refs.chartView, 'light')
      chart.setOption(option, true)
    }
  }
</script>
<style lang="stylus"></style>
