import { messageDispatch, userFormat, errorFormat } from './_helpers'

export default {
  namespaced: true,
  state: {
    id: '',
    name: '',
    role: '',
    description: '',
    groupIds: []
  },

  actions: {
    login ({ commit, state, dispatch, rootState }, config) {
      commit('cml/create', config.url, { root: true })
      return rootState.cml.api
        .login(config.user.name, config.user.password)
        .then(r => {
          dispatch('cml/login', null, { root: true })
          dispatch('set')

          return r
        })
        .catch(e => {
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)
          commit('reset')

          throw error
        })
    },

    logout ({ commit, state, dispatch, rootState }) {
      return rootState.cml.api
        .logout()
        .then(r => {
          commit('reset')
          dispatch('cml/logout', null, { root: true })

          return r.success
        })
        .catch(e => {
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)
          commit('reset')

          throw error
        })
    },

    set ({ commit, dispatch, state, rootState }) {
      return rootState.cml.api
        .me()
        .then(user => {
          commit('set', user)
          dispatch('cml/set', user, { root: true })

          return user
        })
        .catch(e => {
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)
          commit('reset')

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

      return Math.max(permissionUser, permissionGroup)
    }
  },

  mutations: {
    set (state, user) {
      state.name = user.username
      state.description = user.description
      state.id = user._id
      state.role = user.role
      state.groupIds = user.groups
    },

    reset (state) {
      state.name = ''
      state.password = ''
    },

    groupAdd (state, groupId) {
      state.groupIds.push(groupId)
    },

    groupRemove (state, groupId) {
      state.groupIds = state.groupIds.filter(id => id !== groupId)
    }
  }
}
