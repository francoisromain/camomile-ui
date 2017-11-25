import { api } from '../../config'

export default {
  namespaced: true,

  state: {
    list: [],
    id: null
  },

  actions: {
    add (
      { commit, dispatch, rootState, rootGetters },
      { corpuId, name, description, fragmentType, metadataType, annotations }
    ) {
      commit('cml/sync/start', 'layersAdd', { root: true })
      return api
        .createLayer(
          corpuId,
          name,
          description,
          fragmentType,
          metadataType,
          annotations
        )
        .then(r => {
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
            fragmentType: r.fragment_type || {},
            metadataType: r.data_type || {},
            annotations: r.annotations
          }

          layer.permissions.users[rootState.cml.user.id] = 3

          commit('add', layer)
          dispatch('cml/messages/success', 'Layer added.', { root: true })
          dispatch('set', layer.id)

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
          fragment_type: layer.fragmentType,
          data_type: layer.metadataType
        })
        .then(r => {
          commit('cml/sync/stop', 'layersUpdate', { root: true })
          layer.description = r.description || {}
          layer.fragmentType = r.fragment_type || {}
          layer.metadataType = r.data_type || {}
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

    list ({ dispatch, commit, rootGetters }, corpuId) {
      commit('cml/sync/start', 'layersList', { root: true })
      return api
        .getLayers({ filter: { id_corpus: corpuId } })
        .then(r => {
          console.log('getLayers, id_corpus: ', corpuId, r)
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
            fragmentType: l.fragment_type || {},
            metadataType: l.data_type || {},
            annotations: l.annotations || []
          }))
          commit('list', layers)
          dispatch('set')

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
            dispatch('currentUserIsAdminTest', p)
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
            dispatch('currentUserIsAdminTest', p)
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
            dispatch('currentUserIsAdminTest', p)
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
            dispatch('currentUserIsAdminTest', p)
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
      { dispatch, commit, rootState, rootGetters },
      permissions
    ) {
      if (!rootGetters['cml/user/isAdmin'](permissions)) {
        dispatch('list', rootState.cml.corpus.id)
        commit(`cml/popup/close`, null, { root: true })
      }
    },

    set ({ state, getters, dispatch, commit }, layerId) {
      commit('set', getters.id(layerId))
      if (state.id) {
        dispatch('cml/annotations/list', state.id, { root: true })
      } else {
        commit('cml/annotations/reset', null, { root: true })
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

    set (state, id) {
      state.id = id
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
