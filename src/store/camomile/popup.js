export default {
  namespaced: true,
  state: {
    visible: false,
    config: {}
  },
  mutations: {
    open (state, config) {
      console.log('open', config)
      state.visible = true
      state.config = config
    },
    close (state) {
      state.visible = false
      state.config = {}
    }
  }
}
