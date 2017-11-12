export default {
  namespaced: true,
  state: {
    visible: false,
    config: {}
  },
  mutations: {
    close (state) {
      state.visible = false
      state.config = {}
    },
    open (state, config) {
      state.visible = true
      state.config = config
    }
  }
}
