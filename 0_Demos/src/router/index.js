import Demo1 from '../pages/Demo1/Demo1'
import Demo2 from '../pages/Demo2/Demo2'
import AppA from '../pages/AppA/AppA'
import AppC from '../pages/AppC/AppC'
import AppE from '../pages/AppE/AppE'
import FlowChart from '../pages/flow/flow'
import DAG from '../pages/DAG/dag'
import Nana from '../pages/nana/nana'
import XMind from '../pages/xmind/xmind'

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export let routes = [
  {
    path: '/xmind',
    name: 'nana',
    meta: {
      title: '思维导图可视化'
    },
    component: XMind,
  },
  {
    path: '/nana',
    name: 'nana',
    meta: {
      title: '欧阳娜娜'
    },
    component: Nana,
  },
  {
    path: '/flow',
    name: 'flow',
    meta: {
      title: '流程图'
    },
    component: FlowChart,
  },
  {
    path: '/dag',
    meta: {
      title: 'DAG数据可视化'
    },
    component: DAG,
  },
  {
    path: '/demo1',
    meta: {
      title: '省市数据图'
    },
    component: Demo1,
  },
  {
    path: '/demo2',
    meta: {
      title: '浏览器DOM结构可视化树图'
    },
    component: Demo2,
  },
  {
    path: '/app1',
    name: 'APP1',
    meta: {
      title: 'EChart 图表'
    },
    component: AppA
  },
  {
    path: '/app2',
    name: 'app2',
    meta: {
      title: 'PPT 报告'
    },
    component: () => import(/* webpackChunkName: "AppB" */'../pages/AppB/AppB')
  },
  {
    path: '/app3',
    name: 'APP3',
    meta: {
      title: '编辑器布局'
    },
    component: AppC
  },
  {
    path: '/app4',
    name: 'AppE',
    meta: {
      title: '菜单搜索高亮显示'
    },
    component: AppE
  }
]

const router = new Router({
  mode: 'hash',
  routes
})

export default router
