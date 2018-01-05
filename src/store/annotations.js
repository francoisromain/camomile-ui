import Vue from 'vue'
import api from './_api'

export const state = {
  lists: {},
  actives: {}
}

export const actions = {
  add ({ commit, dispatch }, { element }) {
    dispatch('cml/sync/start', `annotationsAdd`, { root: true })
    return api
      .createAnnotation(
        element.layerId,
        element.mediaLink ? element.mediaId : null,
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

  remove ({ commit, dispatch }, { id }) {
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

  update ({ commit, dispatch }, { element }) {
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

  listAll ({ rootState, dispatch }, { uid }) {
    rootState.cml.layers.actives[uid].forEach(layerId => {
      dispatch('list', { layerId, uid })
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
        commit('list', { annotations, layerId, uid })
        dispatch('setAll', { layerId, uid })

        return annotations
      })
      .catch(e => {
        dispatch('cml/sync/stop', `annotationsList-${uid}`, { root: true })
        dispatch('cml/messages/error', e.message, { root: true })

        throw e
      })
  },

  setAll ({ state, dispatch, commit }, { layerId, uid }) {
    state.lists[uid][layerId].forEach(i => {
      dispatch('set', { id: i.id, layerId, uid })
    })
  },

  set ({ commit }, { id, layerId, uid }) {
    commit('set', { id, layerId, uid })
  },

  unset ({ dispatch, commit }, { id, layerId, uid }) {
    commit('unset', { id, layerId, uid })
  }
}

export const mutations = {
  init (state, { uid }) {
    Vue.set(state.lists, uid, {})
    Vue.set(state.actives, uid, {})
  },

  reset (state, { layerId, uid }) {
    Vue.delete(state.lists[uid], layerId)
    Vue.delete(state.actives[uid], layerId)
  },

  resetAll (state) {
    Vue.set(state, 'lists', {})
    Vue.set(state, 'actives', {})
  },

  add (state, { annotation, layerId }) {
    Object.keys(state.lists).forEach(uid => {
      const list = state.lists[uid][layerId]
      if (list) {
        Vue.set(list, list.length, annotation)
      }
    })
  },

  update (state, { annotation, layerId }) {
    Object.keys(state.lists).forEach(uid => {
      const list = state.lists[uid][layerId]
      if (list) {
        const index = list.findIndex(m => m.id === annotation.id)
        Vue.set(list, index, annotation)
      }
    })
  },

  remove (state, { id }) {
    Object.keys(state.lists).forEach(uid => {
      Object.keys(state.lists[uid]).forEach(layerId => {
        const list = state.lists[uid][layerId]
        if (list) {
          const listsIndex = list.findIndex(a => a.id === id)
          if (listsIndex !== -1) {
            Vue.delete(list, listsIndex)
          }
        }
        const actives = state.actives[uid][layerId]
        console.log('annotations-remove-actives', actives)
        if (actives) {
          const activeIndex = actives.indexOf(id)
          console.log('annotations-remove-actives-index', activeIndex)
          if (activeIndex !== -1) {
            Vue.delete(actives, activeIndex)
          }
        }
      })
    })
  },

  list (state, { annotations, layerId, uid }) {
    Vue.set(state.lists[uid], layerId, annotations)
  },

  set (state, { id, layerId, uid }) {
    if (!state.actives[uid][layerId]) {
      Vue.set(state.actives[uid], layerId, [id])
    } else {
      Vue.set(
        state.actives[uid][layerId],
        state.actives[uid][layerId].length,
        id
      )
    }
  },

  unset (state, { id, layerId, uid }) {
    if (state.actives[uid][layerId]) {
      const index = state.actives[uid][layerId].indexOf(id)
      if (index !== -1) {
        Vue.delete(state.actives[uid][layerId], index)
      }
    }
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
