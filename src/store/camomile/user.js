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
    login ({ commit, state, dispatch, rootState }, config) {
      commit('camomile/create', config.url, { root: true })
      return rootState.camomile.api
        .login(config.user.name, config.user.password)
        .then(r => {
          commit('passwordSet', config.user)
          message(dispatch, {
            type: 'success',
            content: r.success
          })
          return dispatch('me')
        })
        .catch(e => {
          const content = e.response
            ? e.response[rootState.camomile.config.axios ? 'data' : 'body']
              .error
            : 'Network error'

          message(dispatch, {
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
            type: 'success',
            content: r.success
          })
        })
        .catch(e => {
          console.log(e)
          message(dispatch, {
            type: 'error',
            content:
              e.response[rootState.camomile.config.axios ? 'data' : 'body']
                .error
          })

          commit('unset')
        })
    },

    me ({ commit, dispatch, state, rootState }) {
      return rootState.camomile.api
        .me()
        .then(user => {
          commit('set', user)
        })
        .catch(e => {
          console.log('e', e)
          message(dispatch, {
            type: 'error',
            content:
              e.response[rootState.camomile.config.axios ? 'data' : 'body']
                .error
          })
          commit('unset')
        })
    },

    update ({ commit, dispatch, state, rootState }, user) {
      return rootState.camomile.api
        .updateUser(user.id, {
          password: user.password,
          role: user.role,
          description: user.description
        })
        .then(r => {
          commit('settingsHide')
          message(dispatch, {
            type: 'success',
            content: 'User updated'
          })
        })
        .catch(e => {
          console.log(e)
          message(dispatch, {
            type: 'error',
            content:
              e.response[rootState.camomile.config.axios ? 'data' : 'body']
                .error
          })
        })
    }
  },
  mutations: {
    set (state, user) {
      state.name = user.username
      state.id = user._id
      state.description = user.description
      state.role = user.role
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
    },
    passwordSet (state, user) {
      state.password = user.password
    }
  },
  getters: {
    getUser (state) {
      return state.name
    }
  }
}
