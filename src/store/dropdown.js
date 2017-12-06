export const state = {
  visible: false,
  config: {}
}

export const mutations = {
  close (state) {
    state.visible = false
    state.config = {}
  },
  open (state, config) {
    state.visible = true
    state.config = config
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
