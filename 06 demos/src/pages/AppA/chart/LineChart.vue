<template>
  <div :ref="'chartView'" style="width:500px;height:400px;"></div>
</template>

<script>
  export default {
    name: 'app-a',
    mounted () {
      let option = {
        title: {
          text: '折线图堆叠',
          top: 20
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          // boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '邮件营销',
            type: 'line',
            // xAxisIndex: 1,
            // stack: '总量', 数据堆叠，同个类目轴上系列配置相同的stack值后，后一个系列的值会在前一个系列的值上相加。
            data: [3, 0, 0, 0, 0],
            label: {
              normal: {
                show: true,
                formatter (params) {
                  return params.value
                }
              }
            }
          },
          {
            name: '联盟广告',
            type: 'line',
            // stack: '总量',
            data: [0, 1, 1, 1, 0]
          },
          {
            name: '视频广告',
            type: 'line',
            // stack: '总量',
            data: [0, 0, 0, 0, 0]
          },
          {
            name: '直接访问',
            type: 'line',
            // stack: '总量',
            data: [0, 0, 0, 0, 0]
          },
          {
            name: '搜索引擎',
            type: 'line',
            // stack: '总量',
            data: [0, 0, 0, 0, 0]
          }
        ]
      }

      let chart = window.echarts.init(this.$refs.chartView, 'light')
      chart.setOption(option, true)
    }
  }
</script>
<style lang="stylus"></style>
