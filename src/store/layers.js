import api from './_api'

export const state = {
  list: [],
  id: null
}

export const actions = {
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
          name: r.data.name,
          id: r.data._id,
          permission: 3,
          permissions: {
            users: rootGetters['cml/users/permissions']({}),
            groups: rootGetters['cml/groups/permissions']({})
          },
          description: r.data.description || {},
          fragmentType: r.data.fragment_type || {},
          metadataType: r.data.data_type || {},
          annotations: r.data.annotations
        }

        layer.permissions.users[rootState.cml.user.id] = 3

        commit('add', layer)
        dispatch('cml/messages/success', 'Layer added', { root: true })
        dispatch('set', layer.id)

        return layer
      })
      .catch(e => {
        commit('cml/sync/stop', 'layersAdd', { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
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
        commit('cml/sync/stop', 'layersRemove', { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
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
        layer.description = r.data.description || {}
        layer.fragmentType = r.data.fragment_type || {}
        layer.metadataType = r.data.data_type || {}
        commit('update', layer)
        dispatch('cml/messages/success', 'Layer updated', { root: true })

        return r
      })
      .catch(e => {
        commit('cml/sync/stop', 'layersUpdate', { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  list ({ dispatch, commit, rootGetters }, corpuId) {
    commit('cml/sync/start', 'layersList', { root: true })
    return api
      .getLayers({ filter: { id_corpus: corpuId } })
      .then(r => {
        commit('cml/sync/stop', 'layersList', { root: true })
        const layers = r.data.map(l => ({
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

        throw e
      })
  },

  groupPermissionSet (
    { commit, dispatch, rootState, rootGetters },
    { layerId, groupId, permission }
  ) {
    commit('cml/sync/start', 'layersGroupPermissionSet', { root: true })
    return api
      .setLayerPermissionsForGroup(layerId, groupId, permission)
      .then(p => {
        const permissions = p.data
        commit('cml/sync/stop', 'layersGroupPermissionSet', { root: true })
        commit('groupPermissionsUpdate', {
          layerId,
          groupId,
          permission: (permissions.groups && permissions.groups[groupId]) || 0
        })
        dispatch('cml/messages/success', 'Group permissions updated', {
          root: true
        })

        if (
          rootGetters['cml/user/isInGroup'](groupId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          dispatch('list', rootState.cml.corpus.id)
          commit('cml/popup/close', null, { root: true })
        }

        return permissions
      })
      .catch(e => {
        commit('cml/sync/stop', 'layersGroupPermissionSet', { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  groupPermissionRemove (
    { commit, dispatch, rootState, rootGetters },
    { layerId, groupId }
  ) {
    commit('cml/sync/start', 'layersGroupPermissionRemove', { root: true })
    return api
      .removeLayerPermissionsForGroup(layerId, groupId)
      .then(p => {
        const permissions = p.data
        commit('cml/sync/stop', 'layersGroupPermissionRemove', {
          root: true
        })
        commit('groupPermissionsUpdate', { layerId, groupId, permission: 0 })
        dispatch('cml/messages/success', 'Group permissions updated', {
          root: true
        })

        if (
          rootGetters['cml/user/isInGroup'](groupId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          dispatch('list', rootState.cml.corpus.id)
          commit('cml/popup/close', null, { root: true })
        }

        return permissions
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
    { commit, dispatch, rootState, rootGetters },
    { layerId, userId, permission }
  ) {
    commit('cml/sync/start', 'layersUserPermissionSet', { root: true })
    return api
      .setLayerPermissionsForUser(layerId, userId, permission)
      .then(p => {
        const permissions = p.data
        commit('cml/sync/stop', 'layersUserPermissionSet', { root: true })
        commit('userPermissionsUpdate', {
          layerId,
          userId,
          permission: (permissions.users && permissions.users[userId]) || 0
        })
        dispatch('cml/messages/success', 'User permissions updated', {
          root: true
        })

        if (
          rootGetters['cml/user/isCurrentUser'](userId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          dispatch('list', rootState.cml.corpus.id)
          commit('cml/popup/close', null, { root: true })
        }

        return permissions
      })
      .catch(e => {
        commit('cml/sync/stop', 'layersUserPermissionSet', { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  userPermissionRemove (
    { commit, dispatch, rootState, rootGetters },
    { layerId, userId }
  ) {
    commit('cml/sync/start', 'layersUserPermissionRemove', { root: true })
    return api
      .removeLayerPermissionsForUser(layerId, userId)
      .then(p => {
        const permissions = p.data
        commit('cml/sync/stop', 'layersUserPermissionRemove', {
          root: true
        })
        commit('userPermissionsUpdate', {
          layerId,
          userId,
          permission: 0
        })
        dispatch('cml/messages/success', 'User permissions updated', {
          root: true
        })
        if (
          rootGetters['cml/user/isCurrentUser'](userId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          dispatch('list', rootState.cml.corpus.id)
          commit('cml/popup/close', null, { root: true })
        }

        return permissions
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

  set ({ state, getters, dispatch, commit }, layerId) {
    commit('set', getters.id(layerId))
    if (state.id) {
      dispatch('cml/annotations/list', state.id, { root: true })
    } else {
      commit('cml/annotations/reset', null, { root: true })
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

  groupPermissionsUpdate (state, { layerId, groupId, permission }) {
    const layer = state.list.find(c => c.id === layerId)
    layer.permissions.groups[groupId] = permission
  },

  userPermissionsUpdate (state, { layerId, userId, permission }) {
    const layer = state.list.find(c => c.id === layerId)
    layer.permissions.users[userId] = permission
  },

  layerPermissionsUpdate (state, { layer, permission }) {
    layer.permission = permission
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
