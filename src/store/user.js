import api from './_api'

export const state = {
  id: '',
  name: '',
  role: '',
  description: '',
  groupIds: [],
  isLogged: false,
  isAdmin: false,
  isRoot: false
}

export const actions = {
  login ({ commit, dispatch }, config) {
    dispatch('cml/sync/start', 'userLogin', { root: true })
    return api
      .login(config.user.name, config.user.password)
      .then(r => {
        dispatch('cml/sync/stop', 'userLogin', { root: true })
        commit('cml/popup/close', null, { root: true })
        dispatch('set')

        return r.message
      })
      .catch(e => {
        dispatch('cml/sync/stop', 'userLogin', { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })
        dispatch('cml/reset', null, { root: true })

        throw error
      })
  },

  set ({ commit, dispatch }) {
    dispatch('cml/sync/start', 'userSet', { root: true })
    return api
      .me()
      .then(r => {
        const user = {
          id: r.data._id,
          name: r.data.username,
          role: r.data.role,
          description: r.data.description || {},
          groupIds: r.data.groups || []
        }
        dispatch('cml/sync/stop', 'userSet', { root: true })
        commit('set', user)
        dispatch('cml/set', null, { root: true })

        return user
      })
      .catch(e => {
        dispatch('cml/sync/stop', 'userSet', { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })
        dispatch('cml/reset', null, { root: true })

        throw error
      })
  },

  logout ({ state, commit, dispatch }) {
    dispatch('cml/sync/start', 'userLogout', { root: true })
    return api
      .logout()
      .then(r => {
        dispatch('cml/sync/stop', 'userLogout', { root: true })
        dispatch('cml/reset', null, { root: true })
        commit('cml/popup/close', null, { root: true })
        commit('cml/dropdown/close', null, { root: true })

        return r.message
      })
      .catch(e => {
        dispatch('cml/sync/stop', 'userLogout', { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })
        dispatch('cml/reset', null, { root: true })

        throw error
      })
  }
}

export const getters = {
  isAdmin: state => ({ users = {}, groups = {} }) => {
    const isAdmin = users[state.id] === 3

    const isInAdminGroup = Object.keys(groups).reduce((result, id) => {
      const groupIsAdmin = groups[id] === 3

      const userIsInGroup = state.groupIds.reduce((isIn, groupId) => {
        return isIn || groupId === id
      }, false)

      return result || (groupIsAdmin && userIsInGroup)
    }, false)

    return isAdmin || isInAdminGroup
  },

  isCurrentUser: state => userId => {
    return state.id === userId
  },

  isInGroup: state => groupId => {
    return state.groupIds.indexOf(groupId) !== -1
  },

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
  set (state, user) {
    state.isLogged = true
    state.isAdmin = user.role === 'admin'
    state.isRoot = user.name === 'root'
    state.id = user.id
    state.name = user.name
    state.role = user.role
    state.description = user.description
    state.groupIds = user.groupIds
  },

  reset (state) {
    state.isLogged = false
    state.isAdmin = false
    state.isRoot = false
    state.id = ''
    state.name = ''
    state.role = ''
    state.description = ''
    state.groupIds = []
  },

  groupAdd (state, groupId) {
    state.groupIds.push(groupId)
  },

  groupRemove (state, groupId) {
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
