import { message } from './_helpers'

export default {
  namespaced: true,
  state: {
    name: '',
    password: '',
    role: '',
    description: ''
  },
  actions: {
    login ({ commit, state, dispatch, rootState }, config) {
      commit('camomile/create', config.url, { root: true })
      return rootState.camomile.api
        .login(config.user.name, config.user.password)
        .then(r => {
          commit('passwordSet', config.user)
          commit('camomile/logIn', null, { root: true })
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
          commit('camomile/logOut', null, { root: true })
          commit('camomile/delete', null, { root: true })
          dispatch('camomile/utils/userReset', null, { root: true })
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
          commit('camomile/utils/userPopupHide', null, { root: true })
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
    },
    unset (state) {
      state.name = ''
      state.password = ''
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
