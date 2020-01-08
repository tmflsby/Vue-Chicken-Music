import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

// 在控制台打印修改的日志
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

// 开发环境使用
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  debug,
  strict: debug,
  plugins: debug ? [createLogger()] : ''
})
