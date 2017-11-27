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
import annotations from './annotations'

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
    layers,
    annotations
  },

  state: {
    config: config
  },

  actions: {
    set ({ dispatch }) {
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
        dispatch('cml/corpus/list', null, { root: true })
      })
    },

    reset ({ commit }) {
      commit('delete')
      commit('cml/user/reset', null, { root: true })
      commit('cml/users/reset', null, { root: true })
      commit('cml/groups/reset', null, { root: true })
      commit('cml/corpus/reset', null, { root: true })
      commit('cml/medias/reset', null, { root: true })
      commit('cml/layers/reset', null, { root: true })
    },

    sync ({ dispatch }) {
      dispatch('cml/users/list', null, { root: true })
      dispatch('cml/groups/list', null, { root: true })
      dispatch('cml/corpus/list', null, { root: true })
    }
  },
  mutations: {
    delete (state) {
      state.url = ''
      state.api = null
    }
  }
}
