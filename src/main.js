// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import transform from './store/transform'
// import App from './Rotate'
Vue.config.productionTip = false
import store from './store/transform'


/* eslint-disable no-new */
new Vue({
  store,
  // transform,
  el: '#app',
  components: { App },
  template: '<App/>'
})
