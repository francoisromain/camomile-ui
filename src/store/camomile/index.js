// import Camomile from require('../../../../camomile-client-javascript') /* debug with local version */
import Camomile from 'camomile-client'
import camomile from './api' /* axios api */
import config from '../../config.js'

import popup from './popup'
import dropdown from './dropdown'
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
    init ({ commit, dispatch, state }) {
      if (!state.logged) {
        commit(
          'camomile/popup/open',
          {
            user: { role: 'user' },
            title: 'Login',
            closeBtn: false,
            content: 'popupUserLogin'
          },
          { root: true }
        )
      }
    },
    login ({ commit, dispatch, state }) {
      commit('login')
      commit('camomile/popup/close', null, { root: true })
    },
    logout ({ commit, dispatch, state }) {
      console.log('logout')
      commit('camomile/popup/close', null, { root: true })
      commit('camomile/dropdown/close', null, { root: true })
      commit('logout')
      commit('delete')
      dispatch('init')
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
    popup,
    dropdown,
    messages,
    user,
    users
  }
}
