import Vue from 'vue'
import app from './app.vue'
import { store } from './framework/store/store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

new Vue({
  store: store,
  el: '#app',
  render: h => h(app)
})
