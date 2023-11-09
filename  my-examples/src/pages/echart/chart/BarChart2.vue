<template>
  <div class="bar-chart">
    <div class="bar-chart-container" :ref="'chartView'" style="width:500px;height:400px;"></div>
  </div>
</template>

<script>
  let option = {
    tooltip: {
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      show: true,
      top: 0,
      right: 40,
      itemWidth: 9,
      itemHeight: 9,
      selectedMode: false,
      itemStyle: {
        color: '#1890FF',
      },
      textStyle: {
        color: "#E6F7FF",
        fontFamily: "PingFang SC-Regular, PingFang SC",
        fontSize: 14,
        fontWeight: 400,
        lineHeight: 40,
      },
      formatter() {
        return '销售额/元'
      },
      data: [
        {
          name: '销售额',
        }
      ]
    },
    tooltip: {
      show: true,
      formatter:'{b} {a}: <br />{c} 元'
    },
    xAxis: {
      type: 'category',
      axisLine: {
        lineStyle: {
          color: '#BAE7FF',
          width: 1
        }
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: 'rgba(230,247,255,0.5)'
      },
      data: [
        '1日',
        '2日',
        '3日',
        '4日',
        '5日',
        '6日',
        '7日',
        '8日',
        '9日',
        '10日',
        '11日',
        '12日',
        '13日',
        '14日',
        '15日',
        '16日',
        '17日',
        '18日',
        '19日',
        '20日',
        '21日',
        '22日',
        '23日',
        '24日',
        '25日',
        '26日',
        '27日',
        '28日',
      ]
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: 'rgba(230,247,255,0.5)'
      },
      splitLine: {
        lineStyle: {
          color: "rgba(230,247,255,0.2)",
          type: "dashed",
        }
      }
    },
    dataZoom: [
      {
        type: 'inside',
        zoomLock: true,
        orient: 'horizontal',
        start: 0,
        end: 30
      },
    ],
    series: [
      {
        data: [120, 200, 150, 20, 70, 110, 130, 320, 200, 150, 80, 70, 110, 530, 120, 200, 150, 280, 70, 310, 130, 120, 100, 150, 80, 70, 610, 130],
        name: '销售额',
        type: 'bar',
        barWidth: 13,
        barMinWidth: 13,
        barMaxWidth: 13,
        barGap: '20%',
        barCategoryGap: '20',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {offset: 0, color: '#0EECE4'},
            {offset: 1, color: '#058FE7'}
          ])
        },
        animation: false,

      }
    ]
  }

  export default {
    name: 'bar-chart',
    mounted() {
      let chart = window.echarts.init(this.$refs.chartView, 'light')
      chart.setOption(option, true)
    },
    methods: {}
  }
</script>
<style lang="stylus" scoped>
  .bar-chart {
    display: inline-block;
    padding: 16px;
    background-color: #090f33;
    .bar-chart-container {
      display: inline-block;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.2) 100%);
      border-radius: 32px 32px 32px 32px;
    }
  }
</style>
