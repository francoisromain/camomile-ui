import Vue from 'vue'
import Vuex from 'vuex'
import state from './state.js'

Vue.use(Vuex)

const mutations = {
  svgStatus (state, payload) {
    state.svg[payload.type] = payload.status
  },
  viewportSet (state, payload) {
    if (window.matchMedia('(min-width: 90em)').matches) {
      console.log('[viewport: large]')
      state.viewport.name = 'large'
      state.animate = true
    } else if (window.matchMedia('(min-width: 64em)').matches) {
      console.log('[viewport: desktop]')
      state.viewport.name = 'desktop'
      state.animate = true
    } else if (window.matchMedia('(min-width: 42em)').matches) {
      console.log('[viewport: tablet]')
      state.viewport.name = 'tablet'
      state.animate = false
    } else {
      console.log('[viewport: mobile]')
      state.viewport.name = 'mobile'
      state.animate = false
    }
    state.viewport.width = window.innerWidth
    state.viewport.height = window.innerHeight
  },
  svgSet (state, payload) {
    state.svg.scale =
      state.viewport.name === 'mobile' || state.viewport.name === 'tablet'
        ? 0.5
        : 1
    state.svg.height =
      state.viewport.name === 'mobile' || state.viewport.name === 'tablet'
        ? state.viewport.height - 288
        : state.viewport.height - 144
    state.svg.width =
      state.viewport.name === 'large'
        ? state.viewport.width - 48
        : state.viewport.width - 48
  },
  audioToggle (state) {
    state.audio = !state.audio
  }
}

const actions = {
  set (context) {
    context.commit('viewportSet')
    context.commit('svgSet')
  }
}

const getters = {}

const modules = {}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules
})
