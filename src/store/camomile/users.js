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
          messageDispatch('success', 'User added', dispatch)
          commit('add', user)
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
          commit('update', user)
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
          messageDispatch('success', 'User removed', dispatch)
          commit('remove', user)
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

    list ({ commit, dispatch, state, rootState }, { messageHide = false } = {}) {
      return rootState.cml.api
        .getUsers()
        .then(r => {
          const users = r.map(user => userFormat(user))
          if (!messageHide) {
            messageDispatch('success', 'Groups updated', dispatch)
          }
          commit('list', users)
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
    add (state, user) {
      const userExisting = state.list.find(u => u.id === user.id)
      if (!userExisting) {
        state.list.push(user)
      }
    },
    update (state, user) {
      Object.assign(state.list.find(u => u.id === user.id), user)
    },
    remove (state, user) {
      const index = state.list.findIndex(u => u.id === user.id)
      if (index !== -1) {
        state.list.splice(index, 1)
      }
    },
    list (state, users) {
      state.list = users
    },
    groupIdsListUpdate (state, { groupIds, user }) {
      user.groupIds = groupIds
    }
  }
}
