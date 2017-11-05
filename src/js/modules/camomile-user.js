export default {
  state: {
    name: '',
    password: '',
    loggedin: false
  },
  actions: {
    login ({ commit, state, dispatch, rootState }, options) {
      commit('apiCreate', options.url)
      commit('error', '')
      return rootState.camomile.api
        .login(options.user.name, options.user.password)
        .then(r => {
          commit('set', options.user)
          return dispatch('authentication')
        })
        .catch(e => {
          console.log(e)
          commit('error', e.message)
          commit('unset')
        })
    },

    logout ({ commit, state, dispatch, rootState }) {
      return rootState.camomile.api
        .logout()
        .then(r => {
          commit('unset')
        })
        .catch(e => {
          console.log(e)
          commit('error', e.message)
          commit('unset')
        })
    },

    authentication ({ commit, state, rootState }) {
      return rootState.camomile.api
        .me()
        .then(user => {
          console.log('user', user)
        })
        .catch(err => {
          console.log('err', err)
          commit('error', e.message)
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
