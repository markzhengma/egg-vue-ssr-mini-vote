import Vue from 'vue'
import app from './app.vue'
import { store } from './framework/store/store'

new Vue({
  store: store,
  el: '#app',
  render: h => h(app)
})
