export default {
  namespaced: true,
  state: {
    user: {}
  },
  mutations: {
    reset (state, name) {
      state[name] = {}
    },
    create (state, message) {
      state[message.name] = message
    }
  }
}
