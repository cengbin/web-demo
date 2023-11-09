<template>
  <div>
    <div>
      <a href="https://echarts.apache.org/examples/zh/index.html" target="_blank">echarts 实例</a>
      <a href="https://echarts.apache.org/zh/option.html#title" target="_blank">echarts 配置项</a>
    </div>

    <PieChart2></PieChart2>
    <br/>
    <br/>
    <BarChart2></BarChart2>
    <BarChart></BarChart>
    <BarStackedChart></BarStackedChart>
    <PieChart></PieChart>
    <RectangleTreeChart></RectangleTreeChart>
    <LineChart></LineChart>
    <WordCloudChart></WordCloudChart>
  </div>
</template>

<script>
  import BarChart from './chart/BarChart'
  import BarChart2 from './chart/BarChart2'
  import BarStackedChart from './chart/BarStackedChart'
  import LineChart from './chart/LineChart'
  import PieChart from './chart/PieChart'
  import PieChart2 from './chart/PieChart2'
  import RectangleTreeChart from './chart/RectangleTreeChart'
  import WordCloudChart from './chart/WordCloudChart'

  export default {
    name: 'echart',
    components: {
      BarStackedChart,
      PieChart,
      PieChart2,
      BarChart,
      BarChart2,
      LineChart,
      WordCloudChart,
      RectangleTreeChart
    },
  }
</script>
