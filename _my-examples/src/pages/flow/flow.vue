<template>
  <div class="flow">
    <FlowItem :model="data"></FlowItem>
  </div>
</template>

<script>
import FlowItem from './flow-item'

export default {
  name: 'app1',
  components: {
    FlowItem,
  },
  data() {
    return {
      data: {
        id: 'root',
        name: 'root',
        type: 'ROOT',
        children: [
          {id: 1, name: '开始', type: 'START'},
          {
            id: 2,
            type: 'CONDITIONS',
            children: [
              {
                id: 1,
                name: '机器人',
                type: 'NODE',
                children: [
                  {
                    id: 1,
                    name: '机器人',
                    type: 'NODE'
                  }
                ]
              },
              {
                id: 2,
                name: '机器人',
                type: 'NODE',
                children: [
                  {
                    id: 10,
                    name: '机器人',
                    type: 'NODE'
                  },
                  {
                    id: 1,
                    name: '条件',
                    type: 'CONDITIONS',
                    children: [
                      {
                        id: 1,
                        name: '机器人',
                        type: 'NODE',
                        children: [
                          {
                            id: 1,
                            name: '机器人',
                            type: 'NODE'
                          },
                        ]
                      },
                      {
                        id: 2,
                        name: '机器人',
                        type: 'NODE',
                        children: [
                          {id: 1, name: '机器人', type: 'NODE'},
                          {id: 2, name: '机器人', type: 'NODE'},
                          {id: 3, name: '机器人', type: 'NODE'},
                          {id: 4, name: '机器人', type: 'NODE'},
                        ]
                      }
                    ]
                  },
                  {id: 12, name: '机器人', type: 'NODE'},
                  {id: 13, name: '机器人', type: 'NODE'},
                ]
              },
            ]
          },
          {id: 2, name: '机器人', type: 'NODE'},
          {id: 3, name: '结束', type: "END"},
        ]
      }
    }
  },
  computed: {},
  methods: {},
  mounted() {},
}
</script>

<style src="./flow.styl"></style>
