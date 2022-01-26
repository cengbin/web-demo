<template>
  <div :ref="'chartView'" style="width:500px;height:400px;"></div>
</template>

<script>
  export default {
    name: 'treemapchart',
    mounted () {
      let option = {
        title: {
          text: '矩形树图',
          top: 0
        },
        series: [{
          type: 'treemap',
          roam: false, // 是否开启拖拽漫游（移动和缩放）
          levels: [
            {
              color: ['#0083FF', '#539987', '#FFAD00', '#61ABFF', '#0EC268', '#FB8A53', '#FFC752']
            }
          ],
          data: [
            {
              'name': '卫生纸\n12.50%',
              'ratio': '12.50%',
              'value': 1
            },
            {
              'name': '方便面',
              'ratio': '12.50%',
              'value': 1
            },
            {
              'name': '卫生巾',
              'ratio': '12.50%',
              'value': 1
            },
            {
              'name': '茶汤类',
              'ratio': '12.50%',
              'value': 1
            },
            {
              'name': '薯片类',
              'ratio': '12.50%',
              'value': 1
            },
            {
              'name': '炒货',
              'ratio': '12.50%',
              'value': 1
            },
            {
              'name': '果汁饮料',
              'ratio': '12.50%',
              'value': 1
            },
            {
              'name': '保久奶',
              'ratio': '12.50%',
              'value': 1
            }
          ]
        }]
      }

      let chart = window.echarts.init(this.$refs.chartView)
      chart.setOption(option, true)
    }
  }
</script>
<style lang="stylus"></style>
