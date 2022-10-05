<template>
  <div>
    <div :ref="'chartView'" style="width:500px;height:400px;"></div>
    <button @click="onClickHor">横向显示</button>
  </div>
</template>

<script>
  let option = {
    title: {
      text: '柱状图',
      top: 0
    },
    tooltip: {
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['线下', '线上']
    },
    xAxis: {
      type: 'category',
      data: ['01/01', '01/02', '01/03', '01/04', '01/05', '01/06', '01/07'],
      name: '日期'
    },
    yAxis: {
      type: 'value',
      name: '总量'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        name: '线下',
        showBackground: true, // 显示柱状背景色
        backgroundStyle: { // 设置柱状背景色
          color: 'rgba(180, 180, 180, 0.2)'
        }
      },
      {
        data: [220, 182, 191, 234, 290, 234, 290],
        type: 'bar',
        name: '线上'
      }
    ]
  }

  export default {
    name: 'app-a',
    mounted () {
      let chart = window.echarts.init(this.$refs.chartView, 'light')
      chart.setOption(option, true)
    },
    methods: {
      onClickHor () {
        let xAxis = option.xAxis
        option.xAxis = option.yAxis
        option.yAxis = xAxis

        let chart = window.echarts.init(this.$refs.chartView, 'light')
        chart.setOption(option, true)
      }
    }
  }
</script>
<style lang="stylus"></style>
