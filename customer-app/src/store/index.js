import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import login from './login'
import mine from './mine'
import address from './address'
import addressadd from './address-add'
import home from './home'
import order from './order'
import shopcar from './shopcar'
import product from './product'


export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    login,
    mine,
    address,
    addressadd,
    home,
    order,
    shopcar,
    product,
  }
})
