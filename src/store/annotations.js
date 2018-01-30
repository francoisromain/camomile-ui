import Vue from 'vue'
import api from './_api'

export const state = {
  lists: {},
  actives: {}
}

export const actions = {
  add({ commit, dispatch }, { element }) {
    dispatch('cml/sync/start', `annotationsAdd`, { root: true })
    return api
      .createAnnotation(
        element.layerId,
        element.mediaId || null,
        element.fragment,
        element.metadata
      )
      .then(r => {
        dispatch('cml/sync/stop', `annotationsAdd`, { root: true })
        const annotation = {
          id: r.data._id,
          fragment: r.data.fragment || {},
          metadata: r.data.data || {},
          layerId: r.data.id_layer,
          mediaId: r.data.id_medium || null
        }
        commit('add', { annotation, layerId: element.layerId })
        dispatch('cml/messages/success', 'Annotation added', { root: true })

        return annotation
      })
      .catch(e => {
        dispatch('cml/sync/stop', `annotationsAdd`, { root: true })
        dispatch('cml/messages/error', e.message, { root: true })

        throw e
      })
  },

  remove({ commit, dispatch }, { id }) {
    dispatch('cml/sync/start', `annotationsRemove`, { root: true })
    return api
      .deleteAnnotation(id)
      .then(r => {
        dispatch('cml/sync/stop', `annotationsRemove`, { root: true })
        commit('remove', { id })
        dispatch('cml/messages/success', 'Annotation removed', { root: true })

        return id
      })
      .catch(e => {
        dispatch('cml/sync/stop', `annotationsRemove`, { root: true })
        dispatch('cml/messages/error', e.message, { root: true })

        throw e
      })
  },

  update({ commit, dispatch }, { element }) {
    dispatch('cml/sync/start', `annotationsUpdate`, { root: true })
    return api
      .updateAnnotation(element.id, {
        fragment: element.fragment,
        data: element.metadata
      })
      .then(r => {
        const annotation = Object.assign({}, element)
        annotation.fragment = r.data.fragment || {}
        annotation.metadata = r.data.data || {}
        dispatch('cml/sync/stop', `annotationsUpdate`, { root: true })
        commit('update', { annotation, layerId: element.layerId })
        dispatch('cml/messages/success', 'Annotation updated', { root: true })

        return annotation
      })
      .catch(e => {
        dispatch('cml/sync/stop', `annotationsUpdate`, { root: true })
        dispatch('cml/messages/error', e.message, { root: true })

        throw e
      })
  },

  layerSet({ state, dispatch, rootState }, { layersUid, layerId }) {
    Object.keys(state.lists).forEach(uid => {
      if (
        state.lists[uid].layersUid === layersUid &&
        rootState.cml.medias.actives[state.lists[uid].mediaUid]
      ) {
        dispatch('list', {
          uid,
          layerId,
          layersUid,
          mediaId: rootState.cml.medias.actives[state.lists[uid].mediaUid].id
        })
      }
    })
  },

  layerUnset({ commit }, { layersUid, layerId }) {
    commit('reset', { layersUid, layerId })
  },

  mediaSet({ state, dispatch, rootState }, { mediaUid, mediaId }) {
    Object.keys(state.lists).forEach(uid => {
      if (
        state.lists[uid].mediaUid === mediaUid &&
        rootState.cml.layers.actives[state.lists[uid].layersUid]
      ) {
        Object.keys(state.lists[uid].layers).forEach(layerId => {
          dispatch('list', {
            uid,
            layerId,
            layersUid: state.lists[uid].layersUid,
            mediaId
          })
        })
      }
    })
  },

  list({ state, dispatch, commit }, { uid, layerId, layersUid, mediaId }) {
    dispatch('cml/sync/start', `annotationsList-${uid}`, { root: true })
    return api
      .getAnnotations({
        filter: {
          id_layer: layerId,
          id_medium: mediaId
        }
      })
      .then(r => {
        dispatch('cml/sync/stop', `annotationsList-${uid}`, {
          root: true
        })
        const annotations = r.data.map(a => ({
          id: a._id,
          fragment: a.fragment || {},
          metadata: a.data || {},
          layerId: a.id_layer,
          mediaId: a.id_medium || null
        }))
        commit('list', { annotations, uid, layerId, layersUid })
        // commit('reset', { layerId, layersUid })

        return annotations
      })
      .catch(e => {
        dispatch('cml/sync/stop', `annotationsList-${layersUid}`, {
          root: true
        })
        dispatch('cml/messages/error', e.message, { root: true })

        throw e
      })
  },

  register({ commit }, { uid, mediaUid, layersUid }) {
    commit('register', { uid, mediaUid, layersUid })
  }
}

export const mutations = {
  register(state, { uid, mediaUid, layersUid }) {
    Vue.set(state.actives, uid, null)
    Vue.set(state.lists, uid, { mediaUid, layersUid, layers: {} })
  },

  resetAll(state) {
    Vue.set(state, 'lists', {})
    Vue.set(state, 'actives', {})
  },

  reset(state, { layersUid, layerId }) {
    Object.keys(state.lists).forEach(uid => {
      if (state.lists[uid].layersUid === layersUid) {
        Vue.delete(state.lists[uid], layerId)
      }
    })

    Object.keys(state.actives).forEach(uid => {
      if (state.actives[uid] && state.actives[uid].layerId === layerId) {
        Vue.set(state.actives, uid, null)
      }
    })
  },

  add(state, { annotation, layerId }) {
    Object.keys(state.lists).forEach(uid => {
      const list = state.lists[uid].layers[layerId]
      if (list) {
        Vue.set(list, list.length, annotation)
      }
    })
  },

  update(state, { annotation, layerId }) {
    Object.keys(state.lists).forEach(uid => {
      const list = state.lists[uid].layers[layerId]
      if (list) {
        const index = list.findIndex(a => a.id === annotation.id)
        Vue.set(list, index, annotation)
      }
    })
  },

  remove(state, { id }) {
    Object.keys(state.lists).forEach(uid => {
      Object.keys(state.lists[uid].layers).forEach(layerId => {
        const list = state.lists[uid].layers[layerId]
        if (list) {
          const listsIndex = list.findIndex(a => a.id === id)
          if (listsIndex !== -1) {
            Vue.delete(list, listsIndex)
          }
        }
      })
    })

    Object.keys(state.actives).forEach(uid => {
      if (state.actives[uid] && state.actives[uid].id === id) {
        Vue.set(state.actives, uid, null)
      }
    })
  },

  list(state, { annotations, uid, layerId, layersUid }) {
    Vue.set(state.lists[uid].layers, layerId, annotations)
  },

  set(state, { id, uid }) {
    Vue.set(state.actives, uid, id)
  },

  unset(state, { id, uid }) {
    Vue.set(state.actives, uid, null)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
