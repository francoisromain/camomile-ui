import { messageDispatch, userFormat, errorFormat } from './_helpers'

export default {
  namespaced: true,
  state: {
    id: '',
    name: '',
    role: '',
    description: ''
  },
  actions: {
    login ({ commit, state, dispatch, rootState }, config) {
      commit('camomile/create', config.url, { root: true })
      return rootState.camomile.api
        .login(config.user.name, config.user.password)
        .then(r => {
          dispatch('camomile/login', null, { root: true })
          messageDispatch('success', r.success, dispatch)
          dispatch('set')
          return r
        })
        .catch(e => {
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)
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
          messageDispatch('success', r.success, dispatch)
          return r.success
        })
        .catch(e => {
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)
          commit('unset')
          throw error
        })
    },

    set ({ commit, dispatch, state, rootState }) {
      return rootState.camomile.api
        .me()
        .then(r => {
          const user = userFormat(r)
          dispatch('camomile/users/groupIdsList', user, { root: true })
          commit('set', user)
          dispatch('camomile/set', user, { root: true })
          return user
        })
        .catch(e => {
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)
          commit('unset')
          throw error
        })
    }
  },
  mutations: {
    set (state, user) {
      state.name = user.name
      state.description = user.description
      state.id = user.id
      state.role = user.role
      state.groupIds = user.groupIds
    },
    unset (state) {
      state.name = ''
      state.password = ''
    }
  }
}
