import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    visible: false,
    config: {},
    element: {}
  },
  mutations: {
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
}
