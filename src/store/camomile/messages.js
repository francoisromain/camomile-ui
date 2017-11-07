export default {
  namespaced: true,
  state: {
    user: {}
  },
  mutations: {
    reset (state, message) {
      state[message.name] = {}
    },
    create (state, message) {
      state[message.name] = message
    }
  }
}
