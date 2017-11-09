// import Camomile from require('../../../../camomile-client-javascript') /* debug with local version */
import Camomile from 'camomile-client'
import camomile from './api' /* axios api */
import config from '../../config.js'

import utils from './utils'
import user from './user'
import users from './users'
import messages from './messages'

export default {
  namespaced: true,
  state: {
    url: '',
    api: null,
    config: config,
    logged: false
  },
  actions: {
    login ({ commit, dispatch, state }) {
      commit('login')
    },
    logout ({ commit, dispatch, state }) {
      console.log('logout')
      dispatch('camomile/utils/userReset', null, { root: true })
      commit('logout')
      commit('delete')
    },
    set ({ commit, dispatch, state }, user) {
      if (user.role === 'admin') {
        dispatch('camomile/users/list', null, { root: true })
      }
    }
  },
  mutations: {
    create (state, url) {
      state.url = url
      state.api = state.config.axios ? camomile(url) : new Camomile(url)
    },
    delete (state) {
      state.url = ''
      state.api = null
    },
    login (state) {
      state.logged = true
    },
    logout (state) {
      state.logged = false
    }
  },
  modules: {
    utils,
    messages,
    user,
    users
  }
}
