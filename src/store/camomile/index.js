import config from '../../config.js'

import viewport from './viewport'
import sync from './sync'
import popup from './popup'
import dropdown from './dropdown'
import messages from './messages'
import user from './user'
import users from './users'
import groups from './groups'
import corpus from './corpus'
import medias from './medias'
import layers from './layers'

export default {
  namespaced: true,

  modules: {
    viewport,
    sync,
    popup,
    dropdown,
    messages,
    user,
    users,
    groups,
    corpus,
    medias,
    layers
  },

  state: {
    api: null,
    config: config,
    isLogged: false,
    isAdmin: false,
    isRoot: false
  },

  actions: {
    login ({ commit, dispatch, state }) {
      commit('cml/popup/close', null, { root: true })
    },

    logout ({ commit, dispatch, state }) {
      dispatch('reset')
      commit('cml/popup/close', null, { root: true })
      commit('cml/dropdown/close', null, { root: true })
    },

    set ({ state, dispatch, commit }, user) {
      commit('login')

      if (user.role === 'admin') {
        commit('adminSet')
      }

      if (user.username === 'root') {
        commit('rootSet')
      }
      Promise.all([
        new Promise((resolve, reject) =>
          dispatch('cml/users/list', null, { root: true })
            .then(r => resolve(r))
            .catch(e => reject(e))
        ),
        new Promise((resolve, reject) =>
          dispatch('cml/groups/list', null, { root: true })
            .then(r => resolve(r))
            .catch(e => reject(e))
        )
      ]).then(res => {
        dispatch('cml/corpus/list', null, { root: true }).then(res => {
          const corpuIdDefault = state.corpus.list[0] && state.corpus.list[0].id
          if (corpuIdDefault) {
            dispatch('cml/corpus/corpuSet', corpuIdDefault, { root: true })
          }
        })
      })
    },

    reset ({ state, dispatch, commit }) {
      commit('logout')
      commit('delete')
      commit('cml/corpus/reset', null, { root: true })
      commit('cml/user/reset', null, { root: true })
      commit('cml/users/reset', null, { root: true })
      commit('cml/groups/reset', null, { root: true })
    },

    sync ({ state, dispatch, commit }) {
      dispatch('cml/users/list', {}, { root: true })
      dispatch('cml/groups/list', {}, { root: true })
      dispatch('cml/corpus/list', {}, { root: true })
    }
  },
  mutations: {
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
