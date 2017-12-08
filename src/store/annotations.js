import api from './_api'

export const state = {
  list: [],
  id: null
}

export const actions = {
  add (
    { commit, dispatch, state, rootState },
    { layerId, mediaId, fragment, data }
  ) {
    commit('cml/sync/start', 'annotationsAdd', { root: true })
    return api
      .createAnnotation(layerId, mediaId, fragment, data)
      .then(r => {
        commit('cml/sync/stop', 'annotationsAdd', { root: true })
        const annotation = {
          id: r.data._id,
          fragment: r.data.fragment || {},
          metadata: r.data.data || {},
          layerId: r.data.id_layer,
          mediaId: r.data.id_medium || null
        }
        commit('add', annotation)
        dispatch('cml/messages/success', 'Annotation added', { root: true })
        dispatch('set', annotation.id)

        return annotation
      })
      .catch(e => {
        commit('cml/sync/stop', 'annotationsAdd', { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  remove ({ commit, dispatch, state, rootState }, annotation) {
    commit('cml/sync/start', 'annotationsRemove', { root: true })
    return api
      .deleteAnnotation(annotation.id)
      .then(r => {
        commit('cml/sync/stop', 'annotationsRemove', { root: true })
        commit('remove', annotation)
        dispatch('cml/messages/success', 'Annotation removed', { root: true })

        return annotation.id
      })
      .catch(e => {
        commit('cml/sync/stop', 'annotationsRemove', { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  update ({ commit, dispatch, state, rootState }, annotation) {
    commit('cml/sync/start', 'annotationsUpdate', { root: true })
    console.log('anno', annotation)
    return api
      .updateAnnotation(annotation.id, {
        fragment: annotation.fragment,
        data: annotation.metadata
      })
      .then(r => {
        commit('cml/sync/stop', 'annotationsUpdate', { root: true })
        console.log('update annotation', r)
        commit('update', annotation)
        dispatch('cml/messages/success', 'Annotation updated', { root: true })

        return annotation
      })
      .catch(e => {
        commit('cml/sync/stop', 'annotationsUpdate', { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  list ({ state, dispatch, commit, rootState, rootGetters }, layerId) {
    commit('cml/sync/start', 'annotationsList', { root: true })
    return api
      .getAnnotations({ filter: { id_layer: layerId } })
      .then(r => {
        commit('cml/sync/stop', 'annotationsList', { root: true })
        const annotations = r.data.map(a => ({
          id: a._id,
          fragment: a.fragment || {},
          metadata: a.data || {},
          layerId: a.id_layer,
          mediaId: a.id_medium || null
        }))
        commit('list', annotations)
        dispatch('set')

        return annotations
      })
      .catch(e => {
        commit('cml/sync/stop', 'annotationsList', { root: true })
        console.log(e)

        throw e
      })
  },

  set ({ getters, commit }, annotationId) {
    if (getters.id(annotationId)) {
      commit('set', getters.id(annotationId))
    }
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

  add (state, annotation) {
    const annotationExisting = state.list.find(c => c.id === annotation.id)
    if (!annotationExisting) {
      state.list.push(annotation)
    }
  },

  update (state, annotation) {
    Object.assign(state.list.find(c => c.id === annotation.id), annotation)
  },

  remove (state, annotation) {
    const index = state.list.findIndex(c => c.id === annotation.id)
    if (index !== -1) {
      state.list.splice(index, 1)
    }
  },

  list (state, annotations) {
    state.list = annotations
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
