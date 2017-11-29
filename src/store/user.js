import { api } from '../config'

export default {
  namespaced: true,

  state: {
    id: '',
    name: '',
    role: '',
    description: '',
    groupIds: [],
    isLogged: false,
    isAdmin: false,
    isRoot: false
  },

  actions: {
    login ({ commit, dispatch }, config) {
      commit('cml/sync/start', 'userLogin', { root: true })
      return api
        .login(config.user.name, config.user.password)
        .then(r => {
          commit('cml/sync/stop', 'userLogin', { root: true })
          commit('cml/popup/close', null, { root: true })
          dispatch('set')

          return r
        })
        .catch(e => {
          commit('cml/sync/stop', 'userLogin', { root: true })
          const error = e.response ? e.response.body.error : 'Network error'
          dispatch('cml/messages/error', error, { root: true })
          dispatch('cml/reset', null, { root: true })

          throw error
        })
    },

    set ({ commit, dispatch }) {
      commit('cml/sync/start', 'userSet', { root: true })
      return api
        .me()
        .then(user => {
          commit('cml/sync/stop', 'userSet', { root: true })
          commit('set', user)
          dispatch('cml/set', null, { root: true })

          return user
        })
        .catch(e => {
          commit('cml/sync/stop', 'userSet', { root: true })
          const error = e.response ? e.response.body.error : 'Network error'
          dispatch('cml/messages/error', error, { root: true })
          dispatch('cml/reset', null, { root: true })

          throw error
        })
    },

    logout ({ commit, dispatch }) {
      commit('cml/sync/start', 'userLogout', { root: true })
      return api
        .logout()
        .then(r => {
          commit('cml/sync/stop', 'userLogout', { root: true })
          dispatch('cml/reset', null, { root: true })
          commit('cml/popup/close', null, { root: true })
          commit('cml/dropdown/close', null, { root: true })

          return r.success
        })
        .catch(e => {
          commit('cml/sync/stop', 'userLogout', { root: true })
          const error = e.response ? e.response.body.error : 'Network error'
          dispatch('cml/messages/error', error, { root: true })
          dispatch('cml/reset', null, { root: true })

          throw error
        })
    }
  },

  getters: {
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
  },

  mutations: {
    set (state, user) {
      state.isLogged = true
      state.isAdmin = user.role === 'admin'
      state.isRoot = user.username === 'root'
      state.id = user._id
      state.name = user.username
      state.role = user.role
      state.description = user.description
      state.groupIds = user.groups
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
}
