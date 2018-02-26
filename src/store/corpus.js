import Vue from 'vue'

// The latin word should be corpus (singular) / corpora (plural), but…
// For consistency with other sections (users, groups, medias, layers, annotations),
// I use corpu (singular) / corpus (plural)

// Lists contains the corpu data
// Actives contains the active corpu for each uid

/* Example:

{
  lists: {
    'corpu-uid-string-1': [{
      id: 'corpu-id-hash',
      name: 'corpu-name-string'
      permission: 3,
      permissions: {
        groups: {
          'group-id-hash-1': 2,
          'group-id-hash-2': …
        },
        users: {
          'user-id-hash-1': 1,
          'user-id-hash-2': …
        }
      }
    },
    { …
    }],
    'corpu-uid-string-2': [ … 
    ]
  },
  actives: {
    'corpu-uid-string-1': 'corpu-id-hash-1',
    'corpu-uid-string-2': …
  }
}
*/

export const state = {
  lists: {},
  actives: {}
}

export const actions = {
  // Add a new corpu
  add({ commit, dispatch, rootState, rootGetters }, { element }) {
    dispatch('cml/sync/start', `corpusAdd`, { root: true })
    return rootState.cml.api
      .createCorpus(element.name, element.description, {})
      .then(r => {
        dispatch('cml/sync/stop', `corpusAdd`, { root: true })

        // Format server response
        const corpu = {
          name: r.data.name,
          id: r.data._id,
          permission: 3,
          permissions: {
            users: rootGetters['cml/users/permissions']({}),
            groups: rootGetters['cml/groups/permissions']({})
          },
          description: r.data.description || {}
        }

        // Set the permissions for the current user
        corpu.permissions.users[rootState.cml.user.id] = 3

        // Commit the corpu
        commit('add', { corpu })
        dispatch('cml/messages/success', 'Corpus added', { root: true })

        return corpu
      })
      .catch(e => {
        dispatch('cml/sync/stop', `corpusAdd`, { root: true })
        dispatch('cml/messages/error', e.message, { root: true })

        throw e
      })
  },

  // Remove a corpu
  remove({ commit, dispatch, rootState }, { id }) {
    dispatch('cml/sync/start', `corpusRemove`, { root: true })
    return rootState.cml.api
      .deleteCorpus(id)
      .then(r => {
        dispatch('cml/sync/stop', `corpusRemove`, { root: true })
        commit('remove', { id })
        dispatch('cml/messages/success', 'Corpus removed', { root: true })

        // For every uid,
        // If the removed corpus was active
        // Set a new one
        dispatch('setAll', { id })

        return id
      })
      .catch(e => {
        dispatch('cml/sync/stop', `corpusRemove`, { root: true })
        dispatch('cml/messages/error', e.message, { root: true })

        throw e
      })
  },

  // Update a corpu
  update({ commit, dispatch, rootState }, { element }) {
    dispatch('cml/sync/start', `corpusUpdate`, { root: true })
    return rootState.cml.api
      .updateCorpus(element.id, {
        name: element.name,
        description: element.description
      })
      .then(r => {
        dispatch('cml/sync/stop', `corpusUpdate`, { root: true })

        // Format server response
        // The server does not send back the permissions,
        // To keep them, we copy the original element
        // Then overwrite the name and description
        const corpu = Object.assign({}, element)
        corpu.name = r.data.name
        corpu.description = r.data.description || {}
        commit('update', { corpu })
        dispatch('cml/messages/success', 'Corpus updated', { root: true })

        return corpu
      })
      .catch(e => {
        dispatch('cml/sync/stop', `corpusUpdate`, { root: true })
        dispatch('cml/messages/error', e.message, { root: true })

        throw e
      })
  },

  // Set the permission for a group on a corpu
  groupPermissionSet(
    { commit, dispatch, rootGetters, rootState },
    { id, groupId, permission }
  ) {
    dispatch('cml/sync/start', `corpusGroupPermissionSet`, {
      root: true
    })
    return rootState.cml.api
      .setCorpusPermissionsForGroup(id, groupId, permission)
      .then(p => {
        const permissions = p.data
        dispatch('cml/sync/stop', `corpusGroupPermissionSet`, {
          root: true
        })

        // Commit server response
        commit('permissionsUpdate', {
          id,
          typeId: groupId,
          permission: (permissions.groups && permissions.groups[groupId]) || 0,
          type: 'groups'
        })
        dispatch('cml/messages/success', 'Group permissions updated', {
          root: true
        })

        // If the current user is in the updated group
        // And if the current user is not an admin
        // => the permissions for the current user have changed
        if (
          rootGetters['cml/user/isInGroup'](groupId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          // Re-list the corpus in every uid
          dispatch('listAll')
          commit(`cml/popup/close`, null, { root: true })
        }

        return permissions
      })
      .catch(e => {
        dispatch('cml/sync/stop', `corpusGroupPermissionSet`, {
          root: true
        })

        dispatch('cml/messages/error', e.message, { root: true })

        throw e
      })
  },

  // Remove a permission for a group on a corpu
  groupPermissionRemove(
    { commit, dispatch, rootGetters, rootState },
    { id, groupId }
  ) {
    dispatch('cml/sync/start', `corpusGroupPermissionRemove`, {
      root: true
    })
    return rootState.cml.api
      .removeCorpusPermissionsForGroup(id, groupId)
      .then(p => {
        const permissions = p.data
        dispatch('cml/sync/stop', `corpusGroupPermissionRemove`, {
          root: true
        })
        commit('permissionsUpdate', {
          id,
          typeId: groupId,
          permission: 0,
          type: 'groups'
        })
        dispatch('cml/messages/success', 'Group permissions updated', {
          root: true
        })

        // If the current user is in the updated group
        // And if the current user is not an admin
        // => the permissions for the current user have changed
        if (
          rootGetters['cml/user/isInGroup'](groupId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          // Re-list the corpus in every uid
          dispatch('listAll')
          commit(`cml/popup/close`, null, { root: true })
        }

        return permissions
      })
      .catch(e => {
        dispatch('cml/sync/stop', `corpusGroupPermissionRemove`, {
          root: true
        })
        dispatch('cml/messages/error', e.message, { root: true })

        throw e
      })
  },

  // Set the permission for a user on a corpu
  userPermissionSet(
    { commit, dispatch, rootGetters, rootState },
    { id, userId, permission }
  ) {
    dispatch('cml/sync/start', `corpusUserPermissionSet`, { root: true })
    return rootState.cml.api
      .setCorpusPermissionsForUser(id, userId, permission)
      .then(p => {
        const permissions = p.data
        dispatch('cml/sync/stop', `corpusUserPermissionSet`, {
          root: true
        })
        commit('permissionsUpdate', {
          id,
          typeId: userId,
          permission: (permissions.users && permissions.users[userId]) || 0,
          type: 'users'
        })
        dispatch('cml/messages/success', 'User permissions updated', {
          root: true
        })

        // If the current user is the updated user
        // And if the current user is not an admin
        // => the permissions for the current user have changed
        if (
          rootGetters['cml/user/isCurrentUser'](userId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          // Re-list the corpus in every uid
          dispatch('listAll')
          commit(`cml/popup/close`, null, { root: true })
        }

        return permissions
      })
      .catch(e => {
        dispatch('cml/sync/stop', `corpusUserPermissionSet`, {
          root: true
        })
        dispatch('cml/messages/error', e.message, { root: true })

        throw e
      })
  },

  // Remove the permission for a user on a corpu
  userPermissionRemove(
    { commit, dispatch, rootGetters, rootState },
    { id, userId }
  ) {
    dispatch('cml/sync/start', `corpusUserPermissionRemove`, {
      root: true
    })
    return rootState.cml.api
      .removeCorpusPermissionsForUser(id, userId)
      .then(p => {
        const permissions = p.data
        dispatch('cml/sync/stop', `corpusUserPermissionRemove`, {
          root: true
        })
        commit('permissionsUpdate', {
          id,
          typeId: userId,
          permission: 0,
          type: 'users'
        })
        dispatch('cml/messages/success', 'User permissions updated', {
          root: true
        })

        // If the current user is the updated user
        // And if the current user is not an admin
        // => the permissions for the current user have changed
        if (
          rootGetters['cml/user/isCurrentUser'](userId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          dispatch('listAll')
          commit(`cml/popup/close`, null, { root: true })
        }

        return permissions
      })
      .catch(e => {
        dispatch('cml/sync/stop', `corpusUserPermissionRemove`, {
          root: true
        })
        dispatch('cml/messages/error', e.message, { root: true })

        throw e
      })
  },

  listAll({ state, dispatch }) {
    // Loop over the corpu lists
    Object.keys(state.lists).forEach(uid => {
      // List the corpus for this uid
      dispatch('list', uid)
    })
  },

  // List the corpus for a uid
  list({ commit, dispatch, rootGetters, rootState }, uid) {
    dispatch('cml/sync/start', `corpusList-${uid}`, { root: true })
    return rootState.cml.api
      .getCorpora()
      .then(r => {
        dispatch('cml/sync/stop', `corpusList-${uid}`, { root: true })

        // Format server response
        const corpus = r.data.map(c => ({
          name: c.name,
          id: c._id,
          description: c.description || {},
          // Get permission for the current user
          permission: rootGetters['cml/user/permission'](c.permissions || {}),
          // Get permissions for every users and groups
          permissions: {
            users: rootGetters['cml/users/permissions'](
              (c.permissions && c.permissions.users) || {}
            ),
            groups: rootGetters['cml/groups/permissions'](
              (c.permissions && c.permissions.groups) || {}
            )
          }
        }))

        // Commit the update corpu list
        commit('list', { corpus, uid })

        // Set the active corpu for this list
        dispatch('set', { uid })

        return corpus
      })
      .catch(e => {
        dispatch('cml/sync/stop', `corpusList-${uid}`, { root: true })
        dispatch('cml/messages/error', e.message, { root: true })

        throw e
      })
  },

  // For every uid,
  // If the corpus id was active
  // And set a new one
  setAll({ state, dispatch }, { id }) {
    Object.keys(state.actives).forEach(uid => {
      if (state.actives[uid] === id) {
        dispatch('set', { uid })
      }
    })
  },

  // Set the active corpus for a uid
  set({ state, getters, dispatch, commit }, { id, uid }) {
    // Set the active corpus
    // If the id is note defined, get one
    commit('set', { id: id || getters.id(uid), uid })

    // If the corpu active is set
    // - list the medias
    // - list the layers
    if (state.actives[uid]) {
      dispatch(
        'cml/medias/list',
        { corpuId: state.actives[uid], corpuUid: uid },
        { root: true }
      )
      dispatch(
        'cml/layers/list',
        { corpuId: state.actives[uid], corpuUid: uid },
        { root: true }
      )
    }
  },

  // Register a corpu uid
  register({ state, commit }, uid) {
    commit('register', uid)
  }
}

export const getters = {
  // Get the id of the active corpu
  // If, for this uid, active is set and its id is still in the list
  // If not, get the first corpu of the list
  id: state => uid =>
    (state.actives[uid] &&
      state.lists[uid].find(c => c.id === state.actives[uid]).id) ||
    (state.lists[uid][0] && state.lists[uid][0].id) ||
    null,

  // Get the permission level for the active corpu
  permission: state => uid => {
    const corpu =
      state.lists[uid] &&
      state.lists[uid].find(c => c.id === state.actives[uid])
    return corpu ? corpu.permission : 0
  }
}

export const mutations = {
  // Register a new uid
  // - lists is an empty array
  // - actives is null
  register(state, uid) {
    Vue.set(state.lists, uid, [])
    Vue.set(state.actives, uid, null)
  },

  // Reset all (on log-out)
  resetAll(state) {
    Vue.set(state, 'lists', {})
    Vue.set(state, 'actives', {})
  },

  // Add a new corpu in every uids
  add(state, { corpu }) {
    Object.keys(state.lists).forEach(uid => {
      const index = state.lists[uid].length
      Vue.set(state.lists[uid], index, corpu)
    })
  },

  // Update a corpu in every uids
  update(state, { corpu }) {
    Object.keys(state.lists).forEach(uid => {
      const index = state.lists[uid].findIndex(m => m.id === corpu.id)
      if (index !== -1) {
        Vue.set(state.lists[uid], index, corpu)
      }
    })
  },

  // Remove a corpu in every uids
  remove(state, { id }) {
    Object.keys(state.lists).forEach(uid => {
      const index = state.lists[uid].findIndex(c => c.id === id)
      if (index !== -1) {
        Vue.delete(state.lists[uid], index)
      }
    })
  },

  // Add a new group to every corpus
  groupAdd(state, groupId) {
    Object.keys(state.lists).forEach(uid => {
      state.lists[uid].forEach(c => {
        Vue.set(c.permissions.groups, groupId, 0)
      })
    })
  },

  // Remove a group from every corpus
  groupRemove(state, groupId) {
    Object.keys(state.lists).forEach(uid => {
      state.lists[uid].forEach(c => {
        Vue.delete(c.permissions.groups, groupId)
      })
    })
  },

  // Add a user to every corpus
  userAdd(state, userId) {
    Object.keys(state.lists).forEach(uid => {
      state.lists[uid].forEach(c => {
        Vue.set(c.permissions.users, userId, 0)
      })
    })
  },

  // Remove a user from every corpus
  userRemove(state, userId) {
    Object.keys(state.lists).forEach(uid => {
      state.lists[uid].forEach(c => {
        Vue.delete(c.permissions.users, userId)
      })
    })
  },

  // Update permissions on a corpu
  permissionsUpdate(state, { id, typeId, permission, type }) {
    // Loop over the corpus lists
    // If the current corpu is in the list, update the permissions
    Object.keys(state.lists).forEach(uid => {
      const index = state.lists[uid].findIndex(m => m.id === id)
      if (index !== -1) {
        Vue.set(state.lists[uid][index].permissions[type], typeId, permission)
      }
    })
  },

  // Set the corpu list for a uid
  list(state, { corpus, uid }) {
    Vue.set(state.lists, uid, corpus)
  },

  // Set the active corpus for a uid
  set(state, { id, uid }) {
    Vue.set(state.actives, uid, id)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
