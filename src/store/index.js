import Vue from 'vue'
import Vuex from 'vuex'
import menuStore from '@/store/modules/menu/menu.module.js'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    menuStore,
  },
})
