import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    visible: false,
    config: {}
  },
  mutations: {
    open (state, config) {
      state.visible = true
      state.config = config
    },
    close (state) {
      state.visible = false
      state.config = {}
    },
    objectFieldAdd (state, { name, field }) {
      Vue.set(state.config.element[name], field.key, field.value)
    },
    objectFieldRemove (state, { name, key }) {
      Vue.delete(state.config.element[name], key)
    }
  }
}
