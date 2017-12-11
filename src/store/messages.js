import { dateCurrent } from './_helpers'

export const state = {
  list: []
}

export const actions = {
  success ({ commit }, content) {
    commit('add', { content, type: 'success', id: dateCurrent() })
    setTimeout(_ => {
      commit('remove')
    }, 2000)
  },

  error ({ commit }, content) {
    commit('add', { content, type: 'error', id: dateCurrent() })
    setTimeout(_ => {
      commit('remove')
    }, 2000)
  }
}

export const mutations = {
  remove (state) {
    state.list.shift()
  },

  add (state, message) {
    state.list.push(message)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
