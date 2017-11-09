export default {
  namespaced: true,
  state: {
    list: []
  },
  actions: {
    add ({ commit }, message) {
      message.id = new Date().valueOf()
      commit('add', message)
      setTimeout(() => {
        commit('remove', message)
      }, 2000)
    }
  },
  mutations: {
    remove (state, message) {
      state.list.shift()
    },
    add (state, message) {
      state.list.push(message)
    }
  }
}
