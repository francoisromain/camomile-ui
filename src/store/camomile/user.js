import { message } from './_utils'

export default {
  namespaced: true,
  state: {
    name: '',
    password: '',
    loggedin: false,
    settings: false,
    dropdown: false
  },
  actions: {
    login ({ commit, state, dispatch, rootState }, options) {
      commit('camomile/create', options.url, { root: true })
      return rootState.camomile.api
        .login(options.user.name, options.user.password)
        .then(r => {
          commit('set', options.user)
          message(dispatch, {
            name: 'user',
            type: 'success',
            content: r.success
          })
          return dispatch('authentication')
        })
        .catch(e => {
          const content = e.response
            ? e.response[rootState.camomile.config.axios ? 'data' : 'body']
              .error
            : 'Network error'

          message(dispatch, {
            name: 'user',
            type: 'error',
            content: content
          })
          commit('unset')
        })
    },

    logout ({ commit, state, dispatch, rootState }) {
      return rootState.camomile.api
        .logout()
        .then(r => {
          commit('unset')
          commit('camomile/delete', null, { root: true })
          message(dispatch, {
            name: 'user',
            type: 'warning',
            content: r.success
          })
        })
        .catch(e => {
          console.log(e)

          message(dispatch, {
            name: 'user',
            type: 'error',
            content:
              e.response[rootState.camomile.config.axios ? 'data' : 'body']
                .error
          })

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

          message(dispatch, {
            name: 'user',
            type: 'error',
            content:
              e.response[rootState.camomile.config.axios ? 'data' : 'body']
                .error
          })

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
      state.dropdown = false
      state.settings = false
    },
    settingsShow (state) {
      state.dropdown = false
      state.settings = true
    },
    settingsHide (state) {
      state.settings = false
    },
    dropdownToggle (state) {
      state.dropdown = !state.dropdown
    }
  },
  getters: {
    getUser (state) {
      return state.name
    }
  }
}
