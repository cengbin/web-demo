import TreeMindMap from '../pages/tree-mind-map'
import DomTree from '../pages/dom-tree'
import FlowChart from '../pages/flow/flow'
import Nana from '../pages/nana/nana'
import XMind from '../pages/xmind/xmind'
import Login from '../pages/login'
import Registration from '../pages/registration'

import dashboard from '../assets/images/dashboard.png'
import members from '../assets/images/members.png'
import messages from '../assets/images/messages.png'
import projects from '../assets/images/projects.png'
import reports from '../assets/images/reports.png'
import rewards from '../assets/images/rewards.png'
import setting from '../assets/images/setting.png'
import videochat from '../assets/images/video-chat.png'

export default [
  {
    path: '/login',
    meta: {
      title: '登陆页',
      icon: dashboard,
    },
    component: Login,
  },
  {
    path: '/registration',
    meta: {
      title: '注册页',
      icon: members,
    },
    component: Registration,
  },
  {
    path: '/dag',
    meta: {
      title: 'DAG数据可视化'
    },
    component: () => import(/* webpackChunkName: "DAG" */'../pages/DAG/dag')
  },
  {
    path: '/nana',
    meta: {
      title: '照片墙（多列展示自适应布局）',
      icon: messages,
    },
    component: Nana,
  },
  {
    path: '/flow-chart',
    meta: {
      title: '流程图',
      icon: projects,
    },
    component: FlowChart,
  },
  {
    path: '/tree-mind-map1',
    meta: {
      title: '树状思维导图1',
      icon: reports,
    },
    component: TreeMindMap,
  },
  {
    path: '/tree-mind-map2',
    meta: {
      title: '树状思维导图2',
      icon: rewards,
    },
    component: XMind,
  },
  {
    path: '/dom-tree',
    meta: {
      title: '浏览器DOM结构可视化',
      icon: setting,
    },
    component: DomTree,
  },
  {
    path: '/echart',
    name: 'echart',
    meta: {
      title: 'EChart 图表',
      icon: videochat,
    },
    component: () => import(/* webpackChunkName: "Echart" */'../pages/echart')
  },
  {
    path: '/menu-search',
    meta: {
      title: '菜单搜索高亮显示',
      icon: videochat,
    },
    component: () => import(/* webpackChunkName: "menu-search" */'../pages/menu-search')
  }
]
