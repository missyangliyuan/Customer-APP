import Vue from 'vue'
import VueRouter from 'vue-router'
import Shouye from '../pages/zhuye/Shouye.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/shouye',
    name: 'shouye',
    component: Shouye,
    children:[
      {
        path: 'home',
        component: () => import('../pages/zhuye/Home.vue')
      },
      {
        path: 'order',
        component: () => import('../pages/zhuye/Order.vue')
      },
      {
        path: 'mine',
        component: () => import('../pages/zhuye/Mine.vue'),
      }
    ]
  },
  {
    path: '/',
    name: 'login',
    component: () => import('../pages/Login.vue')
  },
  {
    path:'/address',
    component: () => import('../pages/ziye/Address.vue'),
  },
  {
    path:'/addressadd',
    component: () => import('../pages/ziye/Address-add.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
