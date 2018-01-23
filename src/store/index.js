import Vue from 'vue'
import Vuex from 'vuex'

import config from '../config.js'

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

const modules = {
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
}

export const state = {
  config: config
}

export const actions = {
  set({ dispatch }) {
    Promise.all([
      ...['users', 'groups'].map(type =>
        dispatch(`cml/${type}/list`, {}, { root: true })
          .then(r => r)
          .catch(e => e)
      )
    ]).then(res => {
      dispatch('cml/corpus/listAll', null, { root: true })
    })
  },

  reset({ commit }) {
    commit('cml/user/reset', null, { root: true })
    commit('cml/users/reset', null, { root: true })
    commit('cml/groups/reset', null, { root: true })
    commit('cml/corpus/resetAll', null, { root: true })
    commit('cml/medias/resetAll', null, { root: true })
    commit('cml/layers/resetAll', null, { root: true })
    commit('cml/annotations/resetAll', null, { root: true })
  }
}

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cml: {
      namespaced: true,
      state,
      actions,
      modules
    }
  }
})
