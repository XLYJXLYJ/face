import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import NotFound from '@/components/404'
import Page4 from '@/components/Page4'
import Page5 from '@/components/Page5'
import Page6 from '@/components/Page6'
import Page7 from '@/components/Page7'

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
      name: '设备',
      iconCls: 'fa fa-microchip',
      children: [
          { path: '/page4', component: Page4, name: '设备IP' },
          { path: '/page5', component: Page5, name: '设备参数' },
          { path: '/page6', component: Page6, name: '其他' },
          { path: '/page7', component: Page7, name: '设备方向' }
      ]
  },
  ]
})
