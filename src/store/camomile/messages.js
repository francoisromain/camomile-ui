export default {
  namespaced: true,
  state: {
    list: []
  },
  actions: {
    success ({ commit }, content) {
      commit('add', { content, type: 'success', id: new Date().valueOf() })
      setTimeout(_ => {
        commit('remove')
      }, 2000)
    },
    error ({ commit }, content) {
      commit('add', { content, type: 'error', id: new Date().valueOf() })
      setTimeout(_ => {
        commit('remove')
      }, 2000)
    }
  },
  mutations: {
    remove (state) {
      state.list.shift()
    },
    add (state, message) {
      state.list.push(message)
    }
  }
}
