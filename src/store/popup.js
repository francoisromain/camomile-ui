import Vue from 'vue'

export const state = {
  visible: false,
  config: {},
  element: {}
}

export const mutations = {
  open (state, { config, element }) {
    state.visible = true
    state.config = config
    state.element = JSON.parse(JSON.stringify(element))
  },

  close (state) {
    state.visible = false
    state.config = {}
  },

  fieldUpdate (state, { name, value }) {
    Vue.set(state.element, name, value)
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
