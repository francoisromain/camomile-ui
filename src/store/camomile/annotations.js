import { api } from '../../config'
import { annotationFormat } from './_helpers'

export default {
  namespaced: true,

  state: {
    list: [],
    id: null
  },

  actions: {
    add (
      { commit, dispatch, state, rootState },
      { layerId, mediaId, fragment, data }
    ) {
      commit('cml/sync/start', 'annotationsAdd', { root: true })
      return api
        .createAnnotation(layerId, mediaId, fragment, data)
        .then(r => {
          console.log('annotationCreate', r)
          commit('cml/sync/stop', 'annotationsAdd', { root: true })
          const annotation = annotationFormat(r)
          commit('add', annotation)
          dispatch('cml/messages/success', 'Annotation added.', { root: true })
          dispatch('set', annotation.id)

          return annotation
        })
        .catch(e => {
          commit('cml/sync/stop', 'annotationsAdd', { root: true })
          console.log(e)
          const error = e.response ? e.response.body.error : 'Network error'
          dispatch('cml/messages/error', error, { root: true })

          throw e
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

          return r
        })
        .catch(e => {
          console.log(e)
          dispatch('cml/messages/error', e, { root: true })

          throw e
        })
    },

    update ({ commit, dispatch, state, rootState }, annotation) {
      commit('cml/sync/start', 'annotationsUpdate', { root: true })
      return api
        .updateAnnotation(annotation.id, {
          name: annotation.name,
          description: annotation.description
        })
        .then(r => {
          commit('cml/sync/stop', 'annotationsUpdate', { root: true })
          commit('update', annotation)
          dispatch('cml/messages/success', 'Annotation updated', { root: true })

          return r
        })
        .catch(e => {
          console.log(e)
          dispatch('cml/messages/error', e, { root: true })

          throw e
        })
    },

    list ({ state, dispatch, commit, rootState, rootGetters }, layerId) {
      commit('cml/sync/start', 'annotationsList', { root: true })
      return api
        .getAnnotations({ filter: { id_layer: layerId } })
        .then(r => {
          console.log('annotations', r)
          commit('cml/sync/stop', 'annotationsList', { root: true })
          const annotations = r.map(a => {
            return a
            // return annotationFormat(a)
          })
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
  },

  getters: {
    id: state => id =>
      id ||
      (state.list.map(c => c.id).indexOf(state.id) !== -1 && state.id) ||
      (state.list[0] && state.list[0].id) ||
      null
  },

  mutations: {
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
}
