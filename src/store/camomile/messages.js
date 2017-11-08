export default {
  namespaced: true,
  state: {
    list: []
  },
  actions: {
    create ({ commit }, message) {
      message.id = new Date().valueOf()
      commit('create', message)
      setTimeout(() => {
        commit('remove', message)
      }, 2000)
    }
  },
  mutations: {
    remove (state, message) {
      state.list.shift()
    },
    create (state, message) {
      state.list.push(message)
    }
  }
}
