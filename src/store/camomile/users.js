import { message } from './_utils'

export default {
  namespaced: true,
  state: {
    list: []
  },
  actions: {
    create ({ commit, state, dispatch, rootState }, user) {
      return rootState.camomile.api
        .createUser(user.name, user.password, user.description, user.role)
        .then(r => {
          // commit('add', config.user)
          console.log('rrr: ', r)
          message(dispatch, {
            type: 'success',
            content: r
          })
        })
        .catch(e => {
          console.log('eee: ', e)
          message(dispatch, {
            type: 'error',
            content: e
          })
          commit('unset')
        })
    }
  },
  mutations: {
    remove (state, message) {
      state.list.shift()
    },
    add (state, user) {
      state.list.push(message)
    }
  }
}
