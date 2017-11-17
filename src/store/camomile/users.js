import { messageDispatch, userFormat, errorFormat } from './_helpers'

export default {
  namespaced: true,
  state: {
    list: []
  },
  actions: {
    add ({ commit, state, dispatch, rootState }, user) {
      return rootState.cml.api
        .createUser(user.name, user.password, user.description, user.role)
        .then(r => {
          messageDispatch('success', 'Success: user added.', dispatch)
          dispatch('list')
          return r
        })
        .catch(e => {
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)
          throw error
        })
    },

    update ({ commit, dispatch, state, rootState }, user) {
      return rootState.cml.api
        .updateUser(user.id, {
          password: user.password,
          role: user.role,
          description: user.description
        })
        .then(r => {
          const user = userFormat(r)
          messageDispatch('success', 'User updated', dispatch)
          if (user.name === rootState.cml.user.name) {
            commit('cml/user/set', user, { root: true })
          }
          dispatch('list')
          return user
        })
        .catch(e => {
          // const error = 'Error: request failed.'
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)
          throw error
        })
    },

    remove ({ commit, state, dispatch, rootState }, user) {
      return rootState.cml.api
        .deleteUser(user.id)
        .then(r => {
          messageDispatch('success', 'Success: user removed.', dispatch)
          dispatch('list')
          return r
        })
        .catch(e => {
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)
          throw error
        })
    },

    get ({ commit, dispatch, state, rootState }, userId) {
      return rootState.cml.api
        .getUser(userId)
        .then(user => userFormat(user))
        .catch(e => {
          console.log(e)
          throw e
        })
    },

    list ({ commit, dispatch, state, rootState }) {
      return rootState.cml.api
        .getUsers()
        .then(r => {
          const users = r.map(user => userFormat(user))
          commit('listUpdate', users)
          return users
        })
        .catch(e => {
          console.log(e)
          throw e
        })
    },

    groupIdsList ({ commit, dispatch, state, rootState }, user) {
      return rootState.cml.api
        .getUserGroups(user.id)
        .then(groupIds => {
          commit('groupIdsListUpdate', { groupIds, user })
          return groupIds
        })
        .catch(e => {
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)
          throw error
        })
    }
  },
  mutations: {
    listUpdate (state, users) {
      state.list = users
    },
    groupIdsListUpdate (state, { groupIds, user }) {
      user.groupIds = groupIds
    }
  }
}
