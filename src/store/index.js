import Vue from 'vue'
import Vuex from 'vuex'
import viewport from './modules/viewport'
import camomile from './camomile'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    viewport,
    camomile
  }
})
