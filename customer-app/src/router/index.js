import Vue from 'vue'
import VueRouter from 'vue-router'
import Shouye from '../pages/zhuye/Shouye.vue'
import { getToken } from '../utils/auth'
import { Toast } from 'vant'
import store from '../store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/shouye',
    name: 'shouye',
    component: Shouye,
    beforeEnter: (to, from, next) => {  //属于路由自己的拦截器
      let token = getToken();
      if(token){
        // 查询info
        store.dispatch('login/info',token)
        .then(()=>{
          // 当获取万用户信息之后才允许跳转
          next();
        })
      } else {
        Toast("token失效")
        // 跳转到登录
        next({path:'/'})
      }
    },
    // beforeEnter: (to,from,next) => {
    //   let token = getToken();
    //   if(token){
    //     // 查询info
    //     store.dispatch('login/info',token)
    //     .then(()=>{
    //       // 跳转到后台主页
    //       next();
    //     })
    //   } else {
    //     Toast('登录失效，请重新登录')
    //     // 跳转到登录
    //     next({path:'/'});
    //   }
    // },
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
  },
  {
    path:'/addressedit',
    component: () => import('../pages/ziye/Address-edit.vue'),
  },
  {
    path:'/shouye/home/search',
    component: () => import('../pages/ziye/Search.vue'),
  },
  {
    path:'/product',
    component: () => import('../pages/ziye/Product.vue'),
  },
  {
    path:'/shouye/order/orderreal',
    component: () => import('../pages/ziye/OrderReal.vue'),
  },
  {
    path:'/shouye/order/orderreal/selectaddress',
    component: () => import('../pages/ziye/Select-address.vue'),
  },
  {
    path:'/shopcar',
    component: () => import('../pages/ziye/ShopCar.vue'),
  },
  {
    path:'/shopcarorderreal',
    component: () => import('../pages/ziye/ShopcarOrderReal.vue'),
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
