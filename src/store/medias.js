import api from './_api'
import { mediaFormat } from './_helpers'

export const state = {
  list: [],
  id: null
}

export const actions = {
  add ({ commit, dispatch }, { corpuId, name, url, description }) {
    commit('cml/sync/start', 'mediasAdd', { root: true })
    return api
      .createMedium(corpuId, name, url, description)
      .then(r => {
        commit('cml/sync/stop', 'mediasAdd', { root: true })
        const media = mediaFormat(r.data)
        commit('add', media)
        dispatch('cml/messages/success', 'Medium added', { root: true })
        dispatch('set', media.id)

        return media
      })
      .catch(e => {
        commit('cml/sync/stop', 'mediasAdd', { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  remove ({ commit, dispatch, rootGetters }, media) {
    commit('cml/sync/start', 'mediasRemove', { root: true })
    return api
      .deleteMedium(media.id)
      .then(r => {
        commit('cml/sync/stop', 'mediasRemove', { root: true })
        commit('remove', media)
        dispatch('cml/annotations/list', rootGetters['cml/layers/id'](), {
          root: true
        })
        dispatch('cml/messages/success', 'Medium removed', { root: true })

        return media.id
      })
      .catch(e => {
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  update ({ commit, dispatch, state, rootState }, media) {
    commit('cml/sync/start', 'mediasUpdate', { root: true })
    return api
      .updateMedium(media.id, {
        name: media.name,
        description: media.description,
        url: media.url
      })
      .then(r => {
        commit('cml/sync/stop', 'mediasUpdate', { root: true })
        media.name = r.data.name
        media.url = r.data.url
        media.description = r.data.description || {}
        commit('update', media)
        dispatch('cml/messages/success', 'Medium updated', { root: true })

        return media
      })
      .catch(e => {
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  list ({ dispatch, commit }, corpuId) {
    commit('cml/sync/start', 'mediasList', { root: true })
    return api
      .getMedia({ filter: { id_corpus: corpuId } })
      .then(r => {
        commit('cml/sync/stop', 'mediasList', { root: true })
        const medias = r.data.map(media => {
          return mediaFormat(media)
        })
        commit('list', medias)
        dispatch('set')

        return medias
      })
      .catch(e => {
        commit('cml/sync/stop', 'mediasList', { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  set ({ getters, commit }, mediaId) {
    commit('set', getters.id(mediaId))
  }
}

export const getters = {
  id: state => id =>
    id ||
    (state.list.map(c => c.id).indexOf(state.id) !== -1 && state.id) ||
    (state.list[0] && state.list[0].id) ||
    null
}

export const mutations = {
  reset (state) {
    state.list = []
  },

  add (state, media) {
    const mediaExisting = state.list.find(c => c.id === media.id)
    if (!mediaExisting) {
      state.list.push(media)
    }
  },

  update (state, media) {
    Object.assign(state.list.find(c => c.id === media.id), media)
  },

  remove (state, media) {
    const index = state.list.findIndex(c => c.id === media.id)
    if (index !== -1) {
      state.list.splice(index, 1)
    }
  },

  list (state, medias) {
    state.list = medias
  },

  set (state, id) {
    state.id = id
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
