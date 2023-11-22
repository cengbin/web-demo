<template>
  <div :ref="'chartView'" style="width:500px;height:400px;"></div>
</template>

<script>
  export default {
    name: 'wordcloudchart',
    mounted () {
      let option = {
        title: {
          text: '词云图',
          top: 0
        },
        series: [{
          type: 'wordCloud',
          gridSize: 8,
          sizeRange: [10, 30],
          rotationRange: [-90, 90],
          shape: 'pentagon',
          width: '100%',
          height: '100%',
          drawOutOfBound: true,
          textStyle: {
            normal: {
              color: function () {
                return 'rgb(' + [
                  parseInt(Math.random() * 160),
                  parseInt(Math.random() * 160),
                  parseInt(Math.random() * 160)
                ].join(',') + ')'
              }
            },
            emphasis: {
              shadowBlur: 10,
              shadowColor: '#333'
            }
          },
          data: [
            {
              'name': '蒜',
              'rank': 1,
              'value': '1'
            },
            {
              'name': '三元极致',
              'rank': 2,
              'value': '1'
            },
            {
              'name': '味全每日',
              'rank': 3,
              'value': '1'
            },
            {
              'name': '炭烧酸奶',
              'rank': 4,
              'value': '1'
            },
            {
              'name': '三元',
              'rank': 5,
              'value': '1'
            },
            {
              'name': 'chunniunai',
              'rank': 6,
              'value': '1'
            },
            {
              'name': '桃汁',
              'rank': 7,
              'value': '1'
            },
            {
              'name': '手抓饼',
              'rank': 8,
              'value': '1'
            },
            {
              'name': '姜',
              'rank': 9,
              'value': '1'
            },
            {
              'name': '方便面',
              'rank': 10,
              'value': '1'
            },
            {
              'name': '纯牛奶',
              'rank': 11,
              'value': '1'
            },
            {
              'name': '豆皮',
              'rank': 12,
              'value': '1'
            },
            {
              'name': '金龙鱼高筋',
              'rank': 13,
              'value': '1'
            },
            {
              'name': '芹菜',
              'rank': 14,
              'value': '1'
            },
            {
              'name': '纸巾',
              'rank': 15,
              'value': '1'
            },
            {
              'name': '笋',
              'rank': 16,
              'value': '1'
            },
            {
              'name': '豆腐',
              'rank': 17,
              'value': '1'
            },
            {
              'name': '蔬菜',
              'rank': 18,
              'value': '1'
            },
            {
              'name': 'sku173435',
              'rank': 19,
              'value': '1'
            },
            {
              'name': '香蕉',
              'rank': 20,
              'value': '1'
            },
            {
              'name': '豆腐干',
              'rank': 21,
              'value': '1'
            },
            {
              'name': 'sku190823',
              'rank': 22,
              'value': '1'
            },
            {
              'name': '牛奶',
              'rank': 23,
              'value': '1'
            },
            {
              'name': '清扬',
              'rank': 24,
              'value': '1'
            },
            {
              'name': '梦龙',
              'rank': 25,
              'value': '1'
            },
            {
              'name': '安慕希',
              'rank': 26,
              'value': '1'
            },
            {
              'name': '橙汁',
              'rank': 27,
              'value': '1'
            },
            {
              'name': '鸡蛋',
              'rank': 28,
              'value': '1'
            },
            {
              'name': '菜花',
              'rank': 29,
              'value': '1'
            },
            {
              'name': '鸡胸肉',
              'rank': 30,
              'value': '1'
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
