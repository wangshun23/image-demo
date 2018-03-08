import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    trans: {
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      src: '',
      rotate: 0,
      zIndex: 0,
      stage:{
        x: 0,
        y: 0
      }
    }
  }
})

export default store
