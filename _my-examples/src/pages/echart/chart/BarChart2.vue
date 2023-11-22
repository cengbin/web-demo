<template>
  <div class="bar-chart">
    <div class="bar-chart-container" :ref="'chartView'" style="width:325px;height:250px;"></div>
  </div>
</template>

<script>

  let max = 1003
  let left = 20
  if (max <= 1000) {
    left = 30
  } else if (max <= 10000) {
    left = 40
  } else if (max <= 100000) {
    left = 45
  } else if (max <= 1000000) {
    left = 55
  } else {
    left = 55
  }

  let option = {
    grid: {
      left,
      bottom: 40,
    },
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
      triggerOn: "click",
      backgroundColor: 'rgba(50,50,50,0.7)',
      borderWidth: 0,
      formatter: '{b} {a}: <br />{c} 元',
      textStyle: {
        color: "#ffffff",
      }
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
        // inverse: true,
        color: 'rgba(230,247,255,0.5)',
        interval: 0,
        rotate: 30
      },
      data: [
        '2023.1',
        '2023.2',
        '2023.3',
        '2023.4',
        '2023.5',
        '2023.6',
        '2023.7',
        '2023.8',
        '2023.9',
        '2023.10',
        '2023.11',
        '2023.12',
        '2023.13',
        '2023.14',
        '2023.15',
        '2023.16',
        '2023.17',
        '2023.18',
        '2023.19',
        '2023.20',
        '2023.21',
        '2023.22',
        '2023.23',
        '2023.24',
        '2023.25',
        '2023.26',
        '2023.27',
        '2023.28',
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
        // color: 'rgba(230,247,255,0.5)',
        color: 'red',
        width: 100,
      },
      splitLine: {
        lineStyle: {
          color: "rgba(230,247,255,0.2)",
          type: "dashed",
        }
      },
      // nameTextStyle: {
      //   width: 200,
      // }
    },
    dataZoom: [
      {
        type: 'inside',
        zoomLock: true,
        orient: 'horizontal',
        minSpan: 50,
        maxSpan: 50,
        start: 0,
        end: 28,
        rangeMode: ["value"]
      },
    ],
    series: [
      {
        data: [max, 200, 2, 120, 170, 110, 130, 320, 100, 150, 80, 70, 110, 530, 120, 200, 150, 280, 70, 310, 130, 120, 100, 150, 80, 70, 610, 130],
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
    }
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
