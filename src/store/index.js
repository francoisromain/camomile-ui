import Vue from 'vue'
import Vuex from 'vuex'

import cml from './camomile'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cml
  }
})
