import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'

import '@/assets/stylus/index.styl'

Vue.config.productionTip = false

FastClick.attach(document.body)

Vue.use(VueLazyload, {
  loading: require('@/assets/image/default.png')
})

BScroll.use(Slide)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
