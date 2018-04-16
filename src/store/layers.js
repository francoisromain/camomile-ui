import Vue from 'vue'

// Lists contains, for each corpuUid, an array of layers
// Actives contains, for each layersUid, a reference to the corpuUid and a list of layer Ids

/* Example 

{
  lists: {
    'corpu-uid-string-1': [{
      id: 'layer-id-hash-1',
      name: 'layer-two',
      permission: 3,
      permissions: {
        groups: {
          'group-id-hash-1': 0,
          …
        },
        users: {
          'user-id-hash-1': 0,
          …
        }
      },
      description: { … },
      fragmentType: { … },
      metadataType: { … }
    }],
    'corpu-uid-string-2': [ 
      …
    ]
  },
  actives: {
    'layers-uid-string-1': {
      corpuUid: 'corpu-uid-string-1',
      ids: [
        'layer-id-hash-1',
        'layer-id-hash-2',
        …
      ]
    },
    'layers-uid-string-2': {
      …
    }
  }
}
*/

export const state = {
  lists: {},
  actives: {}
}

export const actions = {
  // Add a new layer
  add({ state, commit, dispatch, rootState, rootGetters }, { element }) {
    dispatch('sync/start', `layersAdd`, { root: true })
    return rootState.api
      .createLayer(
        element.corpuId,
        element.name,
        element.description,
        element.fragmentType,
        element.metadataType,
        element.annotations
      )
      .then(r => {
        dispatch('sync/stop', `layersAdd`, { root: true })

        // Format server response
        const layer = {
          name: r.data.name,
          id: r.data._id,
          // The current user who created the layer has max permission level (3)
          permission: 3,
          // Init permissions for groups and users
          permissions: {
            users: rootGetters['users/permissions']({}),
            groups: rootGetters['groups/permissions']({})
          },
          description: r.data.description || {},
          fragmentType: r.data.fragment_type || {},
          metadataType: r.data.data_type || {},
          annotations: r.data.annotations
        }

        // Set permissions for the current user
        layer.permissions.users[rootState.user.id] = 3

        // Loop over the corpu Uids
        Object.keys(state.lists).forEach(corpuUid => {
          // If the new layer belongs to the active corpu in this Uid
          if (rootGetters['corpus/id'](corpuUid) === element.corpuId) {
            // Add the layer to the corpus
            commit('add', { layer, corpuUid })
          }

          // Loop over the layers uids
          Object.keys(state.actives).forEach(uid => {
            // If this layers uid's belongs to the current corpuUid
            if (state.actives[uid].corpuUid === corpuUid) {
              // Activate the new layer
              dispatch('set', { uid, id: layer.id })
            }
          })
        })
        dispatch('messages/success', 'Layer added', { root: true })

        return layer
      })
      .catch(e => {
        dispatch('sync/stop', `layersAdd`, { root: true })
        dispatch('messages/error', e.message, { root: true })

        throw e
      })
  },

  // Remove a layer
  remove({ state, commit, dispatch, rootState }, { id }) {
    dispatch('sync/start', `layersRemove`, { root: true })
    return rootState.api
      .deleteLayer(id)
      .then(r => {
        dispatch('sync/stop', `layersRemove`, { root: true })

        // Loop over the corpuUids
        // If the layer belongs to this corpuUid, remove the layer
        Object.keys(state.lists).forEach(corpuUid => {
          const listIndex = state.lists[corpuUid].findIndex(e => e.id === id)
          if (listIndex !== -1) {
            commit('remove', { listIndex, corpuUid })
          }
        })

        // Loop over the layers uids
        // If the layer is active, unset it
        Object.keys(state.actives).forEach(uid => {
          if (state.actives[uid].ids.findIndex(l => l.id === id) !== -1) {
            dispatch('unset', { id, uid })
          }
        })

        dispatch('messages/success', 'Layer removed', { root: true })

        return id
      })
      .catch(e => {
        dispatch('sync/stop', `layersRemove`, { root: true })
        dispatch('messages/error', e.message, { root: true })

        throw e
      })
  },

  // Update a layer
  update({ state, commit, dispatch, rootState, rootGetters }, { element }) {
    dispatch('sync/start', `layersUpdate`, { root: true })
    return rootState.api
      .updateLayer(element.id, {
        name: element.name,
        description: element.description,
        fragment_type: element.fragmentType,
        data_type: element.metadataType
      })
      .then(r => {
        dispatch('sync/stop', `layersUpdate`, { root: true })

        // The server response does not contain the permissions
        // Copy the original element to keep the permissions
        // Overwrite properties with the server response
        const layer = Object.assign({}, element)
        layer.description = r.data.description || {}
        layer.fragmentType = r.data.fragment_type || {}
        layer.metadataType = r.data.data_type || {}

        // Loop over the corpuUid
        Object.keys(state.lists).forEach(corpuUid => {
          // If the element's corpuUid equals this corpuuid
          if (rootGetters['corpus/id'](corpuUid) === element.corpuId) {
            // Update the layer
            commit('update', { layer, corpuUid })
          }
        })
        dispatch('messages/success', 'Layer updated', { root: true })

        return layer
      })
      .catch(e => {
        dispatch('sync/stop', `layersUpdate`, { root: true })
        dispatch('messages/error', e.message, { root: true })

        throw e
      })
  },

  // Set the permission for a group on a layer
  groupPermissionSet(
    { commit, dispatch, rootState, rootGetters },
    { id, groupId, permission }
  ) {
    dispatch('sync/start', `layersGroupPermissionSet`, {
      root: true
    })
    return rootState.api
      .setLayerPermissionsForGroup(id, groupId, permission)
      .then(p => {
        const permissions = p.data
        dispatch('sync/stop', `layersGroupPermissionSet`, {
          root: true
        })
        commit('permissionsUpdate', {
          id,
          typeId: groupId,
          permission: (permissions.groups && permissions.groups[groupId]) || 0,
          type: 'groups'
        })
        dispatch('messages/success', 'Group permissions updated', {
          root: true
        })

        // If the current user is in the updated group
        // And if the current user is not an admin
        // => the permissions for the current user have changed
        if (
          rootGetters['user/isInGroup'](groupId) &&
          !rootGetters['user/isAdmin'](permissions)
        ) {
          // Re-list the layers in every corpuUids
          dispatch('listAll')
          commit('popup/close', null, { root: true })
        }

        return permissions
      })
      .catch(e => {
        dispatch('sync/stop', `layersGroupPermissionSet`, {
          root: true
        })
        dispatch('messages/error', e.message, { root: true })

        throw e
      })
  },

  // Remove permission for a group on a layer
  groupPermissionRemove(
    { commit, dispatch, rootState, rootGetters },
    { id, groupId }
  ) {
    dispatch('sync/start', `layersGroupPermissionRemove`, {
      root: true
    })
    return rootState.api
      .removeLayerPermissionsForGroup(id, groupId)
      .then(p => {
        const permissions = p.data
        dispatch('sync/stop', `layersGroupPermissionRemove`, {
          root: true
        })
        commit('permissionsUpdate', {
          id,
          typeId: groupId,
          permission: 0,
          type: 'groups'
        })
        dispatch('messages/success', 'Group permissions updated', {
          root: true
        })

        // If the current user is in the updated group
        // And if the current user is not an admin
        // => the permissions for the current user have changed
        if (
          rootGetters['user/isInGroup'](groupId) &&
          !rootGetters['user/isAdmin'](permissions)
        ) {
          // Re-list the layers in every corpuUids
          dispatch('listAll')
          commit('popup/close', null, { root: true })
        }

        return permissions
      })
      .catch(e => {
        dispatch('sync/stop', `layersGroupPermissionRemove`, {
          root: true
        })
        dispatch('messages/error', e.message, { root: true })

        throw e
      })
  },

  // Set the permission for a user on a layer
  userPermissionSet(
    { commit, dispatch, rootState, rootGetters },
    { id, userId, permission }
  ) {
    dispatch('sync/start', `layersUserPermissionSet`, { root: true })
    return rootState.api
      .setLayerPermissionsForUser(id, userId, permission)
      .then(p => {
        const permissions = p.data
        dispatch('sync/stop', `layersUserPermissionSet`, {
          root: true
        })
        commit('permissionsUpdate', {
          id,
          typeId: userId,
          permission: (permissions.users && permissions.users[userId]) || 0,
          type: 'users'
        })
        dispatch('messages/success', 'User permissions updated', {
          root: true
        })

        // If the current user was updated
        // And if the current user is not an admin
        // => the permissions for the current user have changed
        if (
          rootGetters['user/isCurrentUser'](userId) &&
          !rootGetters['user/isAdmin'](permissions)
        ) {
          // Re-list the layers in every corpuUids
          dispatch('listAll')
          commit('popup/close', null, { root: true })
        }

        return permissions
      })
      .catch(e => {
        dispatch('sync/stop', `layersUserPermissionSet`, {
          root: true
        })
        dispatch('messages/error', e.message, { root: true })

        throw e
      })
  },

  // Remove the permission for a user on a layer
  userPermissionRemove(
    { commit, dispatch, rootState, rootGetters },
    { id, userId }
  ) {
    dispatch('sync/start', `layersUserPermissionRemove`, {
      root: true
    })
    return rootState.api
      .removeLayerPermissionsForUser(id, userId)
      .then(p => {
        const permissions = p.data
        dispatch('sync/stop', `layersUserPermissionRemove`, {
          root: true
        })
        commit('permissionsUpdate', {
          id,
          typeId: userId,
          permission: 0,
          type: 'users'
        })
        dispatch('messages/success', 'User permissions updated', {
          root: true
        })

        // If the current user was updated
        // And if the current user is not an admin
        // => the permissions for the current user have changed
        if (
          rootGetters['user/isCurrentUser'](userId) &&
          !rootGetters['user/isAdmin'](permissions)
        ) {
          // Re-list the layers in every corpuUids
          dispatch('listAll')
          commit('popup/close', null, { root: true })
        }

        return permissions
      })
      .catch(e => {
        dispatch('sync/stop', `layersUserPermissionRemove`, {
          root: true
        })
        dispatch('messages/error', e.message, { root: true })

        throw e
      })
  },

  // List the layers for every corpuUids
  listAll({ state, dispatch, rootState }) {
    Object.keys(state.lists).forEach(corpuUid => {
      dispatch('list', {
        corpuId: rootState.corpus.actives[corpuUid],
        corpuUid
      })
    })
  },

  // List the layers for a corpuUid
  list({ dispatch, commit, rootState, rootGetters }, { corpuId, corpuUid }) {
    dispatch('sync/start', `layersList-${corpuUid}`, { root: true })
    return rootState.api
      .getLayers({ filter: { id_corpus: corpuId } })
      .then(r => {
        dispatch('sync/stop', `layersList-${corpuUid}`, { root: true })

        // Format server response
        const layers = r.data.map(l => ({
          name: l.name,
          id: l._id,
          description: l.description || {},
          permission: rootGetters['user/permission'](l.permissions),
          permissions: {
            users: rootGetters['users/permissions'](
              (l.permissions && l.permissions.users) || {}
            ),
            groups: rootGetters['groups/permissions'](
              (l.permissions && l.permissions.groups) || {}
            )
          },
          fragmentType: l.fragment_type || {},
          metadataType: l.data_type || {},
          annotations: l.annotations || []
        }))

        // Commit list to a corpuUid
        commit('list', { layers, corpuUid })

        // Activate every layers in the list
        // dispatch('setAll', { corpuUid })

        return layers
      })
      .catch(e => {
        dispatch('sync/stop', `layersList-${corpuUid}`, { root: true })
        dispatch('messages/error', e.message, { root: true })

        throw e
      })
  },

  // Activate every layers in a corpuUid
  setAll({ state, dispatch, commit }, { corpuUid }) {
    // Loop over every layers uids
    Object.keys(state.actives).forEach(uid => {
      // Loop over every layers in a corpuUid
      state.lists[corpuUid].forEach(l => {
        // Activate the layer
        dispatch('set', { id: l.id, corpuUid, uid })
      })
    })
  },

  // Activate a layer in a layers uid
  set({ dispatch, commit }, { id, uid }) {
    commit('set', { id, uid })
    dispatch(
      'annotations/layerSet',
      { layersUid: uid, layerId: id },
      { root: true }
    )
  },

  // Deactivate a layer in a layers uid
  unset({ dispatch, commit }, { id, uid }) {
    commit('unset', { id, uid })
    dispatch(
      'annotations/layerUnset',
      { layersUid: uid, layerId: id },
      { root: true }
    )
  }
}

export const getters = {
  // Get the active layers ids
  activeIds: state => uid =>
    (state.actives[uid] && state.actives[uid].ids) || [],

  // Get the active layers
  actives: state => uid => {
    const actives = state.actives[uid]
    const layers = state.lists[actives.corpuUid]
    return actives && layers
      ? layers.filter(l => actives.ids.indexOf(l.id) !== -1)
      : {}
  },

  // Get the layer by id
  details: state => (uid, id) => {
    const actives = state.actives[uid]
    const layers = state.lists[actives.corpuUid]
    return actives && layers ? layers.find(l => l.id === id) : {}
  }
}

export const mutations = {
  // register a layers uid
  register(state, { uid, corpuUid }) {
    Vue.set(state.actives, uid, {
      corpuUid,
      ids: [],
      fragmentType: {},
      metadataType: {}
    })
  },

  typesRegister(state, { uid, fragmentType, metadataType }) {
    if (fragmentType) {
      Object.assign(state.actives[uid].fragmentType, fragmentType)
    }

    if (metadataType) {
      Object.assign(state.actives[uid].metadataType, metadataType)
    }
  },

  // Reset all layers (on log-out)
  resetAll(state) {
    Vue.set(state, 'lists', {})
    Vue.set(state, 'actives', {})
  },

  // Add a layer in a corpuUid
  add(state, { layer, corpuUid }) {
    const index = state.lists[corpuUid].length
    Vue.set(state.lists[corpuUid], index, layer)
  },

  // Remove a layer in a corpuUid
  remove(state, { listIndex, corpuUid }) {
    Vue.delete(state.lists[corpuUid], listIndex)
  },

  // Update a layer in a corpuUid
  update(state, { layer, corpuUid }) {
    const index = state.lists[corpuUid].findIndex(l => l.id === layer.id)
    Vue.set(state.lists[corpuUid], index, layer)
  },

  // Add a group to every layers in every corpuUid
  groupAdd(state, groupId) {
    Object.keys(state.lists).forEach(corpuUid => {
      state.lists[corpuUid].forEach(e => {
        Vue.set(e.permissions.groups, groupId, 0)
      })
    })
  },

  // Remove a group from every layers in every corpuUid
  groupRemove(state, groupId) {
    Object.keys(state.lists).forEach(corpuUid => {
      state.lists[corpuUid].forEach(e => {
        Vue.delete(e.permissions.groups, groupId)
      })
    })
  },

  // Add a user to every layers in every corpuUid
  userAdd(state, userId) {
    Object.keys(state.lists).forEach(corpuUid => {
      state.lists[corpuUid].forEach(e => {
        Vue.set(e.permissions.users, userId, 0)
      })
    })
  },

  // Remove a user from every layers in every corpuUid
  userRemove(state, userId) {
    Object.keys(state.lists).forEach(corpuUid => {
      state.lists[corpuUid].forEach(e => {
        Vue.delete(e.permissions.users, userId)
      })
    })
  },

  // Update permissions on a layer in every corpuUid
  permissionsUpdate(state, { id, typeId, permission, type }) {
    Object.keys(state.lists).forEach(corpuUid => {
      const index = state.lists[corpuUid].findIndex(e => e.id === id)
      if (index !== -1) {
        Vue.set(
          state.lists[corpuUid][index].permissions[type],
          typeId,
          permission
        )
      }
    })
  },

  list(state, { layers, corpuUid }) {
    Vue.set(state.lists, corpuUid, layers)
  },

  set(state, { id, uid }) {
    Vue.set(state.actives[uid].ids, state.actives[uid].ids.length, id)
  },

  unset(state, { id, uid }) {
    const index = state.actives[uid].ids.findIndex(layerId => layerId === id)
    if (index !== -1) {
      Vue.delete(state.actives[uid].ids, index)
    }
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
