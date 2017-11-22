import { observerClean } from './_helpers'
import { api } from '../../config'

export default {
  namespaced: true,

  state: {
    list: []
  },

  actions: {
    add (
      { commit, dispatch, rootState, rootGetters },
      { corpuId, name, description, fragment, metadata, annotations }
    ) {
      commit('cml/sync/start', 'layersAdd', { root: true })
      return api
        .createLayer(
          corpuId,
          name,
          observerClean(description),
          observerClean(fragment),
          observerClean(metadata),
          annotations
        )
        .then(r => {
          console.log(r)
          commit('cml/sync/stop', 'layersAdd', { root: true })
          const layer = {
            name: r.name,
            id: r._id,
            permission: 3,
            permissions: {
              users: rootGetters['cml/users/permissions']({}),
              groups: rootGetters['cml/groups/permissions']({})
            },
            description: r.description || {},
            fragment: r.fragment_type || {},
            metadata: r.data_type || {},
            annotations: r.annotations
          }

          layer.permissions.users[rootState.cml.user.id] = 3

          commit('add', layer)
          dispatch('cml/messages/success', 'Layer added.', { root: true })

          return layer
        })
        .catch(e => {
          commit('cml/sync/stop', 'layersAdd', { root: true })
          console.log(e)
          const error = e.response ? e.response.body.error : 'Network error'
          dispatch('cml/messages/error', error, { root: true })

          throw e
        })
    },

    remove ({ commit, dispatch, state, rootState }, layer) {
      commit('cml/sync/start', 'layersRemove', { root: true })
      return api
        .deleteLayer(layer.id)
        .then(r => {
          commit('cml/sync/stop', 'layersRemove', { root: true })
          commit('remove', layer)
          dispatch('cml/messages/success', 'Layer removed', { root: true })

          return r
        })
        .catch(e => {
          console.log(e)
          dispatch('cml/messages/error', e, { root: true })

          throw e
        })
    },

    update ({ commit, dispatch, state, rootState }, layer) {
      commit('cml/sync/start', 'layersUpdate', { root: true })
      return api
        .updateLayer(layer.id, {
          name: layer.name,
          description: observerClean(layer.description),
          fragment_type: observerClean(layer.fragment),
          data_type: observerClean(layer.metadata)
        })
        .then(r => {
          console.log('update', r)
          commit('cml/sync/stop', 'layersUpdate', { root: true })
          // update api to update from server:
          // should receive an object with a permissions property
          // to process with layerFormat
          commit('update', layer)
          dispatch('cml/messages/success', 'Layer updated', { root: true })

          return r
        })
        .catch(e => {
          console.log(e)
          dispatch('cml/messages/error', e, { root: true })

          throw e
        })
    },

    list ({ commit, rootGetters }, corpuId) {
      commit('cml/sync/start', 'layersList', { root: true })
      return api
        .getLayers({ filter: { id_corpus: corpuId } })
        .then(r => {
          console.log('layers', r)
          commit('cml/sync/stop', 'layersList', { root: true })
          const layers = r.map(layer => ({
            name: layer.name,
            id: layer._id,
            description: layer.description || {},
            permission: rootGetters['cml/user/permission'](layer.permissions),
            permissions: {
              users: rootGetters['cml/users/permissions']({}),
              groups: rootGetters['cml/groups/permissions']({})
            },
            fragment: layer.fragment_type || {},
            metadata: layer.data_type || {},
            annotations: layer.annotations
          }))
          commit('list', layers)

          return layers
        })
        .catch(e => {
          commit('cml/sync/stop', 'layersList', { root: true })
          console.log(e)

          throw e
        })
    }
  },

  mutations: {
    reset (state) {
      state.list = []
    },

    add (state, layer) {
      const layerExisting = state.list.find(c => c.id === layer.id)
      if (!layerExisting) {
        state.list.push(layer)
      }
    },

    update (state, layer) {
      Object.assign(state.list.find(c => c.id === layer.id), layer)
    },

    remove (state, layer) {
      const index = state.list.findIndex(c => c.id === layer.id)
      if (index !== -1) {
        state.list.splice(index, 1)
      }
    },

    list (state, layers) {
      state.list = layers
    }
  }
}
