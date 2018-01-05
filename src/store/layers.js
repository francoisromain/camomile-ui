import Vue from 'vue'
import api from './_api'

export const state = {
  lists: {},
  actives: {}
}

export const actions = {
  add ({ state, commit, dispatch, rootState, rootGetters }, { element }) {
    dispatch('cml/sync/start', `layersAdd`, { root: true })
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
        dispatch('cml/sync/stop', `layersAdd`, { root: true })
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

        Object.keys(state.lists).forEach(uid => {
          if (rootGetters['cml/corpus/id'](uid) === element.corpuId) {
            commit('add', { layer, uid })
          }
        })
        dispatch('cml/messages/success', 'Layer added', { root: true })

        return layer
      })
      .catch(e => {
        dispatch('cml/sync/stop', `layersAdd`, { root: true })
        dispatch('cml/messages/error', e.message, { root: true })

        throw e
      })
  },

  remove ({ state, commit, dispatch, rootState }, { id }) {
    dispatch('cml/sync/start', `layersRemove`, { root: true })
    return api
      .deleteLayer(id)
      .then(r => {
        dispatch('cml/sync/stop', `layersRemove`, { root: true })
        Object.keys(state.lists).forEach(uid => {
          commit('remove', { id, uid })
        })
        dispatch('cml/messages/success', 'Layer removed', { root: true })

        return id
      })
      .catch(e => {
        dispatch('cml/sync/stop', `layersRemove`, { root: true })
        dispatch('cml/messages/error', e.message, { root: true })

        throw e
      })
  },

  update ({ state, commit, dispatch, rootGetters }, { element }) {
    dispatch('cml/sync/start', `layersUpdate`, { root: true })
    return api
      .updateLayer(element.id, {
        name: element.name,
        description: element.description,
        fragment_type: element.fragmentType,
        data_type: element.metadataType
      })
      .then(r => {
        dispatch('cml/sync/stop', `layersUpdate`, { root: true })
        const layer = Object.assign({}, element)
        layer.description = r.data.description || {}
        layer.fragmentType = r.data.fragment_type || {}
        layer.metadataType = r.data.data_type || {}

        Object.keys(state.lists).forEach(uid => {
          if (rootGetters['cml/corpus/id'](uid) === element.corpuId) {
            commit('update', { layer, uid })
          }
        })
        dispatch('cml/messages/success', 'Layer updated', { root: true })

        return layer
      })
      .catch(e => {
        dispatch('cml/sync/stop', `layersUpdate`, { root: true })
        dispatch('cml/messages/error', e.message, { root: true })

        throw e
      })
  },

  groupPermissionSet (
    { commit, dispatch, rootState, rootGetters },
    { id, groupId, permission }
  ) {
    dispatch('cml/sync/start', `layersGroupPermissionSet`, {
      root: true
    })
    return api
      .setLayerPermissionsForGroup(id, groupId, permission)
      .then(p => {
        const permissions = p.data
        dispatch('cml/sync/stop', `layersGroupPermissionSet`, {
          root: true
        })
        commit('groupPermissionsUpdate', {
          id,
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
          dispatch('listAll')
          commit('cml/popup/close', null, { root: true })
        }

        return permissions
      })
      .catch(e => {
        dispatch('cml/sync/stop', `layersGroupPermissionSet`, {
          root: true
        })
        dispatch('cml/messages/error', e.message, { root: true })

        throw e
      })
  },

  groupPermissionRemove (
    { commit, dispatch, rootState, rootGetters },
    { id, groupId }
  ) {
    dispatch('cml/sync/start', `layersGroupPermissionRemove`, {
      root: true
    })
    return api
      .removeLayerPermissionsForGroup(id, groupId)
      .then(p => {
        const permissions = p.data
        dispatch('cml/sync/stop', `layersGroupPermissionRemove`, {
          root: true
        })
        commit('groupPermissionsUpdate', { id, groupId, permission: 0 })
        dispatch('cml/messages/success', 'Group permissions updated', {
          root: true
        })

        if (
          rootGetters['cml/user/isInGroup'](groupId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          dispatch('listAll')
          commit('cml/popup/close', null, { root: true })
        }

        return permissions
      })
      .catch(e => {
        dispatch('cml/sync/stop', `layersGroupPermissionRemove`, {
          root: true
        })
        dispatch('cml/messages/error', e.message, { root: true })

        throw e
      })
  },

  userPermissionSet (
    { commit, dispatch, rootState, rootGetters },
    { id, userId, permission }
  ) {
    dispatch('cml/sync/start', `layersUserPermissionSet`, { root: true })
    return api
      .setLayerPermissionsForUser(id, userId, permission)
      .then(p => {
        const permissions = p.data
        dispatch('cml/sync/stop', `layersUserPermissionSet`, {
          root: true
        })
        commit('userPermissionsUpdate', {
          id,
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
          dispatch('listAll')
          commit('cml/popup/close', null, { root: true })
        }

        return permissions
      })
      .catch(e => {
        dispatch('cml/sync/stop', `layersUserPermissionSet`, {
          root: true
        })
        dispatch('cml/messages/error', e.message, { root: true })

        throw e
      })
  },

  userPermissionRemove (
    { commit, dispatch, rootState, rootGetters },
    { id, userId }
  ) {
    dispatch('cml/sync/start', `layersUserPermissionRemove`, {
      root: true
    })
    return api
      .removeLayerPermissionsForUser(id, userId)
      .then(p => {
        const permissions = p.data
        dispatch('cml/sync/stop', `layersUserPermissionRemove`, {
          root: true
        })
        commit('userPermissionsUpdate', { id, userId, permission: 0 })
        dispatch('cml/messages/success', 'User permissions updated', {
          root: true
        })

        if (
          rootGetters['cml/user/isCurrentUser'](userId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          dispatch('listAll')
          commit('cml/popup/close', null, { root: true })
        }

        return permissions
      })
      .catch(e => {
        dispatch('cml/sync/stop', `layersUserPermissionRemove`, {
          root: true
        })
        dispatch('cml/messages/error', e.message, { root: true })

        throw e
      })
  },

  listAll ({ state, dispatch, rootState }) {
    Object.keys(state.lists).forEach(uid => {
      dispatch('list', { corpuId: rootState.cml.corpus.actives[uid], uid })
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
        dispatch('setAll', { uid })

        return layers
      })
      .catch(e => {
        dispatch('cml/sync/stop', `layersList-${uid}`, { root: true })
        dispatch('cml/messages/error', e.message, { root: true })

        throw e
      })
  },

  setAll ({ state, dispatch, commit }, { uid }) {
    commit('cml/annotations/init', { uid }, { root: true })
    state.lists[uid].forEach(l => {
      dispatch('set', { id: l.id, uid })
    })
  },

  set ({ dispatch, commit }, { id, uid }) {
    commit('set', { id, uid })
    dispatch('cml/annotations/list', { layerId: id, uid }, { root: true })
  },

  unset ({ dispatch, commit }, { id, uid }) {
    commit('unset', { id, uid })
    commit('cml/annotations/reset', { layerId: id, uid }, { root: true })
  }
}

export const mutations = {
  init (state, uid) {
    Vue.set(state.lists, uid, [])
    Vue.set(state.actives, uid, [])
  },

  resetAll (state) {
    Vue.set(state, 'lists', {})
    Vue.set(state, 'actives', {})
  },

  add (state, { layer, uid }) {
    const index = state.lists[uid].length
    Vue.set(state.lists[uid], index, layer)
  },

  remove (state, { id, uid }) {
    const listIndex = state.lists[uid].findIndex(e => e.id === id)
    if (listIndex !== -1) {
      Vue.delete(state.lists[uid], listIndex)
    }

    const activeIndex = state.actives[uid].findIndex(e => e.id === id)
    if (activeIndex !== -1) {
      Vue.delete(state.actives[uid], activeIndex)
    }
  },

  update (state, { layer, uid }) {
    const index = state.lists[uid].findIndex(l => l.id === layer.id)
    Vue.set(state.lists[uid], index, layer)
  },

  groupAdd (state, groupId) {
    Object.keys(state.lists).forEach(uid => {
      state.lists[uid].forEach(e => {
        Vue.set(e.permissions.groups, groupId, 0)
      })
    })
  },

  groupRemove (state, groupId) {
    Object.keys(state.lists).forEach(uid => {
      state.lists[uid].forEach(e => {
        Vue.delete(e.permissions.groups, groupId)
      })
    })
  },

  userAdd (state, userId) {
    Object.keys(state.lists).forEach(uid => {
      state.lists[uid].forEach(e => {
        Vue.set(e.permissions.users, userId, 0)
      })
    })
  },

  userRemove (state, userId) {
    Object.keys(state.lists).forEach(uid => {
      state.lists[uid].forEach(e => {
        Vue.delete(e.permissions.users, userId)
      })
    })
  },

  groupPermissionsUpdate (state, { id, groupId, permission }) {
    Object.keys(state.lists).forEach(uid => {
      const index = state.lists[uid].findIndex(e => e.id === id)
      if (index !== -1) {
        Vue.set(state.lists[uid][index].permissions.groups, groupId, permission)
      }
    })
  },

  userPermissionsUpdate (state, { id, userId, permission }) {
    Object.keys(state.lists).forEach(uid => {
      const index = state.lists[uid].findIndex(e => e.id === id)
      if (index !== -1) {
        Vue.set(state.lists[uid][index].permissions.users, userId, permission)
      }
    })
  },

  list (state, { layers, uid }) {
    Vue.set(state.lists, uid, layers)
  },

  set (state, { id, uid }) {
    if (!state.actives[uid]) {
      Vue.set(state.actives, uid, [id])
    } else {
      Vue.set(state.actives[uid], state.actives[uid].length, id)
    }
  },

  unset (state, { id, uid }) {
    const index = state.actives[uid].indexOf(id)
    Vue.delete(state.actives[uid], index)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
