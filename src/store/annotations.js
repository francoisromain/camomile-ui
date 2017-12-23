import Vue from 'vue'
import api from './_api'

export const state = {
  lists: {},
  actives: {}
}

export const actions = {
  add ({ commit, dispatch }, { element, uid }) {
    dispatch('cml/sync/start', `annotationsAdd-${uid}`, { root: true })
    return api
      .createAnnotation(
        element.layerId,
        element.mediaLink ? element.mediaId : null,
        element.fragment,
        element.metadata
      )
      .then(r => {
        dispatch('cml/sync/stop', `annotationsAdd-${uid}`, { root: true })
        const annotation = {
          id: r.data._id,
          fragment: r.data.fragment || {},
          metadata: r.data.data || {},
          layerId: r.data.id_layer,
          mediaId: r.data.id_medium || null
        }
        commit('add', { annotation, uid })
        dispatch('cml/messages/success', 'Annotation added', { root: true })
        dispatch('set', { id: annotation.id, uid })

        return annotation
      })
      .catch(e => {
        dispatch('cml/sync/stop', `annotationsAdd-${uid}`, { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  remove ({ commit, dispatch }, { id, uid }) {
    dispatch('cml/sync/start', `annotationsRemove-${uid}`, { root: true })
    return api
      .deleteAnnotation(id)
      .then(r => {
        dispatch('cml/sync/stop', `annotationsRemove-${uid}`, { root: true })
        commit('remove', { id, uid })
        dispatch('cml/messages/success', 'Annotation removed', { root: true })

        return id
      })
      .catch(e => {
        dispatch('cml/sync/stop', `annotationsRemove-${uid}`, { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  update ({ commit, dispatch }, { element, uid }) {
    dispatch('cml/sync/start', `annotationsUpdate-${uid}`, { root: true })
    return api
      .updateAnnotation(element.id, {
        fragment: element.fragment,
        data: element.metadata
      })
      .then(r => {
        const annotation = Object.assign({}, element)
        annotation.fragment = r.data.fragment || {}
        annotation.metadata = r.data.data || {}
        dispatch('cml/sync/stop', `annotationsUpdate-${uid}`, { root: true })
        commit('update', { annotation, uid })
        dispatch('cml/messages/success', 'Annotation updated', { root: true })

        return annotation
      })
      .catch(e => {
        dispatch('cml/sync/stop', `annotationsUpdate-${uid}`, { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  list ({ dispatch, commit }, { layerId, uid }) {
    dispatch('cml/sync/start', `annotationsList-${uid}`, { root: true })
    return api
      .getAnnotations({ filter: { id_layer: layerId } })
      .then(r => {
        if (!uid) {
          throw new Error('missing uid')
        }
        dispatch('cml/sync/stop', `annotationsList-${uid}`, { root: true })
        const annotations = r.data.map(a => ({
          id: a._id,
          fragment: a.fragment || {},
          metadata: a.data || {},
          layerId: a.id_layer,
          mediaId: a.id_medium || null
        }))
        commit('list', { annotations, uid })
        dispatch('set', { uid })

        return annotations
      })
      .catch(e => {
        dispatch('cml/sync/stop', `annotationsList-${uid}`, { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw e
      })
  },

  set ({ getters, commit }, { id, uid }) {
    commit('set', { id: id || getters.id(uid), uid })
  }
}

export const getters = {
  id: state => uid =>
    (state.actives[uid] &&
      state.lists[uid].map(c => c.id).indexOf(state.actives[uid]) !== -1 &&
      state.actives[uid]) ||
    (state.lists[uid][0] && state.lists[uid][0].id) ||
    null
}

export const mutations = {
  reset (state, uid) {
    Vue.set(state.lists, uid, [])
  },

  resetAll (state) {
    Vue.set(state, 'lists', {})
    Vue.set(state, 'actives', {})
  },

  add (state, { annotation, uid }) {
    const index = state.lists[uid].length
    Vue.set(state.lists[uid], index, annotation)
  },

  update (state, { annotation, uid }) {
    const index = state.lists[uid].findIndex(m => m.id === annotation.id)
    Vue.set(state.lists[uid], index, annotation)
  },

  remove (state, { id, uid }) {
    const index = state.lists[uid].findIndex(m => m.id === id)
    if (index !== -1) {
      Vue.delete(state.lists[uid], index)
    }
  },

  list (state, { annotations, uid }) {
    Vue.set(state.lists, uid, annotations)
  },

  set (state, { id, uid }) {
    Vue.set(state.actives, uid, id)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
