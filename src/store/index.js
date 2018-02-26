// Vuex Store main entry point

import Vue from 'vue'
import Vuex from 'vuex'
import Camomile from 'camomile-client'

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

// Config contains the api url, userName and userPassword
// Api stores the camomile js api
export const state = {
  config: {},
  api: null
}

export const actions = {
  // Bootstrap the application (on log-in)
  set({ dispatch }) {
    // First get the users and groups
    // to get permissions…
    Promise.all([
      ...['users', 'groups'].map(type =>
        dispatch(`cml/${type}/list`, {}, { root: true })
          .then(r => r)
          .catch(e => e)
      )
    ]).then(res => {
      // …then list the corpus
      dispatch('cml/corpus/listAll', null, { root: true })
    })
  },

  // Reset (on log-out)
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

export const mutations = {
  // Register the app, to connect to the api
  register(state, { url, title, user }) {
    state.config = {
      url,
      title,
      user
    }
    state.api = new Camomile(url)
  }
}

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cml: {
      namespaced: true,
      actions,
      mutations,
      modules
    }
  }
})
