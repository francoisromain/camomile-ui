// Current user

/* Example

{
  id: 'user-id-hash',
  name: 'user-name-string',
  role: 'admin', // user or admin
  isLogged: false,
  isAdmin: false,
  isRoot: false
  description: { … },
  groupIds: [
    'group-id-hash-1',
    'group-id-hash-2'
  ]
}
*/

export const state = {
  id: '',
  name: '',
  role: '',
  description: {},
  groupIds: [],
  isLogged: false,
  isAdmin: false,
  isRoot: false
}

export const actions = {
  // user login
  login({ commit, dispatch, rootState }, config) {
    dispatch('cml/sync/start', 'userLogin', { root: true })
    return rootState.cml.api
      .login(config.user.name, config.user.password)
      .then(r => {
        dispatch('cml/sync/stop', 'userLogin', { root: true })
        commit('cml/popup/close', null, { root: true })

        // Get the user properties
        dispatch('set')

        return r.message
      })
      .catch(e => {
        dispatch('cml/sync/stop', 'userLogin', { root: true })
        dispatch('cml/messages/error', e.message, { root: true })
        dispatch('cml/reset', null, { root: true })

        throw e
      })
  },

  // Get the user properties
  set({ commit, dispatch, rootState }) {
    dispatch('cml/sync/start', 'userSet', { root: true })
    return rootState.cml.api
      .me()
      .then(r => {
        // Format server response
        const user = {
          id: r.data._id,
          name: r.data.username,
          role: r.data.role,
          description: r.data.description || {},
          groupIds: r.data.groups || []
        }
        dispatch('cml/sync/stop', 'userSet', { root: true })
        // Commit user
        commit('set', user)

        // Bootstrap app from index.js / set
        dispatch('cml/set', null, { root: true })

        return user
      })
      .catch(e => {
        dispatch('cml/sync/stop', 'userSet', { root: true })
        dispatch('cml/messages/error', e.message, { root: true })
        dispatch('cml/reset', null, { root: true })

        throw e
      })
  },

  // User logout
  logout({ commit, dispatch, rootState }) {
    dispatch('cml/sync/start', 'userLogout', { root: true })
    return rootState.cml.api
      .logout()
      .then(r => {
        dispatch('cml/sync/stop', 'userLogout', { root: true })

        // Reset the app from index.js / reset
        dispatch('cml/reset', null, { root: true })
        commit('cml/popup/close', null, { root: true })
        commit('cml/dropdown/close', null, { root: true })

        return r.message
      })
      .catch(e => {
        dispatch('cml/sync/stop', 'userLogout', { root: true })
        dispatch('cml/messages/error', e.message, { root: true })
        dispatch('cml/reset', null, { root: true })

        throw e
      })
  }
}

export const getters = {
  // Get if the user is admin or belongs to an admin group
  isAdmin: state => ({ users = {}, groups = {} }) => {
    const isAdmin = users[state.id] === 3

    // Loop over the groups
    const isInAdminGroup = Object.keys(groups).reduce((result, id) => {
      // Check if the group is admin
      const groupIsAdmin = groups[id] === 3

      // Check if the group
      const userIsInGroup = state.groupIds.reduce((isIn, groupId) => {
        return isIn || groupId === id
      }, false)

      return result || (groupIsAdmin && userIsInGroup)
    }, false)

    // Return true if the user is admin or is in an admin group
    return isAdmin || isInAdminGroup
  },

  // Check if a user id is the current user
  isCurrentUser: state => userId => {
    return state.id === userId
  },

  // Check if the current user is a group
  isInGroup: state => groupId => {
    return state.groupIds.indexOf(groupId) !== -1
  },

  // Check the permission level for the current user on a permission object
  permission: state => ({ users = {}, groups = {} }) => {
    const permissionUser =
      (Object.keys(users).find(userId => userId === state.id) &&
        users[state.id]) ||
      0

    const permissionGroup = Object.keys(groups).reduce(
      (permission, groupId) =>
        Math.max(
          permission,
          state.groupIds.indexOf(groupId) !== -1 && groups[groupId]
        ),
      0
    )

    const permissionRoot = state.isRoot ? 3 : 0

    return Math.max(permissionUser, permissionGroup, permissionRoot)
  }
}

export const mutations = {
  // Set the current user properties (on log-in)
  set(state, user) {
    state.isLogged = true
    state.isAdmin = user.role === 'admin'
    state.isRoot = user.name === 'root'
    state.id = user.id
    state.name = user.name
    state.role = user.role
    state.description = user.description
    state.groupIds = user.groupIds
  },

  // Reset the current user properties (on log-out)
  reset(state) {
    state.isLogged = false
    state.isAdmin = false
    state.isRoot = false
    state.id = ''
    state.name = ''
    state.role = ''
    state.description = {}
    state.groupIds = []
  },

  // Add the current user to a group
  groupAdd(state, groupId) {
    state.groupIds.push(groupId)
  },

  // Remove the current user from a group
  groupRemove(state, groupId) {
    state.groupIds = state.groupIds.filter(id => id !== groupId)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
