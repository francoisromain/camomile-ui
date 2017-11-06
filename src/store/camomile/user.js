export default {
  namespaced: true,
  state: {
    name: '',
    password: '',
    loggedin: false
  },
  actions: {
    login ({ commit, state, dispatch, rootState }, options) {
      commit('camomile/apiCreate', options.url, { root: true })
      commit('camomile/messages/reset', 'user', { root: true })
      return rootState.camomile.api
        .login(options.user.name, options.user.password)
        .then(r => {
          commit('set', options.user)
          commit(
            'camomile/messages/create',
            {
              name: 'user',
              type: 'success',
              content: r
            },
            { root: true }
          )
          return dispatch('authentication')
        })
        .catch(e => {
          commit(
            'camomile/messages/create',
            {
              name: 'user',
              type: 'error',
              content: e.message
            },
            { root: true }
          )
          commit('unset')
        })
    },

    logout ({ commit, state, dispatch, rootState }) {
      return rootState.camomile.api
        .logout()
        .then(r => {
          commit('unset')
          commit(
            'camomile/messages/create',
            {
              name: 'user',
              type: 'success',
              content: r
            },
            { root: true }
          )
        })
        .catch(e => {
          console.log(e)
          commit(
            'camomile/messages/create',
            {
              name: 'user',
              type: 'error',
              content: e.message
            },
            { root: true }
          )
          commit('unset')
        })
    },

    authentication ({ commit, state, rootState }) {
      return rootState.camomile.api
        .me()
        .then(r => {
          // commit(
          //   'camomile/messages/create',
          //   {
          //     name: 'me',
          //     type: 'success',
          //     content: r
          //   },
          //   { root: true }
          // )
        })
        .catch(e => {
          console.log('e', e)
          commit(
            'camomile/messageCreate',
            {
              name: 'user',
              type: 'error',
              content: e.message
            },
            { root: true }
          )
          commit('unset')
        })
    }
  },
  mutations: {
    set (state, user) {
      state.name = user.name
      state.password = user.password
      state.loggedin = true
    },
    unset (state) {
      state.name = ''
      state.password = ''
      state.loggedin = false
    }
  },
  getters: {
    getUser (state) {
      return state.name
    }
  }
}
