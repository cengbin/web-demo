<template>
  <div class="flow-list">
    <template v-for="(flow, index) in children">
      <div class="flow-item" :class="{
              'flow-node start': flow.type === 'START',
              'flow-node end': flow.type === 'END',
              'flow-node': flow.type === 'NODE' || flow.type ==='ROBOT',
              'flow-condition condition': flow.type === 'CONDITION',
              'conditions': flow.type == 'CONDITIONS'
           }">

        <!-- 条件组 -->
        <template v-if="flow.type == 'CONDITIONS'">
          <div class="flow-th-line"></div>
          <div class="add-branch">
            <div class="add-branch-btn">
              <span>{{flow.type}}/{{flow.id}}</span>
              条件分支
            </div>
          </div>

          <div class="branches">
            <!-- 单个条件分支 -->
            <div class="flow-item flow-branch" v-for='branch,idx in flow.children' :key="idx">
              <div>{{flow.type}}/{{branch.id}}</div>
              <div class="top-line-place"></div>
              <div class="top-vertical-line"></div>

              <!-- 递归渲染 -->
              <flow-item v-if="branch.children && branch.children.length" :model="branch"></flow-item>

              <div class="bottom-vertical-line"></div>
              <div class="bottom-line-place"></div>
            </div>
          </div>
          <div class="flow-bh-line"></div>

          <!--<div class="flow-item flow-gw"
               :key="flow.id"
               v-if="flow.data.isConcurrent === true">
            <div class="flow-node-gw"></div>
            <div class="flow-vertical-line  flow-line"></div>
          </div>-->
        </template>

        <!-- 普通节点 -->
        <div v-else class="flow-node-wrap">
          <div class="node-title">{{flow.name}}</div>
          <div class="node-main">
            <span>{{flow.type}}/{{flow.id}}</span>
          </div>
          <i class="close">x</i>
        </div>

        <!-- 添加按钮组 -->
        <template v-if="flow.type != 'END'">
          <div class="flow-vertical-line"/>
          <div class="add-item-btn">
            <div>+</div>
            <div class="add-node-options-wrap">
              <div class="add-node-options">
                <div class="node-type type-node">
                  <div class="node-type-name">+ <b>机器人</b>节点</div>
                </div>
                <div class="node-type type-node">
                  <div class="node-type-name">+ <b>审批</b>节点</div>
                </div>
                <div class="node-type type-node">
                  <div class="node-type-name">+ <b>任务</b>节点</div>
                </div>
                <div class="node-type type-condition">
                  <div class="node-type-name">+ <b>条件</b>分支</div>
                </div>
                <div class="node-type type-condition">
                  <div class="node-type-name">+ <b>并行</b>分支</div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "flow-item",
  props: ['model'],
  data() {
    return {};
  },
  computed: {
    children() {
      return this.model.children;
    }
  },
  watch: {},
  created() {
    // console.log('havingRobot:', this.havingRobot)
  },
  methods: {}
};
</script>

<style src="./flow.styl" lang="stylus"></style>
