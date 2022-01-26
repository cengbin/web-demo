<template>
  <div class="appa">
    <div>
      <a href="https://echarts.apache.org/examples/zh/index.html" target="_blank">echarts 实例</a>
      <a href="https://echarts.apache.org/zh/option.html#title" target="_blank">echarts 配置项</a>
      <WordCloudChart></WordCloudChart>
      <BarChart></BarChart>
      <BarStackedChart></BarStackedChart>
      <PieChart></PieChart>
      <RectangleTreeChart></RectangleTreeChart>
      <LineChart></LineChart>
    </div>
  </div>
</template>

<script>
  import BarChart from './chart/BarChart'
  import BarStackedChart from './chart/BarStackedChart'
  import LineChart from './chart/LineChart'
  import PieChart from './chart/PieChart'
  import RectangleTreeChart from './chart/RectangleTreeChart'
  import WordCloudChart from './chart/WordCloudChart'

  export default {
    name: 'app-a',
    components: {
      BarStackedChart,
      PieChart,
      BarChart,
      LineChart,
      WordCloudChart,
      RectangleTreeChart
    },
    mounted () {
      console.log('appa:', this.$router)
    }
  }
</script>
<style lang="stylus"></style>
