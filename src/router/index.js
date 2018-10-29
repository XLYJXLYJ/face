import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import NotFound from '@/components/404'
import Page0 from '@/components/Page0'
import Page1 from '@/components/Page1'
import Page2 from '@/components/Page2'
import Page3 from '@/components/Page3'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      component: Login,
      name: '',
      hidden: true
    },
    {
      path: '/404',
      component: NotFound,
      name: '',
      hidden: true
    },
    {
      path: '/Home',
      component: Home,
      name: '人员',
      iconCls: 'fa fa-user-o',//图标样式class
      children: [
          { path: '/page0', component: Page0, name: '记录管理' },
      ]
    },
    {
      path: '/Home',
      component: Home,
      name: '照片',
      iconCls: 'fa fa-photo',//图标样式class
      children: [
          { path: '/page1', component: Page1, name: '照片管理' },
      ]
    },
    {
      path: '/Home',
      component: Home,
      name: '设备',
      iconCls: 'fa fa-microchip',//图标样式class
      children: [
          { path: '/page2', component: Page2, name: '设备管理' },
          { path: '/page3', component: Page3, name: '设备参数' },
      ]
    },
  ]
})
