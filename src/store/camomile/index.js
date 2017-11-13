// import Camomile from '../../../../camomile-client-javascript' /* debug with local version */
import Camomile from 'camomile-client'
import camomile from './api' /* axios api */
import config from '../../config.js'

import popup from './popup'
import dropdown from './dropdown'
import messages from './messages'
import user from './user'
import users from './users'
import groups from './groups'
import corpus from './corpus'

export default {
  namespaced: true,
  modules: {
    popup,
    dropdown,
    messages,
    user,
    users,
    groups,
    corpus
  },
  state: {
    url: '',
    api: null,
    config: config,
    isLogged: false,
    isAdmin: false,
    isRoot: false
  },
  actions: {
    login ({ commit, dispatch, state }) {
      commit('login')
      commit('camomile/popup/close', null, { root: true })
    },
    logout ({ commit, dispatch, state }) {
      commit('camomile/popup/close', null, { root: true })
      commit('camomile/dropdown/close', null, { root: true })
      commit('logout')
      commit('delete')
    },
    set ({ commit, dispatch, state }, user) {
      if (user.role === 'admin') {
        commit('adminSet')
        dispatch('camomile/users/list', null, { root: true })
        dispatch('camomile/groups/list', null, { root: true })
      }
      if (user.name === 'root') {
        commit('rootSet')
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
      state.isLogged = true
    },
    logout (state) {
      state.isLogged = false
      state.isAdmin = false
      state.isRoot = false
    },
    adminSet (state) {
      state.isAdmin = true
    },
    rootSet (state) {
      state.isRoot = true
    }
  }
}
