// import Camomile from '../../../../camomile-client-javascript' /* debug with local version */
import Camomile from 'camomile-client'
import camomile from '../../js/api' /* axios api */
import config from './_config.js'

import popup from './popup'
import dropdown from './dropdown'
import messages from './messages'
import user from './user'
import users from './users'
import groups from './groups'
import corpus from './corpus'
import viewport from './viewport'

export default {
  namespaced: true,
  modules: {
    viewport,
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
      commit('cml/popup/close', null, { root: true })
    },
    logout ({ commit, dispatch, state }) {
      commit('cml/popup/close', null, { root: true })
      commit('cml/dropdown/close', null, { root: true })
      commit('logout')
      commit('delete')
    },
    set ({ commit, dispatch, state }, user) {
      if (user.role === 'admin') {
        commit('adminSet')
      }

      if (user.username === 'root') {
        commit('rootSet')
      }
      Promise.all([
        new Promise((resolve, reject) =>
          dispatch('cml/users/list', { messageHide: true }, { root: true })
            .then(r => resolve(r))
            .catch(e => reject(e))
        ),
        new Promise((resolve, reject) =>
          dispatch('cml/groups/list', { messageHide: true }, { root: true })
            .then(r => resolve(r))
            .catch(e => reject(e))
        )
      ]).then(res => {
        dispatch('cml/corpus/list', null, { root: true })
      })
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
