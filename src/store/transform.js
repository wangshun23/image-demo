import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    files: [],
    stage:{
      x: 0,
      y: 0
    }
  }
})

export default store
