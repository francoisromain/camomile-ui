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
          dispatch('camomile/login', null, { root: true })
          message(dispatch, {
            type: 'success',
            content: r.success
          })
          return dispatch('set')
        })
        .catch(e => {
          const error = e.response
            ? e.response[rootState.camomile.config.axios ? 'data' : 'body']
              .error
            : 'Network error'

          message(dispatch, {
            type: 'error',
            content: error
          })
          commit('unset')
          throw error
        })
    },

    logout ({ commit, state, dispatch, rootState }) {
      return rootState.camomile.api
        .logout()
        .then(r => {
          commit('unset')
          dispatch('camomile/logout', null, { root: true })
          message(dispatch, {
            type: 'success',
            content: r.success
          })
          return r.success
        })
        .catch(e => {
          console.log(e)
          const error =
            e.response[rootState.camomile.config.axios ? 'data' : 'body'].error
          message(dispatch, {
            type: 'error',
            content: error
          })
          commit('unset')
          throw error
        })
    },

    set ({ commit, dispatch, state, rootState }) {
      return rootState.camomile.api
        .me()
        .then(user => {
          commit('set', user)
          dispatch('camomile/set', user, { root: true })
          return user
        })
        .catch(e => {
          console.log('e', e)
          const error =
            e.response[rootState.camomile.config.axios ? 'data' : 'body'].error
          message(dispatch, {
            type: 'error',
            content: error
          })
          commit('unset')
          throw error
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
  }
}
