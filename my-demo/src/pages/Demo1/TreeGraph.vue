<template>
  <div>
    <TreeList :root="true"
              :model="regionList"
              :currentItem="currentRegion"
              @CLICK_TREE_ITEM="onClickRegin"></TreeList>

    <TreeList v-if="currentRegion && currentRegion.children"
              :model="currentRegion.children"
              :currentItem="currentCity"
              :start="currentRegionIndex"
              :end="currentCityIndex"
              @CLICK_TREE_ITEM="onClickCity">
    </TreeList>

    <TreeList v-if="currentCity && currentCity.children"
              :leaf="true"
              :model="currentCity.children"
              :currentItem="currentStreet"
              :start="currentCityIndex"
              :end="currentStreetIndex"
              @CLICK_TREE_ITEM="onClickStreet">
    </TreeList>
  </div>
</template>

<script>
  import TreeList from './TreeList'

  export default {
    name: 'tree-graph',
    data () {
      return {
        regionList: [
          {
            name: '北京市',
            percent: '63.2%',
            active: false,
            children: [
              {
                name: '海淀区',
                percent: '83.2%',
                active: false,
                children: [
                  {
                    name: '三里屯街道',
                    percent: '1.2%',
                    active: false
                  },
                  {
                    name: '望京街道',
                    percent: '2.2%',
                    active: false
                  },
                  {
                    name: '青年路街道',
                    percent: '3.2%',
                    active: false
                  }
                ]
              },
              {
                name: '朝阳区',
                percent: '93.2%',
                active: false,
                children: [
                  {
                    name: '三里屯街道1',
                    percent: '1.2%',
                    active: false
                  },
                  {
                    name: '三里屯街道2',
                    percent: '1.2%',
                    active: false
                  }
                ]
              },
              {
                name: '丰台区',
                percent: '63.2%',
                children: [
                  {
                    name: '海淀区1',
                    percent: '63.2%',
                    active: false
                  },
                  {
                    name: '海淀区2',
                    percent: '63.2%',
                    active: false
                  }
                ]
              }
            ]
          },
          {
            name: '天津市',
            percent: '63.2%',
            active: false,
            children: [
              {
                name: '滨海区',
                percent: '63.2%',
                active: false,
                children: [
                  {
                    name: '海淀新区',
                    percent: '63.2%',
                    active: false
                  },
                  {
                    name: '海淀区',
                    percent: '63.2%',
                    active: false
                  }
                ]
              },
              {
                name: '东城区',
                percent: '63.2%',
                active: false,
                children: [
                  {
                    name: '海淀区1',
                    percent: '63.2%',
                    active: false
                  },
                  {
                    name: '海淀区2',
                    percent: '63.2%',
                    active: false
                  }
                ]
              },
              {
                name: '西城区',
                percent: '63.2%',
                active: false
              }
            ]
          }
        ],
        currentRegion: null,
        currentRegionIndex: 0,
        currentCity: null,
        currentCityIndex: 0,
        currentStreet: null,
        currentStreetIndex: 0
      }
    },
    watch: {
      currentRegion (newVal, oldVal) {
        this.currentRegionIndex = this.regionList.indexOf(newVal)
        this.currentCity = (newVal.children && newVal.children.length && newVal.children[0]) || null
      },
      currentCity (newVal, oldVal) {
        this.currentCityIndex = (this.currentRegion && this.currentRegion.children && this.currentRegion.children.indexOf(newVal)) || 0
        this.currentStreet = (newVal.children && newVal.children.length && newVal.children[0]) || null
      },
      currentStreet (newVal, oldVal) {
        this.currentStreetIndex = (this.currentCity && this.currentCity.children && this.currentCity.children.indexOf(newVal)) || 0
      }
    },
    methods: {
      onClickRegin (item) {
        if (this.currentRegion !== item) this.currentRegion = item
      },
      onClickCity (item) {
        if (this.currentCity !== item) this.currentCity = item
      },
      onClickStreet (item) {
        if (this.currentStreet !== item) this.currentStreet = item
      }
    },
    created () {
      this.currentRegion = this.regionList[0]
      // this.currentRegion.active = true
    },
    components: {
      TreeList
    }
  }
</script>

<style scoped>

</style>
