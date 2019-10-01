import React from 'react'
import LoadableComponent from '../utils/LoadableComponent'
const Users = LoadableComponent(import('./Users/index'), true);
const About = LoadableComponent(import('./About/index'), true);

const menu = [
  {
    name: '权限管理',
    icon: 'lock',
    key: 'Users',
  },
  {
    name: '组件',
    icon: 'appstore',
    key: 'conponents',
    children: [
      {
        name: '富文本编辑器',
        icon: '',
        key: 'Tinymce',
      },
      {
        name: 'MarkDown',
        icon: '',
        key: 'MarkDown',
      },
      {
        name: '头像上传',
        icon: '',
        key: 'AvatarUpload',
      },
      {
        name: 'Dropzone',
        icon: '',
        key: 'Dropzone',
      },
      {
        name: '列表拖拽',
        icon: '',
        key: 'DndList',
      },
      {
        name: '返回顶部',
        icon: '',
        key: 'BackToTop',
      },
    ]
  },
  {
    name: '图表',
    icon: 'pie-chart',
    key: 'Charts',
    children: [
      {
        name: '键盘图表',
        icon: '',
        key: 'KeyboardChart',
      },
      {
        name: '折线图',
        icon: '',
        key: 'LineChart',
      },
      {
        name: '混合图表',
        icon: '',
        key: 'MixChart',
      },
    ]
  },
  {
    name: '错误页面',
    icon: 'question-circle',
    key: 'error',
    children: [
      {
        name: '401',
        icon: '',
        key: 'ErrorOne',
      },
      {
        name: '404',
        icon: '',
        key: 'ErrorFour',
      },
    ]
  },
  {
    name: '关于',
    icon: 'info-circle',
    key: 'About'
  }
]

const tabs = {
  Users: <Users />,
  About: <About />

}

export { menu,tabs }

