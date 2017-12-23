import Vue from 'vue'
import api from './_api'

export const state = {
  lists: {},
  actives: {}
}

export const actions = {
  add ({ commit, dispatch, rootState, rootGetters }, { element, uid }) {
    dispatch('cml/sync/start', `layersAdd-${uid}`, { root: true })
    return api
      .createLayer(
        element.corpuId,
        element.name,
        element.description,
        element.fragmentType,
        element.metadataType,
        element.annotations
      )
      .then(r => {
        dispatch('cml/sync/stop', `layersAdd-${uid}`, { root: true })
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

        commit('add', { layer, uid })
        dispatch('cml/messages/success', 'Layer added', { root: true })
        dispatch('set', { layerId: layer.id, uid })

        return layer
      })
      .catch(e => {
        dispatch('cml/sync/stop', `layersAdd-${uid}`, { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  remove ({ commit, dispatch, state, rootState }, { id, uid }) {
    dispatch('cml/sync/start', `layersRemove-${uid}`, { root: true })
    return api
      .deleteLayer(id)
      .then(r => {
        dispatch('cml/sync/stop', `layersRemove-${uid}`, { root: true })
        commit('remove', { layerId: id, uid })
        dispatch('cml/messages/success', 'Layer removed', { root: true })
        if (state.actives[uid] === id) {
          dispatch('set', { uid })
        }

        return id
      })
      .catch(e => {
        dispatch('cml/sync/stop', `layersRemove-${uid}`, { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  update ({ commit, dispatch, state, rootState }, { element, uid }) {
    dispatch('cml/sync/start', `layersUpdate-${uid}`, { root: true })
    return api
      .updateLayer(element.id, {
        name: element.name,
        description: element.description,
        fragment_type: element.fragmentType,
        data_type: element.metadataType
      })
      .then(r => {
        dispatch('cml/sync/stop', `layersUpdate-${uid}`, { root: true })
        const layer = Object.assign({}, element)
        layer.description = r.data.description || {}
        layer.fragmentType = r.data.fragment_type || {}
        layer.metadataType = r.data.data_type || {}
        commit('update', { layer, uid })
        dispatch('cml/messages/success', 'Layer updated', { root: true })

        return layer
      })
      .catch(e => {
        dispatch('cml/sync/stop', `layersUpdate-${uid}`, { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  list ({ dispatch, commit, rootGetters }, { corpuId, uid }) {
    dispatch('cml/sync/start', `layersList-${uid}`, { root: true })
    return api
      .getLayers({ filter: { id_corpus: corpuId } })
      .then(r => {
        dispatch('cml/sync/stop', `layersList-${uid}`, { root: true })
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
        commit('list', { layers, uid })
        dispatch('set', { uid })

        return layers
      })
      .catch(e => {
        dispatch('cml/sync/stop', `layersList-${uid}`, { root: true })

        throw e
      })
  },

  groupPermissionSet (
    { commit, dispatch, rootState, rootGetters },
    { layerId, groupId, permission, uid }
  ) {
    dispatch('cml/sync/start', `layersGroupPermissionSet-${uid}`, {
      root: true
    })
    return api
      .setLayerPermissionsForGroup(layerId, groupId, permission)
      .then(p => {
        const permissions = p.data
        dispatch('cml/sync/stop', `layersGroupPermissionSet-${uid}`, {
          root: true
        })
        commit('groupPermissionsUpdate', {
          layerId,
          groupId,
          permission: (permissions.groups && permissions.groups[groupId]) || 0,
          uid
        })
        dispatch('cml/messages/success', 'Group permissions updated', {
          root: true
        })

        if (
          rootGetters['cml/user/isInGroup'](groupId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          dispatch('list', { corpuId: rootState.cml.corpus.actives[uid], uid })
          commit('cml/popup/close', null, { root: true })
        }

        return permissions
      })
      .catch(e => {
        dispatch('cml/sync/stop', `layersGroupPermissionSet-${uid}`, {
          root: true
        })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  groupPermissionRemove (
    { commit, dispatch, rootState, rootGetters },
    { layerId, groupId, uid }
  ) {
    dispatch('cml/sync/start', `layersGroupPermissionRemove-${uid}`, {
      root: true
    })
    return api
      .removeLayerPermissionsForGroup(layerId, groupId)
      .then(p => {
        const permissions = p.data
        dispatch('cml/sync/stop', `layersGroupPermissionRemove-${uid}`, {
          root: true
        })
        commit('groupPermissionsUpdate', {
          layerId,
          groupId,
          permission: 0,
          uid
        })
        dispatch('cml/messages/success', 'Group permissions updated', {
          root: true
        })

        if (
          rootGetters['cml/user/isInGroup'](groupId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          dispatch('list', { corpuId: rootState.cml.corpus.actives[uid], uid })
          commit('cml/popup/close', null, { root: true })
        }

        return permissions
      })
      .catch(e => {
        dispatch('cml/sync/stop', `layersGroupPermissionRemove-${uid}`, {
          root: true
        })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  userPermissionSet (
    { commit, dispatch, rootState, rootGetters },
    { layerId, userId, permission, uid }
  ) {
    dispatch('cml/sync/start', `layersUserPermissionSet-${uid}`, { root: true })
    return api
      .setLayerPermissionsForUser(layerId, userId, permission)
      .then(p => {
        const permissions = p.data
        dispatch('cml/sync/stop', `layersUserPermissionSet-${uid}`, {
          root: true
        })
        commit('userPermissionsUpdate', {
          layerId,
          userId,
          permission: (permissions.users && permissions.users[userId]) || 0,
          uid
        })
        dispatch('cml/messages/success', 'User permissions updated', {
          root: true
        })

        if (
          rootGetters['cml/user/isCurrentUser'](userId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          dispatch('list', { corpuId: rootState.cml.corpus.actives[uid], uid })
          commit('cml/popup/close', null, { root: true })
        }

        return permissions
      })
      .catch(e => {
        dispatch('cml/sync/stop', `layersUserPermissionSet-${uid}`, {
          root: true
        })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  userPermissionRemove (
    { commit, dispatch, rootState, rootGetters },
    { layerId, userId, uid }
  ) {
    dispatch('cml/sync/start', `layersUserPermissionRemove-${uid}`, {
      root: true
    })
    return api
      .removeLayerPermissionsForUser(layerId, userId)
      .then(p => {
        const permissions = p.data
        dispatch('cml/sync/stop', `layersUserPermissionRemove-${uid}`, {
          root: true
        })
        commit('userPermissionsUpdate', { layerId, userId, permission: 0, uid })
        dispatch('cml/messages/success', 'User permissions updated', {
          root: true
        })

        if (
          rootGetters['cml/user/isCurrentUser'](userId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          dispatch('list', { corpuId: rootState.cml.corpus.actives[uid], uid })
          commit('cml/popup/close', null, { root: true })
        }

        return permissions
      })
      .catch(e => {
        dispatch('cml/sync/stop', `layersUserPermissionRemove-${uid}`, {
          root: true
        })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  set ({ state, getters, dispatch, commit }, { layerId, uid }) {
    commit('set', { layerId: layerId || getters.id(uid), uid })
    if (state.actives[uid]) {
      dispatch(
        'cml/annotations/list',
        { layerId: state.actives[uid], uid },
        { root: true }
      )
    } else {
      commit('cml/annotations/reset', uid, { root: true })
    }
  }
}

export const getters = {
  id: state => uid =>
    (state.actives[uid] &&
      state.lists[uid].map(c => c.id).indexOf(state.actives[uid]) !== -1 &&
      state.actives[uid]) ||
    (state.lists[uid][0] && state.lists[uid][0].id) ||
    null
}

export const mutations = {
  reset (state, uid) {
    Vue.set(state.lists, uid, [])
    Vue.delete(state.actives, uid)
  },

  resetAll (state) {
    Vue.set(state, 'lists', {})
    Vue.set(state, 'actives', {})
  },

  add (state, { layer, uid }) {
    const index = state.lists[uid].length
    Vue.set(state.lists[uid], index, layer)
  },

  update (state, { layer, uid }) {
    const index = state.lists[uid].findIndex(l => l.id === layer.id)
    if (index !== -1) {
      Vue.set(state.lists[uid], index, layer)
    }
  },

  remove (state, { layerId, uid }) {
    const index = state.lists[uid].findIndex(l => l.id === layerId)
    if (index !== -1) {
      Vue.delete(state.lists[uid], index)
    }
  },

  list (state, { layers, uid }) {
    Vue.set(state.lists, uid, layers)
  },

  set (state, { layerId, uid }) {
    Vue.set(state.actives, uid, layerId)
  },

  groupAdd (state, groupId) {
    Object.keys(state.lists).forEach(uid => {
      state.lists[uid].forEach(c => {
        Vue.set(c.permissions.groups, groupId, 0)
      })
    })
  },

  groupRemove (state, groupId) {
    Object.keys(state.lists).forEach(uid => {
      state.lists[uid].forEach(c => {
        Vue.delete(c.permissions.groups, groupId)
      })
    })
  },

  userAdd (state, userId) {
    Object.keys(state.lists).forEach(uid => {
      state.lists[uid].forEach(c => {
        Vue.set(c.permissions.users, userId, 0)
      })
    })
  },

  userRemove (state, userId) {
    Object.keys(state.lists).forEach(uid => {
      state.lists[uid].forEach(c => {
        Vue.delete(c.permissions.users, userId)
      })
    })
  },

  groupPermissionsUpdate (state, { layerId, groupId, permission, uid }) {
    const index = state.lists[uid].findIndex(m => m.id === layerId)
    if (index !== -1) {
      Vue.set(state.lists[uid][index].permissions.groups, groupId, permission)
    }
  },

  userPermissionsUpdate (state, { layerId, userId, permission, uid }) {
    const index = state.lists[uid].findIndex(m => m.id === layerId)
    if (index !== -1) {
      Vue.set(state.lists[uid][index].permissions.users, userId, permission)
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
