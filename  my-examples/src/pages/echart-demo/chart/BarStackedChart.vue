<template>
  <div>
    <div :ref="'chartView'" style="width:500px;height:400px;"></div>
    <button>横向显示</button>
    <button>纵向显示</button>
  </div>
</template>

<script>
  export default {
    name: 'app-a',
    mounted () {
      let option = {
        title: {
          text: '堆叠柱状图',
          top: 20
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        series: [
          {
            name: '直接访问',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: [1, 0, 0, 0, 1, 2, 3]
          },
          {
            name: '邮件营销',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: [2, 1, 1, 1, 0]
          },
          {
            name: '联盟广告',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: [3, 0, 0, 0, 0]
          },
          {
            name: '视频广告',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: [4, 0, 0, 0, 0]
          },
          {
            name: '搜索引擎',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: [5, 0, 0, 0, 0]
          }
        ]
      }

      let chart = window.echarts.init(this.$refs.chartView, 'light')
      chart.setOption(option, true)
    }
  }
</script>
<style lang="stylus"></style>
