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
          description: layer.description,
          fragment_type: layer.fragment,
          data_type: layer.metadata
        })
        .then(r => {
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
          const layers = r.map(l => ({
            name: l.name,
            id: l._id,
            description: l.description || {},
            permission: rootGetters['cml/user/permission'](l.permissions),
            permissions: {
              users: rootGetters['cml/users/permissions'](
                (l.permissions && l.permissions.users) || {}
              ),
              groups: rootGetters['cml/groups/permissions'](
                (l.permissions && l.permissions.groups) || {}
              )
            },
            fragment: l.fragment_type || {},
            metadata: l.data_type || {},
            annotations: l.annotations || []
          }))
          commit('list', layers)

          return layers
        })
        .catch(e => {
          commit('cml/sync/stop', 'layersList', { root: true })
          console.log(e)

          throw e
        })
    },

    groupPermissionSet (
      { commit, dispatch, rootState },
      { layer, group, permission }
    ) {
      commit('cml/sync/start', 'layersGroupPermissionSet', { root: true })
      console.log('groupPermissionSet', layer, group, permission)
      return api
        .setLayerPermissionsForGroup(layer.id, group.id, permission)
        .then(p => {
          console.log('groupPermissionSet p', p)
          commit('cml/sync/stop', 'layersGroupPermissionSet', { root: true })
          commit('groupPermissionsUpdate', {
            layer,
            id: group.id,
            permission: (p.groups && p.groups[group.id]) || 0
          })
          dispatch('cml/messages/success', 'Group permissions updated', {
            root: true
          })

          if (rootState.cml.user.groupIds.indexOf(group.id) !== -1) {
            dispatch('currentUserIsAdminTest', { layer, p })
          }

          return p
        })
        .catch(e => {
          commit('cml/sync/stop', 'layersGroupPermissionSet', { root: true })
          const error = e.response ? e.response.body.error : 'Network error'
          dispatch('cml/messages/error', error, { root: true })

          throw error
        })
    },

    groupPermissionRemove ({ commit, dispatch, rootState }, { layer, group }) {
      commit('cml/sync/start', 'layersGroupPermissionRemove', { root: true })
      return api
        .removeLayerPermissionsForGroup(layer.id, group.id)
        .then(p => {
          commit('cml/sync/stop', 'layersGroupPermissionRemove', {
            root: true
          })
          commit('groupPermissionsUpdate', {
            layer: layer,
            id: group.id,
            permission: null
          })
          dispatch('cml/messages/success', 'Group permissions updated', {
            root: true
          })

          if (rootState.cml.user.groupIds.indexOf(group.id) !== -1) {
            dispatch('currentUserIsAdminTest', { layer, p })
          }

          return p
        })
        .catch(e => {
          commit('cml/sync/stop', 'layersGroupPermissionRemove', {
            root: true
          })
          const error = e.response ? e.response.body.error : 'Network error'
          dispatch('cml/messages/error', error, { root: true })

          throw error
        })
    },

    userPermissionSet (
      { commit, dispatch, rootState },
      { layer, user, permission }
    ) {
      commit('cml/sync/start', 'layersUserPermissionSet', { root: true })
      return api
        .setLayerPermissionsForUser(layer.id, user.id, permission)
        .then(p => {
          commit('cml/sync/stop', 'layersUserPermissionSet', { root: true })
          commit('userPermissionsUpdate', {
            layer: layer,
            id: user.id,
            permission: (p.users && p.users[user.id]) || 0
          })
          dispatch('cml/messages/success', 'User permissions updated', {
            root: true
          })
          if (user.id === rootState.cml.user.id) {
            dispatch('currentUserIsAdminTest', { layer, p })
          }

          return p
        })
        .catch(e => {
          commit('cml/sync/stop', 'layersUserPermissionSet', { root: true })
          const error = e.response ? e.response.body.error : 'Network error'
          dispatch('cml/messages/error', error, { root: true })

          throw error
        })
    },

    userPermissionRemove ({ commit, dispatch, rootState }, { layer, user }) {
      commit('cml/sync/start', 'layersUserPermissionRemove', { root: true })
      return api
        .removeLayerPermissionsForUser(layer.id, user.id)
        .then(p => {
          commit('cml/sync/stop', 'layersUserPermissionRemove', {
            root: true
          })
          commit('userPermissionsUpdate', {
            layer: layer,
            id: user.id,
            permission: null
          })
          dispatch('cml/messages/success', 'User permissions updated', {
            root: true
          })
          if (user.id === rootState.cml.user.id) {
            dispatch('currentUserIsAdminTest', { layer, p })
          }

          return p
        })
        .catch(e => {
          commit('cml/sync/stop', 'layersUserPermissionRemove', {
            root: true
          })
          const error = e.response ? e.response.body.error : 'Network error'
          dispatch('cml/messages/error', error, { root: true })

          throw error
        })
    },

    currentUserIsAdminTest (
      { state, dispatch, commit, rootGetters },
      { layer, permissions }
    ) {
      if (!rootGetters['cml/user/isAdmin'](permissions)) {
        dispatch('list')
        commit(`cml/popup/close`, null, { root: true })
      }
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
    },

    groupPermissionsUpdate (state, { layer, id, permission }) {
      layer.permissions.groups[id] = permission
    },

    userPermissionsUpdate (state, { layer, id, permission }) {
      layer.permissions.users[id] = permission
    },

    layerPermissionsUpdate (state, { layer, permission }) {
      layer.permission = permission
    }
  }
}
