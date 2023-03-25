import TreeMindMap from '../pages/tree-mind-map'
import DomTree from '../pages/dom-tree'
import FlowChart from '../pages/flow/flow'
import Nana from '../pages/nana/nana'
import XMind from '../pages/xmind/xmind'
import Login from '../pages/login'
import Registration from '../pages/registration'

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export let routes = [
  {
    path: '/login',
    meta: {
      title: '登陆页'
    },
    component: Login,
  },
  {
    path: '/registration',
    meta: {
      title: '注册页'
    },
    component: Registration,
  },
  /*{
    path: '/dag',
    meta: {
      title: 'DAG数据可视化'
    },
    component: () => import(/!* webpackChunkName: "DAG" *!/'../pages/DAG/dag')
  },*/
  {
    path: '/nana',
    meta: {
      title: '照片墙（多列展示自适应布局）'
    },
    component: Nana,
  },
  {
    path: '/flow-chart',
    meta: {
      title: '流程图'
    },
    component: FlowChart,
  },
  {
    path: '/tree-mind-map1',
    meta: {
      title: '树状思维导图1'
    },
    component: TreeMindMap,
  },
  {
    path: '/tree-mind-map2',
    meta: {
      title: '树状思维导图2'
    },
    component: XMind,
  },
  {
    path: '/dom-tree',
    meta: {
      title: '浏览器DOM结构可视化'
    },
    component: DomTree,
  },
  {
    path: '/echart',
    name: 'echart',
    meta: {
      title: 'EChart 图表'
    },
    component: () => import(/* webpackChunkName: "Echart" */'../pages/echart-demo')
  },
  {
    path: '/menu-search',
    meta: {
      title: '菜单搜索高亮显示'
    },
    component: () => import(/* webpackChunkName: "menu-search" */'../pages/menu-search')
  }
]

export default new Router({
  mode: 'hash',
  routes
})
