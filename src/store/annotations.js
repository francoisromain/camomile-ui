import Vue from 'vue'

// Lists contains the annotations data
// Actives contains the currently activated annotations

/* 
Example: 

{
  lists: {
    'annotations-uid-string-1': {
      layerUid: 'layer-uid-string',
      mediaUid: 'media-uid-string',
      // An array of filter function registered by components
      filters: [(a) +> {
        return a
      }, 
      … ]
      // The lists of annotations organised by layers
      layers: {
        'layer-id-hash-1': [{
          id: 'annotation-id-hash',
          layerId: 'layer-id-hash',
          mediaId: 'media-id-hash',
          fragment: {
            positions: [ … ],
            time: { … }
          },
          metadata: {
            label: 'lulu'
          }
        },
        { …
        }],
        'layer-id-hash-2': [ …
        ]
      }
    },
    'annotations-uid-string-2': { …
    }
  },
  actives: {
    'annotations-uid-string-1': 'annotation-id-hash',
    'annotations-uid-string-2': null // no annotation is activated for this uid
  }
}
*/
export const state = {
  lists: {},
  actives: {}
}

export const actions = {
  // Add a new annotation
  add({ commit, dispatch, rootState }, { element }) {
    dispatch('sync/start', `annotationsAdd`, { root: true })
    return rootState.api
      .createAnnotation(
        element.layerId,
        element.mediaId || null,
        element.fragment,
        element.metadata
      )
      .then(r => {
        dispatch('sync/stop', `annotationsAdd`, { root: true })

        // Format server response
        const annotation = {
          id: r.data._id,
          fragment: r.data.fragment || {},
          metadata: r.data.data || {},
          layerId: r.data.id_layer,
          mediaId: r.data.id_medium || null
        }

        // Commit response
        commit('add', { annotation, layerId: element.layerId })
        dispatch('messages/success', 'Annotation added', { root: true })

        return annotation
      })
      .catch(e => {
        dispatch('sync/stop', `annotationsAdd`, { root: true })
        dispatch('messages/error', e.message, { root: true })

        throw e
      })
  },

  // Remove an annotation
  remove({ commit, dispatch, rootState }, { id }) {
    dispatch('sync/start', `annotationsRemove`, { root: true })
    return rootState.api
      .deleteAnnotation(id)
      .then(r => {
        dispatch('sync/stop', `annotationsRemove`, { root: true })
        commit('remove', { id })
        dispatch('messages/success', 'Annotation removed', { root: true })

        return id
      })
      .catch(e => {
        dispatch('sync/stop', `annotationsRemove`, { root: true })
        dispatch('messages/error', e.message, { root: true })

        throw e
      })
  },

  // Update an annotation
  update({ commit, dispatch, rootState }, { element }) {
    dispatch('sync/start', `annotationsUpdate`, { root: true })
    return rootState.api
      .updateAnnotation(element.id, {
        fragment: element.fragment,
        data: element.metadata
      })
      .then(r => {
        dispatch('sync/stop', `annotationsUpdate`, { root: true })

        // Format server response
        const annotation = Object.assign({}, element)
        annotation.fragment = r.data.fragment || {}
        annotation.metadata = r.data.data || {}

        // Commit response
        commit('update', { annotation, layerId: element.layerId })
        dispatch('messages/success', 'Annotation updated', { root: true })

        return annotation
      })
      .catch(e => {
        dispatch('sync/stop', `annotationsUpdate`, { root: true })
        dispatch('messages/error', e.message, { root: true })

        throw e
      })
  },

  // Activate the annotations for a layerId in a layersUid group
  layerSet({ state, dispatch, rootState }, { layersUid, layerId }) {
    // Loop over the annotation lists
    Object.keys(state.lists).forEach(uid => {
      const mediaUid = state.lists[uid].mediaUid

      // If the current list's layersUid equals layersUid
      // And if the current list's mediaUid is active
      if (
        state.lists[uid].layersUid === layersUid &&
        rootState.medias.actives[mediaUid]
      ) {
        // Get the annotation list
        dispatch('list', {
          uid,
          layerId,
          layersUid,
          mediaId: rootState.medias.actives[mediaUid].id
        })
      }
    })
  },

  // When a layer is deactivated,
  // deactivate the annotations for this layerId in this layersUid group
  layerUnset({ commit }, { layersUid, layerId }) {
    commit('reset', { layersUid, layerId })
  },

  // When the active media changes,
  // display the related annotations
  mediaSet({ state, dispatch, rootState }, { mediaUid, mediaId }) {
    // Loop over the annotation lists
    Object.keys(state.lists).forEach(uid => {
      const list = state.lists[uid]

      // If the current list's mediaUid equals mediaUid
      // And if the current list's LayersUid is active
      if (
        list.mediaUid === mediaUid &&
        rootState.layers.actives[list.layersUid]
      ) {
        // Loop over the layers
        Object.keys(list.layers).forEach(layerId => {
          // Get the annotation list
          dispatch('list', {
            uid,
            layerId,
            layersUid: list.layersUid,
            mediaId
          })
        })
      }
    })
  },

  // List the annotations
  list(
    { state, dispatch, commit, rootState },
    { uid, layerId, layersUid, mediaId }
  ) {
    dispatch('sync/start', `annotationsList-${uid}`, { root: true })
    return rootState.api
      .getAnnotations({
        filter: {
          id_layer: layerId,
          id_medium: mediaId
        }
      })
      .then(r => {
        dispatch('sync/stop', `annotationsList-${uid}`, {
          root: true
        })

        // Format server response
        const annotations = r.data.map(a => ({
          id: a._id,
          fragment: a.fragment || {},
          metadata: a.data || {},
          layerId: a.id_layer,
          mediaId: a.id_medium || null
        }))

        // Commit response
        commit('list', { annotations, uid, layerId, layersUid })

        return annotations
      })
      .catch(e => {
        dispatch('sync/stop', `annotationsList-${layersUid}`, {
          root: true
        })
        dispatch('messages/error', e.message, { root: true })

        throw e
      })
  }
}

export const getters = {
  // Get the lists of annotations
  lists: state => uid => (state.lists[uid] && state.lists[uid].layers) || {},

  // Get the lists of annotations, filtered
  filter: state => (uid, filter) =>
    state.lists[uid] &&
    Object.keys(state.lists[uid].layers).reduce(
      (layers, layerId) =>
        Object.assign(layers, {
          [layerId]: state.lists[uid].layers[layerId].filter(a => filter(a))
        }),
      {}
    ),

  // Get the lists of annotations, filtered
  filtered: state => uid =>
    state.lists[uid] &&
    state.lists[uid].filters.reduce(
      (layers, filter) =>
        Object.keys(layers).reduce(
          (layersFiltered, layerId) =>
            Object.assign(layersFiltered, {
              [layerId]: layers[layerId].filter(a => filter(a))
            }),
          {}
        ),
      state.lists[uid].layers
    ),

  active: state => uid =>
    Object.keys(state.lists[uid].layers).reduce(
      (res, layerId) =>
        res ||
        state.lists[uid].layers[layerId].find(a => a.id === state.actives[uid]),
      null
    )
}

export const mutations = {
  // Register an annotation list by uid
  register(state, { uid, mediaUid, layersUid }) {
    // Create an uid entry in state.actives
    Vue.set(state.actives, uid, null)

    // Create an uid entry in state.lists,
    // with value { mediaUid, LayersUid, layers: {}}
    Vue.set(state.lists, uid, { mediaUid, layersUid, layers: {}, filters: [] })
  },

  filterRegister(state, { uid, filter }) {
    state.lists[uid].filters.push(filter)
  },

  // Reset all (on log-out)
  resetAll(state) {
    Vue.set(state, 'lists', {})
    Vue.set(state, 'actives', {})
  },

  // Reset a list (if a layer is deactivated for example)
  reset(state, { layersUid, layerId }) {
    // Loop over the annotation lists
    Object.keys(state.lists).forEach(uid => {
      const list = state.lists[uid]

      // If current list's layersUid equals layersUid
      // - delete the list
      // - set the active annotation to null
      if (list.layersUid === layersUid) {
        Vue.delete(list, layerId)
        Vue.set(state.actives, uid, null)
      }
    })
  },

  // Add an annotation to a layer
  add(state, { annotation, layerId }) {
    // Loop over the annotation lists
    // If a list contains a layer which id's equals to layerId,
    // Prepend the new annotation to the list
    Object.keys(state.lists).forEach(uid => {
      const list = state.lists[uid].layers[layerId]
      if (list) {
        Vue.set(list, list.length, annotation)
      }
    })
  },

  // Update an annotation
  update(state, { annotation, layerId }) {
    // Loop over the annotation lists
    Object.keys(state.lists).forEach(uid => {
      // If a list contains a layer which id's equals to layerId
      const list = state.lists[uid].layers[layerId]
      if (list) {
        // Find the annotation index in the list and update
        const index = list.findIndex(a => a.id === annotation.id)
        Vue.set(list, index, annotation)
      }
    })
  },

  // Remove an annotation by id
  remove(state, { id }) {
    // Loop over the annotation lists
    Object.keys(state.lists).forEach(uid => {
      // Loop over the the layers in each list
      Object.keys(state.lists[uid].layers).forEach(layerId => {
        // If the list contains the annotation
        // - delete the annotation
        // - if the annotation was active, unset it
        const list = state.lists[uid].layers[layerId]
        const listsIndex = list.findIndex(a => a.id === id)
        if (listsIndex !== -1) {
          Vue.delete(list, listsIndex)
          if (state.actives[uid] === id) {
            Vue.set(state.actives, uid, null)
          }
        }
      })
    })
  },

  // Set the list of annotation
  list(state, { annotations, uid, layerId, layersUid }) {
    Vue.set(state.lists[uid].layers, layerId, annotations)
  },

  // Set the active annotation
  set(state, { id, uid }) {
    Vue.set(state.actives, uid, id)
  },

  // Unset an active annotation
  unset(state, { id, uid }) {
    Vue.set(state.actives, uid, null)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
